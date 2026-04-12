import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && full.endsWith('.svelte')) {
      checkFile(full);
    }
  }
}

function checkFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');

  lines.forEach((line, i) => {
    if (/\bon:[a-zA-Z]/.test(line)) {
      findings.push({
        file,
        line: i + 1,
        rule: 'legacy-event-directive',
        text: line.trim()
      });
    }
    if (/^\s*\$:\s/.test(line)) {
      findings.push({
        file,
        line: i + 1,
        rule: 'legacy-reactive-statement',
        text: line.trim()
      });
    }
  });
}

if (!fs.existsSync(root)) {
  console.error('src directory not found');
  process.exit(1);
}

walk(root);

if (findings.length) {
  console.error('\nSvelte 5 runes guard failed:\n');
  for (const item of findings) {
    console.error(`${item.file}:${item.line} [${item.rule}] ${item.text}`);
  }
  console.error('\nUse onclick/onsubmit/etc and $state/$derived/$effect instead.\n');
  process.exit(1);
}

console.log('Svelte 5 runes guard passed.');
