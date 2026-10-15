import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Injecte canonical / og:url / og:image uniquement si VITE_SITE_URL est défini.
 * Les balises Open Graph exigent des URL absolues : rien n'est inventé tant que le domaine est inconnu.
 */
function siteUrlMeta(siteUrl: string | undefined): Plugin {
  return {
    name: 'riff-site-url-meta',
    transformIndexHtml() {
      if (!siteUrl) return [];
      const base = siteUrl.replace(/\/$/, '');
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: `${base}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${base}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: `${base}/og-image.png` }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${base}/og-image.png` }, injectTo: 'head' },
      ];
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    plugins: [react(), siteUrlMeta(env.VITE_SITE_URL)],
    build: { target: 'es2022', sourcemap: false },
  };
});
