# Daily News Workflow

Use this workflow when the user asks Codex to run the category prompts and update the dashboard with current news.

## Purpose

Find real business/news events that may create contract software jobs, then immediately add or update those signals in the local dashboard.

Default recency window:
- Only use news, filings, disclosures, regulator releases, or company announcements published in the past 24 hours.
- If an article republishes older news, use the original event date and skip it unless there is a new material update in the past 24 hours.
- If fewer than useful results exist in the past 24 hours, report that clearly instead of filling the dashboard with older news.
- Use older context only to explain why a fresh item matters, not as a new dashboard signal.

The dashboard should prioritize:
- major news
- news article or filing link
- company/event
- category
- event type
- where jobs are likely
- why software contract jobs may appear
- likely roles
- confidence note
- action plan

Search strings are secondary. Do not make search strings the primary UI output.

## Hard Constraints

- No app APIs.
- No scheduler.
- No backend service.
- No automatic background fetching.
- No persistent external integrations.
- Use browser/local research only when the user explicitly asks for a daily run.
- Save results into the local app data model so they appear in the UI.

## Daily Run Steps

1. Search current news for each primary view:
   - Banking / Payments / Fintech
   - M&A / Divestiture / Carve-out
   - Cyber / Compliance / Regulatory
   - AI / Cloud / Enterprise Platforms
   - Weekly Priority / Merged View

   Limit searches to the past 24 hours by default.

2. Prefer primary or high-quality sources:
   - company press releases
   - SEC filings
   - regulator releases
   - major business publications
   - cybersecurity disclosures
   - official partner announcements

   Confirm the publish date or filing date is within the past 24 hours before adding the item.

3. For each candidate, decide whether it is a forced-change signal:
   - system integration
   - system separation
   - data migration
   - cloud or ERP modernization
   - account/customer migration
   - cyber or compliance remediation
   - AI governance or platform rollout
   - workflow automation
   - API/platform replacement

4. Add only useful signals. Avoid:
   - stock-only stories
   - executive hires only
   - vague AI announcements
   - physical infrastructure with no software angle
   - generic partnerships with no implementation detail

5. For every added signal, include:
   - companyEvent
   - eventType
   - category
   - signalStrength
   - eventDate
   - resourceLink
   - sourceName
   - sector
   - likelyJobLocations
   - workMode
   - whyTheseLocations
   - whyThisMayCreateContractSoftwareJobs
   - likelySoftwareRoles
   - bestSearchKeywords
   - actionPlan
   - confidenceNote
   - rawNotes

6. Update the UI immediately by saving the new signals into the app data source.

7. After updating, summarize:
   - major news added
   - source links used
   - categories updated
   - top job-location bets
   - top role bets
   - why these are contract software signals

## UI Priority

The main table should make these fields visible:
- Major News
- Category
- Event Type
- Signal Strength
- Event Date
- News Article / Source
- Sector
- Where Jobs Are Likely
- Work Mode
- Why Jobs May Appear
- Likely Roles
- Action Plan / Confidence in expanded details

Search keywords should remain available, but not dominate the dashboard.
