# Category/View 5 Prompt: Weekly Priority / Merged View

Implement Category/View 5: Weekly Priority / Merged View for the local no-API contract-job-signal dashboard.

Important:
This is not a separate signal category.
This is a computed merged view across the four primary categories:
1. Banking / Payments / Fintech
2. M&A / Divestiture / Carve-out
3. Cyber / Compliance / Regulatory
4. AI / Cloud / Enterprise Platforms

Hard constraints:
- Do not use external APIs.
- Do not add scheduling.
- Do not add backend services.
- Use only TypeScript rule logic, seed data, manual input, and browser localStorage.
- Preserve the existing app architecture.
- Do not break category pages.
- Make sure npm run dev works.

Goal:
Build a Weekly Priority page that deduplicates, scores, ranks, and summarizes the strongest contract SOFTWARE job signals across all categories.

The Weekly Priority page should answer:

"Which companies/events should I target first this week for contract software roles?"

Files to update or create:
- app/weekly/page.tsx
- lib/weeklyPriority.ts
- lib/dedupe.ts if useful
- lib/scoring.ts if needed
- lib/keywordRules.ts if needed
- lib/export.ts if needed
- lib/types.ts if needed
- components/WeeklyPriorityTable.tsx if useful
- components/ExecutiveSummary.tsx if needed
- components/SearchStringsTable.tsx if needed
- components/ExportButtons.tsx if needed
- README.md

Do not hard-code all logic directly inside app/weekly/page.tsx. Put dedupe, scoring, sorting, and aggregation logic into pure utility functions.

Data source:
Use all JobSignal records from localStorage.
If localStorage is empty, load from seed data.

Do not fetch live news.
Do not call any external service.

Core behavior:
The Weekly Priority view must:
1. Load all local signals.
2. Deduplicate overlapping events.
3. Compute a priority score.
4. Rank the top 10 companies/events.
5. Show a clean executive summary.
6. Show a ranked priority table.
7. Generate weekly ready-to-copy search strings.
8. Allow filtering by category, signal strength, location, role, and work mode.
9. Allow export to CSV, Markdown, and JSON.

Deduplication logic:
Create a pure function:

dedupeSignals(signals: JobSignal[]): JobSignal[]

Deduplicate events when:
- companyEvent strings are very similar
- same company names appear with similar event types
- same resourceLink appears
- same sourceName + eventDate + companyEvent appears
- Apple Card / Goldman / Chase examples appear in multiple places
- an M&A event also appears under AI/cloud because of ERP/cloud work

Deduping does not need advanced fuzzy matching. Use practical local rules:
- lowercase
- trim punctuation
- normalize whitespace
- remove common stopwords such as "announces", "announced", "agreement", "deal", "partnership"
- compare normalized companyEvent
- compare resourceLink
- compare first major company token if obvious
- prefer the higher-priority signal when duplicates exist

When duplicates exist:
- Keep the item with higher priority score.
- Preserve secondary categories in a secondaryCategories field if the type supports it.
- If secondaryCategories does not exist, add it to JobSignal as optional:
  secondaryCategories?: SignalCategory[];
- Merge keywords, roles, and locations without duplicates.
- Preserve the strongest confidence note if available.
- Preserve the clearest action plan if available.

Priority scoring:
Create a pure function:

calculateWeeklyPriorityScore(signal: JobSignal): number

Use this scoring model:

Base by signal strength:
- High = +50
- Medium = +30
- Low = +10

Category/event bonuses:
- +25 issuer transition / card portfolio migration
- +25 customer/account migration
- +25 payment processor/core banking/card platform migration
- +25 divestiture / carve-out / TSA exit
- +25 NewCo / spin-off system separation
- +25 consent order / MRA / MRIA remediation
- +25 ransomware / breach / material cyber disclosure
- +20 post-merger integration
- +20 ERP modernization / ERP carve-out
- +20 cloud migration with implementation detail
- +20 data platform migration
- +20 named enterprise AI implementation
- +20 regulatory remediation
- +20 AML/KYC/fraud modernization
- +15 ServiceNow/Salesforce/SAP/Oracle/Workday implementation
- +15 software supply-chain attack
- +15 IAM/DLP/AppSec remediation
- +15 healthcare EHR/FHIR modernization
- +15 insurance claims/policy modernization
- +10 retail/e-commerce/loyalty/payment modernization
- +10 logistics/supply-chain modernization
- +10 telecom OSS/BSS modernization
- +10 major contract win with software angle
- +5 broad strategic partnership
- +5 funding round with implementation angle

Actionability bonuses:
- +15 has 5 or more strong search keywords
- +10 has clear likely locations
- +10 has specific software roles
- +10 has a real resourceLink
- +10 mentions named implementation vendors or partners
- +5 work mode includes Remote or Hybrid

Penalties:
- -20 stock-only movement
- -20 executive hire only
- -20 physical infrastructure only
- -10 generic AI announcement with no implementation detail
- -10 vague partnership with no software angle
- -10 missing source/resource link
- -10 missing likely roles
- -10 missing likely locations

Final priority tiers:
- 90+ = Critical Target
- 70-89 = Strong Target
- 50-69 = Watchlist Target
- Below 50 = Low Priority

Add a helper:

getPriorityTier(score: number): "Critical Target" | "Strong Target" | "Watchlist Target" | "Low Priority"

Ranking:
Sort by:
1. priority score descending
2. signal strength High > Medium > Low
3. most recent eventDate
4. category order:
   - Banking / Payments / Fintech
   - M&A / Divestiture / Carve-out
   - Cyber / Compliance / Regulatory
   - AI / Cloud / Enterprise Platforms

Weekly page UI:
Update app/weekly/page.tsx.

The page should include:

1. Header:
Title: Weekly Priority Report
Subtitle: Top contract software job signals to target this week

2. Executive summary cards:
- Top 5 companies/events to target
- Best cities/states/regions this week
- Best software role categories
- Highest-priority category
- Critical/Strong target count

3. Filters:
- Search text
- Category
- Signal strength
- Priority tier
- Work mode
- Location
- Role

4. Ranked top 10 priority table with columns:
- Rank
- Company/Event
- Primary Category
- Secondary Categories
- Priority Tier
- Priority Score
- Signal Strength
- Event Type
- Event Date
- Resource Link / Source
- Likely Job Locations
- Work Mode
- Best Software Roles
- Why It Matters
- Best Search Keywords
- Action Plan
- Confidence Note

5. Expandable row details:
- why these locations
- why this may create contract software jobs
- all roles
- all keywords
- source
- raw notes
- confidence note

6. Weekly ready-to-copy search strings table:
Columns:
- #
- Search Query
- Best For
- Suggested Location Filter
- Source Signal

Generate 12 to 20 search strings from the top 10 signals.
Prioritize:
- company-specific queries
- event-specific queries
- role-specific queries
- location-specific queries

Examples:
- "Apple Card Chase integration developer contract"
- "Goldman Chase Apple Card migration contractor"
- "credit card portfolio migration QA automation"
- "TSA exit data migration engineer contract"
- "ERP carve-out developer contract"
- "8-K cyber remediation engineer contract"
- "ServiceNow GRC developer contract"
- "SAP BTP migration contractor"
- "RAG developer contract enterprise AI"
- "Guidewire claims modernization developer contract"

7. Export buttons:
- Export Weekly CSV
- Export Weekly Markdown
- Export Weekly JSON

8. Optional reset:
Do not automatically reset localStorage.
If a reset button exists, label it clearly:
"Reset all data to seed signals"

Weekly summary logic:
Create helper functions:

getTopLocations(signals: JobSignal[], limit: number): string[]
getTopRoles(signals: JobSignal[], limit: number): string[]
getTopCategories(signals: JobSignal[], limit: number): string[]
getCriticalStrongCount(signals: JobSignal[]): number
generateWeeklySearchStrings(signals: JobSignal[]): WeeklySearchString[]

Recommended type:

type WeeklyPrioritySignal = JobSignal & {
  priorityScore: number;
  priorityTier: "Critical Target" | "Strong Target" | "Watchlist Target" | "Low Priority";
  secondaryCategories?: SignalCategory[];
};

type WeeklySearchString = {
  id: string;
  searchQuery: string;
  bestFor: string;
  suggestedLocationFilter: string;
  sourceSignal: string;
};

Dashboard integration:
Make sure Weekly Priority:
- uses the same localStorage data as the main dashboard
- reflects edits/deletions from other pages
- includes manually added signals
- does not create duplicate permanent records just by viewing the page
- does not mutate signals unless user explicitly edits data elsewhere

Seed data impact:
The Weekly page should work with the existing seed data across all four categories.
Do not create a fifth category in seed data.

If needed, add a few cross-category duplicate-like seed examples to test deduplication, but do not overdo it.

Important expected ranking behavior:
The following kinds of signals should rank very high:
- Apple Card issuer transition from Goldman Sachs to Chase
- bank merger with core/digital banking integration
- corporate carve-out with TSA exit and ERP/data separation
- material cyber incident / 8-K breach remediation
- consent order AML/KYC remediation
- SAP/Oracle/Workday modernization with migration detail
- ServiceNow GRC/security/AI workflow rollout
- named enterprise AI implementation with RAG/MLOps
- healthcare FHIR/EHR modernization
- insurance Guidewire/Duck Creek modernization

The following should rank low:
- stock movement only
- executive appointment only
- generic "we are exploring AI"
- physical data-center construction with no software implementation angle
- vague partnership with no named implementation work

Auto-classify integration:
Do not change the Add Signal page behavior unless needed.
Weekly Priority should consume the outputs from all existing classification rules.

Validation / tests:
Add unit tests if the project already has a test setup.
If no test setup exists, add documented test cases in README or a local validation file.

At minimum validate:

Test 1:
Input signals:
- Apple Card issuer transition from Goldman Sachs to Chase
- same Apple Card signal with slightly different wording
Expected:
Weekly page shows one deduped Apple Card event.
Merged roles, keywords, and locations are preserved.
Priority tier = Critical Target or Strong Target.

Test 2:
Input signal:
Corporate carve-out with TSA exit, ERP carve-out, identity tenant migration, and data separation.
Expected:
Priority score >= 90.
Priority tier = Critical Target.

Test 3:
Input signal:
Generic AI partnership with no implementation detail.
Expected:
Priority tier = Low Priority or Watchlist Target, not Critical Target.

Test 4:
Input signal:
8-K material cyber disclosure with customer data exposure, IAM, DLP, and AppSec remediation.
Expected:
Priority tier = Critical Target or Strong Target.

Test 5:
Input signal:
Physical data-center construction with no software angle.
Expected:
Low Priority or excluded from top 10 unless there are fewer than 10 signals.

Acceptance criteria:
- npm run dev works.
- Weekly page renders without runtime errors.
- Weekly page uses all localStorage signals.
- Weekly page does not create duplicate records.
- Deduplication works for similar Apple Card examples.
- Top 10 ranking is sorted by priority score.
- Priority score and tier are visible.
- Filters work.
- Expandable rows work.
- Weekly search strings are generated.
- Export CSV/Markdown/JSON works.
- Main category pages remain functional.
- No external API calls are added.
- README is updated.

This completes the 5-view system:

| # | View | Type |
| -: | --- | --- |
| 1 | Banking / Payments / Fintech | Primary category |
| 2 | M&A / Divestiture / Carve-out | Primary category |
| 3 | Cyber / Compliance / Regulatory | Primary category |
| 4 | AI / Cloud / Enterprise Platforms | Primary category |
| 5 | Weekly Priority / Merged View | Computed ranking view |
