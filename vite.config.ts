import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { sunrice } from '@imajiner/admin-sdk/vite';
import { resolve } from 'node:path';

// dist/admin.js and dist/admin.css, published to public/vendor/sunrice-cms.
export default defineConfig({
    plugins: [react(), tailwindcss(), sunrice({ entry: 'resources/js/admin.tsx' })],
    resolve: {
        alias: { '@': resolve(__dirname, 'resources/js') },
    },
});
