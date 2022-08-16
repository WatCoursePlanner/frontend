import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteAliases } from 'vite-aliases'
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    root: '.',
    publicDir: 'public/',
    build: {
        // Relative to the root
        outDir: '../dist',
    },
    plugins: [
        ViteAliases(),
        react({
            include: '**/*.{jsx,tsx}',
            babel: {
                plugins: ['@babel/plugin-proposal-decorators', {"decoratorsBeforeExport": true}],
            },
        }),
    ]
});