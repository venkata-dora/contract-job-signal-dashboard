# Contract Job Signal Dashboard

A local, no-API Next.js dashboard for tracking business events that may create contract software job openings.

The app focuses on forced-change signals: issuer transitions, card portfolio migrations, mergers, carve-outs, cyber remediation, compliance orders, AI governance, cloud migrations, ERP modernization, data migration, and platform replacement.

## Daily News Workflow

This app has no automatic news feed. When you ask Codex to run a daily update, Codex can research current news manually, then add real news items and source links into the local dashboard.

By default, daily updates should only include news, filings, disclosures, regulator releases, or company announcements from the past 24 hours. Older stories should be skipped unless you ask for a broader catch-up or there is a new material update.

The main dashboard prioritizes major news, article/source link, category, event type, likely job locations, why contract software jobs may appear, likely roles, action plan, and confidence note. Search strings are available as supporting detail, but they are not the primary dashboard output.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open http://localhost:3000.

## Publish to GitHub Pages

The app is configured for static GitHub Pages deployment. Pushes to `main` or `master` run `.github/workflows/pages.yml`, build the app with `npm run build:pages`, and publish the generated `out` site.

Daily update flow:

```bash
# Codex researches the last 24 hours manually, then updates lib/seedData.ts
npm run typecheck
npm run build:pages
git add .
git commit -m "Update daily job signals"
git push
```

The app itself still has no automatic feeds, APIs, schedulers, backend, or database. Published updates come from committed local data changes.

## Add a Signal

Use **Add Signal** to enter or paste a business event, article text, source link, notes, locations, roles, and action plan. The **Auto-classify locally** button uses keyword rules in TypeScript. It does not call OpenAI, news services, SEC APIs, RSS feeds, or any external service.

## Local Classification

Classification is handled by `lib/classification.ts`, scoring by `lib/scoring.ts`, role mapping by `lib/roleRules.ts`, location inference by `lib/locationRules.ts`, and search keyword generation by `lib/keywordRules.ts`.

## Categories

- **Banking / Payments / Fintech**: issuer transitions, core banking conversions, card portfolio migrations, fraud/risk systems, AML/KYC modernization, payment rails.
- **M&A / Divestiture / Carve-out**: mergers, acquisitions, divestitures, TSA exits, system separation, NewCo setup, ERP consolidation.
- **Cyber / Compliance / Regulatory**: breaches, ransomware, consent orders, MRAs, IAM, DLP, AppSec, GRC workflow modernization, AI governance.
- **AI / Cloud / Enterprise Platforms**: enterprise AI, LLM/RAG, cloud migration, SAP, Oracle, Workday, Salesforce, ServiceNow, Snowflake, Databricks, platform modernization.

## Weekly Priority

The Weekly Priority page is not scheduled. It computes a deduplicated top-10 ranked view from existing local data.

## Export

Dashboard and category views can export local data to CSV, Markdown, or JSON.

## Limitations

This is version 1: UI-only, local-only, and manual-input based. There are no APIs, live news fetching, backend services, databases, schedulers, cron jobs, or external classification calls.
