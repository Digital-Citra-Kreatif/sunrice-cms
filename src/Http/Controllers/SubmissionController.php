<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Admin\Security\SecurityLog;
use Sunrice\Admin\Support\Csv;
use Sunrice\Cms\Actions\Forms\DeleteSubmission;
use Sunrice\Cms\Mail\SubmissionRows;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Submission;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Content → Submissions: what visitors sent, per form, to read, delete
 * and export (cms.submissions.view, .delete).
 *
 * @internal
 */
final class SubmissionController
{
    public const PER_PAGE = 25;

    public function home(): RedirectResponse|Response
    {
        $first = Form::query()->orderBy('title')->first();

        return $first === null
            ? Inertia::render('Cms/Submissions/Index', ['form' => null, 'forms' => [], 'submissions' => null, 'can' => ['delete' => false]])
            : redirect()->route('sunrice.admin.cms.submissions.index', $first->handle);
    }

    public function index(Request $request, Form $form): Response
    {
        $submissions = $form->submissions()->latest()->orderByDesc('id')->paginate(self::PER_PAGE)->withQueryString()
            ->through(function (Submission $submission) use ($form): array {
                $submission->setRelation('form', $form);

                return [
                    'id' => $submission->id,
                    'locale' => $submission->locale,
                    'createdAt' => $submission->created_at?->toIso8601String(),
                    'rows' => SubmissionRows::of($submission),
                ];
            });

        return Inertia::render('Cms/Submissions/Index', [
            'form' => ['handle' => $form->handle, 'title' => $form->title],
            'forms' => Form::query()->withCount('submissions')->orderBy('title')->get()
                ->map(fn (Form $f): array => ['handle' => $f->handle, 'title' => $f->title, 'count' => $f->submissions_count])->all(),
            'submissions' => $submissions,
            'can' => ['delete' => $request->user()?->can('cms.submissions.delete') ?? false],
        ]);
    }

    public function destroy(Submission $submission, DeleteSubmission $delete): RedirectResponse
    {
        $delete->handle($submission);

        return redirect()->back()->with('success', 'Submission deleted.');
    }

    /** All of a form's submissions as CSV, a column per field. Logged: it carries personal data out. */
    public function export(Request $request, Form $form, SecurityLog $security): StreamedResponse
    {
        $user = $request->user();
        $security->record('exported', $user instanceof Model ? $user : null, null, ['note' => $form->title.' submissions (CSV)']);
        $headers = ['Sent', 'Language', ...array_map(SubmissionRows::label(...), $form->schema()->fields())];

        return response()->streamDownload(function () use ($form, $headers): void {
            $out = fopen('php://output', 'w');
            if ($out === false) {
                return;
            }
            Csv::write($out, $headers);
            $form->submissions()->orderBy('id')->chunkById(500, function ($submissions) use ($form, $out): void {
                foreach ($submissions as $submission) {
                    $submission->setRelation('form', $form);
                    $values = [];
                    foreach ($form->schema()->fields() as $field) {
                        $values[] = SubmissionRows::text($submission->data[$field->handle] ?? null, $field);
                    }
                    $cells = [(string) $submission->created_at?->toDateTimeString(), $submission->locale, ...$values];
                    Csv::write($out, $cells);
                }
            });
            fclose($out);
        }, $form->handle.'-submissions-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
