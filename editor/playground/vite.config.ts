import path, { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import wasm from 'vite-plugin-wasm';

import { hmrPlugin } from './scripts/hmr-plugin';


import qiankun from 'vite-plugin-qiankun';
import reactRefresh from '@vitejs/plugin-react-refresh'


const useDevMode = true;
const enableIstanbul = !!process.env.CI || !!process.env.COVERAGE;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        hmrPlugin,
        ...(useDevMode ? [] : [reactRefresh()]),
        qiankun('reactApp', {
            useDevMode: true
        }),
        enableIstanbul &&
        istanbul({
            cwd: fileURLToPath(new URL('../..', import.meta.url)),
            include: ['packages/**/src/*'],
            exclude: [
                'node_modules',
                'tests',
                fileURLToPath(new URL('.', import.meta.url)),
            ],
            forceBuildInstrument: true,
        }),
        wasm(),
    ],
    build: {
        target: 'ES2022',
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'starter/': resolve(__dirname, 'starter/index.html'),
                'examples/basic': resolve(__dirname, 'examples/basic/index.html'),
                'examples/canvas': resolve(__dirname, 'examples/canvas/index.html'),
                'examples/virgo': resolve(__dirname, 'examples/virgo/index.html'),
                'examples/store': resolve(__dirname, 'examples/store/index.html'),
            },
        },
    },
    resolve: {
        alias: {
            '@notes/blocks': path.resolve(
                fileURLToPath(new URL('../blocks/src', import.meta.url))
            ),
            '@notes/blocks/*': path.resolve(
                fileURLToPath(new URL('../blocks/src/*', import.meta.url))
            ),
            '@notes/global/*': path.resolve(
                fileURLToPath(new URL('../global/src/*', import.meta.url))
            ),
            '@notes/store': path.resolve(
                fileURLToPath(new URL('../store/src', import.meta.url))
            ),
            '@notes/virgo': path.resolve(
                fileURLToPath(new URL('../virgo/src', import.meta.url))
            ),
            '@notes/virgo/*': path.resolve(
                fileURLToPath(new URL('../virgo/src/*', import.meta.url))
            ),
        },
    },
});
