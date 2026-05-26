# AGENTS.md

## Project purpose

This project is a local, no-API dashboard for contract software job-signal intelligence.

The app helps identify business events that may create contract software job openings.

The most important concept is:

**Forced-change signals create software jobs.**

Forced-change signals include events that force:
- system integration
- system separation
- data migration
- customer/account migration
- portfolio migration
- issuer transition
- payment/card migration
- vendor replacement
- compliance remediation
- cybersecurity remediation
- cloud migration
- ERP/CRM modernization
- AI governance
- API integration
- QA/testing
- AppSec remediation
- business-systems changes

## Hard constraints

Do not add:
- News APIs
- OpenAI API
- SEC API
- SerpAPI
- Tavily
- RSS integrations
- backend services
- scheduling
- cron jobs
- databases

Use only:
- local TypeScript logic
- seed data
- manual user input
- browser localStorage

Daily news workflow:
- When the user explicitly asks for a daily run, Codex may research current news in the browser/web, then add the real news items and source links into the local dashboard data.
- Default to news from the past 24 hours only. Do not add older stories unless the user asks for a broader catch-up or the older story has a new material update published in the past 24 hours.
- Do not add automatic fetching, APIs, schedulers, cron jobs, or backend services.
- The UI should prioritize major news, article/source link, category, likely job locations, why jobs may appear, likely roles, action plan, and confidence note.
- Search strings are secondary and should not dominate the dashboard.

## UI requirements

The UI must be:
- table-based
- clean
- actionable
- easy to scan
- focused on software contract job hunting
- focused on real news/article links when daily updates are added

Every signal must include:
- Company/Event
- Event Type
- Category
- Signal Strength
- Event Date
- Resource Link / Source
- Sector
- Likely Job Locations
- Work Mode
- Why These Locations
- Why This May Create Contract Software Jobs
- Likely Software Roles
- Best Search Keywords
- Action Plan
- Confidence Note

## Categories

Use these categories:

1. Banking / Payments / Fintech
2. M&A / Divestiture / Carve-out
3. Cyber / Compliance / Regulatory
4. AI / Cloud / Enterprise Platforms

The Weekly Priority page is not a category. It is a merged ranked view.

## Signal strength logic

High signal:
- issuer transition
- card portfolio migration
- customer/account migration
- M&A integration
- divestiture/carve-out/TSA exit
- consent order/MRA/MRIA
- cyber incident/breach/ransomware
- regulatory remediation
- core banking/card processor migration
- ERP/cloud/platform migration

Medium signal:
- AI/cloud product launch
- major contract win
- strategic partnership
- funding round with implementation angle
- early regulatory proposal

Low signal:
- stock movement only
- executive hire only
- physical infrastructure only
- vague AI announcement

## Coding style

Use:
- TypeScript
- typed models
- reusable components
- clear file structure
- localStorage abstraction
- pure utility functions for classification, scoring, roles, locations, and keyword generation

Avoid:
- hard-coded UI logic inside pages
- duplicate table code
- vague placeholder data
- external network calls
