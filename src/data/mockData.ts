import { Prospect, PersonaStrategy, EmailAccount, FunnelStats } from '../types';

export const PERSONA_STRATEGIES: PersonaStrategy[] = [
  {
    id: 'compliance',
    title: 'Compliance & Governance CISO',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    borderColor: 'border-emerald-300 dark:border-emerald-500/30',
    iconName: 'ShieldCheck',
    targetTitles: ['Chief Information Security Officer', 'Head of Cyber Risk', 'VP of Information Assurance', 'BISO'],
    certifications: ['CISA', 'CRISC', 'CISM', 'CDPSE'],
    corePainPoints: [
      'SEC Material Cyber Incident Disclosure rule compliance (4-day timeline)',
      'Regulatory compliance liabilities (DORA, NIS2, SOC 2 Type II, ISO 27001)',
      'Board-level reporting and translating technical risk into fiduciary liability',
      'Third-party supply chain risk governance and vendor audit fatigue'
    ],
    messagingHook: 'Frame around board audit exposure, regulatory penalties, and governance verification.',
    cvePitchAngle: 'Highlight how this active CVE exposes their perimeter to compliance non-conformance and mandatory regulator notification under new disclosure mandates.',
    sampleSubject: 'Fiduciary risk & DORA exposure regarding {{TechStackItem}} at {{Company}}',
    sampleBody: 'Hi {{Name}},\n\nNoticed {{Company}}\'s recent expansion into regulated EMEA corridors. Given your active {{TechStackItem}} deployment and the recent MISP Open Threat Feed advisory regarding {{CVE_ID}}, your exposure profile touches critical DORA audit milestones.\n\nMost CISOs we consult are concerned about the mandatory 4-hour reporting threshold if this perimeter vector is probed. We built an automated governance bridge that validates zero-exposure for external auditors without burdening your analysts.\n\nOpen to reviewing our 1-page compliance crosswalk for {{TechStackItem}} this Thursday?',
    systemPromptSnippet: 'Role: Compliance CISO Advisor. Focus on: Audit liability, board reporting, regulatory mandates (DORA/SEC), risk governance. Tone: Fiduciary, executive, measured.'
  },
  {
    id: 'soc_ops',
    title: 'SOC & Operations-Oriented CISO',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400',
    textColor: 'text-blue-700 dark:text-blue-400',
    borderColor: 'border-blue-300 dark:border-blue-500/30',
    iconName: 'Activity',
    targetTitles: ['VP of Security Operations', 'Director of SecOps & IR', 'Head of Cyber Defense Center', 'CISO - Operations'],
    certifications: ['GCIH', 'GCFA', 'CISSP', 'CCSP'],
    corePainPoints: [
      'Severe Tier-1 analyst burnout and 10,000+ daily false-positive alerts',
      'High Mean Time to Detect (MTTD) and Mean Time to Remediate (MTTR)',
      'Telemetry fragmentation across multi-cloud and disparate SIEM/SOAR silos',
      '24/7 on-call friction and off-hours triage bottlenecks'
    ],
    messagingHook: 'Focus on alert noise reduction, accelerating triage MTTR, and stopping active containment loops.',
    cvePitchAngle: 'Show how active exploitation of {{CVE_ID}} is generating noisy triage churn in SecOps, and how automated pre-filtering stops analyst burnout.',
    sampleSubject: 'Cutting MTTR on {{TechStackItem}} exploit telemetry at {{Company}}',
    sampleBody: 'Hi {{Name}},\n\nWith threat actors actively scanning for {{CVE_ID}} against {{TechStackItem}} per the latest CISA KEV alert, your SecOps team is likely fielding spikes of noisy perimeter telemetry.\n\nIn our benchmark with similar teams, tier-1 analysts spend ~14 hours weekly manually validating whether perimeter ingress probes actually compromised internal gateways.\n\nWe deployed a lightweight suppression proxy that auto-quarantines {{CVE_ID}} probes with zero analyst intervention. Would it make sense to share the telemetry blueprint with your SecOps lead?',
    systemPromptSnippet: 'Role: SecOps Operational Specialist. Focus on: Noise suppression, MTTR, telemetry triage, analyst burnout, active containment. Tone: Tactical, operational, high-efficiency.'
  },
  {
    id: 'vulnerability_mgmt',
    title: 'Vulnerability Management & Exposure CISO',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400',
    textColor: 'text-amber-700 dark:text-amber-400',
    borderColor: 'border-amber-300 dark:border-amber-500/30',
    iconName: 'AlertTriangle',
    targetTitles: ['Head of Vulnerability Management', 'Director of Exposure Management', 'VP AppSec', 'CISO'],
    certifications: ['GWAPT', 'GPEN', 'CISM', 'CEH'],
    corePainPoints: [
      'Unmanageable 50,000+ CVE remediation backlog across engineering silos',
      'Engineering friction: DevOps teams pushing back on intrusive patch schedules',
      'CVSS inflation (every scanner flags everything as 9.0+ without real exploit context)',
      'Lack of correlation between scanner outputs and weaponized threat actor campaigns'
    ],
    messagingHook: 'Focus on risk-based prioritization, CISA KEV / EPSS exploitation signals, and zero-patch mitigation.',
    cvePitchAngle: 'Zero in on the specific weaponized exploit chain of {{CVE_ID}} (EPSS {{EPSS}}) and how to de-prioritize non-reachable CVEs to liberate developer sprints.',
    sampleSubject: 'Prioritizing {{CVE_ID}} patch cycles for {{Company}}\'s {{TechStackItem}}',
    sampleBody: 'Hi {{Name}},\n\nSaw your talk on balancing DevOps release velocity with exposure SLAs. We know how frustrating it is when traditional scanners dump 400 "Criticals" on engineering teams.\n\nSpecifically for {{Company}}\'s {{TechStackItem}} cluster, {{CVE_ID}} has reached an EPSS rating of {{EPSS}} with verified in-the-wild weaponization. Yet 80% of other flagged vulnerabilities in that subsystem are non-exploitable noise.\n\nOur engine pinpoints reachability so engineering only has to patch what threat actors can actually trigger. Free for 10 minutes next Tuesday to see our reachability proof-of-concept?',
    systemPromptSnippet: 'Role: Vulnerability Prioritization Strategist. Focus on: EPSS scores, CISA KEV, developer patch fatigue, reachability analysis, exploit weaponization. Tone: Pragmatic, data-driven, engineering-aligned.'
  },
  {
    id: 'technical',
    title: 'Technical & Architecture-First CISO',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-500/10 dark:border-purple-500/30 dark:text-purple-400',
    textColor: 'text-purple-700 dark:text-purple-400',
    borderColor: 'border-purple-300 dark:border-purple-500/30',
    iconName: 'Cpu',
    targetTitles: ['Chief Security Architect', 'VP Infrastructure & Security', 'Distinguished Security Engineer', 'Technical CISO'],
    certifications: ['OSCP', 'OSWE', 'SANS GSE', 'CISSP-ISSAP'],
    corePainPoints: [
      'Disdain for generic vendor marketing fluff and empty "AI-powered" slogans',
      'Complex architectural blast radiuses across hybrid cloud/mesh topologies',
      'API surface leakage and identity privilege escalation loops',
      'Rigid vendor agents degrading kernel and container runtime performance'
    ],
    messagingHook: 'Deep technical specificity, zero marketing buzzwords, architectural diagram, API-first demonstration.',
    cvePitchAngle: 'Analyze the low-level execution primitive of {{CVE_ID}} (buffer overflow, deserialization, auth bypass) and demonstrate defense-in-depth isolation.',
    sampleSubject: 'Deconstructing {{CVE_ID}} execution primitive in {{TechStackItem}}',
    sampleBody: 'Hi {{Name}},\n\nSkipping the vendor pitch: {{CVE_ID}} in {{TechStackItem}} relies on a specific unauthenticated memory boundary leak in the session handler. If your perimeter terminates TLS directly at the ingress controller, traditional WAF inspection misses the out-of-bounds read.\n\nWe wrote an eBPF probe that hooks into the container syscall layer to detect memory dereference spikes in sub-millisecond cycles without kernel overhead.\n\nHere is our raw GitHub repo and architecture benchmark. If you want to spin up a local container lab and test the bypass yourself, happy to send the Dockerfile.',
    systemPromptSnippet: 'Role: Principal Security Architect. Focus on: Assembly/syscall level primitives, eBPF, memory safety, architectural blast radius, API boundaries. Tone: Deep technical peer, concise, zero marketing jargon.'
  }
];

export const INITIAL_PROSPECTS: Prospect[] = [
  {
    id: 'pr-101',
    name: 'Elena Vance',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Chief Information Security Officer',
    company: 'Apex Global FinTech',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=60&auto=format&fit=crop&q=80',
    companySize: '2,500 - 5,000 employees',
    industry: 'Financial Services & Payments',
    location: 'New York, NY, USA',
    source: 'ZoomInfo',
    tier1CheapPass: {
      verified: true,
      syntaxValid: true,
      mxActive: true,
      publicFootprintFound: true,
      cost: 0
    },
    tier2Enriched: {
      unlocked: true,
      workEmail: 'elena.vance@apexfintech.com',
      directPhone: '+1 (212) 849-2104',
      creditCost: 1,
      unlockedAt: '2026-09-12 14:22'
    },
    techStack: [
      { name: 'Citrix NetScaler ADC', category: 'Perimeter Gateway', detectedVia: 'Shodan / DNS Banner' },
      { name: 'AWS GovCloud', category: 'Cloud Infrastructure', detectedVia: 'ZoomInfo Technographics' },
      { name: 'Splunk Enterprise Security', category: 'SIEM / Analytics', detectedVia: 'Job Postings' },
      { name: 'Okta Identity Cloud', category: 'IAM', detectedVia: 'SAML Metadata' }
    ],
    matchedVulnerability: {
      cveId: 'CVE-2023-4966',
      name: 'Citrix Bleed (Session Token Leakage)',
      severity: 'Critical',
      cvss: 9.8,
      epssScore: '94.2%',
      cisaKev: true,
      advisorySource: 'MISP Open Threat Event #MISP-2023-1088',
      summary: 'Sensitive information disclosure vulnerability allowing unauthenticated threat actors to extract ephemeral session tokens and bypass multi-factor authentication entirely.',
      businessImpact: 'Mandatory SEC 4-day material incident disclosure trigger if session compromise occurs across payment gateway nodes.'
    },
    persona: {
      type: 'compliance',
      label: 'Compliance & Governance CISO',
      confidence: 96,
      rationale: 'Keynote speaker at SIFMA Cyber Forum on SEC disclosure readiness; holds CISA & CRISC certifications; board advisor for FinTech audit risk.',
      triggerSignals: [
        'Frequent LinkedIn commentary on DORA compliance deadlines',
        'Published whitepaper: "Navigating FinTech Fiduciary Risk in 2026"',
        'Former Director of Cyber Risk & Assurance at PwC'
      ],
      recommendedTone: 'Fiduciary, structured, audit-centric, board-level impact'
    },
    researchSignals: {
      linkedinBioSnippet: 'CISO steering cybersecurity, governance, and institutional regulatory compliance for 40M+ active global payment accounts.',
      recentPublications: [
        'SEC Materiality Thresholds: What FinTech Boards Must Know (Forbes Tech Council, Jan 2026)'
      ],
      recentTalks: [
        'Panel Lead: DORA Harmonization in Tier-1 Financial Infrastructure (RSA Conference 2026)'
      ],
      awardsOrCertifications: ['CISA', 'CRISC', 'Top 50 Women in Cybersecurity 2025']
    },
    outreachDraft: {
      subject: 'Fiduciary risk & DORA exposure regarding Citrix NetScaler at Apex Global',
      body: 'Hi Elena,\n\nNoticed Apex Global\'s recent expansion into cross-border transaction gateways across Frankfurt and London. Given your active Citrix NetScaler ADC deployment and the recent MISP Open Threat Feed advisory regarding CVE-2023-4966, your exposure profile directly intersects with strict DORA third-party audit deadlines.\n\nFinTech CISOs we advise are particularly focused on the SEC\'s strict disclosure timeline if perimeter token leakage is detected in external logs. We developed an automated governance validator that confirms token-isolation compliance for external auditors without burdening your SecOps team.\n\nOpen to reviewing our 1-page regulatory compliance crosswalk for NetScaler this Thursday at 2 PM ET?',
      previewHook: 'Anchored on DORA compliance & SEC 4-day disclosure liability for NetScaler perimeter.',
      isDraftedInGmail: true,
      gmailDraftId: 'draft_19198f24a8',
      status: 'gmail_draft'
    }
  },
  {
    id: 'pr-102',
    name: 'Marcus Sterling',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'VP of Security Operations & Threat Defense',
    company: 'Helix Health Systems',
    companyLogo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=60&auto=format&fit=crop&q=80',
    companySize: '8,000 - 12,000 employees',
    industry: 'Healthcare & Hospital Networks',
    location: 'Boston, MA, USA',
    source: 'Apollo',
    tier1CheapPass: {
      verified: true,
      syntaxValid: true,
      mxActive: true,
      publicFootprintFound: true,
      cost: 0
    },
    tier2Enriched: {
      unlocked: true,
      workEmail: 'msterling@helixhealth.org',
      directPhone: '+1 (617) 552-9011',
      creditCost: 1,
      unlockedAt: '2026-09-12 15:40'
    },
    techStack: [
      { name: 'Palo Alto PAN-OS GlobalProtect', category: 'Perimeter VPN', detectedVia: 'TLS Certificate Inspection' },
      { name: 'CrowdStrike Falcon Complete', category: 'EDR / MDR', detectedVia: 'Apollo Technographics' },
      { name: 'ServiceNow SecOps', category: 'Incident Response SOAR', detectedVia: 'Job Postings' },
      { name: 'Epic EHR Systems', category: 'Healthcare Core', detectedVia: 'Hospital Registry' }
    ],
    matchedVulnerability: {
      cveId: 'CVE-2024-3400',
      name: 'Palo Alto PAN-OS Command Injection',
      severity: 'Critical',
      cvss: 10.0,
      epssScore: '97.8%',
      cisaKev: true,
      advisorySource: 'MISP Open Threat Advisory #MISP-2024-401',
      summary: 'Arbitrary command execution with root privileges in the GlobalProtect feature of PAN-OS, actively leveraged by state-sponsored actors to exfiltrate hospital network tokens.',
      businessImpact: 'Uncontained breach risks immediate clinical operational disruption and HIPAA notification mandate within 60 days.'
    },
    persona: {
      type: 'soc_ops',
      label: 'SOC & Operations-Oriented CISO',
      confidence: 93,
      rationale: 'Manages 45-person 24/7 healthcare SOC; frequent posts complaining about alert fatigue and overnight triage escalations; GCIH certified.',
      triggerSignals: [
        'LinkedIn post last month: "The 3 AM alert fatigue crisis in hospital SecOps is real."',
        'Panelist: "Squeezing Mean Time to Containment under 15 minutes"',
        'Focus on reducing Tier-1 escalation noise for hospital clinical networks'
      ],
      recommendedTone: 'Tactical, operational, urgent on MTTR, relief of analyst fatigue'
    },
    researchSignals: {
      linkedinBioSnippet: 'Defending 18 hospital facilities and 2M patient records. Obsessed with alert noise reduction, rapid containment, and protecting clinical telemetry.',
      recentPublications: [
        'De-noising the Healthcare SOC: Case Study in Alert Aggregation (Cyber Defense Mag, 2025)'
      ],
      recentTalks: [
        'Clinical Availability vs Containment Latency in Healthcare SecOps (HITRUST 2025)'
      ],
      awardsOrCertifications: ['GCIH', 'GCFA', 'Health-ISAC Operations Chair']
    },
    outreachDraft: {
      subject: 'Cutting MTTR on PAN-OS GlobalProtect telemetry at Helix Health',
      body: 'Hi Marcus,\n\nSaw your recent HITRUST talk on balancing clinical availability with containment speed. With state actors actively spraying CVE-2024-3400 against Palo Alto PAN-OS GlobalProtect instances per the CISA KEV notice, your SOC team is likely facing an influx of false-positive telemetry.\n\nIn 24/7 hospital SOCs, Tier-1 analysts are losing 12+ hours weekly manually determining whether external perimeter command probes actually achieved root privilege in the telemetry stream.\n\nWe built an inline telemetry scrubber that pre-filters unauthenticated PAN-OS injection attempts and auto-quarantines weaponized probes before they trigger 3 AM escalations for your on-call team.\n\nWould it make sense to send over a 2-minute video walkthrough of how we integrate with ServiceNow SecOps?',
      previewHook: 'Focus on 3 AM on-call alert fatigue & automated triage of PAN-OS probes.',
      isDraftedInGmail: false,
      status: 'pending_review'
    }
  },
  {
    id: 'pr-103',
    name: 'David Zhang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Head of Exposure Management & AppSec',
    company: 'NexaCloud Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=60&auto=format&fit=crop&q=80',
    companySize: '1,000 - 2,500 employees',
    industry: 'Enterprise Cloud Infrastructure',
    location: 'San Francisco, CA, USA',
    source: 'Trivly',
    tier1CheapPass: {
      verified: true,
      syntaxValid: true,
      mxActive: true,
      publicFootprintFound: true,
      cost: 0
    },
    tier2Enriched: {
      unlocked: false,
      workEmail: 'd.zhang@nexacloud.io',
      directPhone: '+1 (415) 890-3312',
      creditCost: 1
    },
    techStack: [
      { name: 'Jenkins CI/CD Automation', category: 'DevOps / CI/CD', detectedVia: 'Web Artifacts / Trivly' },
      { name: 'Kubernetes (EKS)', category: 'Container Orchestration', detectedVia: 'Tech Blog / Helm charts' },
      { name: 'GitLab Enterprise', category: 'Code Repository', detectedVia: 'Public SSH Keys' },
      { name: 'HashiCorp Vault', category: 'Secrets Management', detectedVia: 'Open Ports' }
    ],
    matchedVulnerability: {
      cveId: 'CVE-2024-23897',
      name: 'Jenkins CLI Arbitrary File Read',
      severity: 'Critical',
      cvss: 9.8,
      epssScore: '92.4%',
      cisaKev: true,
      advisorySource: 'MISP Open Threat Advisory #MISP-2024-082',
      summary: 'Command-line interface parser flaw in Jenkins allows unauthenticated attackers to read arbitrary files from the Jenkins controller file system, including encryption keys and git credentials.',
      businessImpact: 'Exposure of CI/CD secret keys risks automated supply chain tampering and unauthorized software release artifact injection.'
    },
    persona: {
      type: 'vulnerability_mgmt',
      label: 'Vulnerability Management & Exposure CISO',
      confidence: 91,
      rationale: 'Published deep dive on prioritizing EPSS over CVSS; frequently mentions reducing DevOps patch backlogs; speaker at AppSec Cali.',
      triggerSignals: [
        'Authored article: "Why CVSS 9.0 is meaningless without exploit weaponization"',
        'Leads cross-functional AppSec syncs between SecOps and release engineering',
        'Certified GWAPT and GPEN'
      ],
      recommendedTone: 'Data-driven, prioritizing weaponized exploits, developer-friendly'
    },
    researchSignals: {
      linkedinBioSnippet: 'Spearheading continuous threat exposure management (CTEM). Bridging the divide between vulnerability scanners and developer sprint capacity.',
      recentPublications: [
        'EPSS vs CVSS: Slashing Remediation Backlogs by 68% (DevSecOps Journal, 2025)'
      ],
      recentTalks: [
        'Practical Exposure Prioritization in High-Velocity CI/CD (AppSec Cali 2026)'
      ],
      awardsOrCertifications: ['GWAPT', 'GPEN', 'AppSec Innovator of the Year']
    },
    outreachDraft: {
      subject: 'Prioritizing CVE-2024-23897 patch cycle in NexaCloud\'s Jenkins fleet',
      body: 'Hi David,\n\nLoved your AppSec Cali session on ditching raw CVSS scores in favor of weaponization telemetry. Your point about developer friction from scanner noise really hit home.\n\nSpeaking of weaponization: regarding NexaCloud\'s Jenkins controllers, CVE-2024-23897 has surged to a 92.4% EPSS exploit score with active PoC chains circulating for credential extraction. While standard scanners flag 200+ benign vulnerabilities in that same environment, this one is actively weaponized against CI secrets.\n\nWe built an automated reachability filter that isolates whether your Jenkins CLI endpoint is actually exposed to external ingress, letting you deploy a targeted virtual patch instead of pausing engineering sprints.\n\nOpen to checking our reachability proof for Jenkins this week?',
      previewHook: 'Anchored on EPSS 92.4% exploit score vs benign backlog noise in Jenkins.',
      isDraftedInGmail: false,
      status: 'pending_review'
    }
  },
  {
    id: 'pr-104',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    title: 'Chief Security Architect & VP Infrastructure',
    company: 'Vanguard Defense Logistics',
    companyLogo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=60&auto=format&fit=crop&q=80',
    companySize: '5,000 - 10,000 employees',
    industry: 'Defense & Aerospace Systems',
    location: 'Washington, DC, USA',
    source: 'CSV Upload',
    tier1CheapPass: {
      verified: true,
      syntaxValid: true,
      mxActive: true,
      publicFootprintFound: true,
      cost: 0
    },
    tier2Enriched: {
      unlocked: false,
      workEmail: 'sjenkins@vanguarddefense.com',
      directPhone: '+1 (202) 490-8812',
      creditCost: 1
    },
    techStack: [
      { name: 'Fortinet FortiOS / FortiGate', category: 'Perimeter Firewall', detectedVia: 'CSV Import Metadata' },
      { name: 'Cisco ASA Infrastructure', category: 'Core Routing', detectedVia: 'CSV Import' },
      { name: 'Red Hat OpenShift', category: 'Private Cloud Platform', detectedVia: 'FedRAMP Directory' },
      { name: 'Okta Federal Identity', category: 'Zero Trust IAM', detectedVia: 'SAML Certificate' }
    ],
    matchedVulnerability: {
      cveId: 'CVE-2024-21762',
      name: 'FortiOS Out-of-Bounds Write (SSL VPN)',
      severity: 'Critical',
      cvss: 9.8,
      epssScore: '96.5%',
      cisaKev: true,
      advisorySource: 'MISP Open Threat Advisory #MISP-2024-119',
      summary: 'Critical out-of-bounds write flaw in FortiOS SSL VPN daemon allowing unauthenticated remote code execution via specially crafted HTTP requests.',
      businessImpact: 'Perimeter penetration directly impacts DoD contractor security clearance level and CMMC 2.0 Level 3 compliance status.'
    },
    persona: {
      type: 'technical',
      label: 'Technical & Architecture-First CISO',
      confidence: 97,
      rationale: 'Hands-on former security researcher with OSCP; authored Linux kernel hardening guides; active GitHub contributor to eBPF network security tools.',
      triggerSignals: [
        'GitHub profile shows active commits in Rust and C for eBPF packet filters',
        'Keynote: "Zero Trust Architecture is an implementation detail, not a buzzword"',
        'Holds OSCP and SANS GSE'
      ],
      recommendedTone: 'Deep technical, zero marketing jargon, architectural blast radius analysis'
    },
    researchSignals: {
      linkedinBioSnippet: 'Hands-on security architect designing zero-trust networks for classified supply chain pipelines. Prefer git diffs over sales pitch decks.',
      recentPublications: [
        'Kernel Bypass and Memory Safety in Perimeter Ingress Controllers (USENIX 2025)'
      ],
      recentTalks: [
        'Deconstructing Memory Corruption in Enterprise VPN Appliances (DEF CON 33)'
      ],
      awardsOrCertifications: ['OSCP', 'SANS GSE', 'USENIX Security Paper Award']
    },
    outreachDraft: {
      subject: 'Deconstructing CVE-2024-21762 memory write primitive in FortiOS',
      body: 'Hi Sarah,\n\nCutting the sales marketing: CVE-2024-21762 in FortiOS SSL VPN is an out-of-bounds memory write caused by an integer truncation when parsing multipart boundary lengths in the web daemon. If FortiGate terminates SSL without eBPF inspection, the payload writes arbitrary shellcode into the daemon memory pool before authentication.\n\nWe wrote an open-source eBPF probe that hooks into the socket buffer to detect the corrupted boundary header and drops the TCP connection at wire speed (0.3 microsecond latency overhead).\n\nHere is our GitHub repo with the compiled bytecode and raw PCAP benchmarks. If you want to run the test rig against a sandbox instance, let me know and I\'ll send the Docker harness.',
      previewHook: 'Technical teardown of memory boundary integer truncation in FortiOS.',
      isDraftedInGmail: false,
      status: 'pending_review'
    }
  },
  {
    id: 'pr-105',
    name: 'Liam O\'Connor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'VP of Information Security & Privacy',
    company: 'RetailWave Global Brands',
    companyLogo: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=60&auto=format&fit=crop&q=80',
    companySize: '15,000+ employees',
    industry: 'Omnichannel Retail & E-Commerce',
    location: 'Chicago, IL, USA',
    source: 'ZoomInfo',
    tier1CheapPass: {
      verified: true,
      syntaxValid: true,
      mxActive: true,
      publicFootprintFound: true,
      cost: 0
    },
    tier2Enriched: {
      unlocked: true,
      workEmail: 'liam.oconnor@retailwave.com',
      directPhone: '+1 (312) 670-4491',
      creditCost: 1,
      unlockedAt: '2026-09-12 11:15'
    },
    techStack: [
      { name: 'SAP NetWeaver Gateway', category: 'ERP / E-Commerce Backend', detectedVia: 'ZoomInfo Technographics' },
      { name: 'Microsoft Sentinel SIEM', category: 'Cloud Security', detectedVia: 'DNS MX / Azure Tenant' },
      { name: 'Cloudflare Enterprise', category: 'DDoS / WAF', detectedVia: 'CNAME / Nameserver' },
      { name: 'CyberArk Privileged Access', category: 'PAM', detectedVia: 'Job Descriptions' }
    ],
    matchedVulnerability: {
      cveId: 'CVE-2023-22527',
      name: 'Atlassian Confluence Template Injection RCE',
      severity: 'Critical',
      cvss: 10.0,
      epssScore: '98.6%',
      cisaKev: true,
      advisorySource: 'MISP Open Threat Advisory #MISP-2024-019',
      summary: 'OGNL template injection vulnerability on outdated Confluence Data Center servers allowing unauthenticated attackers to execute arbitrary code and gain root server shell.',
      businessImpact: 'Direct PCI-DSS 4.0 non-compliance and immediate merchant processing penalty risk if supply chain inventory databases are accessed.'
    },
    persona: {
      type: 'compliance',
      label: 'Compliance & Governance CISO',
      confidence: 89,
      rationale: 'Focuses heavily on PCI-DSS 4.0 transition and retail consumer privacy compliance (CCPA/CPRA); background in legal and corporate risk management.',
      triggerSignals: [
        'Author of industry checklist: "PCI-DSS 4.0 Enforcement for Multi-Brand Retailers"',
        'Serves on Retail & Hospitality ISAC Board of Directors',
        'Holds CISM and CDPSE certifications'
      ],
      recommendedTone: 'Regulatory liability, audit readiness, consumer privacy, merchant compliance'
    },
    researchSignals: {
      linkedinBioSnippet: 'Protecting cardholder data for 85M omnichannel customers. Leading PCI-DSS 4.0 global alignment and governance across 40 subsidiary retail brands.',
      recentPublications: [
        'The Fiduciary Duty of the CISO in Retail Data Governance (Retail Executive, 2025)'
      ],
      recentTalks: [
        'PCI 4.0: Surviving the Scrutiny of Qualified Security Assessors (NRF Protect 2025)'
      ],
      awardsOrCertifications: ['CISM', 'CDPSE', 'PCI Professional (PCIP)']
    },
    outreachDraft: {
      subject: 'PCI-DSS 4.0 audit exposure regarding Atlassian perimeter at RetailWave',
      body: 'Hi Liam,\n\nFollowing your remarks at NRF Protect on preparing for QSA assessments under PCI 4.0: with the latest MISP Open Threat bulletin on CVE-2023-22527 (Atlassian OGNL injection), your external vendor portal footprint has an elevated risk profile.\n\nUnder PCI 4.0 requirement 6.4, unauthenticated RCE exposures on perimeter servers that share network routing with retail cardholder data environments require documented zero-day compensating controls within 72 hours.\n\nWe developed a lightweight isolation wrapper that satisfies QSA audit criteria for PCI 4.0 Section 6 without taking Confluence offline or halting internal brand collaboration.\n\nWould you be open to a 10-minute briefing on the PCI 4.0 compliance crosswalk?',
      previewHook: 'PCI-DSS 4.0 Requirement 6.4 compliance validation for external Atlassian node.',
      isDraftedInGmail: true,
      gmailDraftId: 'draft_4429bc7710',
      status: 'gmail_draft'
    }
  }
];

export const CONNECTED_ACCOUNTS: EmailAccount[] = [
  {
    id: 'acc-1',
    email: 'shashank@aegisreach.ai',
    displayName: 'Shashank (Founding Security Partner)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    provider: 'Google Workspace',
    status: 'active',
    healthScore: 98,
    dailyQuota: 50,
    sentToday: 18,
    warmupStage: 'Ramp-up (Week 4: 50/day)',
    warmupDaysRemaining: 4,
    connectedSince: '2026-08-15'
  },
  {
    id: 'acc-2',
    email: 's.advisory@aegis-intel.net',
    displayName: 'Aegis Threat Intel Desk',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    provider: 'Google Workspace',
    status: 'warming',
    healthScore: 94,
    dailyQuota: 30,
    sentToday: 8,
    warmupStage: 'Stage 2: Warming (30/day)',
    warmupDaysRemaining: 12,
    connectedSince: '2026-09-01'
  },
  {
    id: 'acc-3',
    email: 'outreach@secops-brief.io',
    displayName: 'SecOps Briefing Desk',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    provider: 'Gmail OAuth',
    status: 'active',
    healthScore: 99,
    dailyQuota: 45,
    sentToday: 24,
    warmupStage: 'Fully Warmed (45/day)',
    warmupDaysRemaining: 0,
    connectedSince: '2026-07-20'
  }
];

export const INITIAL_FUNNEL_STATS: FunnelStats = {
  totalSourced: 1420,
  tier1Validated: 1380,
  tier2Unlocked: 342,
  draftsApproved: 184,
  emailsSent: 168,
  deliveredRate: 99.4,
  openRate: 68.2,
  clickRate: 24.6,
  replyRate: 18.2,
  positiveSentimentCount: 22,
  objectionCount: 6,
  dncCount: 3
};

export const SAMPLE_XLS_PROSPECTS: Prospect[] = [
  {
    id: 'xls-pr-201',
    name: 'Jonathan Hayes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Chief Information Security Officer',
    company: 'Raytheon Defense Systems',
    companySize: '14,500 employees',
    industry: 'Defense & Aerospace Systems',
    location: 'Arlington, VA',
    source: 'XLS Import',
    tier1CheapPass: {
      verified: true,
      syntaxValid: true,
      mxActive: true,
      publicFootprintFound: true,
      cost: 0
    },
    tier2Enriched: {
      unlocked: false,
      workEmail: 'j.hayes@raytheon-ds.defense.gov',
      directPhone: '+1 (703) 841-4200',
      creditCost: 1
    },
    techStack: [
      { name: 'Palo Alto PAN-OS', category: 'Perimeter Firewall', detectedVia: 'Passive Shodan Banner' },
      { name: 'Cisco ASA', category: 'VPN Gateway', detectedVia: 'DNS Records' }
    ],
    matchedVulnerability: {
      cveId: 'CVE-2024-3400',
      name: 'Palo Alto PAN-OS GlobalProtect Command Injection',
      severity: 'Critical',
      cvss: 10.0,
      epssScore: '92.4%',
      cisaKev: true,
      advisorySource: 'CISA KEV / Palo Alto Advisory',
      summary: 'Arbitrary code execution in PAN-OS GlobalProtect gateway enabled unauthenticated root intrusion.',
      businessImpact: 'Perimeter bypass threatening DoD CMMC Level 3 compliance and cleared defense secrets.'
    },
    persona: {
      type: 'compliance',
      label: 'Compliance-Oriented CISO',
      confidence: 96,
      rationale: 'DoD prime defense contractor requires strict CMMC 2.0 and NIST 800-171 zero-trust adherence.',
      triggerSignals: ['DoD Contract Mandates', 'CMMC 2.0 Audit Pending', 'Defense Industrial Base (DIB) Member'],
      recommendedTone: 'Formal, regulatory-grounded, audit-proof risk containment.'
    },
    outreachDraft: {
      subject: 'Jonathan: CMMC compliance & mitigating CVE-2024-3400 in Raytheon perimeter',
      body: `Hi Jonathan,

With DoD prime contractors facing renewed DFARS 252.204-7012 audits, active exploitation of CVE-2024-3400 (PAN-OS GlobalProtect) creates significant audit exposure for Raytheon Defense Systems' perimeter.

AegisReach provides isolated socket-level gating for unpatched edge devices, ensuring continuous CMMC 2.0 alignment without requiring emergency maintenance downtime.

Would you be open to reviewing a 2-page brief on our isolated enclave architecture?

Best regards,
Shashank
AegisReach Security Architecture`,
      previewHook: 'Zero-downtime enclave protection for active PAN-OS perimeter exploits under CMMC 2.0.',
      isDraftedInGmail: false,
      status: 'pending_review'
    },
    researchSignals: {
      linkedinBioSnippet: 'Senior CISO specializing in defense supply chain resilience, CMMC Level 3 compliance, and zero-trust perimeter defense for defense contractors.',
      recentPublications: ['DoD Industrial Base Zero Trust Framework (2025)', 'Securing Hybrid Cloud Aerospace Enclaves'],
      recentTalks: ['AFCEA Cyber Summit: Zero-Trust Defense Perimeter Architecture'],
      awardsOrCertifications: ['CISSP', 'CISM', 'DoD Top Secret / SCI Cleared']
    }
  },
  {
    id: 'xls-pr-202',
    name: 'Dr. Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Global Head of Cybersecurity & HIPAA Privacy',
    company: 'Novartis Healthcare Network',
    companySize: '32,000 employees',
    industry: 'Healthcare & Life Sciences',
    location: 'Boston, MA',
    source: 'XLS Import',
    tier1CheapPass: {
      verified: true,
      syntaxValid: true,
      mxActive: true,
      publicFootprintFound: true,
      cost: 0
    },
    tier2Enriched: {
      unlocked: false,
      workEmail: 'priya.patel@novartis-hn.org',
      directPhone: '+1 (617) 871-7000',
      creditCost: 1
    },
    techStack: [
      { name: 'Citrix NetScaler', category: 'ADC & Gateway', detectedVia: 'HTTP Header Leak' },
      { name: 'Epic Systems EMR', category: 'Healthcare Records', detectedVia: 'Public Portal SSL' }
    ],
    matchedVulnerability: {
      cveId: 'CVE-2023-4966',
      name: 'Citrix NetScaler Bleed Session Hijack',
      severity: 'Critical',
      cvss: 9.4,
      epssScore: '89.1%',
      cisaKev: true,
      advisorySource: 'HHS Health-ISAC / CISA KEV',
      summary: 'Sensitive memory disclosure in NetScaler allows unauthenticated adversaries to bypass MFA session tokens.',
      businessImpact: 'Unauthenticated hospital clinical EMR session hijacking risking OCR HIPAA multi-million fines.'
    },
    persona: {
      type: 'soc_ops',
      label: 'SOC / Ops-Oriented CISO',
      confidence: 94,
      rationale: 'Oversees 24/7 clinical SOC operations where EHR downtime poses direct patient safety threats.',
      triggerSignals: ['24/7 Clinical Network Hospital Alert', 'Health-ISAC Advisory Sync', 'HIPAA Breach Liability'],
      recommendedTone: 'Urgent, operationally actionable, zero clinical workflow disruption.'
    },
    outreachDraft: {
      subject: 'Dr. Patel: 24/7 Citrix NetScaler token isolation for Novartis clinical records',
      body: `Hi Dr. Patel,

Given recent Health-ISAC warnings regarding Citrix Bleed (CVE-2023-4966) token replay attacks, clinical access gateways running NetScaler require rapid containment before adversary persistence occurs.

AegisReach delivers real-time session token invalidation and eBPF network telemetry that shields hospital EHR endpoints without impacting clinical physician logins.

Would 10 minutes next Tuesday work to compare telemetry logs against your current SIEM alerts?

Best regards,
Shashank
AegisReach Security Architecture`,
      previewHook: 'Automated NetScaler session hijacking containment without hospital EHR downtime.',
      isDraftedInGmail: false,
      status: 'pending_review'
    },
    researchSignals: {
      linkedinBioSnippet: 'Healthcare CISO driving clinical cybersecurity, biomedical device isolation, and HIPAA audit readiness across 30+ regional medical centers.',
      recentPublications: ['Clinical Device Segmentation & HIPAA Security Rule (2025)'],
      recentTalks: ['HIMSS Cyber Keynote: Defending Connected Hospital IoT Infrastructure'],
      awardsOrCertifications: ['CISSP-ISSAP', 'HCISPP', 'Health-ISAC Fellow 2025']
    }
  },
  {
    id: 'xls-pr-203',
    name: 'Daniel Lindqvist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'VP Security Engineering & Cloud Architecture',
    company: 'Klarna Nordic Payments',
    companySize: '6,200 employees',
    industry: 'Financial Services & FinTech',
    location: 'Stockholm, Sweden',
    source: 'XLS Import',
    tier1CheapPass: {
      verified: true,
      syntaxValid: true,
      mxActive: true,
      publicFootprintFound: true,
      cost: 0
    },
    tier2Enriched: {
      unlocked: false,
      workEmail: 'daniel.lindqvist@klarna-nordic.se',
      directPhone: '+46 8 120 120 00',
      creditCost: 1
    },
    techStack: [
      { name: 'Kubernetes EKS', category: 'Container Orchestration', detectedVia: 'Cluster Ingress' },
      { name: 'HashiCorp Vault', category: 'Secrets Management', detectedVia: 'Public API Discovery' }
    ],
    matchedVulnerability: {
      cveId: 'CVE-2024-21626',
      name: 'runc Container Breakout via Leaked File Descriptor',
      severity: 'High',
      cvss: 8.6,
      epssScore: '78.5%',
      cisaKev: true,
      advisorySource: 'Open Source Security Foundation (OpenSSF)',
      summary: 'Flaw in runc allows container process to access host filesystem via internally leaked file descriptor.',
      businessImpact: 'Host node takeover in multi-tenant payment processing Kubernetes cluster.'
    },
    persona: {
      type: 'technical',
      label: 'Technical / Architecture CISO',
      confidence: 97,
      rationale: 'Former kernel engineer turned security VP; demands eBPF, socket-level hooks, and open source proof.',
      triggerSignals: ['Multi-tenant EKS Cluster', 'PCI-DSS v4.0 Container Isolation', 'eBPF Kernel Tracing'],
      recommendedTone: 'Low-BS, architecture-first, socket-level implementation details.'
    },
    outreachDraft: {
      subject: 'Daniel: eBPF socket-level runtime guard for CVE-2024-21626 in Klarna EKS clusters',
      body: `Hi Daniel,

With runc container escape vectors (CVE-2024-21626) targeting shared node architectures, host filesystem descriptor leakage poses a distinct challenge for multi-tenant payment pipelines.

Instead of heavy user-space daemon overhead, AegisReach enforces kernel-level eBPF socket tracing that traps illegitimate descriptor access before syscall completion.

Here is our benchmark harness: https://github.com/aegisreach/ebpf-container-guard. Would you or your lead infrastructure architect be open to stress-testing it in a sandbox cluster?

Best regards,
Shashank
AegisReach Security Architecture`,
      previewHook: 'Zero-overhead eBPF container breakout interception for PCI-DSS v4.0 clusters.',
      isDraftedInGmail: false,
      status: 'pending_review'
    },
    researchSignals: {
      linkedinBioSnippet: 'VP of Security Engineering with roots in Linux kernel dev, spearheading eBPF runtime observability, container boundaries, and cloud-native resilience.',
      recentPublications: ['eBPF In-Kernel Security Observability in High-Throughput FinTech'],
      recentTalks: ['KubeCon Europe: Hardening Multi-Tenant Payment Microservices'],
      awardsOrCertifications: ['CKA', 'CKAD', 'OSCP', 'Linux Foundation Contributor']
    }
  }
];

