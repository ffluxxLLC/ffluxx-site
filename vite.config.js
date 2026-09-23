/* Used by `npm run dev:<site>`, which passes the site as Vite's --mode. */
import { siteConfig } from './scripts/site-config.mjs';

export default async ({ mode }) => {
  const { configFile, ...config } = await siteConfig(mode);
  return config;
};
