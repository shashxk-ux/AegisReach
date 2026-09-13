import React from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  BrainCircuit, 
  Workflow, 
  Layout, 
  Palette, 
  Target, 
  CheckCircle2, 
  Coins, 
  Mail, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface UxCaseStudyModalProps {
  onClose: () => void;
}

export const UxCaseStudyModal: React.FC<UxCaseStudyModalProps> = ({ onClose }) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Product Design Portfolio Specification & Rationale</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AegisReach: Designing an AI Campaign Decision Engine for Cybersecurity Sales
          </h2>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            A comprehensive case study on information architecture, trust calibration, cost-conscious data gating, and dynamic persona-based decision synthesis in complex enterprise B2B SaaS.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              Role: Lead Product Designer & Systems Architect
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              Domain: B2B Cybersecurity SaaS
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              Target User: Security Account Executives & SDRs
            </span>
          </div>
        </div>
      </div>

      {/* 1. The Core UX Challenge & Problem Statement */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-400" />
          <span>1. The Problem Space: Why Traditional Cold Outbound Fails with CISOs</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="font-bold text-red-400">The "Spam Cannon" Chasm</div>
            <p className="text-slate-300 leading-relaxed">
              CISOs receive 80+ cold vendor emails daily. Generic template personalization (e.g. <em>"Saw your company had 5,000 employees"</em>) is immediately filtered to spam.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="font-bold text-amber-400">The CISO Persona Bifurcation</div>
            <p className="text-slate-300 leading-relaxed">
              Pitching a deep assembly-level exploit to a compliance-focused CISO guarantees an unsubscribe; pitching audit frameworks to a technical architecture CISO looks amateur.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="font-bold text-blue-400">The API Credit Drain</div>
            <p className="text-slate-300 leading-relaxed">
              Sales reps burn through expensive Apollo/ZoomInfo credits ($1–$3/lead) fetching contact records for domains that bounce or lack verified perimeters.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Key UX Innovations & Systems Architecture */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-purple-400" />
          <span>2. Strategic Product Decisions & UX Innovations</span>
        </h3>

        <div className="space-y-4">
          {/* Innovation 1: Persona Decision Engine */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>The AI Persona Decision Engine (Beyond Naive Variables)</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Core Differentiator
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of treating the LLM as a glorified text generator with slot filling, we architected a <strong>Campaign Decision Engine</strong>. The system evaluates the CISO’s credentials (CISA vs OSCP), career trajectory (former Big-4 auditor vs red teamer), and recent talks to classify them into 4 distinct archetypes. Each archetype triggers a fundamentally distinct value proposition, tone guideline, and threat angle.
            </p>
          </div>

          {/* Innovation 2: 2-Tier Credit Gating */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>2-Tier Cost-Conscious Data Gating</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Cost Optimization UX
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We introduced a bifurcated data model:
              <br />
              • <strong>Tier-1 Cheap Pass ($0 Cost)</strong>: Validates syntax, DNS MX records, and public web footprint across thousands of leads without consuming paid credits.
              <br />
              • <strong>Tier-2 Premium Spend (User-Controlled)</strong>: Users only spend ZoomInfo/Apollo credits once a prospect is verified to possess a vulnerable tech stack and matches target personas.
            </p>
          </div>

          {/* Innovation 3: Observer Mode & Trust Calibration */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Observer Mode: Calibrating User Trust with Gmail Drafts</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Human-in-the-Loop UX
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sales leaders will never grant an autonomous AI agent permission to blindly email enterprise CISOs. We solved this adoption barrier by establishing <strong>"Observer Mode"</strong>: the AI performs research and writes the email, but exclusively writes it to the user's connected <strong>Gmail Drafts folder</strong>. Users can review, adjust, and approve directly in the split-screen UI before graduating to automated sequences.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Information Architecture & User Journey Flow */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Workflow className="w-4 h-4 text-cyan-400" />
          <span>3. End-to-End Information Architecture Flow</span>
        </h3>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-300 space-y-2 overflow-x-auto shadow-2xs">
          <div className="text-cyan-700 dark:text-cyan-400 font-bold">// AegisReach Systems Pipeline</div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 py-1">
            <span className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold shadow-2xs">1. Define ICP</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold shadow-2xs">2. Multi-Source Ingestion</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold shadow-2xs">3. Tier-1 Cheap Pass ($0)</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-semibold shadow-2xs">4. Tier-2 Credit Spend</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 py-1">
            <span className="px-2 py-1 rounded bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold shadow-2xs">5. Persona Decision Engine</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800 font-semibold shadow-2xs">6. CVE Threat Matcher</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-semibold shadow-2xs">7. Observer Mode Review</span>
            <span>→</span>
            <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold shadow-2xs">8. Gmail API Sync</span>
          </div>
        </div>
      </div>

      {/* 4. Design Tokens & UI Aesthetics */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-emerald-400" />
          <span>4. Visual Language, Color Semantics & UI Craft</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="w-full h-4 rounded bg-cyan-500 shadow-sm" />
            <div className="font-bold text-white">Electric Cyan (#06B6D4)</div>
            <div className="text-[11px] text-slate-400">Primary brand, active intelligence, radar data</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="w-full h-4 rounded bg-emerald-500 shadow-sm" />
            <div className="font-bold text-white">Secure Emerald (#10B981)</div>
            <div className="text-[11px] text-slate-400">Tier-1 validated, positive replies, 98%+ health</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="w-full h-4 rounded bg-red-500 shadow-sm" />
            <div className="font-bold text-white">Vulnerability Crimson (#EF4444)</div>
            <div className="text-[11px] text-slate-400">Critical CVEs, active KEV exploits, DNC suppression</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="w-full h-4 rounded bg-purple-500 shadow-sm" />
            <div className="font-bold text-white">Decision Violet (#A855F7)</div>
            <div className="text-[11px] text-slate-400">Persona classification, LLM prompt synthesis</div>
          </div>
        </div>
      </div>
    </div>
  );
};
