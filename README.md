# AegisReach // AI Prospecting & Outbound Decision Engine
> **An Interactive Product Design Prototype & UX Case Study for Cybersecurity B2B SaaS**

---

## 🎯 Executive Overview

**AegisReach** is an AI-powered prospecting and outbound campaign decision engine specifically designed for cybersecurity vendor sales. Unlike conventional cold email tools that rely on superficial template slot-filling, AegisReach operates as an **autonomous campaign strategist**:
1. **Dynamic CISO Persona Classification**: Determines whether a security leader is *Compliance-driven*, *SecOps-driven*, *Vulnerability-driven*, or *Technical Architecture-driven* to adapt the messaging angle and tone.
2. **Threat-Driven Value Proposition**: Matches the prospect company's detected perimeter tech stack against live threat intelligence (MISP Open Threat Advisories, NVD, and CISA Known Exploited Vulnerabilities).
3. **2-Tier Cost Economics**: Employs a zero-cost Tier-1 validation pass (email syntax, DNS MX records, public footprint) before consuming paid Apollo/ZoomInfo credits on high-intent targets.
4. **Observer Mode & Trust Calibration**: Connects directly via Google OAuth to create drafts inside the user's connected **Gmail Drafts folder**, providing human-in-the-loop validation before automated sequence dispatch.

---

## 🚀 How to Run the Prototype Locally

```bash
# In the project root directory
npm run dev
```

Open `http://localhost:5173` in your browser to interact with the high-fidelity UI prototype.

To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 🖥️ Screen-by-Screen Walkthrough & Presentation Guide

### 1. Global Navigation & Mode Switcher (`Header.tsx`)
- **Observer Mode (Draft Only)** vs. **Autopilot (Auto-Send)**: Visual toggle demonstrating human-in-the-loop trust calibration.
- **Dark / Light Mode Toggle**: Seamless Sun/Moon switcher with state persistence and light/dark palette adaptation.
- **Credit Balance Counter**: Real-time Apollo/ZoomInfo credit meter showing on-demand deduction.
- **Connected Gmail Badge**: Displays active Google Workspace sender with live OAuth 2.0 pulse.

### 2. Prospect Pipeline & High-Density Grid (`ProspectTable.tsx`)
- **2-Tier Verification**: Shows Tier-1 Cheap Pass status ($0 spent, MX active) across all records.
- **Interactive Credit Spend**: Click *"Unlock (1 Credit)"* on any locked prospect to watch the credit counter animate down and reveal direct corporate dials and verified work emails.
- **Threat & Persona Badges**: Visual indicators for CISO Archetype confidence (e.g., *96% Compliance*) and correlated CVE severity (e.g., *CVE-2023-4966 CVSS 9.8*).
- **Search & Filter**: Filter instantly by Persona, Sourcing Channel (ZoomInfo, Apollo, Trivly, CSV), or search terms.

### 3. AI Research & Threat Dossier Drawer (`ProspectDrawer.tsx`)
- Slide-over drawer detailing:
  - Career trajectory, keynote talks, publications, and certifications (CISA vs. OSCP).
  - Detected company perimeter technologies (e.g. Citrix NetScaler, Palo Alto PAN-OS, Jenkins).
  - Hive Pro Threat Bulletin with CVSS score, EPSS weaponization rate, and CISA KEV exploitation status.
  - Plain-English business impact summary (e.g. SEC 4-day disclosure triggers, PCI 4.0 non-conformance).

### 4. CISO Persona Decision Matrix & Sandbox (`PersonaMatrix.tsx`)
- **The Core Strategic Differentiator**:
  - 🛡️ **Compliance CISO**: Tailored for audit exposure, board reporting, SEC disclosure rules, DORA/NIS2.
  - ⚡ **SOC & Operations CISO**: Tailored for 24/7 alert fatigue, MTTR acceleration, analyst burnout.
  - ⚠️ **Vulnerability Mgmt CISO**: Tailored for developer patch friction, reachability analysis, EPSS scores.
  - 💻 **Technical Architecture CISO**: Tailored for assembly/eBPF primitives, blast radius, zero buzzwords.
- **Live Transformation Simulator**: Select any prospect and switch between personas with 1 click to watch the generated cold email copy dynamically morph in real time.

### 5. Observer Review & Gmail Sync Workbench (`ObserverReview.tsx`)
- Split-screen workspace:
  - **Left**: Target dossier, matched vulnerability card, and persona rationale.
  - **Right**: Real-time editable email composer with highlighted variable tokens.
  - **Interactive Action**: Click *"Push to Gmail Drafts"* to simulate `gmail.users.drafts.create` with animated spinner, draft ID assignment, and toast confirmation.
  - **Approve & Dispatch**: Simulates direct send with confetti celebration and account quota increment.

### 6. Email Warming & Account Rotation Hub (`AccountWarmup.tsx`)
- Multi-inbox deliverability dashboard showing health scores (94%–99%), daily quota meters, and warmup stages.
- Illustrates round-robin load balancing and human-emulation sending jitter (3–7 min pauses).

### 7. Telemetry Funnel & Inbound Reply Intelligence (`AnalyticsFunnel.tsx`)
- Conversion funnel from Sourced (1,420) down to Replies (18.2%).
- **AI Reply Intent Classifier**: Demonstrates autonomous sentiment categorization into Positive Meeting Requests, Information Inquiries, Soft Objections, and Opt-outs.
- **Active DNC Suppression List**: Interactive domain/email exclusion manager for CAN-SPAM and GDPR compliance.

### 8. Built-in Designer Case Study (`UxCaseStudyModal.tsx`)
- Full documentation of user journeys, information architecture, cost-conscious data gating, and design tokens for design interviews and portfolio presentations.

---

## 🎨 Design System & Visual Tokens

| Token | Value | Semantic Meaning |
| :--- | :--- | :--- |
| **Canvas Background** | `#080B12` | Deep cyber slate, ultra-low visual fatigue |
| **Electric Cyan** | `#06B6D4` | Primary brand accent, active intelligence, radar |
| **Secure Emerald** | `#10B981` | Tier-1 validated status, positive replies, 98%+ health |
| **Vulnerability Crimson** | `#EF4444` | Critical CVEs, active CISA KEV exploits, DNC suppression |
| **Decision Violet** | `#A855F7` | AI Persona classification, prompt engineering |
| **Typography** | *Plus Jakarta Sans* / *JetBrains Mono* | Enterprise clarity paired with technical data precision |

---

## 📁 Project Architecture

```
f:/Antigravity Projects/
├── src/
│   ├── components/
│   │   ├── layout/            # Header, Sidebar, Global branding
│   │   ├── prospects/         # High-density grid & slide-over dossier
│   │   ├── icp/               # ICP Definition Studio & audience forecaster
│   │   ├── personas/          # CISO Persona Decision Engine & simulator
│   │   ├── review/            # Observer Mode review & Gmail sync workbench
│   │   ├── accounts/          # Multi-account rotation & deliverability meters
│   │   ├── analytics/         # Telemetry funnel & AI reply classifier
│   │   ├── casestudy/         # Designer case study & systems blueprint
│   │   └── ui/                # Toast notifications & UI primitives
│   ├── context/               # Reactive AppContext (credits, drafts, personas)
│   ├── data/                  # Rich CISO mock dataset & threat intelligence
│   ├── types/                 # Strict TypeScript interfaces
│   ├── App.tsx                # Main entry point & tab manager
│   ├── main.tsx               # React 19 root mount
│   └── index.css              # Tailwind CSS v4 & custom glass styling
├── package.json
└── vite.config.ts
```
