# Category 2 Prompt: M&A / Divestiture / Carve-out

Implement Category 2: M&A / Divestiture / Carve-out for the local no-API contract-job-signal dashboard.

Hard constraints:
- Do not use external APIs.
- Do not add scheduling.
- Do not add backend services.
- Use only TypeScript rule logic, seed data, manual input, and browser localStorage.
- Preserve the existing app architecture.
- Do not break other categories.
- Make sure npm run dev works.

Goal:
Build a high-quality M&A / Divestiture / Carve-out module that detects forced-change business events likely to create contract SOFTWARE jobs through mergers, acquisitions, divestitures, carve-outs, spin-offs, asset sales, TSA exits, NewCo setup, system separation, ERP consolidation, data migration, and post-merger integration.

This category should catch events like:
- mergers
- acquisitions
- post-merger integration
- divestitures
- corporate carve-outs
- spin-offs
- asset sales
- business exits
- unit shutdowns
- NewCo setup
- RemainCo/NewCo separation
- TSA / transition service agreement
- TSA exit
- ERP carve-out
- ERP consolidation
- identity tenant migration
- email tenant migration
- application rationalization
- data separation
- data migration
- shared-service exit
- cloud-to-cloud migration
- vendor replacement after acquisition
- Day-1 / Day-100 integration work

Files to update or create:
- app/ma/page.tsx
- lib/classification.ts
- lib/scoring.ts
- lib/roleRules.ts
- lib/locationRules.ts
- lib/keywordRules.ts
- lib/seedData.ts
- lib/types.ts if needed
- components/SignalTable.tsx if needed
- components/SearchStringsTable.tsx if needed
- README.md

Do not hard-code category-specific UI inside the page if reusable components already exist.

Category name:
"M&A / Divestiture / Carve-out"

Primary event types to support:
- Merger / Post-Merger Integration
- Acquisition / System Integration
- Divestiture / System Separation
- Corporate Carve-out / TSA Exit
- Spin-off / NewCo Standup
- Asset Sale / Application Separation
- Business Exit / Platform Shutdown
- ERP Consolidation
- ERP Carve-out
- Data Migration / Data Separation
- Identity Tenant Migration
- Email Tenant Migration
- Cloud-to-Cloud Migration
- Application Rationalization
- Shared-Service Exit
- Vendor Replacement After Acquisition
- Day-1 / Day-100 Integration

Classification rules:
Update classifySignal or equivalent function so that M&A / Divestiture / Carve-out is selected when text includes strong M&A/separation markers.

Strong markers:
- merger
- acquisition
- acquire
- acquired
- buyout
- takeover
- divestiture
- divest
- divested
- carve-out
- carveout
- spin-off
- spinoff
- asset sale
- business sale
- unit sale
- separation
- corporate separation
- NewCo
- RemainCo
- transition service agreement
- TSA
- TSA exit
- post-merger integration
- PMI
- Day 1 integration
- Day-1 integration
- Day 100 integration
- Day-100 integration
- system separation
- application separation
- application rationalization
- data separation
- data migration
- ERP carve-out
- ERP consolidation
- shared-service exit
- standalone company
- standalone platform

Medium markers:
- restructuring
- business exit
- strategic review
- portfolio optimization
- cost-takeout
- integration planning
- operating model change
- vendor consolidation
- cloud migration
- tenant migration
- identity migration
- email migration
- finance transformation
- HR transformation
- procurement transformation

Conflict rule:
If multiple categories match, M&A / Divestiture / Carve-out should win when:
- the event is primarily about ownership change, business separation, acquisition integration, spin-off, carve-out, or asset sale
- the text mentions TSA, NewCo, RemainCo, system separation, application rationalization, or post-merger integration
- the work is about separating or consolidating enterprise systems after a transaction

Event type inference:
Implement inferMAEventType(text) or equivalent.

Expected mappings:
- merger OR post-merger integration OR PMI => Merger / Post-Merger Integration
- acquisition OR acquired OR buyout => Acquisition / System Integration
- divestiture OR divest OR asset sale => Divestiture / System Separation
- carve-out OR carveout OR TSA OR transition service agreement => Corporate Carve-out / TSA Exit
- spin-off OR spinoff OR NewCo => Spin-off / NewCo Standup
- ERP carve-out => ERP Carve-out
- ERP consolidation => ERP Consolidation
- identity tenant OR email tenant OR tenant migration => Identity Tenant Migration
- cloud-to-cloud OR cloud migration after acquisition => Cloud-to-Cloud Migration
- application rationalization => Application Rationalization
- shared-service exit => Shared-Service Exit
- Day 1 OR Day-1 OR Day 100 OR Day-100 => Day-1 / Day-100 Integration

Scoring rules:
Update calculateSignalScore or equivalent.

Weights:
- +5 divestiture / carve-out / TSA exit
- +5 spin-off / NewCo standup
- +5 system separation
- +5 data separation
- +5 customer/account data migration
- +5 ERP carve-out
- +5 ERP consolidation
- +5 post-merger integration with software/platform detail
- +5 identity/email tenant migration
- +4 acquisition with integration language
- +4 merger with system integration language
- +4 application rationalization
- +4 shared-service exit
- +4 cloud-to-cloud migration
- +4 vendor replacement after acquisition
- +3 asset sale with technology separation
- +3 business exit with platform shutdown/migration
- +3 Day-1 / Day-100 integration planning
- +2 restructuring with technology impact
- +2 strategic review with divestiture possibility
- +1 broad acquisition announcement with no tech detail
- +1 broad merger announcement with no tech detail
- -2 stock-only movement
- -2 executive hire only
- -2 purely financial transaction with no operating/system impact

Signal strength:
- High = score >= 5
- Medium = score 3-4
- Low = score <= 2

Role mapping:
Update getLikelyRoles or equivalent.

Default M&A roles:
- Data Engineer
- ETL Developer
- Backend Engineer
- API Integration Developer
- QA Automation/SDET
- Business Systems Analyst
- Technical Business Analyst

For merger/acquisition integration:
- Java Developer
- .NET Developer
- Python Developer
- Backend Engineer
- Data Engineer
- API Integration Developer
- QA Automation/SDET
- Cloud Engineer
- DevOps/SRE
- Business Systems Analyst
- Technical Business Analyst

For divestiture/carve-out/TSA exit:
- Data Migration Engineer
- ERP Integration Developer
- SAP Developer
- Oracle ERP Developer
- Workday Integration Developer
- Salesforce Developer
- ServiceNow Developer
- Cloud Engineer
- IAM Engineer
- QA Automation/SDET
- Technical Business Analyst

For spin-off/NewCo standup:
- Cloud Engineer
- DevOps/SRE
- Platform Engineer
- IAM Engineer
- ERP Integration Developer
- API Integration Developer
- Data Engineer
- QA Automation/SDET
- Business Systems Analyst

For ERP consolidation/carve-out:
- SAP Developer
- Oracle ERP Developer
- Workday Integration Developer
- ERP Integration Developer
- Data Engineer
- ETL Developer
- QA Automation/SDET
- Reporting Developer
- Business Systems Analyst

For identity/email tenant migration:
- IAM Engineer
- Azure AD / Entra ID Engineer
- Microsoft 365 Engineer
- Cloud Engineer
- Security Engineer
- QA Automation/SDET
- Technical Business Analyst

Location rules:
Update inferLikelyLocations or equivalent.

General M&A/divestiture locations:
- Seller HQ
- Buyer HQ
- Acquired company HQ
- Divested unit HQ
- Shared-service centers
- ERP/data centers
- Identity/cloud tenant owners
- Consulting delivery hubs
- Remote vendor delivery

Common U.S. consulting and enterprise transformation hubs:
- New York, NY
- Chicago, IL
- Dallas, TX
- Atlanta, GA
- Austin, TX
- Houston, TX
- San Francisco Bay Area, CA
- Seattle, WA
- Boston, MA
- Raleigh-Durham, NC
- Phoenix, AZ
- Denver, CO
- Minneapolis, MN
- Washington, DC
- Northern Virginia
- Remote vendor delivery

For divestiture/carve-out:
- Seller HQ
- Buyer HQ
- Divested unit HQ
- Shared-service centers
- ERP/data centers
- Consulting hubs
- Remote vendor delivery

For spin-off/NewCo:
- NewCo HQ if known
- Parent company HQ
- Shared-service centers
- Cloud/identity operations centers
- Consulting hubs
- Remote vendor delivery

For ERP carve-out/consolidation:
- Company HQ
- Finance/shared-service centers
- SAP/Oracle/Workday partner hubs
- Remote vendor delivery

Keyword generation:
Update generateSearchKeywords or equivalent.

Generate 5-8 exact search phrases per signal.

For merger/acquisition:
- "[Company A] [Company B] integration developer contract"
- "post merger integration software engineer contract"
- "M&A data migration contractor"
- "application rationalization developer contract"
- "enterprise system integration contractor"
- "acquisition integration QA automation"

For divestiture/carve-out:
- "[Company] divestiture system separation contractor"
- "carve-out data migration engineer contract"
- "TSA exit software engineer"
- "NewCo platform build contractor"
- "ERP carve-out developer contract"
- "application separation contractor"

For spin-off/NewCo:
- "spin-off technology separation contractor"
- "NewCo ERP implementation contract"
- "standalone platform build engineer"
- "identity tenant migration contractor"
- "shared services exit systems analyst"

For ERP consolidation:
- "ERP consolidation developer contract"
- "SAP consolidation data migration contractor"
- "Oracle ERP integration contractor"
- "Workday integration contract"
- "finance systems migration developer"

For identity/email tenant migration:
- "tenant migration engineer contract"
- "Entra ID migration contractor"
- "Microsoft 365 tenant migration contract"
- "identity separation engineer"
- "cloud tenant migration consultant"

Seed data:
Add at least 8 M&A / Divestiture / Carve-out sample signals.

Required examples:
1. Lattice Semiconductor acquiring AMI
Category: M&A / Divestiture / Carve-out
Event Type: Acquisition / System Integration
Signal Strength: High
Software angle: firmware/software platform integration, AI infrastructure management, security, QA, build/release pipelines

2. Cognizant acquiring Astreya
Category: M&A / Divestiture / Carve-out
Event Type: Acquisition / System Integration
Signal Strength: Medium-High
Software angle: AI infrastructure services, automation tooling, client delivery integration

3. Rocket Software acquiring Vertica from OpenText
Category: M&A / Divestiture / Carve-out
Event Type: Asset Sale / Platform Integration
Signal Strength: High
Software angle: analytics database platform migration, customer transition, enterprise data modernization

4. Tyler Technologies acquiring For The Record
Category: M&A / Divestiture / Carve-out
Event Type: Acquisition / GovTech Platform Integration
Signal Strength: High
Software angle: court software, AI transcription, justice system integrations, QA

5. Example corporate carve-out with TSA exit
Category: M&A / Divestiture / Carve-out
Event Type: Corporate Carve-out / TSA Exit
Signal Strength: High
Software angle: system separation, ERP carve-out, identity tenant migration, data separation

6. Example healthcare company divesting a business unit
Category: M&A / Divestiture / Carve-out
Event Type: Divestiture / System Separation
Signal Strength: High
Software angle: EHR/data separation, billing platform split, HIPAA workflows

7. Example retailer spinning off e-commerce unit
Category: M&A / Divestiture / Carve-out
Event Type: Spin-off / NewCo Standup
Signal Strength: High
Software angle: standalone commerce platform, ERP, CRM, identity, data pipelines

8. Example manufacturer selling a division
Category: M&A / Divestiture / Carve-out
Event Type: Asset Sale / ERP Carve-out
Signal Strength: High
Software angle: SAP carve-out, supply-chain systems, product data, finance/reporting

Each seed signal must include:
- realistic companyEvent
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

M&A page UI:
Update app/ma/page.tsx.

Required behavior:
- Show only M&A / Divestiture / Carve-out signals.
- Show executive summary cards:
  1. Top 3 M&A/divestiture software job signals
  2. Best M&A transformation locations
  3. Best role categories
  4. High-signal count
- Provide filters:
  - Search text
  - Event type
  - Signal strength
  - Work mode
  - Location
  - Role
- Show the main table with:
  - Rank
  - Company/Event
  - Event Type
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
- Resource Link / Source must be a separate clickable column.
- Rows should support expandable details.
- Include copy buttons for search keywords.
- Include export buttons:
  - Export M&A CSV
  - Export M&A Markdown
  - Export M&A JSON

Today's ready-to-copy search strings:
Add a table on the M&A page with columns:
- #
- Search Query
- Best For
- Suggested Location Filter

Auto-classify behavior:
On Add Signal page, when the user enters raw text like:

"Company A announced it will divest its consumer health business into a standalone NewCo. The separation will include TSA exit work, ERP carve-out, identity tenant migration, and data separation."

The Auto-classify button should produce:
- Category: M&A / Divestiture / Carve-out
- Event Type: Corporate Carve-out / TSA Exit
- Signal Strength: High
- Roles:
  - Data Migration Engineer
  - ERP Integration Developer
  - SAP Developer
  - Oracle ERP Developer
  - Workday Integration Developer
  - Salesforce Developer
  - ServiceNow Developer
  - Cloud Engineer
  - IAM Engineer
  - QA Automation/SDET
  - Technical Business Analyst
- Locations:
  - Seller HQ
  - Buyer HQ
  - Divested unit HQ
  - Shared-service centers
  - ERP/data centers
  - Consulting hubs
  - Remote vendor delivery
- Keywords:
  - carve-out data migration engineer contract
  - TSA exit software engineer
  - NewCo platform build contractor
  - ERP carve-out developer contract
  - application separation contractor
  - identity tenant migration contractor

Dashboard integration:
Make sure M&A signals:
- appear on the main dashboard
- count correctly in category summaries
- appear in Weekly Priority ranking
- are filterable by category and role
- persist in localStorage
- can be added manually from Add Signal page
- can be edited and deleted without breaking localStorage

Tests or validation:
Add unit tests if the project already has a test setup. If no test setup exists, add a small local validation file or documented test cases in README.

At minimum validate these inputs:

Test 1:
Input:
"Company A announced it will divest its consumer health business into a standalone NewCo. The separation will include TSA exit work, ERP carve-out, identity tenant migration, and data separation."
Expected:
- Category = M&A / Divestiture / Carve-out
- Event Type = Corporate Carve-out / TSA Exit
- Signal Strength = High

Test 2:
Input:
"Lattice Semiconductor announced it will acquire AMI to expand software, firmware, security, and AI infrastructure management capabilities."
Expected:
- Category = M&A / Divestiture / Carve-out
- Event Type = Acquisition / System Integration
- Signal Strength = High

Test 3:
Input:
"The companies announced post-merger integration planning, application rationalization, and ERP consolidation."
Expected:
- Category = M&A / Divestiture / Carve-out
- Event Type = Merger / Post-Merger Integration
- Signal Strength = High

Test 4:
Input:
"The divested unit will exit transition service agreements and migrate from the parent company Microsoft 365 tenant."
Expected:
- Category = M&A / Divestiture / Carve-out
- Event Type = Corporate Carve-out / TSA Exit
- Signal Strength = High

companiesMentioned rules:
- List acquirer, target, and divested unit as direct actors.
- Use each company's TRUE sector (what the company IS, not their role in the deal). A tech company being acquired is still a tech company.
- Do NOT list ERP/platform vendors (SAP, Oracle, Workday, Salesforce, Microsoft) as companiesMentioned unless they are party to the M&A transaction itself.
- Do NOT fabricate acquisitions or mergers. Only use real, publicly announced transactions with verifiable sources.
- For hypothetical seed examples, use generic placeholder names (e.g. "Industrial Co A", "HealthTech NewCo").

Acceptance criteria:
- npm run dev works.
- M&A page renders without runtime errors.
- M&A page shows at least 8 seed signals.
- Filtering works.
- Expandable rows work.
- Copy keyword buttons work.
- Export CSV/Markdown/JSON works.
- Auto-classify correctly handles the carve-out/TSA example.
- No external API calls are added.
- README is updated.
