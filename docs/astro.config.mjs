import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    react(),
    mdx(),
    tailwind({
      configFile: "./tailwind.config.cjs",
    }),
  ],
});
