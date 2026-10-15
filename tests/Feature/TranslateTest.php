<?php

declare(strict_types=1);

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Sunrice\Models\Blueprint;
use Sunrice\Models\Entry;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Menu;
use Sunrice\Models\MenuItem;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Translation\GeminiTranslator;
use Sunrice\Translation\OpenRouterTranslator;
use Sunrice\Translation\Translator;
use Sunrice\Translation\TranslatorFactory;

/** Fake model: prefixes every string with the target language, e.g. "[en] Halo". */
function fakeTranslations(): void
{
    app()->instance(TranslatorFactory::class, new class extends TranslatorFactory
    {
        public function make(?string $driver = null, ?string $model = null): Translator
        {
            return new class implements Translator
            {
                public function translate(array $strings, string $from, string $to, ?string $context = null): array
                {
                    return array_map(fn (string $value) => "[{$to}] {$value}", $strings);
                }
            };
        }
    });
}

/** The JSON object a driver sent, decoded from the prompt text. */
function promptStrings(string $prompt): array
{
    return json_decode($prompt, true);
}

it('translates through the Gemini API', function () {
    Http::fake(function (Request $request) {
        $strings = promptStrings($request['contents'][0]['parts'][0]['text']);

        return Http::response(['candidates' => [['content' => ['parts' => [
            ['text' => json_encode(array_map(fn ($v) => strtoupper($v), $strings))],
        ]]]]]);
    });

    $result = (new GeminiTranslator('test-key', 'gemini-3.5-flash-lite'))->translate(['greeting' => 'halo', 'bye' => 'dah :name'], 'id', 'en');

    expect($result)->toBe(['greeting' => 'HALO', 'bye' => 'DAH :NAME']);
    Http::assertSent(fn (Request $request) => str_contains($request->url(), 'models/gemini-3.5-flash-lite:generateContent')
        && $request->hasHeader('x-goog-api-key', 'test-key')
        && $request['generationConfig']['responseMimeType'] === 'application/json');
});

it('translates through the OpenRouter API, including fenced JSON answers', function () {
    Http::fake(function (Request $request) {
        $strings = promptStrings($request['messages'][1]['content']);

        return Http::response(['choices' => [['message' => [
            'content' => "```json\n".json_encode(array_map(fn ($v) => "EN {$v}", $strings))."\n```",
        ]]]]);
    });

    $result = (new OpenRouterTranslator('or-key', 'google/gemini-3.5-flash-lite', batchSize: 1))
        ->translate(['a' => 'satu', 'b' => 'dua'], 'id', 'en');

    expect($result)->toBe(['a' => 'EN satu', 'b' => 'EN dua']);
    Http::assertSentCount(2); // one request per batch
    Http::assertSent(fn (Request $request) => $request->url() === 'https://openrouter.ai/api/v1/chat/completions'
        && $request->hasHeader('Authorization', 'Bearer or-key')
        && $request['model'] === 'google/gemini-3.5-flash-lite');
});

it('saves entry translations as unready drafts holding only the translated text', function () {
    fakeTranslations();
    $blueprint = Blueprint::create(['handle' => 'tr-page', 'title' => 'Page', 'fields' => [
        ['handle' => 'intro', 'type' => 'text', 'label' => 'Intro'],
        ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Body'],
        ['handle' => 'code', 'type' => 'text', 'label' => 'Code', 'translatable' => false],
        ['handle' => 'featured', 'type' => 'toggle', 'label' => 'Featured'],
        ['handle' => 'faq', 'type' => 'repeater', 'label' => 'FAQ', 'config' => ['fields' => [
            ['handle' => 'question', 'type' => 'text', 'label' => 'Question'],
        ]]],
    ]]);
    $pages = createCollection('pages', ['route' => '/pages/{slug}', 'translatable' => true], $blueprint);
    $entry = createEntry($pages, 'Tentang kami', [
        'intro' => 'Selamat datang',
        'body' => '<p>Isi <strong>tebal</strong></p>',
        'code' => 'SKU-1',
        'featured' => true,
        'faq' => [['question' => 'Apa itu?']],
    ]);
    $entry->mainTranslation()->update(['seo' => ['title' => 'Judul SEO']]);

    $this->artisan('sunrice:translate', ['--to' => ['en'], '--only' => ['entries'], '--no-interaction' => true])
        ->expectsOutputToContain('Translated 5 string(s)')
        ->assertSuccessful();

    $en = Entry::query()->find($entry->id)->translation('en');
    expect($en->is_ready)->toBeFalse()
        ->and($en->draft['title'])->toBe('[en] Tentang kami')
        ->and($en->draft['slug'])->toBe('en-tentang-kami')
        ->and($en->draft['data']['intro'])->toBe('[en] Selamat datang')
        ->and($en->draft['data']['body'])->toStartWith('[en]')->toContain('<strong>tebal</strong>')
        // Shared fields stay with the main language; rows are matched by id
        // (or by position for rows without one).
        ->and($en->draft['data'])->not->toHaveKey('code')->not->toHaveKey('featured')
        ->and($en->draft['data']['faq']['#0']['question'])->toBe('[en] Apa itu?')
        ->and($en->draft['seo']['title'])->toBe('[en] Judul SEO');

    $merged = Entry::query()->find($entry->id)->dataFor($en, $en->draft['data']);
    expect($merged['code'])->toBe('SKU-1')
        ->and($merged['featured'])->toBeTrue()
        ->and($merged['faq'][0]['question'])->toBe('[en] Apa itu?');
});

it('skips fields that are already translated unless --force is used', function () {
    fakeTranslations();
    $blueprint = Blueprint::create(['handle' => 'tr-skip', 'title' => 'Page', 'fields' => [
        ['handle' => 'intro', 'type' => 'text', 'label' => 'Intro'],
        ['handle' => 'outro', 'type' => 'text', 'label' => 'Outro'],
    ]]);
    $pages = createCollection('pages', ['route' => '/pages/{slug}', 'translatable' => true], $blueprint);
    $entry = createEntry($pages, 'Halo', ['intro' => 'Pagi', 'outro' => 'Malam']);
    // An editor already translated "intro"; "outro" still holds the copied source text.
    $entry->translations()->create([
        'collection_id' => $pages->id, 'locale' => 'en', 'title' => 'Halo', 'slug' => 'halo-en',
        'data' => ['intro' => 'Good morning', 'outro' => 'Malam'], 'is_ready' => true,
    ]);

    $this->artisan('sunrice:translate', ['--to' => ['en'], '--only' => ['entries'], '--no-interaction' => true])
        ->expectsOutputToContain('skipped 1 already translated')
        ->assertSuccessful();

    $draft = Entry::query()->find($entry->id)->translation('en')->draft;
    expect($draft['data']['intro'])->toBe('Good morning')
        ->and($draft['data']['outro'])->toBe('[en] Malam')
        ->and($draft['title'])->toBe('[en] Halo');

    $this->artisan('sunrice:translate', ['--to' => ['en'], '--only' => ['entries'], '--force' => true, '--no-interaction' => true])
        ->assertSuccessful();

    expect(Entry::query()->find($entry->id)->translation('en')->draft['data']['intro'])->toBe('[en] Pagi');
});

it('translates terms, globals and menu labels', function () {
    fakeTranslations();
    $taxonomy = Taxonomy::factory()->create(['handle' => 'topics']);
    $term = Term::factory()->create(['taxonomy_id' => $taxonomy->id]);
    $term->translations()->first()->update(['name' => 'Berita', 'slug' => 'berita']);

    $siteBlueprint = Blueprint::create(['handle' => 'tr-site', 'title' => 'Site', 'fields' => [
        ['handle' => 'tagline', 'type' => 'text', 'label' => 'Tagline'],
        ['handle' => 'phone', 'type' => 'text', 'label' => 'Phone', 'translatable' => false],
    ]]);
    $site = GlobalSet::factory()->create(['handle' => 'site', 'blueprint_id' => $siteBlueprint->id]);
    $site->values()->create(['locale' => 'id', 'data' => ['tagline' => 'Cepat dan ringan', 'phone' => '0812']]);

    $menu = Menu::factory()->create(['handle' => 'main']);
    $item = MenuItem::query()->create([
        'menu_id' => $menu->id, 'sort_order' => 0, 'type' => 'url', 'url' => '/',
        'labels' => ['id' => 'Beranda'], 'new_tab' => false,
    ]);

    $this->artisan('sunrice:translate', ['--to' => ['en'], '--only' => ['terms', 'globals', 'menus'], '--no-interaction' => true])
        ->assertSuccessful();

    expect($term->fresh()->translation('en')->name)->toBe('[en] Berita')
        ->and($term->fresh()->translation('en')->slug)->toBe('en-berita')
        // A machine-translated term waits for an editor to mark it Ready.
        ->and($term->fresh()->translation('en')->is_ready)->toBeFalse()
        ->and($term->fresh()->readyTranslation('en'))->toBeNull()
        // Globals keep only the translated text; the phone number stays shared.
        ->and($site->values()->where('locale', 'en')->first()->data)->toBe(['tagline' => '[en] Cepat dan ringan'])
        ->and($site->fresh()->valuesFor('en'))->toEqual(['tagline' => '[en] Cepat dan ringan', 'phone' => '0812'])
        // Compare per key: MySQL's JSON type does not keep object key order.
        ->and($item->fresh()->labels['id'])->toBe('Beranda')
        ->and($item->fresh()->labels['en'])->toBe('[en] Beranda');
});

it('translates Laravel language files, keeping existing keys', function () {
    fakeTranslations();
    $lang = sys_get_temp_dir().'/sunrice-lang-'.uniqid();
    File::ensureDirectoryExists("{$lang}/id");
    File::put("{$lang}/id/messages.php", "<?php\n\nreturn ['welcome' => 'Selamat datang, :name', 'nav' => ['home' => 'Beranda']];\n");
    File::put("{$lang}/id.json", json_encode(['Save' => 'Simpan', 'Cancel' => 'Batal']));
    File::put("{$lang}/en.json", json_encode(['Save' => 'Save it']));
    app()->useLangPath($lang);

    $this->artisan('sunrice:translate', ['--to' => ['en'], '--only' => ['lang'], '--no-interaction' => true])
        ->assertSuccessful();

    expect(require "{$lang}/en/messages.php")->toBe(['welcome' => '[en] Selamat datang, :name', 'nav' => ['home' => '[en] Beranda']])
        ->and(json_decode(File::get("{$lang}/en.json"), true))->toBe(['Save' => 'Save it', 'Cancel' => '[en] Batal']);

    File::deleteDirectory($lang);
});

it('leaves collections that are not translatable alone', function () {
    fakeTranslations();
    $pages = createCollection('pages', ['route' => '/pages/{slug}', 'translatable' => false]);
    $entry = createEntry($pages, 'Halo');

    $this->artisan('sunrice:translate', ['--to' => ['en'], '--only' => ['entries'], '--no-interaction' => true])
        ->assertSuccessful();

    expect(Entry::query()->find($entry->id)->translation('en'))->toBeNull();
});

it('counts strings on --dry-run without calling the API or writing', function () {
    config(['sunrice.translation.gemini.key' => null]);
    Http::fake();
    $pages = createCollection('pages', ['route' => '/pages/{slug}', 'translatable' => true]);
    $entry = createEntry($pages, 'Halo');

    $this->artisan('sunrice:translate', ['--to' => ['en'], '--only' => ['entries'], '--dry-run' => true])
        ->expectsOutputToContain('Dry run: 1 string(s) would be translated')
        ->assertSuccessful();

    Http::assertNothingSent();
    expect(Entry::query()->find($entry->id)->translation('en'))->toBeNull();
});

it('explains a missing API key and rejects unknown languages', function () {
    config(['sunrice.translation.driver' => 'gemini', 'sunrice.translation.gemini.key' => null]);

    $this->artisan('sunrice:translate', ['--to' => ['en'], '--no-interaction' => true])
        ->expectsOutputToContain('needs an API key')
        ->assertFailed();

    $this->artisan('sunrice:translate', ['--to' => ['fr'], '--no-interaction' => true])
        ->expectsOutputToContain('Unknown language(s): fr')
        ->assertFailed();
});
