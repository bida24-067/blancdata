// audit/generate_report.js
/**
 * generate_report.js
 * -------------------------------------------------
 * Reads audit artefacts (npm audit, ESLint, privacy scan)
 * and creates a markdown report:
 *   audit/REPORT_V1_<YYYY-MM-DD>.md
 */
const fs = require('fs');
const path = require('path');

// Helper to safely read JSON files
function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (_) {
    return null;
  }
}

// Date for the report filename
const today = new Date().toISOString().slice(0, 10);
const reportPath = path.join(__dirname, `REPORT_V1_${today}.md`);

// Load artefacts
const npmAudit = readJson(path.join(__dirname, 'npm-audit.json')) || {};
const eslintReport = readJson(path.join(__dirname, 'eslint-report.json')) || [];
const privacyReport = readJson(path.join(__dirname, 'privacy-report.json')) || { issues: [] };

let md = `# Security & Privacy Audit – Version 1\n`;
md += `**Date:** ${today}\n\n---\n\n`;

// Tech‑Stack Summary (read from package.json)
try {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf8'));
  md += `## Tech‑Stack Summary\n`;
  md += `- **Framework:** ${pkg.dependencies?.next || 'unknown'} (Next.js)\n`;
  md += `- **UI Library:** ${pkg.dependencies?.react || 'unknown'} (React)\n`;
  md += `- **Styling:** TailwindCSS (dev dependency)\n`;
  md += `- **Auth:** Clerk (${pkg.dependencies?.['@clerk/nextjs'] || 'unknown'})\n`;
  md += `- **Email:** Resend (${pkg.dependencies?.resend || 'unknown'})\n`;
  md += `- **Serverless:** Cloudflare Workers (wrangler)\n`;
  md += `- **Database:** Cloudflare D1 (see wrangler.toml)\n`;
  md += `- **Language:** TypeScript (${pkg.devDependencies?.typescript?.replace('^', '') || 'unknown'})\n\n`;
} catch (_) {
  md += `## Tech‑Stack Summary\n*Unable to read package.json*\n\n`;
}

// npm‑audit findings
md += `## npm‑audit Vulnerabilities\n`;
if (npmAudit && npmAudit.vulnerabilities) {
  const severities = { critical: [], high: [], moderate: [], low: [] };
  Object.values(npmAudit.vulnerabilities).forEach(v => {
    const sev = v.severity || 'low';
    if (severities[sev]) severities[sev].push(v);
  });
  Object.entries(severities).forEach(([sev, list]) => {
    md += `### ${sev.charAt(0).toUpperCase() + sev.slice(1)} (${list.length})\n`;
    list.forEach(v => {
      md += `- **${v.name}** – ${v.title || v.name}\n`;
      md += `  - Severity: ${v.severity}\n`;
      md += `  - Fix: ${v.fixAvailable?.name || 'update'} ${v.fixAvailable?.version || ''}\n`;
    });
    md += '\n';
  });
} else {
  md += `No vulnerabilities reported or audit could not be performed.\n\n`;
}

// ESLint findings
md += `## ESLint Findings\n`;
if (Array.isArray(eslintReport) && eslintReport.length) {
  eslintReport.forEach(file => {
    md += `### ${file.filePath}\n`;
    file.messages.forEach(msg => {
      const level = msg.severity === 2 ? 'ERROR' : 'WARN';
      md += `- ${level}: ${msg.message} (rule: ${msg.ruleId})\n`;
    });
    md += '\n';
  });
} else {
  md += `No linting issues reported.\n\n`;
}

// Privacy scan
md += `## Privacy / Personal‑Data Scan\n`;
if (privacyReport.issues && privacyReport.issues.length) {
  privacyReport.issues.forEach(issue => {
    md += `- **${issue.type}** in \`${issue.file}\` (line ${issue.line})\n`;
  });
  md += '\n';
} else {
  md += `No personal‑data patterns detected.\n\n`;
}

// Compliance checklist
md += `## Compliance Checks\n`;
md += `- **GDPR** – Verify consent UI, data‑deletion endpoints, data‑processing notices.\n`;
md += `- **ISO 27001** – Ensure access‑control logs, regular vulnerability scans, documented risk treatment.\n`;
md += `- **SOC 2** – Review security and privacy trust‑service criteria.\n\n`;

fs.writeFileSync(reportPath, md, 'utf8');
console.log(`Report generated at ${reportPath}`);
