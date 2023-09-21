import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./plugin/remark-reading-time.mjs";
// https://astro.build/config
export default defineConfig({
  server: {
    port: 3333,
  },
  base: "/mono_notes",
  build: {
    assets: "static",
    inlineStylesheets: "always",
  },

  site: "https://ajn404.github.io/mono_notes/", // replace this with your deployed domain
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react({}),
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
    rehypePlugins: [rehypeKatex],
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
    build:{
      rollupOptions:{
        output:{
          chunkFileNames:({name})=>{
            if(name.indexOf('_')!==-1){
              return "static/rename.[hash].js"
            }
            return "static/[name].[hash].js"
          }
        }
      }
    }
  },
});
