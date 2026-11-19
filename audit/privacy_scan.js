// audit/privacy_scan.js
/**
 * privacy_scan.js
 * -------------------------------------------------
 * Simple static‑code scan for possible handling of personal data.
 * Looks for e‑mail addresses, phone numbers, SSNs, and cookie usage.
 * Outputs JSON with an "issues" array.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..'); // project root
const EXTENSIONS = ['.js', '.ts', '.tsx', '.jsx', '.json'];
const PATTERNS = [
  { type: 'email', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/ },
  { type: 'phone', regex: /\b\+?\d{1,3}[\s-]?\(?\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}\b/ },
  { type: 'ssn', regex: /\b\d{3}-\d{2}-\d{4}\b/ },
  { type: 'cookie', regex: /document\.cookie|cookies\.get|cookies\.set/ },
];

function walk(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.github'].includes(entry.name)) continue;
      walk(full, results);
    } else if (EXTENSIONS.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const issues = [];
  PATTERNS.forEach(pat => {
    lines.forEach((ln, idx) => {
      if (pat.regex.test(ln)) {
        issues.push({ type: pat.type, file: path.relative(ROOT, file), line: idx + 1 });
      }
    });
  });
  return issues;
}

const files = walk(ROOT);
let allIssues = [];
files.forEach(f => {
  allIssues = allIssues.concat(scanFile(f));
});

const out = { issues: allIssues };
process.stdout.write(JSON.stringify(out, null, 2));
