import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteAliases } from 'vite-aliases'
const path = require('path')
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    root: '.',
    publicDir: 'public/',
    build: {
        // Relative to the root
        outDir: 'dist',
    },
    resolve:{
        alias:{
            '@watcourses' : path.resolve(__dirname, './src/App')
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://watcourses.com',
                changeOrigin: true,
                headers: {"Origin": "https://watcourses.com" }
            },
        }
    },
    plugins: [
        react({
            include: '**/*.{jsx,tsx}',
            babel: {
                parserOpts: {
                    plugins: ['decorators-legacy', 'classProperties']
                }
            },
        }),
    ]
});