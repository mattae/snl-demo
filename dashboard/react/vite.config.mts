import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import progress from 'vite-plugin-progress'
import tailwindcss from 'tailwindcss';
import { federation } from '@module-federation/vite';
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy';

const outDir = resolve(__dirname, 'target/classes/static/js/react-charts');

const publicPath = '/public';

export default defineConfig(({ mode }) => ({
    plugins: [
        progress(),
        react(),
        mode === 'production' && federation({
            name: '_324b72b3_c39e_4957_8097_2d499fb822e0',
            filename: 'remoteEntry.js',
            exposes: {
                charts: './src/main/webapp/Elements.jsx'
            },
            shared: ['react', 'react-dom', 'react-i18next','i18next']
        }),
        mode === 'development' && viteStaticCopy({
            targets: [
                {
                    src: './src/main/resources/installers/react-charts',
                    dest: publicPath
                },
                {
                    src: './src/main/webapp/public',
                    dest: publicPath
                }
            ]
        })
    ],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    build: {
        target: 'esnext',
        outDir: outDir,
        cssCodeSplit: mode === 'production'
    },
    server: {
        port: 46048,
        open: true,
        host: '0.0.0.0',
    },
    base: mode === 'production' ? '/js/react-charts' : '/',
}));
