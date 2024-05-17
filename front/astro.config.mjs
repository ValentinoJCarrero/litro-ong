import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import auth from "auth-astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  ssr: false,
  integrations: [tailwind(), react({
    experimentalReactChildren: true
  }), auth()],
  adapter: vercel()
});