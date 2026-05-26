# Category 1 Prompt: Banking / Payments / Fintech

Implement Category 1: Banking / Payments / Fintech for the local no-API contract-job-signal dashboard.

Hard constraints:
- Do not use external APIs.
- Do not add scheduling.
- Do not add backend services.
- Use only TypeScript rule logic, seed data, manual input, and browser localStorage.
- Preserve the existing app architecture.
- Do not break other categories.
- Make sure npm run dev works.

Goal:
Build a high-quality Banking / Payments / Fintech module that detects forced-change business events likely to create contract SOFTWARE jobs.

This category should catch events like:
- Apple Card issuer transition from Goldman Sachs to Chase
- bank mergers and acquisitions
- credit-card portfolio migrations
- co-branded card program transfers
- card processor changes
- payment network transitions
- core banking conversions
- BaaS / sponsor-bank transitions
- fintech exits from lending, card, deposit, or payment programs
- AML/KYC/fraud/risk remediation
- consent orders, MRAs, MRIAs, enforcement actions
- RTP, FedNow, ACH, digital wallet, stablecoin, and tokenized deposit modernization

Files to update or create:
- app/banking/page.tsx
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

Do not hard-code category-specific UI inside the page if a reusable component already exists.

Data model:
Use the existing JobSignal type. If missing, make sure it supports:
- id
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
- createdAt
- updatedAt

Category name:
"Banking / Payments / Fintech"

Primary event types to support:
- Issuer Transition / Card Portfolio Migration
- Bank Merger / System Integration
- Bank Acquisition / Core Banking Integration
- Co-branded Card Program Transfer
- Payment Processor Migration
- Payment Network Transition
- Core Banking Conversion
- Sponsor Bank / BaaS Transition
- Fintech Business Exit
- AML/KYC Regulatory Remediation
- Fraud/Risk Platform Modernization
- RTP / FedNow / ACH Modernization
- Digital Wallet Integration
- Stablecoin / Tokenized Deposit Platform
- WealthTech Platform Integration
- Commercial Card Platform Integration

Classification rules:
Update classifySignal or equivalent function so that Banking / Payments / Fintech is selected when text includes strong banking/payment markers.

Strong markers:
- issuer transition
- card portfolio
- portfolio migration
- co-branded card
- cobranded card
- card program
- Apple Card
- Mastercard
- Visa
- Discover
- Amex
- payment network
- payment processor
- card servicing
- core banking
- sponsor bank
- BaaS
- banking-as-a-service
- FIS
- Fiserv
- Jack Henry
- TSYS
- Temenos
- Finastra
- Mambu
- nCino
- Galileo
- Marqeta
- i2c
- Q2
- Alkami
- ACI Worldwide
- FedNow
- RTP
- ACH
- AML
- KYC
- sanctions
- transaction monitoring
- consent order
- MRA
- MRIA

Medium markers:
- bank
- banking
- fintech
- credit card
- debit card
- deposit
- lending
- consumer banking
- commercial banking
- treasury
- cash management
- embedded finance
- stablecoin
- tokenized deposit
- digital wallet
- Apple Wallet
- Apple Pay
- Google Pay
- fraud
- credit risk
- model risk

Conflict rule:
If multiple categories match, Banking / Payments / Fintech wins when the text involves:
- a bank
- a card issuer
- a payment network
- a sponsor bank
- a core banking provider
- a card processor
- accounts, deposits, cards, payments, fraud, AML/KYC, or banking regulatory remediation

Event type inference:
Implement inferBankingEventType(text) or equivalent.

Expected mappings:
- Apple Card + Chase + Goldman => Issuer Transition / Card Portfolio Migration
- issuer transition OR card portfolio migration => Issuer Transition / Card Portfolio Migration
- bank + merger => Bank Merger / System Integration
- bank + acquisition => Bank Acquisition / Core Banking Integration
- co-branded card OR cobranded card => Co-branded Card Program Transfer
- payment processor OR TSYS OR Fiserv OR FIS card processing => Payment Processor Migration
- core banking OR FIS OR Fiserv OR Jack Henry OR Temenos OR Finastra OR Mambu => Core Banking Conversion
- BaaS OR sponsor bank => Sponsor Bank / BaaS Transition
- consent order OR MRA OR MRIA OR AML OR KYC => AML/KYC Regulatory Remediation
- fraud OR risk platform OR transaction monitoring => Fraud/Risk Platform Modernization
- RTP OR FedNow OR ACH => RTP / FedNow / ACH Modernization
- stablecoin OR tokenized deposit => Stablecoin / Tokenized Deposit Platform

Scoring rules:
Update calculateSignalScore or equivalent.

Weights:
- +5 issuer transition
- +5 card portfolio migration
- +5 customer/account migration
- +5 co-branded card transfer
- +5 core banking conversion
- +5 bank merger with system integration
- +5 payment processor migration
- +5 consent order / MRA / MRIA remediation
- +4 bank acquisition
- +4 BaaS exit or sponsor-bank replacement
- +4 credit-card servicing platform change
- +4 AML/KYC remediation
- +4 fraud/risk platform modernization
- +4 payment network transition
- +3 RTP / FedNow / ACH implementation
- +3 stablecoin / tokenized deposit banking platform
- +3 digital wallet integration
- +3 FIS/Fiserv/Jack Henry/TSYS/Temenos/Finastra/Mambu/nCino migration
- +2 payments modernization
- +2 strategic banking partnership
- +2 fintech funding with banking platform implementation angle
- +1 broad fintech product launch
- -2 stock-only movement
- -2 executive hire only
- -2 physical branch/facility expansion only

Strength:
- High = score >= 5
- Medium = score 3-4
- Low = score <= 2

Role mapping:
Update getLikelyRoles or equivalent.

Default Banking roles:
- Java Developer
- Python Developer
- Backend Engineer
- Data Engineer
- API Integration Developer
- QA Automation/SDET
- Business Systems Analyst
- Technical Business Analyst

Issuer transition / card portfolio:
- Card Platform Developer
- Payments Engineer
- Java Developer
- Backend Engineer
- Data Engineer
- API Integration Developer
- QA Automation/SDET
- Fraud/Risk Systems Developer
- Business Systems Analyst

Core banking conversion:
- Core Banking Developer
- Java Developer
- .NET Developer
- SQL Developer
- Data Migration Engineer
- API Integration Developer
- QA Automation/SDET
- Banking Systems Analyst

AML/KYC/fraud:
- AML/KYC Systems Developer
- Fraud Systems Engineer
- Risk Systems Developer
- Data Engineer
- Python Developer
- Java Developer
- QA Automation/SDET
- GRC Automation Analyst
- Technical Business Analyst

Payment modernization:
- Payments Engineer
- Java Developer
- Go Developer
- Backend Engineer
- API Integration Developer
- Data Engineer
- QA Automation/SDET
- AppSec Engineer

Stablecoin/tokenized deposit:
- Backend Engineer
- Go Developer
- Python Developer
- Payments Engineer
- Ledger Systems Engineer
- API Integration Developer
- AppSec Engineer
- Data Engineer

Location rules:
Update inferLikelyLocations or equivalent.

General banking hubs:
- New York, NY
- Jersey City, NJ
- Wilmington, DE
- Charlotte, NC
- Columbus, OH
- Plano/Dallas, TX
- Phoenix, AZ
- Chicago, IL
- Atlanta, GA
- Minneapolis, MN
- Pittsburgh, PA
- Cincinnati, OH
- Detroit, MI
- San Francisco Bay Area, CA
- Remote vendor delivery

Issuer/card transition locations:
- New York, NY
- Jersey City, NJ
- Wilmington, DE
- Columbus, OH
- Plano/Dallas, TX
- Charlotte, NC
- Phoenix, AZ
- San Francisco Bay Area, CA
- Remote vendor delivery

Apple Card specific:
- New York, NY
- Jersey City, NJ
- Wilmington, DE
- Columbus, OH
- Plano/Dallas, TX
- San Francisco Bay Area, CA
- Remote vendor delivery

Bank merger:
- headquarters of both banks if names/locations are known from seed data
- Charlotte, NC
- NYC/NJ
- Dallas, TX
- Atlanta, GA
- Phoenix, AZ
- Chicago, IL
- Wilmington, DE
- Columbus, OH
- Remote vendor delivery

AML/KYC/regulatory:
- Bank HQ
- NYC/NJ
- Charlotte, NC
- Wilmington, DE
- Columbus, OH
- Dallas, TX
- Chicago, IL
- Atlanta, GA
- Phoenix, AZ
- DC/Northern Virginia
- Remote vendor delivery

Keyword generation:
Update generateSearchKeywords or equivalent.

Generate 5-8 exact search phrases per signal.

For Apple Card / Chase / Goldman:
- Apple Card Chase integration developer contract
- Goldman Chase Apple Card migration
- credit card portfolio migration contractor
- co-brand card platform developer
- Apple Wallet payments integration
- Chase card services Java contractor
- payments QA automation contractor
- card rewards rules engine developer contract

For bank merger:
- [Bank A] [Bank B] integration developer contract
- bank merger data migration contractor
- core banking integration developer
- bank acquisition QA automation contractor
- commercial banking systems integration
- digital banking migration developer

For core banking:
- core banking conversion developer contract
- Fiserv DNA migration contractor
- FIS core banking developer contract
- Jack Henry conversion SQL developer
- banking data migration QA contractor

For payments:
- payments modernization developer contract
- RTP FedNow developer contractor
- ACH modernization API engineer
- payment rails integration developer
- payments QA automation contractor

For AML/KYC/fraud:
- AML KYC developer contract
- transaction monitoring systems developer
- fraud risk platform engineer contract
- bank consent order remediation contractor
- regulatory reporting developer banking

For stablecoin/tokenized deposits:
- tokenized deposit developer contract
- stablecoin banking API developer
- bank ledger systems engineer
- digital assets banking platform contractor
- virtual account payments developer

Seed data:
Add at least 8 Banking / Payments / Fintech sample signals.

Required examples:
1. Apple Card issuer transition from Goldman Sachs to Chase
2. Fifth Third and Comerica merger
3. NBH Bank and Vista Bank systems integration
4. Infinant Interlace tokenized deposit platform release
5. Barclays investment in Ubyx digital money connectivity
6. Capital One acquiring Brex
7. JPMorgan acquiring WealthOS
8. Example bank consent order AML/KYC remediation

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

Banking page UI:
Update app/banking/page.tsx.

Required behavior:
- Show only Banking / Payments / Fintech signals.
- Show executive summary cards:
  1. Top 3 banking software job signals
  2. Best banking locations
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
  - Export Banking CSV
  - Export Banking Markdown
  - Export Banking JSON

Today's ready-to-copy search strings:
Add a table on the Banking page with columns:
- #
- Search Query
- Best For
- Suggested Location Filter

Auto-classify behavior:
On Add Signal page, when raw text contains:

"Goldman Sachs announced an agreement to transition the Apple Card program to Chase. Mastercard remains the network and the transition is expected to take 24 months."

The local auto-classify button must output:
- Category: Banking / Payments / Fintech
- Event Type: Issuer Transition / Card Portfolio Migration
- Signal Strength: High
- Roles:
  - Java Developer
  - Python Developer
  - Backend Engineer
  - Data Engineer
  - Payments Engineer
  - Card Platform Developer
  - API Integration Developer
  - QA Automation/SDET
  - Fraud/Risk Systems Developer
  - Business Systems Analyst
  - Technical Business Analyst
- Locations:
  - New York, NY
  - Jersey City, NJ
  - Wilmington, DE
  - Columbus, OH
  - Plano/Dallas, TX
  - San Francisco Bay Area, CA
  - Remote vendor delivery
- Keywords:
  - Apple Card Chase integration developer contract
  - Goldman Chase Apple Card migration
  - credit card portfolio migration contractor
  - co-brand card platform developer
  - Apple Wallet payments integration
  - Chase card services Java contractor
  - payments QA automation contractor

Dashboard integration:
Make sure Banking signals:
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
"Goldman Sachs announced an agreement to transition the Apple Card program to Chase. Mastercard remains the network and the transition is expected to take 24 months."
Expected:
- Category = Banking / Payments / Fintech
- Event Type = Issuer Transition / Card Portfolio Migration
- Signal Strength = High

Test 2:
Input:
"Fifth Third and Comerica announced a merger requiring digital banking and commercial banking platform integration."
Expected:
- Category = Banking / Payments / Fintech
- Event Type = Bank Merger / System Integration
- Signal Strength = High

Test 3:
Input:
"The bank entered a consent order requiring AML and KYC transaction monitoring remediation."
Expected:
- Category = Banking / Payments / Fintech
- Event Type = AML/KYC Regulatory Remediation
- Signal Strength = High

Test 4:
Input:
"The bank selected Fiserv for a core banking conversion and digital banking migration."
Expected:
- Category = Banking / Payments / Fintech
- Event Type = Core Banking Conversion
- Signal Strength = High

Acceptance criteria:
- npm run dev works.
- Banking page renders without runtime errors.
- Banking page shows at least 8 seed signals.
- Filtering works.
- Expandable rows work.
- Copy keyword buttons work.
- Export CSV/Markdown/JSON works.
- Auto-classify correctly handles the Apple Card example.
- No external API calls are added.
- README is updated.
