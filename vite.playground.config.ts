import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(import.meta.dirname, 'playground'),
  plugins: [react({ compiler: { target: '19' } }), tailwindcss()],
  resolve: {
    alias: {
      '@ming/components': resolve(import.meta.dirname, 'src/index.ts'),
    },
  },
});
