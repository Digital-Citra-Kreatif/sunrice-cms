<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Forms\DeleteSubmission;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\Access;

#[Description('Delete form submissions for good, by "ids" (cms_list_submissions lists them), with their files. Ask the user first: it can\'t be undone.')]
final class DeleteSubmissions extends CmsTool
{
    protected string $name = 'cms_delete_submissions';

    public function handle(Request $request): Response
    {
        $ids = $request->get('ids');
        if (! is_array($ids) || $ids === []) {
            return Response::error('Give "ids", a list of submission ids.');
        }
        $deleted = 0;
        $refused = 0;
        foreach (Submission::query()->with('form')->whereKey(array_filter($ids, is_numeric(...)))->limit(200)->get() as $submission) {
            if (! Access::submissions($this->user(), 'delete', $submission->form)) {
                $refused++;

                continue;
            }
            app(DeleteSubmission::class)->handle($submission);
            $deleted++;
        }

        return $deleted === 0 && $refused > 0 ? $this->denied('delete these submissions') : $this->json(['deleted' => $deleted, 'not_allowed' => $refused]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['ids' => $schema->array()->items($schema->integer())->required()];
    }
}
