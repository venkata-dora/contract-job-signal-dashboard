# Daily News Workflow

Use this workflow when the user asks Codex to run the category prompts and update the dashboard with current news.

## Purpose

Find real business/news events that may create contract software jobs, then immediately add or update those signals in the local dashboard.

## Recency window

- Default: news published in the past 24 hours only.
- If an article republishes older news, use the original event date and skip it unless there is a new material update in the past 24 hours.
- If fewer than useful results exist in the past 24 hours, report that clearly. Do not fill the dashboard with older news.
- Use older context only to explain why a fresh item matters, not as a new dashboard signal.

## Geography rule

- Only add news with a clear U.S. impact.
- Do not add non-U.S. news unless the event directly affects U.S. companies, U.S. customers, U.S. operations, U.S. regulatory/compliance work, or U.S.-based software job markets.
- Do not list outside-USA job locations. Convert likely locations to U.S. hubs or U.S. remote/vendor delivery when the software work is plausibly U.S.-addressable.

---

## Step 1 — Search sources for each category

### Where to look (check these every daily run)

**SEC filings (highest-value source)**
- SEC EDGAR full-text search for 8-K filings: search "cybersecurity incident", "material cyber", "merger", "acquisition", "divestiture", "consent order"
- Any 8-K with Item 1.05 (Material Cybersecurity Incidents) = immediate High signal
- Any 8-K with merger agreement, divestiture, or TSA = High signal

**Regulatory enforcement (check every run)**
- OCC enforcement actions (bank consent orders, MRAs, formal agreements)
- FDIC enforcement orders
- Federal Reserve enforcement actions
- CFPB enforcement orders
- FTC data security orders and consent decrees
- HHS OCR HIPAA breach notifications and resolution agreements
- State: NY DFS enforcement actions, California CPRA enforcement, state AG settlements
- CISA advisories and KEV (Known Exploited Vulnerabilities) catalog updates

**Press release wires**
- GlobeNewswire
- PR Newswire
- Business Wire
- AccessWire

**Business publications**
- Bloomberg (M&A, banking, fintech, enterprise tech)
- Reuters (deals, regulatory)
- WSJ (banking, enterprise, cyber)
- Financial Times (banking, fintech)
- American Banker (banking regulatory, core banking, fintech)
- Finextra (fintech, payments)
- PaymentsSource (payments, cards)
- PYMNTS (payments, fintech)
- TechCrunch (fintech funding, enterprise AI)
- The Information (enterprise tech)

**Cybersecurity-specific**
- Dark Reading
- BleepingComputer
- SecurityWeek
- CyberScoop
- Krebs on Security
- SC Media
- Infosecurity Magazine
- Recorded Future News

**Enterprise tech / AI**
- VentureBeat (AI enterprise)
- ZDNet (enterprise IT)
- CIO Dive
- TechTarget
- SearchCIO
- Enterprise Times

**Healthcare IT**
- Healthcare IT News
- HIMSS Media
- MedCity News
- Health Data Management

**Supply chain / logistics**
- FreightWaves
- Supply Chain Dive
- DC Velocity
- Logistics Management

---

## Step 2 — Search queries to run per category

Run these searches to find today's signals. Adapt company names when specific events arise.

### Banking / Payments / Fintech
- "card issuer transition" OR "card portfolio migration" site:globenewswire.com OR site:prnewswire.com
- "core banking" OR "core banking conversion" -24h
- "consent order" bank site:occ.gov OR site:fdic.gov
- "payment processor" OR "payment platform" migration announcement
- "stablecoin" OR "tokenized deposit" OR "digital wallet" enterprise announcement
- "BaaS" OR "banking-as-a-service" transition OR exit OR shutdown
- "FedNow" OR "RTP" OR "ACH modernization" implementation
- "AML" OR "KYC" OR "transaction monitoring" remediation bank
- CFPB OR OCC OR FDIC enforcement action today

### M&A / Divestiture / Carve-out
- SEC EDGAR 8-K filings today: "definitive agreement", "merger agreement", "acquisition agreement"
- "divestiture" OR "carve-out" OR "spin-off" announcement today
- "TSA exit" OR "transition service agreement" technology separation
- "post-merger integration" OR "system integration" named company
- "NewCo" OR "standalone company" technology setup
- "ERP consolidation" OR "ERP carve-out" OR "application rationalization"
- Private equity: portfolio company acquisition, platform add-on

### Cyber / Compliance / Regulatory
- SEC EDGAR 8-K Item 1.05 (material cybersecurity incidents) — daily
- "ransomware" OR "data breach" company announcement today
- "unauthorized access" OR "customer data exposure" disclosure
- "consent order" OR "enforcement action" regulatory body today
- "AppSec" OR "vulnerability management" OR "exploit" cybersecurity product launch
- CISA KEV update today — new exploited vulnerability = immediate signal
- HHS OCR HIPAA breach today
- "supply chain attack" OR "dependency attack" OR "software supply chain"
- "credential exposure" OR "secret rotation" OR "leaked token"
- "AI governance" OR "unauthorized AI" enterprise remediation
- "IAM hardening" OR "identity remediation" enterprise

### AI / Cloud / Enterprise Platforms
- "enterprise AI" implementation OR rollout company announcement today
- "SAP" OR "S/4HANA" OR "SAP BTP" migration OR implementation partner
- "Workday" OR "Oracle ERP" OR "ServiceNow" implementation deal
- "cloud migration" enterprise company announcement
- "LLM" OR "RAG" OR "AI agent" enterprise deployment announcement
- "data platform" OR "data modernization" named company
- "EHR" OR "FHIR" OR "healthcare IT" implementation announcement
- "Guidewire" OR "Duck Creek" insurance platform announcement
- "mainframe modernization" announcement
- "API modernization" OR "microservices migration" enterprise

---

## Step 3 — Signal types that must NOT be missed

These are high-value forced-change signals. Always check for them.

### Banking / Payments
- Any issuer transition or card portfolio move (Apple Card, co-brand changes)
- OCC / FDIC / Fed consent orders and formal agreements
- CFPB enforcement with tech remediation
- Core banking vendor selection or conversion
- BaaS sponsor bank exits (fintech losing banking partner)
- FedNow / RTP go-live announcements at new banks
- Stablecoin or tokenized deposit program launches at banks
- Credit union core banking conversions (often large IT projects)
- Cross-border payment modernization (SWIFT alternatives, ISO 20022 migration)

### M&A
- Any PE-backed buyout of a software or services company
- Any large company divesting a business unit (especially with ERP/data)
- Hospital system mergers (very common, big IT integration projects)
- Insurance company M&A (always involves Guidewire/Duck Creek migration)
- Retailer acquisition (loyalty, e-commerce platform integration)
- Bank acquiring a fintech (core/digital banking integration)
- Government contractor acquisition (security clearance systems, ERP)
- TSA exit news: any company stating it will stand up standalone IT systems

### Cyber / Compliance
- Any SEC 8-K Item 1.05 disclosure (mandatory since Dec 2023) — very high signal
- CISA KEV additions — companies using the named software must patch
- Ransomware at any company with named systems affected
- HHS OCR breach settlement with corrective action plan
- FTC consent order with data security requirements
- State AG settlement with specific tech remediation requirements
- AI governance enforcement: any company penalized for unauthorized AI use
- Supply chain attack on npm / PyPI / GitHub Actions / CI pipelines
- Credential rotation at scale (GitHub, cloud keys, API tokens)

### AI / Cloud / Enterprise Platforms
- Named enterprise AI rollout with implementation partner (Accenture, Deloitte, etc.)
- SAP S/4HANA go-live or partner selection announcement
- ServiceNow AI / Now Assist rollout at named enterprise
- Healthcare FHIR mandate implementations (21st Century Cures compliance deadlines)
- Insurance: Guidewire or Duck Creek named implementation
- Cloud migration deal with named hyperscaler and SI partner
- Mainframe modernization announcement (COBOL to cloud)
- EHR implementation or migration (Epic, Oracle Health, Cerner)
- Federal FISMA, FedRAMP, CMMC compliance programs at named agencies

### Near-miss signals — DO capture these
These look minor but are real job signals:
- "pilot program" with named enterprise AI vendor + named customer = Medium signal
- "strategic partnership" where one party is an SI (Accenture, Deloitte, TCS) = Medium signal
- Funding round where the company explicitly mentions implementation/integration work
- Regulatory rule finalized (new rule = implementation projects start)
- Company announces it passed a compliance deadline (means work happened, more ongoing)
- Security product launch with named API/integration capabilities = Medium-High signal
- Acquisition of a small software company by a large SI = integration work coming

---

## Step 4 — What NOT to add

- Stock price movement only (no implementation event)
- Executive hire or departure only (no system change)
- Physical infrastructure announcement with no software angle (building a data center ≠ software jobs unless named cloud/platform work)
- Generic "we are investing in AI" with no named vendor, product, or implementation
- Press release with no verifiable source link
- International-only events with no U.S. software job market impact
- Repeat of a signal already in the dashboard (check for duplicates before adding)

---

## Step 5 — For every added signal, include all fields

- companyEvent
  - Format: "[Company] at [Event] ([what the event is]): [what happened]"
  - If a company name is followed by a conference or product launch name that is NOT a company, clarify it in parentheses.
  - Examples:
    - CORRECT: "SAP at Sapphire 2026 (annual SAP conference): Business AI Platform launch"
    - CORRECT: "ServiceNow at Knowledge 2026 (annual ServiceNow conference): AI Control Tower expansion"
    - CORRECT: "Salesforce at Dreamforce 2026 (annual Salesforce conference): Agentforce rollout"
    - WRONG: "SAP Sapphire 2026: ..." — reader cannot tell if Sapphire is a company or event
  - General rule: if the word after the company name could be mistaken for another company or brand, add a parenthetical: (annual conference), (industry summit), (product launch event), etc.
- eventType
- category
- signalStrength
- eventDate
  - Use today's date (the date you ran the daily news workflow) as eventDate for all signals collected in this run, regardless of when the underlying event was announced.
  - Preserve the actual announcement/event date in rawNotes.
- resourceLink (real URL — do not use "#" placeholder)
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
- companiesMentioned:
  - Only list companies that are direct actors (announcing company, acquirer, acquiree, partner, regulator).
  - Use each company's TRUE sector (what the company IS, not its role in this deal). Apple is consumer technology, not a bank, even when the news is about Apple Card.
  - Do NOT list commonly used platform tools as separate companies. They are infrastructure, not news actors:
    Snowflake, Databricks, Microsoft Fabric, OneLake, SAP, Salesforce, ServiceNow, Workday, Oracle, AWS, Azure, GCP, Kubernetes, MuleSoft, Kafka, Spark, Terraform, GitHub, Jira, Confluence, Power BI, Tableau, Looker, dbt, Airflow.
  - Exception: if the news IS specifically about one of those platforms (e.g. "Salesforce acquires X"), include it as the primary actor.
  - Do not assign the wrong sub-sector. AppSec company ≠ Identity company ≠ Endpoint company. Use the correct specific sector.
- rawNotes (brief plain-English note with publish date, source, and U.S. impact justification)

---

## Step 6 — Confidence calibration

- **High confidence**: named company + named event + real source link + clear software implementation language
- **Medium confidence**: named company + named event + real source + ambiguous implementation language
- **Low confidence**: named company + vague event + indirect source
- **Do not add**: no source link, no named company, or no software angle

---

## Step 7 — After updating, summarize

- Major news added (with source links)
- Categories updated
- Top job-location bets
- Top role bets
- Why these are forced-change contract software signals
- Any signals skipped and why (with brief reason)

---

## UI Priority

The main table should surface:
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
- Companies mentioned / what each company does

Search keywords are secondary. Do not let them dominate the dashboard.
