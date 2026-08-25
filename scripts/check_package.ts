import { chromium } from '@playwright/test';
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { Browser } from '@playwright/test';

interface PackageManifest {
  exports: Record<string, string | { import: string; types: string }>;
}

interface FixtureManifest {
  dependencies: Record<string, string>;
}

const packageRoot = resolve(import.meta.dirname, '..');
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'ming-components-package-'));

function run(command: string[], cwd: string): void {
  const result = Bun.spawnSync({ cmd: command, cwd, stderr: 'inherit', stdout: 'inherit' });
  if (result.exitCode !== 0) throw new Error(`${command.join(' ')} failed.`);
}

async function waitForServer(url: string): Promise<void> {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The preview server is still starting.
    }
    await Bun.sleep(100);
  }
  throw new Error('Timed out waiting for the fixture preview server.');
}

async function launchBrowser(): Promise<Browser> {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("Executable doesn't exist")) {
      throw error;
    }
    return chromium.launch({ channel: 'chrome', headless: true });
  }
}

try {
  const pack = Bun.spawnSync({
    cmd: ['bun', 'pm', 'pack', '--destination', temporaryDirectory],
    cwd: packageRoot,
    stderr: 'inherit',
    stdout: 'pipe',
  });
  if (pack.exitCode !== 0) throw new Error('bun pm pack failed.');

  const archiveOutput = new TextDecoder()
    .decode(pack.stdout)
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.endsWith('.tgz'));
  if (!archiveOutput) throw new Error('bun pm pack did not return an archive path.');
  const archivePath = resolve(packageRoot, archiveOutput);

  run(['tar', '-xzf', archivePath, '-C', temporaryDirectory], packageRoot);

  const packedRoot = join(temporaryDirectory, 'package');
  symlinkSync(join(packageRoot, 'node_modules'), join(packedRoot, 'node_modules'), 'dir');
  const manifest = JSON.parse(
    readFileSync(join(packedRoot, 'package.json'), 'utf8'),
  ) as PackageManifest;

  for (const [subpath, target] of Object.entries(manifest.exports)) {
    if (subpath === './styles.css' || subpath === './package.json') continue;
    const importTarget = typeof target === 'string' ? target : target.import;
    await import(pathToFileURL(resolve(packedRoot, importTarget)).href);
  }

  const fixtureRoot = join(temporaryDirectory, 'vite-consumer');
  cpSync(join(packageRoot, 'fixtures/vite-consumer'), fixtureRoot, { recursive: true });
  const fixtureManifestPath = join(fixtureRoot, 'package.json');
  const fixtureManifest = JSON.parse(readFileSync(fixtureManifestPath, 'utf8')) as FixtureManifest;
  fixtureManifest.dependencies['@ming/components'] = `file:${archivePath}`;
  writeFileSync(fixtureManifestPath, `${JSON.stringify(fixtureManifest, null, 2)}\n`);

  run(['bun', 'install'], fixtureRoot);
  run(['bun', 'run', 'build'], fixtureRoot);

  const assetDirectory = join(fixtureRoot, 'dist/assets');
  const javascript = readdirSync(assetDirectory)
    .filter((filename) => filename.endsWith('.js'))
    .map((filename) => readFileSync(join(assetDirectory, filename), 'utf8'))
    .join('\n');
  if (javascript.includes('No resources available.')) {
    throw new Error('Root exports did not tree-shake the unused ResourceTable implementation.');
  }
  const stylesheet = readdirSync(assetDirectory).find((filename) => filename.endsWith('.css'));
  if (!stylesheet) throw new Error('The fixture build did not emit package CSS.');
  const css = readFileSync(join(assetDirectory, stylesheet), 'utf8');
  if (!css.includes('.ming-button') || !css.includes('.dark')) {
    throw new Error('The fixture build is missing component or dark-mode CSS.');
  }

  const port = 42_000 + Math.floor(Math.random() * 1_000);
  const url = `http://127.0.0.1:${String(port)}`;
  const preview = Bun.spawn({
    cmd: ['bun', 'x', 'vite', 'preview', '--host', '127.0.0.1', '--port', String(port)],
    cwd: fixtureRoot,
    stderr: 'ignore',
    stdout: 'ignore',
  });
  try {
    await waitForServer(url);
    const browser = await launchBrowser();
    try {
      const page = await browser.newPage();
      await page.goto(url);
      await page.getByRole('listbox').waitFor();
      if ((await page.locator('#root .ming-select__popup').count()) !== 0) {
        throw new Error('The fixture Select did not render through a portal.');
      }
      await page.keyboard.press('Escape');
      await page.getByRole('listbox').waitFor({ state: 'hidden' });
      const initialBackground = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--background'),
      );
      await page.getByRole('button', { name: 'Use dark mode' }).click();
      const darkBackground = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--background'),
      );
      if (!(await page.locator('html.dark').count()) || initialBackground === darkBackground) {
        throw new Error('The fixture did not apply the packaged dark theme.');
      }
    } finally {
      await browser.close();
    }
  } finally {
    preview.kill();
    await preview.exited;
  }

  console.log('Verified packed exports and the installed Vite consumer fixture.');
} finally {
  rmSync(temporaryDirectory, { force: true, recursive: true });
}
