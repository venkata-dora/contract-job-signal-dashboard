# Category 3 Prompt: Cyber / Compliance / Regulatory

Implement Category 3: Cyber / Compliance / Regulatory for the local no-API contract-job-signal dashboard.

Hard constraints:
- Do not use external APIs.
- Do not add scheduling.
- Do not add backend services.
- Use only TypeScript rule logic, seed data, manual input, and browser localStorage.
- Preserve the existing app architecture.
- Do not break other categories.
- Make sure npm run dev works.

Goal:
Build a high-quality Cyber / Compliance / Regulatory module that detects forced-change events likely to create contract SOFTWARE jobs through cybersecurity incidents, regulatory remediation, privacy incidents, unauthorized AI/tool usage, consent orders, AML/KYC remediation, fraud/risk controls, AppSec remediation, IAM hardening, DLP, audit trails, GRC workflows, and risk/compliance platform upgrades.

This category should catch events like:
- ransomware
- data breaches
- cyber incidents
- SaaS breaches
- supply-chain attacks
- dependency attacks
- credential exposure
- unauthorized AI/tool usage incidents
- privacy incidents
- SEC cyber disclosures
- 8-K cyber disclosures
- material disclosures
- consent orders
- MRAs / MRIAs
- regulatory enforcement actions
- AML / KYC remediation
- sanctions remediation
- fraud controls
- model-risk management
- AI governance
- privacy controls
- DLP
- IAM hardening
- AppSec remediation
- CI/CD hardening
- audit trails
- regulatory reporting
- GRC workflow modernization
- ServiceNow GRC/security workflow implementation

Files to update or create:
- app/cyber/page.tsx
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
"Cyber / Compliance / Regulatory"

Primary event types to support:
- Cyber Incident / Breach Remediation
- Ransomware / Recovery Remediation
- SaaS Breach / Customer Data Exposure
- Software Supply-Chain Attack
- Dependency / Package Repository Attack
- Credential Exposure / Secret Rotation
- Unauthorized AI Tool Usage / Data Leakage
- Privacy Incident / Data Governance Remediation
- SEC Cyber Disclosure / 8-K Material Incident
- Consent Order / Regulatory Remediation
- MRA / MRIA Remediation
- AML/KYC Regulatory Remediation
- Sanctions Screening Remediation
- Fraud/Risk Platform Modernization
- Model-Risk / AI Governance Remediation
- IAM Hardening
- DLP / Data Protection Remediation
- AppSec / Vulnerability Remediation Prioritization
- AppSec Remediation
- CI/CD Security Hardening
- GRC Workflow Modernization
- Regulatory Reporting Modernization
- ServiceNow GRC / Security Workflow Implementation

Classification rules:
Update classifySignal or equivalent function so that Cyber / Compliance / Regulatory is selected when text includes strong cyber/compliance markers.

Strong markers:
- cyber incident
- cybersecurity incident
- breach
- data breach
- ransomware
- malware
- exfiltration
- unauthorized access
- customer data exposure
- data exposure
- compromised credentials
- credential exposure
- leaked secrets
- secret rotation
- supply-chain attack
- software supply chain
- dependency attack
- npm package
- PyPI package
- GitHub token
- SaaS breach
- SEC cyber disclosure
- 8-K cyber
- material cyber incident
- consent order
- MRA
- MRIA
- enforcement action
- regulatory remediation
- AML remediation
- KYC remediation
- sanctions remediation
- transaction monitoring
- fraud controls
- model-risk remediation
- AI governance
- unauthorized AI
- unauthorized tool
- data leakage
- DLP
- IAM hardening
- identity hardening
- AppSec remediation
- application security remediation
- CI/CD hardening
- GRC workflow
- ServiceNow GRC
- regulatory reporting

Strong markers (additional):
- vulnerability management
- vulnerability prioritization
- exploit intelligence
- active exploits
- AppSec / vulnerability remediation prioritization
- vulnerability scanning
- patch prioritization

Medium markers:
- privacy incident
- audit finding
- risk controls
- compliance controls
- access controls
- identity controls
- security enhancement
- security program
- data governance
- model governance
- suspicious activity
- vendor risk
- third-party risk
- cloud security posture
- incident response
- forensic investigation

Note: "SOC", "SIEM", "SOAR" alone are medium markers. Treat them as strong ONLY when combined with a specific remediation, breach, or consent-order context.

Conflict rule:
If multiple categories match, Cyber / Compliance / Regulatory should win when:
- the event is primarily about breach, ransomware, cyber incident, customer-data exposure, regulatory remediation, consent order, MRA/MRIA, AML/KYC remediation, privacy incident, or unauthorized AI/tool usage
- the work is about remediation, controls, security hardening, audit trails, compliance workflows, regulatory reporting, or identity/data protection
- the event is disclosed through an 8-K, SEC filing, regulatory filing, consent order, or enforcement action

Event type inference:
Implement inferCyberComplianceEventType(text) or equivalent.

Expected mappings:
- ransomware OR malware OR encrypted systems => Ransomware / Recovery Remediation
- breach OR data breach OR customer data exposure => Cyber Incident / Breach Remediation
- SaaS breach OR third-party SaaS => SaaS Breach / Customer Data Exposure
- supply-chain attack OR dependency attack OR npm OR PyPI OR GitHub token => Software Supply-Chain Attack
- credential exposure OR leaked secrets OR secret rotation => Credential Exposure / Secret Rotation
- unauthorized AI OR unauthorized tool OR AI data leakage => Unauthorized AI Tool Usage / Data Leakage
- privacy incident OR data governance => Privacy Incident / Data Governance Remediation
- SEC cyber OR 8-K cyber OR material cyber incident => SEC Cyber Disclosure / 8-K Material Incident
- consent order OR enforcement action => Consent Order / Regulatory Remediation
- MRA OR MRIA => MRA / MRIA Remediation
- AML OR KYC OR transaction monitoring => AML/KYC Regulatory Remediation
- sanctions => Sanctions Screening Remediation
- fraud controls OR risk platform => Fraud/Risk Platform Modernization
- model risk OR AI governance => Model-Risk / AI Governance Remediation
- IAM OR identity hardening OR access controls => IAM Hardening
- DLP OR data protection => DLP / Data Protection Remediation
- AppSec OR application security OR vulnerability remediation OR vulnerability prioritization OR exploit intelligence => AppSec / Vulnerability Remediation Prioritization OR AppSec Remediation
- CI/CD OR pipeline security => CI/CD Security Hardening
- GRC OR ServiceNow GRC => GRC Workflow Modernization

Scoring rules:
Update calculateSignalScore or equivalent.

Weights:
- +5 ransomware
- +5 data breach / customer data exposure
- +5 material SEC/8-K cyber disclosure
- +5 consent order / enforcement action
- +5 MRA / MRIA remediation
- +5 AML/KYC remediation
- +5 unauthorized AI/tool data leakage
- +5 software supply-chain attack
- +5 credential exposure requiring secret rotation
- +4 AppSec remediation
- +4 IAM hardening
- +4 DLP / data protection remediation
- +4 fraud/risk platform modernization
- +4 model-risk / AI governance remediation
- +4 regulatory reporting remediation
- +4 GRC workflow modernization
- +3 sanctions screening remediation
- +3 CI/CD hardening
- +3 vendor/third-party risk remediation
- +3 privacy controls/data governance remediation
- +2 broad security program enhancement
- +2 cyber partnership or vendor selection
- +1 generic security product launch
- -2 stock-only movement
- -2 executive hire only
- -2 physical security only
- -2 generic compliance statement with no remediation detail

Signal strength:
- High = score >= 5
- Medium = score 3-4
- Low = score <= 2

Role mapping:
Update getLikelyRoles or equivalent.

Default Cyber / Compliance / Regulatory roles:
- AppSec Engineer
- DevSecOps Engineer
- Cybersecurity Software Engineer
- IAM Engineer
- Cloud Security Engineer
- Python Developer
- Data Engineer
- QA Automation/SDET
- Business Systems Analyst
- Technical Business Analyst

For AppSec / vulnerability management:
- Vulnerability Management Engineer
- AppSec Engineer
- Security Automation Engineer
- Python Developer
- Backend Engineer
- Data Engineer
- Cloud Security Engineer
- SIEM/SOAR Integration Developer
- QA Automation/SDET
- Technical Business Analyst

For ransomware / breach:
- Incident Response Automation Engineer
- AppSec Engineer
- DevSecOps Engineer
- IAM Engineer
- Cloud Security Engineer
- Data Privacy Engineer
- Python Developer
- Security Data Engineer
- QA Automation/SDET
- Technical Business Analyst

For software supply-chain / dependency attack:
- DevSecOps Engineer
- CI/CD Security Engineer
- Platform Engineer
- Software Supply Chain Security Engineer
- Python Developer
- Go Developer
- AppSec Engineer
- Cloud Security Engineer

For credential exposure / IAM:
- IAM Engineer
- Identity Security Engineer
- Entra ID / Okta Engineer
- Cloud Security Engineer
- DevSecOps Engineer
- Security Automation Engineer
- Technical Business Analyst

For AML/KYC / regulatory remediation:
- AML/KYC Systems Developer
- Fraud/Risk Systems Developer
- Data Engineer
- Java Developer
- Python Developer
- Regulatory Reporting Developer
- QA Automation/SDET
- GRC Automation Analyst
- Business Systems Analyst

For AI governance / unauthorized AI:
- AI Governance Engineer
- Model Governance Engineer
- Data Governance Engineer
- DLP Engineer
- IAM Engineer
- AppSec Engineer
- Python Developer
- Technical Business Analyst

For ServiceNow GRC/security workflow:
- ServiceNow Security Developer
- ServiceNow GRC Developer
- Workflow Automation Engineer
- API Integration Developer
- QA Automation/SDET
- GRC Automation Analyst

Location rules:
Update inferLikelyLocations or equivalent.

General cyber/compliance hubs:
- New York, NY
- Jersey City, NJ
- Charlotte, NC
- Wilmington, DE
- Columbus, OH
- Dallas, TX
- Chicago, IL
- Atlanta, GA
- Phoenix, AZ
- Austin, TX
- Boston, MA
- San Francisco Bay Area, CA
- Seattle, WA
- Washington, DC
- Northern Virginia
- Remote cyber vendor delivery

For federal cyber/compliance:
- Washington, DC
- Northern Virginia
- Maryland
- Huntsville, AL
- San Antonio, TX
- Colorado Springs, CO
- Tampa, FL
- St. Louis, MO
- Remote cleared/vendor delivery

For banking regulatory remediation:
- New York, NY
- Jersey City, NJ
- Charlotte, NC
- Wilmington, DE
- Columbus, OH
- Plano/Dallas, TX
- Chicago, IL
- Atlanta, GA
- Phoenix, AZ
- DC/Northern Virginia
- Remote vendor delivery

For healthcare privacy/security:
- Nashville, TN
- Boston, MA
- Atlanta, GA
- Dallas, TX
- Chicago, IL
- Minneapolis, MN
- Philadelphia, PA
- Remote healthcare IT

For SaaS breach / cloud security:
- San Francisco Bay Area, CA
- Seattle, WA
- Austin, TX
- Denver, CO
- Boston, MA
- New York, NY
- Remote

Keyword generation:
Update generateSearchKeywords or equivalent.

Generate 5-8 exact search phrases per signal.

For breach/ransomware:
- "[Company] breach remediation engineer contract"
- "[Company] incident response automation contractor"
- "ransomware recovery engineer contract"
- "AppSec remediation contractor"
- "IAM hardening engineer contract"
- "data privacy remediation developer"
- "security automation engineer contract"

For SEC/8-K cyber disclosure:
- "[Company] 8-K cyber remediation contractor"
- "material cyber incident remediation engineer"
- "SEC cyber disclosure security engineer"
- "cyber incident data privacy contractor"
- "regulatory cyber reporting developer"

For software supply-chain:
- "software supply chain security contractor"
- "CI/CD security engineer contract"
- "dependency scanning engineer contractor"
- "npm PyPI security remediation"
- "GitHub token rotation engineer"
- "DevSecOps pipeline hardening contract"

For AML/KYC:
- "AML KYC developer contract"
- "transaction monitoring systems developer"
- "sanctions screening engineer contract"
- "bank consent order remediation contractor"
- "regulatory reporting developer banking"
- "fraud risk platform engineer contract"

For AI governance:
- "AI governance engineer contractor"
- "model risk governance developer"
- "unauthorized AI tool remediation"
- "DLP AI data leakage engineer"
- "enterprise AI compliance developer"
- "AI audit trail engineer contract"

For ServiceNow GRC:
- "ServiceNow GRC developer contract"
- "ServiceNow security workflow developer"
- "GRC automation analyst contract"
- "risk compliance workflow engineer"
- "ServiceNow IRM implementation contractor"

Seed data:
Add at least 8 Cyber / Compliance / Regulatory sample signals.

Required examples:
1. Example ransomware breach at a manufacturing company
Category: Cyber / Compliance / Regulatory
Event Type: Ransomware / Recovery Remediation
Signal Strength: High
Software angle: incident response automation, IAM hardening, endpoint recovery, AppSec remediation, audit logging

2. Example SaaS breach affecting customer data
Category: Cyber / Compliance / Regulatory
Event Type: SaaS Breach / Customer Data Exposure
Signal Strength: High
Software angle: application security, data privacy workflows, logging, access controls, customer notification systems

3. Example software supply-chain attack against npm/PyPI packages
Category: Cyber / Compliance / Regulatory
Event Type: Software Supply-Chain Attack
Signal Strength: High
Software angle: CI/CD hardening, dependency scanning, secret rotation, artifact signing

4. Example bank consent order requiring AML/KYC remediation
Category: Cyber / Compliance / Regulatory
Event Type: AML/KYC Regulatory Remediation
Signal Strength: High
Software angle: transaction monitoring, case management, data pipelines, regulatory reporting

5. Example unauthorized AI tool usage at a bank or enterprise
Category: Cyber / Compliance / Regulatory
Event Type: Unauthorized AI Tool Usage / Data Leakage
Signal Strength: High
Software angle: AI governance, DLP, IAM, audit logging, approved AI workflow tooling

6. Example healthcare privacy breach
Category: Cyber / Compliance / Regulatory
Event Type: Privacy Incident / Data Governance Remediation
Signal Strength: High
Software angle: HIPAA workflows, access controls, data mapping, notification systems

7. Example ServiceNow GRC modernization
Category: Cyber / Compliance / Regulatory
Event Type: GRC Workflow Modernization
Signal Strength: Medium-High
Software angle: ServiceNow IRM/GRC implementation, workflow automation, reporting

8. Example SEC 8-K material cyber disclosure
Category: Cyber / Compliance / Regulatory
Event Type: SEC Cyber Disclosure / 8-K Material Incident
Signal Strength: High
Software angle: remediation, audit trails, reporting, security controls, data governance

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

Cyber page UI:
Update app/cyber/page.tsx.

Required behavior:
- Show only Cyber / Compliance / Regulatory signals.
- Show executive summary cards:
  1. Top 3 cyber/compliance software job signals
  2. Best cyber/compliance locations
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
  - Export Cyber CSV
  - Export Cyber Markdown
  - Export Cyber JSON

Today's ready-to-copy search strings:
Add a table on the Cyber page with columns:
- #
- Search Query
- Best For
- Suggested Location Filter

Auto-classify behavior:
On Add Signal page, when the user enters raw text like:

"The company disclosed a material cybersecurity incident in an 8-K filing after unauthorized access exposed customer data. The company is working with external forensic advisors and enhancing IAM, DLP, and application security controls."

The Auto-classify button should produce:
- Category: Cyber / Compliance / Regulatory
- Event Type: SEC Cyber Disclosure / 8-K Material Incident
- Signal Strength: High
- Roles:
  - AppSec Engineer
  - DevSecOps Engineer
  - Cybersecurity Software Engineer
  - IAM Engineer
  - Cloud Security Engineer
  - Python Developer
  - Data Engineer
  - QA Automation/SDET
  - Business Systems Analyst
  - Technical Business Analyst
- Locations:
  - Company HQ
  - New York, NY
  - Jersey City, NJ
  - Dallas, TX
  - Chicago, IL
  - Atlanta, GA
  - Washington, DC
  - Northern Virginia
  - Remote cyber vendor delivery
- Keywords:
  - 8-K cyber remediation contractor
  - material cyber incident remediation engineer
  - SEC cyber disclosure security engineer
  - cyber incident data privacy contractor
  - IAM hardening engineer contract
  - AppSec remediation contractor

Dashboard integration:
Make sure Cyber / Compliance / Regulatory signals:
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
"The company disclosed a material cybersecurity incident in an 8-K filing after unauthorized access exposed customer data. The company is working with external forensic advisors and enhancing IAM, DLP, and application security controls."
Expected:
- Category = Cyber / Compliance / Regulatory
- Event Type = SEC Cyber Disclosure / 8-K Material Incident
- Signal Strength = High

Test 2:
Input:
"A ransomware attack encrypted systems and caused data exfiltration. The company is rebuilding identity controls and improving incident response automation."
Expected:
- Category = Cyber / Compliance / Regulatory
- Event Type = Ransomware / Recovery Remediation
- Signal Strength = High

Test 3:
Input:
"The bank entered a consent order requiring AML, KYC, transaction monitoring, and sanctions screening remediation."
Expected:
- Category = Cyber / Compliance / Regulatory OR Banking / Payments / Fintech depending on existing conflict rules, but event type must indicate AML/KYC Regulatory Remediation and Signal Strength must be High

Test 4:
Input:
"Attackers compromised npm and PyPI packages, requiring CI/CD hardening, dependency scanning, and GitHub token rotation."
Expected:
- Category = Cyber / Compliance / Regulatory
- Event Type = Software Supply-Chain Attack
- Signal Strength = High

Test 5:
Input:
"Employees used an unauthorized AI tool that exposed non-public customer information. The company is implementing AI governance, DLP, and audit logging."
Expected:
- Category = Cyber / Compliance / Regulatory
- Event Type = Unauthorized AI Tool Usage / Data Leakage
- Signal Strength = High

companiesMentioned rules:
- Only list companies that are direct actors: the breached company, the regulator, or a named remediation vendor.
- Use each company's TRUE sector. A cybersecurity vendor is "Cybersecurity", not "Identity" just because IAM is mentioned.
- Do NOT list CrowdStrike, Palo Alto Networks, Okta, Zscaler, SentinelOne as companiesMentioned unless they ARE the news actor. They are commonly used tools, not story actors.
- Do NOT list cloud platforms (AWS, Azure, GCP) as companiesMentioned.
- Differentiate sub-sectors correctly: AppSec/vuln management ≠ identity/IAM ≠ endpoint ≠ network security.

Acceptance criteria:
- npm run dev works.
- Cyber page renders without runtime errors.
- Cyber page shows at least 8 seed signals.
- Filtering works.
- Expandable rows work.
- Copy keyword buttons work.
- Export CSV/Markdown/JSON works.
- Auto-classify correctly handles the 8-K cyber example.
- No external API calls are added.
- README is updated.
