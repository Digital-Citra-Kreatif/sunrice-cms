<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Forms\DeleteSubmission;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\Access;

#[Description('Delete form submissions permanently, with the files sent with them (spam, or someone asking for their data to be removed): the form\'s handle and the submission ids (cms_list_submissions). Ask the user first.')]
final class DeleteSubmissions extends CmsTool
{
    protected string $name = 'cms_delete_submissions';

    public function handle(Request $request): Response
    {
        /** @var array{form: string, ids: list<int>} $args */
        $args = $request->validate([
            'form' => ['required', 'string'],
            'ids' => ['required', 'array', 'min:1', 'max:500'],
            'ids.*' => ['integer'],
        ]);
        $form = Form::query()->where('handle', $args['form'])->first();
        if ($form === null || ! Access::submissions($this->user(), 'view', $form)) {
            return Response::error('No such form. cms_list_submissions lists them.');
        }
        if (! Access::submissions($this->user(), 'delete', $form)) {
            return $this->denied('delete submissions of '.$form->title);
        }
        $submissions = $form->submissions()->whereKey($args['ids'])->get();
        foreach ($submissions as $submission) {
            $submission->setRelation('form', $form);
            app(DeleteSubmission::class)->handle($submission);
        }
        $deleted = $submissions->map(fn (Submission $s): int => $s->id)->all();

        return $this->json(['deleted' => $deleted, 'not_found' => array_values(array_diff($args['ids'], $deleted))]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'form' => $schema->string()->required(),
            'ids' => $schema->array()->items($schema->integer())->required(),
        ];
    }
}
