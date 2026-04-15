import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: '127.0.0.1',
    allowedHosts: [
      'getfuturefunded.com',
      'www.getfuturefunded.com',
      'preview.getfuturefunded.com'
    ]
  },
  preview: {
    host: '127.0.0.1',
    allowedHosts: [
      'getfuturefunded.com',
      'www.getfuturefunded.com',
      'preview.getfuturefunded.com'
    ]
  }
});
