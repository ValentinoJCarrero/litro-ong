import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";
import vercel from '@astrojs/vercel/serverless';
// https://astro.build/config
export default defineConfig({
  
  redirects: {
    '/dasboardAdmin': '/'
    },
  integrations: [tailwind(), react({
    experimentalReactChildren: true,
  })],
  output: 'server',
  adapter: vercel(),
});