<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Mail\SubmissionRows;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\Access;

#[IsReadOnly]
#[Description('Without "form": the forms and how many submissions each has. With one: what visitors sent, newest first, 25 a page. Submissions hold personal data: use them only for what the user asked.')]
final class ListSubmissions extends CmsTool
{
    protected string $name = 'cms_list_submissions';

    public function handle(Request $request): Response
    {
        if (! Access::submissions($this->user(), 'view')) {
            return $this->denied('view form submissions');
        }
        $handle = $request->get('form');
        if (! is_string($handle) || $handle === '') {
            return $this->json(['forms' => Form::query()->withCount('submissions')->orderBy('title')->get()
                ->filter(fn (Form $f): bool => Access::submissions($this->user(), 'view', $f))->values()
                ->map(fn (Form $f): array => ['handle' => $f->handle, 'title' => $f->title, 'submissions' => $f->submissions_count])->all()]);
        }
        $form = Form::query()->where('handle', $handle)->first();
        if ($form === null || ! Access::submissions($this->user(), 'view', $form)) {
            return Response::error('No such form. Leave out "form" to list them.');
        }
        $page = $request->get('page');
        $submissions = $form->submissions()->latest()->orderByDesc('id')->paginate(25, ['*'], 'page', is_int($page) ? max(1, $page) : 1);

        return $this->json([
            'form' => $form->handle,
            'submissions' => array_map(function (Submission $submission) use ($form): array {
                $submission->setRelation('form', $form);

                return [
                    'id' => $submission->id,
                    'sent_at' => $submission->created_at?->toIso8601String(),
                    'locale' => $submission->locale,
                    'values' => array_column(SubmissionRows::of($submission), 'value', 'label'),
                ];
            }, $submissions->items()),
            'total' => $submissions->total(),
            'page' => $submissions->currentPage(),
            'last_page' => $submissions->lastPage(),
        ]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['form' => $schema->string(), 'page' => $schema->integer()];
    }
}
