# Media

The asset library holds every file you upload: images, documents and videos. You can organise files in folders, describe them for visitors and search engines, and pick them in any field that asks for an image or file.

## The asset library

In the sidebar, under **Manage**, click **Assets**. On the left is the **Folders** list; on the right, your files.

- **Search assets…**: type a word and press Enter to search.
- **All types**: show only **Images**, **Documents** or **Video**.
- **Active**: switch to **With trashed** or **Trashed only** to see files in the trash.
- The grid/list button switches between thumbnails and a list with **Name**, **Type** and **Size**.
- **Per page**: how many files one page shows.

The bottom of the page shows how many files there are and the largest file size allowed per upload.

## Uploading files

1. Open the folder you want the files in (or **All assets** for the top level).
2. Click **Upload** and choose one or more files, or drag files from your computer onto the file area.
3. Wait for the *Uploaded* message. Large batches are uploaded one file at a time.

A file that is too large or of a type the site doesn't accept is skipped with a message; the other files still upload.

> [!TECHNICAL]
> The size limit is `sunrice.assets.max_upload_kb`, and the server's own PHP upload limits apply too. If the library says the `public/storage` link is missing, run `php artisan storage:link` on the server. See [Assets](docs:assets.md).

## Folders

- **Create a folder**: click **+** (**New folder**) next to **Folders**. Type a **Name**, choose where it goes under **Inside** (**Top level** or another folder), and click **Create folder**. When a folder is open, the new folder goes inside it.
- **Rename a folder**: hover the folder and click the pencil (**Rename folder**), change the **Name**, and click **Save**.
- **Delete a folder**: hover the folder and click the bin (**Delete folder**). Only empty folders can be deleted.

> [!NOTE]
> The admin has no button to move a file to another folder after uploading. Upload files into the folder they belong in. Folders only help you find files; they don't change a file's web address.

## Editing an asset

Click a file to open it. The page has three parts:

- **Preview**: the image (or a file icon), with **Copy link** (copies the file's web address), **Open file** and **Replace file**.
- **Details**: **Title**, **Alt text** and **Caption**.
- **File**: type, size, dimensions and upload date, and **Used by**, the list of entries, terms and globals that use this file.

To change the details:

1. Fill in **Title** (a readable name shown in the library), **Alt text** and, if you like, **Caption**.
2. Click **Save**.

> [!TIP]
> Always fill in **Alt text** for images. It describes the image to people who use screen readers and to search engines. Describe what the image shows, such as *Two volunteers planting a tree*, rather than *image1*.

### Replacing a file

**Replace file** swaps the file but keeps the asset itself, so every page that uses it shows the new file straight away. Use it to update a brochure or swap a photo without editing each page.

1. Open the asset and click **Replace file**.
2. Choose the new file and confirm.

### Image sizes

When you upload an image, the site automatically makes smaller copies of it (for example a square thumbnail and medium and large versions), and the pages use the size that fits. You don't need to resize images yourself, though very large photos take longer to upload. SVG images are never resized.

> [!TECHNICAL]
> Sizes are defined in `sunrice.assets.image_sizes` (default `thumbnail` 300×300 crop, `medium` 800 wide, `large` 1600 wide). After changing them, run `php artisan sunrice:regenerate-images`. Oversized originals can be shrunk with `php artisan sunrice:optimize-images`. See [Optimizing images](docs:assets.md#optimizing-images).

## Trash and restore

- **Trash one file**: open it and click the bin (**Move to trash**).
- **Trash several**: tick the boxes on the thumbnails and click **Trash** followed by the number of files.
- **Restore**: set the filter to **Trashed only**, open the file and click **Restore**.
- **Delete for good**: open a trashed file and click **Delete forever**.

> [!WARNING]
> **Delete forever** removes the file and all its sizes permanently. A file that is still used somewhere can't be deleted this way; check **Used by** and remove it from those pages first.

## Picking assets in fields

Fields that take an image or file show a **Choose image** or **Choose asset** button.

1. Click it. The **Asset library** window opens.
2. Pick a folder at the top, or use **Search…**.
3. Click a file to select it. In fields that allow several files, click more of them.
4. Click **Select**.

You can also click **Upload** in the window to add a new file: it is selected for you, so you only need to click **Select**. Once chosen, use **Change** to pick another file, **Add more** to add files to a multi-file field, or the **×** (**Remove**) button to take a file out of the field. Removing a file from a field doesn't delete it from the library.
