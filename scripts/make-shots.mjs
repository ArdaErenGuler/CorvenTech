/**
 * Girişim sitelerinin ekran görüntülerini alır → sosyal/ekran/<id>.png (1440x900).
 * Çalıştırmak için: npm run ekran
 *
 * Kurulu Chrome ya da Edge'i başlıksız (headless) çalıştırır; ek bir paket indirmez.
 * Giriş isteyen paneller doğal olarak giriş ekranını gösterir.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ventures, company } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'sosyal', 'ekran');
fs.mkdirSync(outDir, { recursive: true });

const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const browser = CANDIDATES.find((p) => fs.existsSync(p));
if (!browser) {
  console.error('Chrome ya da Edge bulunamadı.');
  process.exit(1);
}

const TARGETS = [
  { id: 'corventech', url: company.url },
  ...ventures.map((v) => ({ id: v.id, url: v.url })),
];

for (const t of TARGETS) {
  const file = path.join(outDir, `${t.id}.png`);
  const res = spawnSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-prefers-reduced-motion', // giriş animasyonları yarıda kalmasın
      '--window-size=1440,900',
      '--virtual-time-budget=20000',
      `--screenshot=${file.replace(/\\/g, '/')}`,
      t.url,
    ],
    { encoding: 'utf8', timeout: 90000 },
  );
  const ok = fs.existsSync(file);
  const kb = ok ? Math.round(fs.statSync(file).size / 1024) : 0;
  console.log(`${ok ? '✓' : '✗'} ${t.id.padEnd(12)} ${t.url.padEnd(34)} ${ok ? `${kb} KB` : (res.stderr || '').trim().split('\n').pop()}`);
}
