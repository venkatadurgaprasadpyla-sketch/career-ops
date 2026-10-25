# UAE preset: entry-level Project & Operations roles (Dubai / Abu Dhabi)

This preset changes career-ops from its default setup, which targets senior AI and engineering roles, to an **entry-level project management, PMO and operations** search in **Dubai and Abu Dhabi**. The candidate is assumed to be a **UAE resident with their own visa** who is **not an Emirati national**.

It changes only your personal files (the user layer described in `DATA_CONTRACT.md`). No system file changes, so `node update-system.mjs` keeps working.

## Install

From the career-ops folder:

```bash
node presets/uae-pm-ops/install.mjs --name "Your Full Name" --email you@example.com --phone "+971 5X XXX XXXX"
```

Then add your CV. You can save it as `cv.md`, or open your AI CLI in this folder and paste it in. Then run:

```bash
node doctor.mjs
```

The first time you ask for an evaluation, the agent fills the `[FILL FROM CV]` parts of `modes/_profile.md` and `modes/_brief.md` from your CV and shows you what it wrote.

Files that already exist are kept. To replace them with the preset versions, add `--force`. To see the plan without writing anything, add `--dry-run`.

## What it sets up

| File | What changes |
|------|--------------|
| `config/profile.yml` | Target roles (Project Coordinator, Assistant PM, PMO Analyst, Operations Coordinator / Executive / Analyst), entry-level archetypes, pay in AED per month, UAE work authorisation with no sponsorship needed, A4 paper |
| `portals.yml` | Entry-level PM / PMO / Ops title keywords. Senior, lead, head and director titles are dropped. Only Dubai, Abu Dhabi and UAE locations are kept. Postings reserved for UAE nationals are dropped. Includes web-search queries for PMI Career HQ, GulfTalent, Bayt, NaukriGulf, LinkedIn, Indeed UAE, Workday / SuccessFactors / Oracle boards and graduate programmes, plus Amazon UAE through its API |
| `modes/_profile.md` | Seven archetypes, from Project Coordinator to Supply Chain Coordinator, with UAE titles and the tools employers screen for. Also covers AED pay guidance (basic vs allowances, gratuity, medical, leave), negotiation scripts, and the location policy |
| `modes/_custom.md` | House rules: Emirati-only roles are a hard Skip, "no sponsorship" is fine, entry-level scoring, PM certifications that count. Also replaces the `ofertas` weights (the default rewards staff-level AI roles), adds UAE CV conventions, and sets the interview-prep focus (PM fundamentals, Agile, operations KPIs, Excel, behavioural STAR stories) |
| `modes/_brief.md` | Compact triage brief with the same rules, for batch runs |
| `companies.yml` | 60+ UAE employers to turn into scannable job boards (see below) |

## Add employer job boards (recommended)

`portals.yml` comes with no tracked companies. That is deliberate, because a board should be added only after it has been checked live. Run:

```bash
node discover-ats.mjs --in presets/uae-pm-ops/companies.yml --summary   # preview, writes nothing
node discover-ats.mjs --in presets/uae-pm-ops/companies.yml --write     # add the boards that resolved
```

Startups and multinationals usually resolve. Many UAE groups and government-related entities use their own portals and won't resolve. The web-search queries still cover those (`/career-ops scan`).

## Daily use

| Command | What it does |
|---------|--------------|
| `npm run scan` | Zero-token scan (Amazon UAE plus any boards you added) |
| `/career-ops scan` | Also runs the UAE job-board web searches (uses AI tokens) |
| `/career-ops <job URL>` | Full evaluation, tailored CV and tracker entry |
| `uae check <job URL>` | Quick five-line check: emirate, Emirati-only, years asked, salary, source |
| `/career-ops ofertas` | Compares offers using the UAE entry-level weights |
| `/career-ops interview-prep` | Interview prep focused on project management and operations |

## Adjust

- **Pay:** edit `compensation` in `config/profile.yml`. The defaults are AED 8,000–12,000 a month as the target and AED 6,000 as the floor, which is a starting assumption.
- **Internships:** remove the three `Intern` / `Internship` lines from `title_filter.negative` in `portals.yml`.
- **Other emirates:** add `Sharjah` and others to `location_filter.allow` in `portals.yml`.
- **If you become eligible for Emirati-reserved roles:** remove the "Reserved for Emirati nationals" lines from `portals.yml` and the blocker rule from `modes/_profile.md`.
