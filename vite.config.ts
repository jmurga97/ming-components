import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { PACKAGE_ENTRIES, entryName } from './config/components.ts';
import type { PackageEntry } from './config/components.ts';

const entryPointFor = (entry: PackageEntry): [string, string] => [
  entryName(entry.slug),
  resolve(import.meta.dirname, 'src/entries', `${entryName(entry.slug)}.ts`),
];

const ENTRY_POINTS = Object.fromEntries([
  ['index', resolve(import.meta.dirname, 'src/index.ts')],
  ...PACKAGE_ENTRIES.map(entryPointFor),
] as Array<[string, string]>);

const stylesPath = resolve(import.meta.dirname, 'src/styles.css');

export default defineConfig({
  plugins: [
    react({ compiler: { target: '19' } }),
    {
      generateBundle() {
        this.emitFile({
          fileName: 'styles.css',
          source: readFileSync(stylesPath),
          type: 'asset',
        });
      },
      name: 'ming-components-styles',
    },
  ],
  build: {
    lib: {
      cssFileName: 'styles',
      entry: ENTRY_POINTS,
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        /^@base-ui\/react(?:\/.*)?$/,
        /^react(?:\/.*)?$/,
        /^react-dom(?:\/.*)?$/,
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
