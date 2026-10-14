# C2C company watchlist and news research

Read `data/c2c-company-watchlist.json` on every daily run, alongside the four category prompts. This is an additional targeting pass across those categories, not a fifth category or a replacement for broad research. The list is maintained and expandable; never claim it contains all C2C-doable companies.

## Coverage

- Search every watchlisted company and its aliases for original announcements, acquisitions, client implementation deals, migrations, remediation, and enterprise deployments in the same preceding 24-hour window. Include verified, conditional, unverified, and previously unsupported companies in news searches; eligibility uncertainty does not suppress relevant news.
- Search named U.S. private-sector clients, implementation partners, and staffing/vendor delivery channels when source evidence links them to the event. Do not invent relationships or infer that a vendor is on a client's approved list.
- Add newly discovered relevant companies to the watchlist only with a real source supporting their identity and relevance. Keep stable IDs/aliases and existing entries; no automatic deletions. Deduplicate legal entities, brands, and renamed companies. A parent company's C2C policy does not automatically apply to subsidiaries.
- Qualifying news uses existing JobSignal fields and one of the four categories. Prepend it to lib/seedData.ts, deduplicate against all existing events, and preserve dates/source evidence. News remains subject to the 24-hour, U.S. impact, source-opening, and software-work requirements. C2C status must not inflate event confidence or signal strength.

## C2C evidence

Use c2cStatus: `unverified`, `conditional`, `verified`, or `not-supported`. `verified` requires opened current evidence explicitly allowing corporation-to-corporation/subcontractor engagement for a specific role or vendor channel. Record each evidence object with `url`, `sourceName`, `publishedAt` (null if unknown), `checkedAt` (ISO timestamp), `scope` (role/client/channel/location), and `finding`. Use `conditional` for restricted or contradictory evidence; `not-supported` only for explicit restrictions in the documented scope. A W2-only posting excludes that posting, not every role at the company. Recheck evidence on each run before relying on it; expired/removed listings cannot establish current eligibility. Retain historical evidence and explain changed status in notes.

- Prefer official supplier/subcontractor pages, company career listings, and attributable staffing listings naming the employer/client and engagement terms. Open each URL; search snippets, generic contract language, job-board filters, and recruiter marketing are not sufficient proof.
- Do not confuse independent contracting, 1099, W2 contracting, sponsorship, or remote work with C2C eligibility. Do not infer immigration/work-authorization eligibility.
- No claims of guaranteed C2C acceptance or confirmed vacancies from business news. In each matching signal's rawNotes and actionPlan distinguish: news actor; proposed employer/vendor route; C2C status and evidence scope; and inferred roles. For unverified companies explicitly say “C2C eligibility unverified; confirm with the hiring vendor for this role.” Never represent an inferred delivery channel as confirmed.
- Eligibility research may use older current policy/listing evidence; only news signals must be published within the 24-hour news window. A policy/listing by itself is a watchlist update, not a fabricated news signal.

## Maintenance and report

Routine runs may change only lib/seedData.ts and data/c2c-company-watchlist.json. Do not modify prompts, app code, workflows, or dependencies. Validate JSON parsing, unique company IDs, valid statuses, evidence URLs/timestamps, and evidence-backed status changes; inspect the diff for accidental data removal. Existing typecheck and Pages build remain required. Watchlist-only changes can use the same validated daily PR and exact-head merge rules; no empty commits.

Report companies checked, verified/conditional/unverified counts, evidence or status changes, news added, relevant vendor/client paths, and access gaps. Never call an incomplete company pass complete or widen the news window to fill a quota. If the user's prior list is missing, say so rather than claim the starter candidates reproduce it.
