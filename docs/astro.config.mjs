import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import lit from '@astrojs/lit';
import vue from '@astrojs/vue';

import sitemap from "@astrojs/sitemap";
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only'

import { remarkReadingTime } from "./plugin/remark-reading-time.mjs";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkCollapse from "remark-collapse";

import path from 'path';
import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenameNew)
// https://astro.build/config
export default defineConfig({
    experimental:{
        assets:true,
        viewTransitions: true,
    },
    server: {
        port: 3333,
        open: true,
    },
    base: "/mono_notes",
    build: {
        assets: "static",
        inlineStylesheets: "always",
    },

    site: "https://ajn404.github.io/mono_notes/", // replace this with your deployed domain

    // plugins: [vue()],
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false,
            },
        }),
        react({
            include: ["**/react/*"]
        }),
        lit({
            include: ["**/lit/*"]
        }),
        vue({}),
        sitemap(),
        mdx(),
    ],
    markdown: {
        remarkPlugins: [
            [
                remarkToc,
                {
                    heading: "目录",
                },
            ],
            [
                remarkCollapse,
                {
                    test: "脚本",
                    summary: str => "展开 " + str,
                },
            ],
            remarkMath,
            remarkReadingTime,
        ],
        rehypePlugins: [rehypeKatex, rehypeAutolinkHeadings],
        shikiConfig: {
            theme: "one-dark-pro",
            wrap: true,
        },
        extendDefaultPlugins: true,
    },
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
        ssr: {
            noExternal: [
                "@notes/editor", "@shoelace-style/shoelace"
            ]
        },
        build: {
            rollupOptions: {
                plugins: [
                    // resolve(),
                    // commonjs(),
                    copy({
                        copyOnce: true,
                        targets: [
                            {
                                src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
                                dest: path.resolve(__dirname, 'dist/shoelace')
                            }
                        ]
                    }),
                    css({
                        output: 'bundle.css'
                    }),
                ]
            }
        }
    },
});
