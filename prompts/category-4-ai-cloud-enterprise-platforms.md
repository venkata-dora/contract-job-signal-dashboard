# Category 4 Prompt: AI / Cloud / Enterprise Platforms

Implement Category 4: AI / Cloud / Enterprise Platforms for the local no-API contract-job-signal dashboard.

Hard constraints:
- Do not use external APIs.
- Do not add scheduling.
- Do not add backend services.
- Use only TypeScript rule logic, seed data, manual input, and browser localStorage.
- Preserve the existing app architecture.
- Do not break other categories.
- Make sure npm run dev works.

Goal:
Build a high-quality AI / Cloud / Enterprise Platforms module that detects forced-change business events likely to create contract SOFTWARE jobs through enterprise AI implementation, LLM apps, RAG, AI agents, MLOps, model governance, cloud migration, ERP/CRM modernization, data-platform modernization, workflow automation, platform replacement, API modernization, mainframe modernization, and enterprise SaaS rollouts.

This category should catch events like:
- enterprise AI adoption
- OpenAI / Anthropic / Gemini / Copilot enterprise rollout
- LLM implementation
- RAG implementation
- AI agents
- agentic workflow automation
- MLOps
- model governance
- AI safety/security controls
- AI governance
- cloud migration
- cloud-to-cloud migration
- SAP modernization
- SAP BTP / Joule / S/4HANA / RISE with SAP
- Oracle ERP modernization
- Workday modernization
- Salesforce modernization
- ServiceNow workflow automation
- ServiceNow AI / Now Assist
- Snowflake migration
- Databricks migration
- Microsoft Fabric migration
- data platform modernization
- mainframe modernization
- API modernization
- microservices migration
- telecom OSS/BSS modernization
- retail/e-commerce/loyalty/payment modernization
- logistics/supply-chain platform modernization
- healthcare EHR/FHIR/claims modernization
- insurance Guidewire/Duck Creek modernization
- AI/cloud infrastructure expansion only when there is a clear software/platform/cloud role angle

Files to update or create:
- app/ai-platforms/page.tsx
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
"AI / Cloud / Enterprise Platforms"

Primary event types to support:
- Enterprise AI Rollout
- LLM / RAG Implementation
- AI Agent Workflow Automation
- MLOps / Model Platform Modernization
- AI Governance / Model Governance
- Cloud Migration
- Cloud Platform Modernization
- SAP Modernization
- SAP BTP / Joule / S/4HANA Implementation
- Oracle ERP Modernization
- Workday Modernization
- Salesforce Modernization
- ServiceNow Workflow Automation
- ServiceNow AI / Now Assist Implementation
- Data Platform Migration
- Snowflake / Databricks / Microsoft Fabric Modernization
- Mainframe Modernization
- API Modernization
- Microservices Migration
- Healthcare EHR / FHIR Modernization
- Insurance Claims / Policy Platform Modernization
- Retail Loyalty / E-commerce Platform Modernization
- Logistics / Supply Chain Platform Modernization
- Telecom OSS/BSS Modernization
- AI Cloud Platform / MLOps Infrastructure

Classification rules:
Update classifySignal or equivalent function so that AI / Cloud / Enterprise Platforms is selected when text includes strong AI/cloud/platform modernization markers.

Strong markers:
- enterprise AI
- generative AI
- GenAI
- LLM
- RAG
- AI agent
- AI agents
- agentic AI
- agentic workflow
- AI workflow
- MLOps
- model governance
- model risk
- AI governance
- AI safety
- AI security
- Copilot
- Claude
- OpenAI
- Anthropic
- Gemini
- Vertex AI
- Azure OpenAI
- Bedrock
- cloud migration
- cloud modernization
- cloud transformation
- platform modernization
- SAP
- SAP BTP
- SAP Joule
- S/4HANA
- RISE with SAP
- Oracle ERP
- Oracle Cloud ERP
- Workday
- Salesforce
- ServiceNow
- Now Assist
- ServiceNow AI
- Snowflake
- Databricks
- Microsoft Fabric
- OneLake
- data platform migration
- mainframe modernization
- API modernization
- microservices migration
- workflow automation
- ERP modernization
- CRM modernization

Industry platform markers:
- FHIR
- HL7
- EHR
- claims modernization
- Guidewire
- Duck Creek
- policy administration
- insurance claims platform
- retail loyalty
- e-commerce platform
- payment platform modernization
- supply chain platform
- warehouse management system
- WMS
- TMS
- telecom OSS
- telecom BSS
- network automation

Medium markers:
- digital transformation
- software modernization
- data modernization
- automation platform
- enterprise platform
- customer experience modernization
- finance transformation
- HR transformation
- procurement transformation
- product launch with enterprise software angle
- strategic technology partnership
- major cloud contract
- major SaaS contract

Conflict rule:
If multiple categories match, AI / Cloud / Enterprise Platforms should win when:
- the event is primarily about enterprise software/platform modernization, AI implementation, ERP/CRM/data platform rollout, cloud migration, or workflow automation
- the event does not involve a stronger forced-change ownership event such as M&A/divestiture/TSA exit
- the event is not primarily a breach, consent order, or regulatory remediation
- the event is not primarily banking/cards/payments-specific

If the event is about SAP/Oracle/Workday/ServiceNow/Salesforce implementation caused by a divestiture or merger, keep the primary category as M&A / Divestiture / Carve-out and add AI / Cloud / Enterprise Platforms as a secondary tag if secondary categories exist.

If the event is about AI governance after unauthorized AI/data leakage, keep the primary category as Cyber / Compliance / Regulatory.

Event type inference:
Implement inferAIPlatformEventType(text) or equivalent.

Expected mappings:
- OpenAI OR Anthropic OR Claude OR Gemini OR Copilot OR LLM OR RAG => LLM / RAG Implementation
- AI agent OR agentic AI OR agentic workflow => AI Agent Workflow Automation
- MLOps OR model platform OR model deployment => MLOps / Model Platform Modernization
- model governance OR AI governance OR model risk => AI Governance / Model Governance
- cloud migration OR cloud modernization => Cloud Migration
- SAP OR SAP BTP OR SAP Joule OR S/4HANA OR RISE with SAP => SAP BTP / Joule / S/4HANA Implementation
- Oracle ERP OR Oracle Cloud ERP => Oracle ERP Modernization
- Workday => Workday Modernization
- Salesforce => Salesforce Modernization
- ServiceNow OR Now Assist => ServiceNow AI / Now Assist Implementation
- Snowflake OR Databricks OR Microsoft Fabric OR OneLake => Data Platform Migration
- mainframe modernization => Mainframe Modernization
- API modernization => API Modernization
- microservices => Microservices Migration
- FHIR OR HL7 OR EHR => Healthcare EHR / FHIR Modernization
- Guidewire OR Duck Creek OR claims platform OR policy administration => Insurance Claims / Policy Platform Modernization
- retail loyalty OR e-commerce platform => Retail Loyalty / E-commerce Platform Modernization
- supply chain platform OR WMS OR TMS => Logistics / Supply Chain Platform Modernization
- OSS OR BSS OR telecom => Telecom OSS/BSS Modernization

Scoring rules:
Update calculateSignalScore or equivalent.

Weights:
- +5 named enterprise AI implementation with customer/partner
- +5 SAP/Oracle/Workday ERP modernization
- +5 ServiceNow/Salesforce enterprise workflow rollout
- +5 data platform migration involving Snowflake/Databricks/Fabric
- +5 cloud migration with implementation detail
- +5 mainframe modernization
- +5 healthcare EHR/FHIR modernization
- +5 insurance claims/policy platform modernization
- +4 LLM/RAG implementation
- +4 AI agent workflow automation
- +4 MLOps/model platform modernization
- +4 AI governance/model governance rollout
- +4 API modernization
- +4 microservices migration
- +4 retail loyalty/e-commerce/payment platform modernization
- +4 logistics/supply-chain platform modernization
- +4 telecom OSS/BSS modernization
- +3 major cloud contract with software/platform angle
- +3 enterprise SaaS platform launch with implementation angle
- +3 strategic technology partnership with implementation detail
- +2 broad digital transformation
- +2 AI product launch without named customer
- +2 funding round with enterprise software implementation angle
- +1 generic AI announcement
- +1 executive hire with AI/platform background
- -2 stock-only movement
- -2 physical data-center expansion only
- -2 hardware-only announcement
- -2 construction/facilities-only announcement

Signal strength:
- High = score >= 5
- Medium = score 3-4
- Low = score <= 2

Role mapping:
Update getLikelyRoles or equivalent.

Default AI / Cloud / Enterprise Platform roles:
- AI Engineer
- Python Developer
- Backend Engineer
- Data Engineer
- Cloud Software Engineer
- DevOps/SRE
- Platform Engineer
- QA Automation/SDET
- API Integration Developer
- Business Systems Analyst
- Technical Business Analyst

For LLM/RAG/AI agents:
- AI Engineer
- Generative AI Engineer
- Python Developer
- Backend Engineer
- Full-stack Developer
- Data Engineer
- MLOps Engineer
- Prompt/Workflow Engineer
- API Integration Developer
- QA Automation/SDET

For MLOps/model platform:
- MLOps Engineer
- ML Engineer
- Python Developer
- Platform Engineer
- DevOps/SRE
- Data Engineer
- Cloud Software Engineer
- AppSec Engineer
- QA Automation/SDET

For SAP modernization:
- SAP Developer
- SAP BTP Developer
- SAP Integration Developer
- Java Developer
- Data Engineer
- ETL Developer
- QA Automation/SDET
- ERP Business Systems Analyst
- Technical Business Analyst

For Oracle ERP:
- Oracle ERP Developer
- Oracle Integration Cloud Developer
- Data Migration Engineer
- Reporting Developer
- QA Automation/SDET
- ERP Business Systems Analyst
- Technical Business Analyst

For Workday:
- Workday Integration Developer
- Workday Extend Developer
- Data Engineer
- HRIS Systems Analyst
- QA Automation/SDET
- Technical Business Analyst

For Salesforce:
- Salesforce Developer
- Salesforce Integration Developer
- Apex Developer
- Lightning Web Components Developer
- MuleSoft Developer
- QA Automation/SDET
- Business Systems Analyst

For ServiceNow:
- ServiceNow Developer
- ServiceNow AI / Now Assist Developer
- Workflow Automation Engineer
- ServiceNow Integration Developer
- ServiceNow GRC/IRM Developer
- QA Automation/SDET
- Technical Business Analyst

For data platform migration:
- Data Engineer
- Big Data Engineer
- Snowflake Developer
- Databricks Engineer
- Microsoft Fabric Engineer
- SQL Developer
- Python Developer
- ETL Developer
- Data Quality Engineer
- QA Automation/SDET

For cloud/API/microservices:
- Cloud Software Engineer
- Platform Engineer
- DevOps/SRE
- Backend Engineer
- Java Developer
- Go Developer
- Python Developer
- API Integration Developer
- AppSec Engineer
- QA Automation/SDET

For healthcare EHR/FHIR:
- FHIR Developer
- HL7 Integration Engineer
- Healthcare Data Engineer
- Epic/Oracle Health Integration Analyst
- Java Developer
- API Integration Developer
- QA Automation/SDET
- Technical Business Analyst

For insurance Guidewire/Duck Creek:
- Guidewire Developer
- Duck Creek Developer
- Java Developer
- Data Engineer
- Claims Platform Integration Developer
- QA Automation/SDET
- Insurance Business Systems Analyst

Location rules:
Update inferLikelyLocations or equivalent.

General AI/cloud/platform hubs:
- San Francisco Bay Area, CA
- Seattle, WA
- Austin, TX
- New York, NY
- Boston, MA
- Raleigh-Durham, NC
- Denver, CO
- Chicago, IL
- Dallas, TX
- Atlanta, GA
- Phoenix, AZ
- Remote/hybrid

Enterprise consulting/platform implementation hubs:
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
- Washington, DC
- Northern Virginia
- Remote vendor delivery

SAP/Oracle/Workday/ServiceNow/Salesforce:
- Company HQ
- Consulting hubs
- Shared-service centers
- Customer operations hubs
- Remote/hybrid delivery

Healthcare:
- Nashville, TN
- Boston, MA
- Atlanta, GA
- Dallas, TX
- Chicago, IL
- Minneapolis, MN
- Philadelphia, PA
- Remote healthcare IT

Insurance:
- Hartford, CT
- New York, NY
- New Jersey
- Chicago, IL
- Dallas, TX
- Atlanta, GA
- Phoenix, AZ
- Des Moines, IA
- Boston, MA
- Remote insurance IT

Retail/e-commerce:
- Seattle, WA
- New York, NY
- Atlanta, GA
- Dallas, TX
- Chicago, IL
- Bentonville, AR
- San Francisco Bay Area, CA
- Remote commerce IT

Logistics/supply-chain:
- Atlanta, GA
- Dallas, TX
- Chicago, IL
- Memphis, TN
- Louisville, KY
- Columbus, OH
- Phoenix, AZ
- Remote logistics IT

Telecom:
- Dallas, TX
- Atlanta, GA
- Denver, CO
- New Jersey
- Seattle, WA
- Washington, DC
- Remote telecom IT

Keyword generation:
Update generateSearchKeywords or equivalent.

Generate 5-8 exact search phrases per signal.

For LLM/RAG:
- "enterprise AI integration Python contractor"
- "RAG developer contract"
- "LLM application engineer contract"
- "AI workflow automation developer"
- "GenAI backend engineer contractor"
- "MLOps engineer contract"

For SAP:
- "SAP BTP developer contract"
- "SAP Joule integration contractor"
- "S/4HANA migration data engineer"
- "SAP Cloud ERP migration SDET"
- "SAP integration developer contract"
- "SAP data migration contractor"

For ServiceNow:
- "ServiceNow AI developer contract"
- "Now Assist implementation contractor"
- "ServiceNow workflow automation developer"
- "ServiceNow integration engineer contract"
- "ServiceNow GRC developer contract"

For Salesforce:
- "Salesforce developer contract"
- "Salesforce integration developer contract"
- "MuleSoft API integration contractor"
- "Salesforce CPQ developer contract"
- "Apex Lightning developer contract"

For Oracle/Workday:
- "Oracle Cloud ERP developer contract"
- "Oracle Integration Cloud contractor"
- "Workday integration developer contract"
- "Workday Extend developer contractor"
- "ERP data migration contractor"

For data platforms:
- "Snowflake data engineer contract"
- "Databricks engineer contractor"
- "Microsoft Fabric data engineer contract"
- "OneLake data pipeline contractor"
- "data platform migration engineer"

For cloud/API/microservices:
- "cloud migration engineer contract"
- "platform engineer contract Kubernetes"
- "microservices migration Java contractor"
- "API modernization developer contract"
- "DevOps SRE cloud migration contractor"

For healthcare:
- "FHIR developer contract"
- "HL7 integration engineer contract"
- "Epic integration developer contract"
- "healthcare data interoperability contractor"
- "claims modernization developer contract"

For insurance:
- "Guidewire developer contract"
- "Duck Creek developer contract"
- "claims platform integration developer"
- "insurance policy admin developer contract"
- "insurance data migration contractor"

Seed data:
Add at least 10 AI / Cloud / Enterprise Platforms sample signals.

Required examples:
1. SAP + Palantir + Accenture AI-supported SAP Cloud ERP migration partnership
Category: AI / Cloud / Enterprise Platforms
Event Type: SAP BTP / Joule / S/4HANA Implementation OR SAP Modernization
Signal Strength: High
Software angle: SAP data migration, ERP modernization, AI-supported migration, QA, data remediation

2. ServiceNow AI governance / Now Assist / AI Control Tower rollout
Category: AI / Cloud / Enterprise Platforms
Event Type: ServiceNow AI / Now Assist Implementation
Signal Strength: High
Software angle: workflow automation, AI governance, integrations, ServiceNow development

3. OpenAI enterprise deployment company / AI implementation services
Category: AI / Cloud / Enterprise Platforms
Event Type: Enterprise AI Rollout
Signal Strength: High
Software angle: LLM apps, RAG, enterprise integration, Python/backend, MLOps

4. Anthropic legal-tech integrations
Category: AI / Cloud / Enterprise Platforms
Event Type: LLM / RAG Implementation
Signal Strength: High
Software angle: document workflows, DocuSign/Box/Everlaw/API integrations, legal AI

5. IBM Enterprise Advantage hybrid-AI platform
Category: AI / Cloud / Enterprise Platforms
Event Type: MLOps / Model Platform Modernization
Signal Strength: Medium-High
Software angle: watsonx/OpenShift, agentic AI, workflow modernization, governance

6. Microsoft Fabric / Osmos data engineering acquisition
Category: AI / Cloud / Enterprise Platforms
Event Type: Data Platform Migration
Signal Strength: High
Software angle: Fabric/OneLake, data prep, pipelines, AI-ready data

7. Example healthcare FHIR modernization
Category: AI / Cloud / Enterprise Platforms
Event Type: Healthcare EHR / FHIR Modernization
Signal Strength: High
Software angle: FHIR APIs, HL7 interfaces, claims/EHR integration, healthcare data

8. Example insurance Guidewire modernization
Category: AI / Cloud / Enterprise Platforms
Event Type: Insurance Claims / Policy Platform Modernization
Signal Strength: High
Software angle: Guidewire/Duck Creek, claims APIs, data conversion, QA

9. Example retail loyalty/payment modernization
Category: AI / Cloud / Enterprise Platforms
Event Type: Retail Loyalty / E-commerce Platform Modernization
Signal Strength: Medium-High
Software angle: loyalty engine, payments, customer data platform, mobile/API integration

10. Example logistics supply-chain platform modernization
Category: AI / Cloud / Enterprise Platforms
Event Type: Logistics / Supply Chain Platform Modernization
Signal Strength: Medium-High
Software angle: WMS/TMS, tracking APIs, data pipelines, optimization tools

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

AI platforms page UI:
Update app/ai-platforms/page.tsx.

Required behavior:
- Show only AI / Cloud / Enterprise Platforms signals.
- Show executive summary cards:
  1. Top 3 AI/cloud/platform software job signals
  2. Best AI/cloud/platform locations
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
  - Export AI Platforms CSV
  - Export AI Platforms Markdown
  - Export AI Platforms JSON

Today's ready-to-copy search strings:
Add a table on the AI Platforms page with columns:
- #
- Search Query
- Best For
- Suggested Location Filter

Auto-classify behavior:
On Add Signal page, when the user enters raw text like:

"SAP announced an AI-supported cloud ERP migration partnership with Palantir and Accenture to help customers move to SAP Cloud ERP, improve data readiness, automate migration workflows, and modernize enterprise systems."

The Auto-classify button should produce:
- Category: AI / Cloud / Enterprise Platforms
- Event Type: SAP BTP / Joule / S/4HANA Implementation OR SAP Modernization
- Signal Strength: High
- Roles:
  - SAP Developer
  - SAP BTP Developer
  - SAP Integration Developer
  - Java Developer
  - Data Engineer
  - ETL Developer
  - QA Automation/SDET
  - ERP Business Systems Analyst
  - Technical Business Analyst
- Locations:
  - New York, NY
  - Chicago, IL
  - Dallas, TX
  - Atlanta, GA
  - Austin, TX
  - Houston, TX
  - San Francisco Bay Area, CA
  - Remote vendor delivery
- Keywords:
  - SAP BTP developer contract
  - SAP Joule integration contractor
  - S/4HANA migration data engineer
  - SAP Cloud ERP migration SDET
  - SAP integration developer contract
  - SAP data migration contractor

Dashboard integration:
Make sure AI / Cloud / Enterprise Platforms signals:
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
"SAP announced an AI-supported cloud ERP migration partnership with Palantir and Accenture to help customers move to SAP Cloud ERP, improve data readiness, automate migration workflows, and modernize enterprise systems."
Expected:
- Category = AI / Cloud / Enterprise Platforms
- Event Type = SAP BTP / Joule / S/4HANA Implementation OR SAP Modernization
- Signal Strength = High

Test 2:
Input:
"The company is rolling out enterprise AI agents using OpenAI and RAG workflows to automate customer support and internal knowledge search."
Expected:
- Category = AI / Cloud / Enterprise Platforms
- Event Type = LLM / RAG Implementation OR AI Agent Workflow Automation
- Signal Strength = High or Medium depending on scoring

Test 3:
Input:
"The insurer announced a Guidewire claims platform modernization and data migration program."
Expected:
- Category = AI / Cloud / Enterprise Platforms
- Event Type = Insurance Claims / Policy Platform Modernization
- Signal Strength = High

Test 4:
Input:
"The health system announced a FHIR and HL7 interoperability modernization program for EHR and claims data."
Expected:
- Category = AI / Cloud / Enterprise Platforms
- Event Type = Healthcare EHR / FHIR Modernization
- Signal Strength = High

Test 5:
Input:
"The retailer is modernizing its loyalty and e-commerce platform with new payment APIs and customer data platform integrations."
Expected:
- Category = AI / Cloud / Enterprise Platforms
- Event Type = Retail Loyalty / E-commerce Platform Modernization
- Signal Strength = Medium-High or High

companiesMentioned rules:
- Only list companies that are direct actors: the announcing company, the named implementation partner, or the acquired company.
- Use each company's TRUE sector, not their role in this deal.
- Do NOT list Snowflake, Databricks, Microsoft Fabric, SAP, Salesforce, ServiceNow, Workday, Oracle, AWS, Azure, GCP as companiesMentioned. These are platform tools/infrastructure that are mentioned in signals but are not the news actors. List them in keywords and roles, not in companiesMentioned.
- Exception: if the news IS specifically about one of these companies (e.g. "Salesforce announces X"), then include them as primary actor.

Acceptance criteria:
- npm run dev works.
- AI Platforms page renders without runtime errors.
- AI Platforms page shows at least 10 seed signals.
- Filtering works.
- Expandable rows work.
- Copy keyword buttons work.
- Export CSV/Markdown/JSON works.
- Auto-classify correctly handles the SAP migration example.
- No external API calls are added.
- README is updated.
