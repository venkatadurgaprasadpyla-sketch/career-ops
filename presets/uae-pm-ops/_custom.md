# Custom Instructions -- career-ops (UAE preset: entry-level Project & Operations)

<!-- ============================================================
     THIS FILE IS YOURS. It will NEVER be auto-updated.

     Installed from presets/uae-pm-ops/_custom.md. Procedural rules
     for an entry-level Project Management / PMO / Operations search
     in Dubai and Abu Dhabi. WHO the candidate is lives in
     modes/_profile.md; these are HOW-to rules.
     ============================================================ -->

## House Rules

1. **Finish personalisation first.** If `modes/_profile.md` still contains `[FILL FROM CV]`, or `config/profile.yml` has an empty `candidate.full_name` / `candidate.email`, stop before any evaluation, scan or PDF: ask for the missing contact details, read `cv.md`, fill those sections, and show the candidate what you wrote.
2. **Emirati-only roles are a hard Skip.** Apply the "roles reserved for UAE nationals" rule in `modes/_profile.md` → Your Location Policy in every mode (`oferta`, `auto-pipeline`, `pipeline`, `triage`, `batch`, `apply`, `ofertas`). Never draft answers claiming UAE nationality. Never flag this as Block G "immigration-status requirement overreach": in the UAE it is lawful.
3. **No sponsorship is fine.** "No visa sponsorship", "must have own visa", "UAE-based candidates only" are not blockers for this candidate (`location.authorized_in` includes the UAE and `needs_sponsorship` is false).
4. **Entry-level scoring.** For the CV-match and level judgments:
   - Do not penalise a lack of years when the JD asks for 0–3 years; weigh transferable evidence (coursework projects, internships, volunteering, part-time work, certifications) as real experience for coordinator-level roles.
   - A JD requiring 5+ years, or "PMP required" for a full Project Manager role, is a stretch: cap CV match at 3 and say why.
   - Certifications that count positively: CAPM, PMP (or in progress), PRINCE2 Foundation / Practitioner, PMI-ACP, PSM I / CSM, Lean Six Sigma Yellow / Green Belt, Google Project Management Certificate, APM PFQ. Note which ones the JD asks for that the candidate lacks, and point to `/career-ops training` if one recurs.
5. **Compensation in AED per month.** Report advertised and estimated pay as monthly AED, and say whether it is basic or total package. Missing salary is neutral (most UAE postings omit it).
6. **Arabic is a bonus, not a gate,** unless the JD says it is mandatory — then mark it as a stated requirement and score the gap honestly.

## `ofertas` weights for this search

Replace the default 10-dimension matrix in `modes/ofertas.md` (which rewards staff-level AI roles) with this one when comparing offers:

| Dimension | Weight | Criteria 1-5 |
|-----------|--------|--------------|
| North Star alignment | 25% | 5 = entry PM / PMO / Ops role in Dubai or Abu Dhabi, 1 = unrelated |
| CV match | 15% | 5 = 90%+ of stated requirements met, 1 = <40% |
| Learning & growth | 15% | 5 = clear path to PM / Ops Manager, mentoring, certification support; 1 = dead end |
| Total package (AED / month) | 15% | 5 = top of market for the level, 1 = below walk-away; weigh basic vs allowances, gratuity, medical, flights |
| Employer stability & reputation | 10% | 5 = established group / GRE / multinational, 1 = red flags |
| Contract terms | 5% | 5 = unlimited contract, short probation, standard notice; 1 = unclear or unfair terms |
| Commute & hours | 5% | 5 = reasonable commute, standard hours; 1 = long commute or excessive hours / 6-day week |
| Exposure & visibility | 5% | 5 = works with senior stakeholders / real projects; 1 = purely admin |
| Time-to-offer speed | 5% | 5 = fast process, 1 = months |

Drop "Level (senior+)", "Tech stack modernity" and "Remote quality" — they do not fit this search.

## Custom Workflows

- **"uae check <job>"** — before a full evaluation, answer in five lines: emirate, Emirati-only (yes / no, with the verbatim line), years of experience asked, salary (stated or not), and whether the posting is on the employer's own site or an aggregator (Bayt / GulfTalent / NaukriGulf / LinkedIn / Indeed). Then ask whether to run the full evaluation.
- **"weekly uae scan"** — run `npm run scan` (zero-token boards: Amazon UAE plus whatever discover-ats added), then `/career-ops scan` for the web-search queries, evaluate the new roles, and summarise the top 5 by score with the one-line verdict.
- **Interview prep for this search** (`/career-ops interview-prep`): always include
  - PM fundamentals: project life cycle, scope / time / cost triangle, WBS, Gantt and critical path, RAID log, RACI, change control, status reporting.
  - Agile basics: Scrum roles and ceremonies, Kanban, when to use waterfall vs agile.
  - Operations: SOPs, KPIs / SLAs, root-cause analysis (5 Whys, fishbone), basic Lean.
  - Tools: Excel scenario questions (pivot tables, XLOOKUP), MS Project or Primavera P6 for construction / real estate, Jira for tech.
  - Behavioural (STAR+R): handling a missed deadline, a difficult stakeholder, competing priorities, a process you improved, working in a multicultural team.
  - UAE context: "Why the UAE / why this company", availability and notice period, salary expectations in AED per month.

## Output Preferences

- CV: A4 paper, one page for 0–3 years of experience (two at most). No photo by default — many UAE employers accept one, but ATS parsing is safer without; add one only if the candidate asks.
- CV header: include current location ("Dubai, UAE") and a short availability line ("UAE resident — no sponsorship required, available immediately" — adjust to the truth). Include nationality only if the candidate asks; never date of birth or marital status unless the candidate asks.
- Lead every report with the score, the verdict, and the Emirati-only check.

## Off-Limits

- Never claim or imply Emirati / UAE nationality.
- Never invent certifications, years of experience or tools the candidate does not have.
- Never submit an application; draft only.
