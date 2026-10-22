<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Collections\SaveListing as Save;
use Sunrice\Cms\Actions\Taxonomies\SaveIndexPage;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;

#[Description('Change a listing page\'s fields in a language (the main one when left out): a collection\'s ("collection"), or a taxonomy\'s index page ("taxonomy": the shared one; with "collection" too, that collection\'s). "data" holds field values by handle; fields left out keep their values. In other languages only translated fields are saved. "seo" replaces its SEO card (title, description, image: a media id, noindex, canonical); left out, it stays. Live as soon as it\'s saved: ask first. Send the "version" cms_get_listing gave, so a save over someone else\'s newer one is refused.')]
final class SaveListing extends CmsTool
{
    protected string $name = 'cms_save_listing';

    public function handle(Request $request): Response
    {
        /** @var array{collection?: string|null, taxonomy?: string|null, locale?: string|null, data: array<mixed>, seo?: array<mixed>|null, version?: int|null} $args */
        $args = $request->validate([
            'collection' => ['nullable', 'string', 'required_without:taxonomy'],
            'taxonomy' => ['nullable', 'string'],
            'locale' => ['nullable', 'string', 'max:20'],
            'data' => ['present', 'array'],
            'seo' => ['nullable', 'array'],
            'version' => ['nullable', 'integer'],
        ]);
        $page = GetListing::pageOf($request);
        if ($page instanceof Response) {
            return $page;
        }
        $locale = $args['locale'] ?? Locales::default();
        if ($page instanceof Collection) {
            if (! $this->may('update', $page)) {
                return $this->denied('edit the listing page of '.$page->title);
            }
            app(Save::class)->handle($page, $args['data'], $locale, $args['version'] ?? null, $args['seo'] ?? null);
            $page->load('listings');
        } else {
            // As the admin's index page editor: the taxonomy's terms "update" permission.
            if (! Access::terms($this->user(), 'update', $page[0])) {
                return $this->denied('edit the index pages of '.$page[0]->title);
            }
            app(SaveIndexPage::class)->handle($page[0], $page[1], $args['data'], $locale, $args['version'] ?? null, $args['seo'] ?? null);
            $page[0]->load('listings');
        }

        return $this->json(['saved' => true, ...GetListing::present($page, $locale)]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'collection' => $schema->string()->description('The collection\'s handle: its listing page; with "taxonomy", that collection\'s index page of the taxonomy.'),
            'taxonomy' => $schema->string()->description('A taxonomy\'s handle: its index page (the shared one without "collection").'),
            'locale' => $schema->string(),
            'data' => $schema->object()->description('Field handle => value.')->required(),
            'seo' => $schema->object()->description('The SEO card, replaced whole: title, description, image (a media id), noindex, canonical.'),
            'version' => $schema->integer()->description('From cms_get_listing.'),
        ];
    }
}
