#!/usr/bin/env node

/**
 * presets/uae-pm-ops/install.mjs — install the UAE entry-level Project &
 * Operations preset into the user layer.
 *
 * Writes (only when absent, unless --force):
 *   config/profile.yml   via onboard-write.mjs, from onboarding-answers.json + your contact details
 *   portals.yml          UAE title / location / Emirati-only filters + UAE board queries
 *   modes/_profile.md    entry-level PM / PMO / Ops archetypes, AED comp, location policy
 *   modes/_custom.md     house rules, ofertas weights, interview-prep focus
 *   modes/_brief.md      compact triage brief
 * and declares presets/ in config/local-paths.txt so `node update-system.mjs`
 * treats it as fork-local (DATA_CONTRACT.md → Fork-local paths).
 *
 * Usage:
 *   node presets/uae-pm-ops/install.mjs --name "Full Name" --email you@example.com [--phone ...] [--linkedin ...]
 *     [--location "Dubai, UAE"] [--city Dubai] [--force] [--dry-run]
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCareerOpsRoot, getProfilePath } from '../../path-resolver.mjs';

const PRESET_DIR = dirname(fileURLToPath(import.meta.url));
const CHECKOUT = join(PRESET_DIR, '..', '..');

const USAGE = `
  presets/uae-pm-ops/install.mjs: install the UAE entry-level Project & Operations preset

  node presets/uae-pm-ops/install.mjs --name "Full Name" --email you@example.com
      [--phone "+971 ..."] [--linkedin linkedin.com/in/...] [--location "Dubai, UAE"] [--city Dubai]
      [--force] [--dry-run]

  Existing files are kept unless --force. --dry-run prints the plan and writes nothing.
`;

function parseArgs(argv) {
  const opts = { force: false, dryRun: false, location: 'Dubai, UAE', city: 'Dubai' };
  const value = (i, flag) => {
    const v = argv[i];
    if (v === undefined || v.startsWith('--')) throw new Error(`${flag} needs a value`);
    return v;
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--name') opts.name = value(++i, a);
    else if (a === '--email') opts.email = value(++i, a);
    else if (a === '--phone') opts.phone = value(++i, a);
    else if (a === '--linkedin') opts.linkedin = value(++i, a);
    else if (a === '--location') opts.location = value(++i, a);
    else if (a === '--city') opts.city = value(++i, a);
    else if (a === '--force') opts.force = true;
    else if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--help' || a === '-h') opts.help = true;
    else throw new Error(`unknown argument: ${a}`);
  }
  return opts;
}

// Same directory shape the agent and doctor.mjs expect (DATA_CONTRACT.md user layer).
const COPIES = [
  { from: 'portals.preset.yml', to: 'portals.yml' },
  { from: '_profile.md', to: 'modes/_profile.md' },
  { from: '_custom.md', to: 'modes/_custom.md' },
  { from: '_brief.md', to: 'modes/_brief.md' },
];

function writeProfile(root, opts, plan) {
  const target = getProfilePath(root);
  if (existsSync(target) && !opts.force) {
    plan.kept.push('config/profile.yml');
    return;
  }
  if (!opts.name || !opts.email) {
    plan.skipped.push('config/profile.yml (needs --name and --email; the agent can also write it during onboarding)');
    return;
  }
  const answers = JSON.parse(readFileSync(join(PRESET_DIR, 'onboarding-answers.json'), 'utf-8'));
  answers.candidate = {
    full_name: opts.name,
    email: opts.email,
    location: opts.location,
    ...(opts.phone ? { phone: opts.phone } : {}),
    ...(opts.linkedin ? { linkedin: opts.linkedin } : {}),
  };
  answers.location.city = opts.city;
  // onboard-write validates the portals answers even with --only profile; the
  // preset's own portals.yml is copied below, so these values are never written.
  answers.portals = { positive: answers.target_roles, countries: ['United Arab Emirates'] };
  if (opts.dryRun) {
    plan.written.push('config/profile.yml');
    return;
  }
  const args = [join(CHECKOUT, 'onboard-write.mjs'), '--answers', '-', '--only', 'profile', '--target', root];
  if (opts.force) args.push('--force');
  const run = spawnSync(process.execPath, args, { input: JSON.stringify(answers), encoding: 'utf-8' });
  if (run.status !== 0) throw new Error(`onboard-write.mjs failed:\n${run.stderr || run.stdout}`);
  // A4 is the UAE paper size; onboard-write leaves page_format commented out.
  const text = readFileSync(target, 'utf-8');
  if (/^# page_format: letter$/m.test(text)) {
    writeFileSync(target, text.replace(/^# page_format: letter$/m, 'page_format: a4'));
  }
  plan.written.push('config/profile.yml');
}

function declareForkLocal(root, plan) {
  const file = join(root, 'config', 'local-paths.txt');
  const entry = 'presets/';
  const current = existsSync(file) ? readFileSync(file, 'utf-8') : '';
  if (current.split(/\r?\n/).some((l) => l.trim() === entry)) return;
  plan.written.push('config/local-paths.txt (+ presets/)');
  if (plan.dryRun) return;
  mkdirSync(dirname(file), { recursive: true });
  const prefix = current && !current.endsWith('\n') ? '\n' : '';
  writeFileSync(file, `${current}${prefix}# UAE PM/Ops preset (fork-local, see DATA_CONTRACT.md)\n${entry}\n`);
}

function main() {
  let opts;
  try {
    opts = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`install: ${err.message}\n${USAGE}`);
    process.exit(1);
  }
  if (opts.help) {
    console.log(USAGE);
    return;
  }

  const root = getCareerOpsRoot();
  const plan = { root, dryRun: opts.dryRun, written: [], kept: [], skipped: [] };

  writeProfile(root, opts, plan);
  for (const { from, to } of COPIES) {
    const dest = join(root, ...to.split('/'));
    if (existsSync(dest) && !opts.force) {
      plan.kept.push(to);
      continue;
    }
    plan.written.push(to);
    if (opts.dryRun) continue;
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(join(PRESET_DIR, from), dest);
  }
  // Only a checkout root can hold presets/; a separate data root gets no entry.
  if (relative(root, CHECKOUT) === '') declareForkLocal(root, plan);

  console.log(JSON.stringify(plan, null, 2));
  if (plan.kept.length && !opts.force) {
    console.log('\nKept existing files. Re-run with --force to replace them with the preset versions.');
  }
  console.log('\nNext: add your CV as cv.md (or paste it to the agent), then run `node doctor.mjs`.');
}

main();
