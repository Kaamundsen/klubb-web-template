import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: mode === 'production' ? '/klubb-web-template/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
        // Proxy for å omgå CORS ved scraping av klubbsider
        proxy: {
          '/api/scrape': {
            target: 'https://placeholder.com', // Dynamisk mål settes i scraper
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/scrape/, ''),
            configure: (proxy, options) => {
              proxy.on('proxyReq', (proxyReq, req, res) => {
                // Hent faktisk mål-URL fra query parameter
                const url = new URL(req.url || '', 'http://localhost');
                const targetDomain = url.searchParams.get('domain');
                if (targetDomain) {
                  proxyReq.setHeader('host', targetDomain);
                }
              });
            },
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
