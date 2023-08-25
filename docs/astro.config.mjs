import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ["./src/components"],
    }),
    mdx(),
    tailwind({
      configFile: "./tailwind.config.cjs",
    }),
  ],
  server: { port: 3333 },
  base: "/",
});
