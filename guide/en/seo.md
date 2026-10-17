# SEO

SEO (search engine optimisation) is about how your pages appear in search results and when they are shared on social media. Sunrice fills in sensible values automatically; this page explains where you can fine-tune them, per entry and for the whole site.

## How the site picks a title, description and image

For every page, the site looks for each value in this order and uses the first one it finds:

1. The page's own **SEO** fields (filled in on the entry).
2. A field of the entry chosen under **Settings → SEO** (for example its summary or its main image).
3. The **SEO defaults** of its collection or taxonomy.
4. The site-wide settings (the site **Description** under **Settings → General**, and the **Default share image** under **Settings → SEO**).

So you only need to fill in an entry's SEO fields when you want something different from what the site would pick by itself.

## SEO fields on an entry

Every entry has an **SEO** card, below its other fields: *How this entry appears in search results and social shares.*

- **Meta title**: the title shown in the browser tab and as the headline in search results. Empty: the entry's title is used.
- **Meta description**: the short text under the headline in search results. Keep it to one or two sentences (about 160 characters).
- **Canonical URL**: only for pages whose content also lives at another address; type the address of the original. Leave it empty in almost every case.
- **Open Graph image**: the image shown when the page is shared on social media or in chat apps. Click **Choose image** to pick one (see [Media](media.md#picking-assets-in-fields)).
- **Hide from search engines (noindex)**: asks search engines not to list this page, and leaves it out of the sitemap. Use it for thank-you pages, internal pages and the like.

SEO fields are saved with the draft and go live when you publish, like the rest of the entry. On a multilingual site, each language has its own SEO fields (see [Translations](translations.md)).

> [!NOTE]
> Terms and listing pages (such as a blog overview) have the same SEO fields in their own editors.

## Settings → SEO

Site managers open **Manage → Settings** and click the **SEO** tab.

### Search engines & sharing

- **Hide the whole site from search engines**: adds noindex to every page and empties the sitemap. Useful on a test (staging) site; make sure it is off on the live site.
- **Add the site name to page titles**: shows titles such as *About us | My Site* in browser tabs and search results. Change the **Separator** if you prefer another character. Social share previews keep the bare title.
- **X/Twitter handle**: your account name, such as `@acme`, added to share previews.
- **Default share image**: click **Choose image**. It is used when a page is shared and has no image of its own.

### Fields used for SEO

For each collection and taxonomy, choose which of its fields fills an empty **Meta title**, **Meta description** and **Share image**:

- **Automatic** picks a fitting field by itself, such as one called *excerpt* or *summary* for the description, or the first image field for the share image. The menu shows which field it picked.
- **None** uses no field.
- Or choose a specific field from the list.

Descriptions taken from a field are cut to 160 characters. Click **Save SEO settings** when you are done.

## SEO defaults per collection and taxonomy

Each collection and taxonomy also has an **SEO defaults** card in its settings under **Manage → Collections** or **Manage → Taxonomies** (see [Structure](structure.md)):

- **Default meta description**: for pages that leave their own empty.
- **Default share image**: for pages without their own Open Graph image.
- **Hide all of these pages from search engines (noindex)**: hides every entry of that collection (or every term page of that taxonomy) and leaves them out of the sitemap.

## Sitemap and robots

The site publishes a **sitemap** at `/sitemap.xml`: a list of all public pages that search engines read to find your content. It updates itself. It includes published entries, listing pages and term pages, in every language that has a ready translation. It leaves out pages marked noindex, pages with a canonical URL pointing elsewhere, and everything when the whole site is hidden.

The noindex switches above tell search engines not to list a page, using a *robots* instruction in the page itself. Drafts you view while signed in are never indexed.

> [!TECHNICAL]
> The sitemap is cached and rebuilt when content changes. Sunrice doesn't generate a `robots.txt` file; if you want one (for example to point search engines at `/sitemap.xml`), add it to the app's `public/` folder. The tags themselves come from `<x-sunrice::seo>` in the layout; see [SEO](docs:templates.md#seo).

## Redirects when a slug changes

When you change the slug of a published entry and publish it again, or move a page under another parent, the old address automatically redirects visitors and search engines to the new one (a permanent *301* redirect). Old links and search results keep working, so you don't need to do anything.

> [!NOTE]
> There is no screen to view or add redirects by hand. Avoid reusing an old slug for a different page, since the new page then takes over that address.

> [!TECHNICAL]
> Redirects are stored in the `sunrice_redirects` table and checked before a 404 is returned. Redirects for other addresses (for example from an old website) belong in your Laravel routes or web server configuration.
