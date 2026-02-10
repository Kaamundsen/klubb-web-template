#!/usr/bin/env node
/**
 * Lagrer eksporterte klubb-innstillinger (fra admin → Eksporter) til settings-backup/.
 * Bruk: node scripts/save-settings-backup.js
 *       (lim inn JSON, avslutt med Ctrl+D / Ctrl+Z+Enter)
 * Eller: node scripts/save-settings-backup.js < fil.json
 * Eller: node scripts/save-settings-backup.js fil.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BACKUP_DIR = join(ROOT, 'settings-backup');

function getStdin() {
  return new Promise((resolve) => {
    const chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => chunks.push(chunk));
    process.stdin.on('end', () => resolve(chunks.join('')));
  });
}

function main() {
  let inputPromise;
  if (process.argv[2]) {
    const filePath = join(process.cwd(), process.argv[2]);
    inputPromise = Promise.resolve(readFileSync(filePath, 'utf8'));
  } else {
    inputPromise = getStdin();
  }

  inputPromise.then((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      console.error('Ingen JSON mottatt. Lim inn eksportert JSON og avslutt med Ctrl+D (Mac/Linux) eller Ctrl+Z+Enter (Windows).');
      process.exit(1);
    }
    let data;
    try {
      data = JSON.parse(trimmed);
    } catch (e) {
      console.error('Ugyldig JSON:', e.message);
      process.exit(1);
    }
    const clubId = data.clubId || 'unknown';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `${clubId}-${timestamp}.json`;
    if (!existsSync(BACKUP_DIR)) {
      mkdirSync(BACKUP_DIR, { recursive: true });
    }
    const outPath = join(BACKUP_DIR, filename);
    writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Lagret:', outPath);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

main();
