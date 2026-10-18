#!/usr/bin/env node
// Screenshots of the admin for the user guide (guide/images/*.webp).
//
//   node workbench/guide-screenshots/shoot.mjs            # every shot file
//   node workbench/guide-screenshots/shoot.mjs welcome    # shots/welcome.mjs only
//
// Env: BASE_URL (default http://127.0.0.1:8124), OUT_DIR (default
// <repo>/guide/images), CHROMIUM_PATH, NODE_PATH (to find playwright),
// APP_URL (the server's, default http://localhost:8000), TIMEZONE.
// See README.md next to this file.

import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../..');
const baseUrl = (process.env.BASE_URL || 'http://127.0.0.1:8124').replace(/\/$/, '');
const outDir = resolve(process.env.OUT_DIR || join(repo, 'guide/images'));
// Uploaded files are linked with the app's APP_URL (Testbench's default
// is http://localhost:8000): such requests are sent to BASE_URL instead.
const appUrl = (process.env.APP_URL || 'http://localhost:8000').replace(/\/$/, '');
const timezone = process.env.TIMEZONE || 'Asia/Jakarta'; // the demo site's timezone
const chromiumPath = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const VIEWPORT = { width: 1280, height: 800 };
const MAX_WIDTH = 1600;
const QUALITY = 0.82;
const PADDING = 16;

// Seeded by Workbench\Database\Seeders\GuideDemoSeeder (password "password").
const USERS = {
    admin: 'admin@example.com',
    editor: 'sari@kopikita.studio',
    author: 'budi@kopikita.studio',
    translator: 'maya@kopikita.studio',
};

// Stable pixels: no motion, no blinking caret, no scrollbars.
const STILL_CSS = `
*, *::before, *::after {
    animation-duration: 0s !important; animation-delay: 0s !important;
    transition-duration: 0s !important; transition-delay: 0s !important;
    caret-color: transparent !important; scroll-behavior: auto !important;
}
::-webkit-scrollbar { display: none !important; }
html { scrollbar-width: none !important; }
`;

function loadPlaywright() {
    // CommonJS resolution honours NODE_PATH; also look next to the cwd.
    const require = createRequire(import.meta.url);
    for (const name of ['playwright-core', 'playwright']) {
        for (const paths of [undefined, [process.cwd()]]) {
            try {
                return require(paths ? require.resolve(name, { paths }) : name);
            } catch {
                // try the next one
            }
        }
    }
    console.error('playwright-core (or playwright) not found: npm install it somewhere and set NODE_PATH to that node_modules.');
    process.exit(1);
}

async function shotFiles(names) {
    const dir = join(here, 'shots');
    const all = readdirSync(dir).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4)).sort();
    const wanted = names.length ? names : all;
    const files = [];
    for (const name of wanted) {
        const file = join(dir, `${name}.mjs`);
        if (!existsSync(file)) {
            console.error(`No shot file shots/${name}.mjs (have: ${all.join(', ')})`);
            process.exit(1);
        }
        files.push({ name, shots: (await import(pathToFileURL(file).href)).default });
    }
    return files;
}

async function waitIdle(page) {
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].filter((img) => !img.complete).map((img) => new Promise((r) => { img.onload = img.onerror = r; })));
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    });
    await page.waitForTimeout(150);
}

async function login(context, who) {
    const page = await context.newPage();
    await page.goto(`${baseUrl}/cms/login`);
    await page.fill('input[type=email]', USERS[who] ?? who);
    await page.fill('input[type=password]', 'password');
    await Promise.all([
        page.waitForURL((url) => !url.pathname.endsWith('/login'), { timeout: 15000 }),
        page.click('button[type=submit]'),
    ]);
    await page.close();
}

/** Bounding box of a selector (or several: their union) in page (document) coordinates. */
async function boxOf(page, target) {
    const selectors = Array.isArray(target) ? target : [target];
    const boxes = [];
    for (const selector of selectors) {
        const locator = page.locator(selector).first();
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        const box = await locator.evaluate((el) => {
            const r = el.getBoundingClientRect();
            return { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height };
        });
        boxes.push(box);
    }
    return union(boxes);
}

function helpers(page) {
    const marks = [];
    const h = {
        /** Page boxes covered by marks (rings and badges), so the clip can include them. */
        marks,
        page,
        waitIdle: () => waitIdle(page),
        fill: (selector, value) => page.locator(selector).first().fill(value),
        click: async (selector) => { await page.locator(selector).first().click(); await waitIdle(page); },
        hover: (selector) => page.locator(selector).first().hover(),
        /** Hide elements (e.g. something time-sensitive) without changing the layout. */
        hide: (selector) => page.locator(selector).evaluateAll((els) => els.forEach((el) => { el.style.visibility = 'hidden'; })),
        /** A rose outline around an element, with an optional numbered badge at its top-left. */
        mark: async (selector, label) => {
            const box = await boxOf(page, selector);
            marks.push({ x: box.x - 15, y: box.y - 15, width: box.width + 22, height: box.height + 22 });
            await page.evaluate(({ box, label }) => {
                const offset = 4;
                const layer = document.getElementById('guide-marks') ?? document.body.appendChild(Object.assign(document.createElement('div'), { id: 'guide-marks' }));
                Object.assign(layer.style, { position: 'absolute', left: '0', top: '0', width: '0', height: '0', zIndex: '2147483647', pointerEvents: 'none' });
                const ring = document.createElement('div');
                Object.assign(ring.style, {
                    position: 'absolute', boxSizing: 'border-box',
                    left: `${box.x - offset}px`, top: `${box.y - offset}px`,
                    width: `${box.width + offset * 2}px`, height: `${box.height + offset * 2}px`,
                    border: '3px solid #e11d48', borderRadius: '8px',
                    boxShadow: '0 0 0 2px rgba(255,255,255,.85)',
                });
                layer.appendChild(ring);
                if (label !== undefined && label !== null && label !== '') {
                    const badge = document.createElement('div');
                    badge.textContent = String(label);
                    Object.assign(badge.style, {
                        // Kept on the page when the element touches its edge.
                        position: 'absolute', left: `${Math.max(2, box.x - offset - 11)}px`, top: `${Math.max(2, box.y - offset - 11)}px`,
                        width: '22px', height: '22px', borderRadius: '9999px', background: '#e11d48', color: '#fff',
                        font: '600 12px/22px ui-sans-serif, system-ui, sans-serif', textAlign: 'center',
                        boxShadow: '0 0 0 2px #fff, 0 1px 3px rgba(0,0,0,.3)',
                    });
                    layer.appendChild(badge);
                }
            }, { box, label });
        },
        clearMarks: async () => {
            marks.length = 0;
            await page.evaluate(() => document.getElementById('guide-marks')?.remove());
        },
    };
    return h;
}

/** PNG buffer -> WebP (scaled to MAX_WIDTH), encoded by the browser. */
async function toWebp(encoder, png) {
    const dataUrl = await encoder.evaluate(async ({ b64, maxWidth, quality }) => {
        const blob = await (await fetch(`data:image/png;base64,${b64}`)).blob();
        const bitmap = await createImageBitmap(blob);
        const scale = Math.min(1, maxWidth / bitmap.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(bitmap.width * scale);
        canvas.height = Math.round(bitmap.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/webp', quality);
    }, { b64: png.toString('base64'), maxWidth: MAX_WIDTH, quality: QUALITY });
    return Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64');
}

function union(boxes) {
    const x = Math.min(...boxes.map((b) => b.x));
    const y = Math.min(...boxes.map((b) => b.y));
    return {
        x, y,
        width: Math.max(...boxes.map((b) => b.x + b.width)) - x,
        height: Math.max(...boxes.map((b) => b.y + b.height)) - y,
    };
}

async function clipFor(page, shot, marks) {
    const viewport = page.viewportSize();
    const doc = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight,
        scrollX: window.scrollX, scrollY: window.scrollY,
    }));
    if (!shot.clip || shot.clip === 'viewport') {
        return { clip: { x: 0, y: 0, ...viewport }, fullPage: false };
    }
    const padding = shot.padding ?? PADDING;
    const target = typeof shot.clip === 'object' && !Array.isArray(shot.clip) && 'width' in shot.clip
        ? shot.clip
        : await boxOf(page, shot.clip);
    const box = union([target, ...marks]);
    // Inside the visible area: a plain screenshot, clamped to the viewport.
    // Otherwise the full page (which resizes the viewport: avoid it for
    // menus and popovers, give the shot a taller viewport instead).
    const visible = box.x >= doc.scrollX && box.y >= doc.scrollY
        && box.x + box.width <= doc.scrollX + viewport.width + 1 && box.y + box.height <= doc.scrollY + viewport.height + 1;
    const [minX, minY, maxX, maxY] = visible
        ? [doc.scrollX, doc.scrollY, doc.scrollX + viewport.width, doc.scrollY + viewport.height]
        : [0, 0, Math.max(doc.width, viewport.width), Math.max(doc.height, viewport.height)];
    const x = Math.max(minX, Math.floor(box.x - padding));
    const y = Math.max(minY, Math.floor(box.y - padding));
    const right = Math.min(maxX, Math.ceil(box.x + box.width + padding));
    const bottom = Math.min(maxY, Math.ceil(box.y + box.height + padding));
    // Playwright takes a viewport-relative clip unless it shoots the full page.
    const [dx, dy] = visible ? [doc.scrollX, doc.scrollY] : [0, 0];
    return { clip: { x: x - dx, y: y - dy, width: right - x, height: bottom - y }, fullPage: !visible };
}

async function main() {
    const { chromium } = loadPlaywright();
    const files = await shotFiles(process.argv.slice(2));
    mkdirSync(outDir, { recursive: true });

    const browser = await chromium.launch({ executablePath: chromiumPath });
    const contexts = {};
    const contextFor = async (who) => {
        const key = who ?? 'guest';
        if (!contexts[key]) {
            const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, reducedMotion: 'reduce', colorScheme: 'light', locale: 'en-US', timezoneId: timezone });
            await context.addInitScript((css) => {
                const add = () => document.head.appendChild(Object.assign(document.createElement('style'), { textContent: css }));
                document.head ? add() : document.addEventListener('DOMContentLoaded', add);
            }, STILL_CSS);
            if (appUrl !== baseUrl) {
                await context.route((url) => url.href.startsWith(`${appUrl}/`), (route) => route.continue({ url: baseUrl + route.request().url().slice(appUrl.length) }));
            }
            if (key !== 'guest') {
                await login(context, key);
            }
            contexts[key] = context;
        }
        return contexts[key];
    };
    const encoder = await (await browser.newContext()).newPage();

    let failed = 0;
    for (const file of files) {
        for (const shot of file.shots) {
            const who = shot.as === undefined ? 'admin' : shot.as;
            const page = await (await contextFor(who)).newPage();
            try {
                await page.setViewportSize(shot.viewport ?? VIEWPORT);
                if (shot.colorScheme) {
                    await page.emulateMedia({ colorScheme: shot.colorScheme });
                }
                await page.goto(baseUrl + shot.url);
                await waitIdle(page);
                const h = helpers(page);
                if (shot.before) {
                    await shot.before(page, h);
                    await waitIdle(page);
                }
                for (const [i, m] of (shot.mark ?? []).entries()) {
                    const { selector, label } = typeof m === 'string' ? { selector: m, label: undefined } : m;
                    await h.mark(selector, label ?? (shot.numbered ? String(i + 1) : undefined));
                }
                const { clip, fullPage } = await clipFor(page, shot, h.marks);
                const png = await page.screenshot({ type: 'png', clip, fullPage, animations: 'disabled', caret: 'hide' });
                await h.clearMarks();
                const webp = await toWebp(encoder, png);
                const target = join(outDir, `${shot.name}.webp`);
                writeFileSync(target, webp);
                const kb = (webp.length / 1024).toFixed(1);
                const shown = relative(process.cwd(), target);
                console.log(`${webp.length > 120 * 1024 ? '! ' : '  '}${shown.startsWith('..') ? target : shown}  ${kb} KB`);
            } catch (error) {
                failed++;
                console.error(`x ${file.name}/${shot.name}: ${error.message.split('\n')[0]}`);
            } finally {
                await page.close();
            }
        }
    }

    await browser.close();
    process.exit(failed ? 1 : 0);
}

main();
