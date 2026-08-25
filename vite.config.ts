import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const ENTRY_POINTS = {
  index: resolve(import.meta.dirname, 'src/index.ts'),
  badge: resolve(import.meta.dirname, 'src/badge.ts'),
  button: resolve(import.meta.dirname, 'src/button.ts'),
  checkbox: resolve(import.meta.dirname, 'src/checkbox.ts'),
  cn: resolve(import.meta.dirname, 'src/cn.ts'),
  confirm_action: resolve(import.meta.dirname, 'src/confirm_action.ts'),
  dropdown_menu: resolve(import.meta.dirname, 'src/dropdown_menu.ts'),
  field: resolve(import.meta.dirname, 'src/field.ts'),
  form_field: resolve(import.meta.dirname, 'src/form_field.ts'),
  inline_message: resolve(import.meta.dirname, 'src/inline_message.ts'),
  input: resolve(import.meta.dirname, 'src/input.ts'),
  label: resolve(import.meta.dirname, 'src/label.ts'),
  nav_list: resolve(import.meta.dirname, 'src/nav_list.ts'),
  search_field: resolve(import.meta.dirname, 'src/search_field.ts'),
  select: resolve(import.meta.dirname, 'src/select.ts'),
  sidebar_nav: resolve(import.meta.dirname, 'src/sidebar_nav.ts'),
  status_region: resolve(import.meta.dirname, 'src/status_region.ts'),
  status_text: resolve(import.meta.dirname, 'src/status_text.ts'),
  switch: resolve(import.meta.dirname, 'src/switch.ts'),
  textarea: resolve(import.meta.dirname, 'src/textarea.ts'),
  app_shell: resolve(import.meta.dirname, 'src/app_shell.ts'),
  resource_table: resolve(import.meta.dirname, 'src/resource_table.ts'),
  bulk_actions: resolve(import.meta.dirname, 'src/bulk_actions.ts'),
  media_browser: resolve(import.meta.dirname, 'src/media_browser.ts'),
  overview_panel: resolve(import.meta.dirname, 'src/overview_panel.ts'),
  relationship_panel: resolve(import.meta.dirname, 'src/relationship_panel.ts'),
  resource_editor: resolve(import.meta.dirname, 'src/resource_editor.ts'),
  tag_list: resolve(import.meta.dirname, 'src/tag_list.ts'),
  tag_picker: resolve(import.meta.dirname, 'src/tag_picker.ts'),
};
const stylesPath = resolve(import.meta.dirname, 'src/styles.css');

export default defineConfig({
  plugins: [
    react(),
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
        'class-variance-authority',
        'clsx',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'tailwind-merge',
      ],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
