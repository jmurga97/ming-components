import { existsSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const distDirectory = resolve(import.meta.dirname, '..', 'dist');
const distEntries = join(distDirectory, 'entries');

if (!existsSync(distEntries)) {
  console.log('No nested declarations to flatten.');
  process.exit(0);
}

for (const fileName of readdirSync(distEntries)) {
  const target = join(distDirectory, fileName);
  if (existsSync(target)) throw new Error(`Declaration collision while flattening: ${fileName}`);

  const source = join(distEntries, fileName);
  if (fileName.endsWith('.d.ts')) {
    const contents = readFileSync(source, 'utf8');
    writeFileSync(source, rewriteSpecifierDepth(contents));
  } else if (fileName.endsWith('.d.ts.map')) {
    const map = JSON.parse(readFileSync(source, 'utf8')) as { sources: string[] };
    map.sources = map.sources.map((path) => (path.startsWith('../') ? `../${path}` : path));
    writeFileSync(source, `${JSON.stringify(map)}\n`);
  }
  renameSync(source, target);
}

rmSync(distEntries, { recursive: true });

function rewriteSpecifierDepth(contents: string): string {
  return contents.replaceAll('"../', '"./').replaceAll("'../", "'./");
}
