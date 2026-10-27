<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Admin\Security\SecurityLog;
use Sunrice\Admin\Support\Csv;
use Sunrice\Cms\Actions\Forms\DeleteSubmission;
use Sunrice\Cms\Actions\Forms\SubmitForm;
use Sunrice\Cms\Admin\BlueprintLinks;
use Sunrice\Cms\Mail\SubmissionRows;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\Access;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Content → Submissions: what visitors sent, per form, to read, delete
 * and export (cms.submissions.view, .export, .delete).
 *
 * @internal
 */
final class SubmissionController
{
    public const PER_PAGE = 25;

    public function home(Request $request): RedirectResponse|Response
    {
        $first = Form::query()->orderBy('title')->get()->first(fn (Form $form): bool => Access::submissions($request->user(), 'view', $form));

        return $first === null
            ? Inertia::render('Cms/Submissions/Index', ['form' => null, 'forms' => [], 'submissions' => null, 'can' => ['delete' => false, 'export' => false],
                // No forms yet: where to make one, for those who may.
                'createForm' => $request->user()?->can('cms.forms.create') === true ? route('sunrice.admin.cms.forms.create', [], false) : null])
            : redirect()->route('sunrice.admin.cms.forms.submissions.index', $first->handle);
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
                    'visitor' => ['ip' => $submission->ip_address, 'userAgent' => $submission->user_agent, 'referrer' => $submission->referrer],
                ];
            });

        return Inertia::render('Cms/Submissions/Index', [
            'form' => ['handle' => $form->handle, 'title' => $form->title],
            'forms' => Form::query()->withCount('submissions')->orderBy('title')->get()
                ->filter(fn (Form $f): bool => Access::submissions($request->user(), 'view', $f))->values()
                ->map(fn (Form $f): array => ['handle' => $f->handle, 'title' => $f->title, 'count' => $f->submissions_count])->all(),
            'submissions' => $submissions,
            'can' => ['delete' => Access::submissions($request->user(), 'delete', $form), 'export' => Access::submissions($request->user(), 'export', $form)],
            // The form's blueprint (its fields), for those who may edit blueprints.
            'blueprint' => BlueprintLinks::url($request->user(), $form->blueprint),
        ]);
    }

    /** A file sent with a form, as a download (never shown in the browser). */
    public function file(Request $request, Submission $submission, string $field): StreamedResponse
    {
        $file = $submission->data[$field] ?? null;
        // One of several: ?index=n.
        if (is_array($file) && array_is_list($file)) {
            $index = $request->query('index');
            $file = is_string($index) && ctype_digit($index) ? ($file[(int) $index] ?? null) : null;
        }
        abort_unless(is_array($file) && is_string($file['path'] ?? null) && Storage::disk(SubmitForm::disk())->exists($file['path']), 404);
        $name = is_string($file['name'] ?? null) ? $file['name'] : basename($file['path']);

        return Storage::disk(SubmitForm::disk())->download($file['path'], $name, ['X-Content-Type-Options' => 'nosniff', 'Content-Type' => 'application/octet-stream']);
    }

    public function destroy(Submission $submission, DeleteSubmission $delete): RedirectResponse
    {
        $delete->handle($submission);

        return redirect()->back()->with('success', 'Submission deleted.');
    }

    /** All of a form's submissions as CSV, a column per field, then who sent it. Logged: it carries personal data out. */
    public function export(Request $request, Form $form, SecurityLog $security): StreamedResponse
    {
        $user = $request->user();
        $security->record('exported', $user instanceof Model ? $user : null, null, ['note' => $form->title.' submissions (CSV)']);
        $headers = ['Sent', 'Language', ...array_map(SubmissionRows::label(...), $form->schema()->fields()), 'IP address', 'User agent', 'Referrer'];

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
                    $cells = [(string) $submission->created_at?->toDateTimeString(), $submission->locale, ...$values, (string) $submission->ip_address, (string) $submission->user_agent, (string) $submission->referrer];
                    Csv::write($out, $cells);
                }
            });
            fclose($out);
        }, $form->handle.'-submissions-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
