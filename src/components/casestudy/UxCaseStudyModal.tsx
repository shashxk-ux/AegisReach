import React from 'react';
import { 
  X, 
  Sparkles, 
  BrainCircuit, 
  Workflow, 
  Palette, 
  Target
} from 'lucide-react';
import { Button, Badge } from '../ui';

interface UxCaseStudyModalProps {
  onClose?: () => void;
}

export const UxCaseStudyModal: React.FC<UxCaseStudyModalProps> = ({ onClose }) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-card border border-border shadow-diffuse relative overflow-hidden">
        
        {onClose && (
          <div className="absolute top-6 right-6 z-20">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        <div className="relative z-10 space-y-3">
          <Badge variant="purple" className="gap-2">
            <Sparkles className="w-3.5 h-3.5 text-warning" />
            <span>Product Design Portfolio Specification & Rationale</span>
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            AegisReach: Designing an AI Campaign Decision Engine for Cybersecurity Sales
          </h2>

          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            A comprehensive case study on information architecture, trust calibration, cost-conscious data gating, and dynamic persona-based decision synthesis in complex enterprise B2B SaaS.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="px-2.5 py-1 rounded-lg bg-muted border border-border text-muted-foreground font-medium">
              Role: Lead Product Designer & Systems Architect
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-muted border border-border text-muted-foreground font-medium">
              Domain: B2B Cybersecurity SaaS
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-muted border border-border text-muted-foreground font-medium">
              Target User: Security Account Executives & SDRs
            </span>
          </div>
        </div>
      </div>

      {/* 1. The Core UX Challenge & Problem Statement */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-brand" />
          <span>1. The Problem Space: Why Traditional Cold Outbound Fails with CISOs</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <div className="font-bold text-danger">The "Spam Cannon" Chasm</div>
            <p className="text-muted-foreground leading-relaxed">
              CISOs receive 80+ cold vendor emails daily. Generic template personalization (e.g. <em>"Saw your company had 5,000 employees"</em>) is immediately filtered to spam.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <div className="font-bold text-warning">The CISO Persona Bifurcation</div>
            <p className="text-muted-foreground leading-relaxed">
              Pitching a deep assembly-level exploit to a compliance-focused CISO guarantees an unsubscribe; pitching audit frameworks to a technical architecture CISO looks amateur.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <div className="font-semibold text-brand">The API Credit Drain</div>
            <p className="text-muted-foreground leading-relaxed">
              Sales reps burn through expensive Apollo/ZoomInfo credits ($1–$3/lead) fetching contact records for domains that bounce or lack verified perimeters.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Key UX Innovations & Systems Architecture */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-5">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-steel" />
          <span>2. Strategic Product Decisions & UX Innovations</span>
        </h3>

        <div className="space-y-4">
          {/* Innovation 1: Persona Decision Engine */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-steel/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-steel" />
                <span>The AI Persona Decision Engine (Beyond Naive Variables)</span>
              </h4>
              <Badge variant="purple" className="font-mono text-xs">
                Core Differentiator
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Instead of treating the LLM as a glorified text generator with slot filling, we architected a <strong>Campaign Decision Engine</strong>. The system evaluates the CISO’s credentials (CISA vs OSCP), career trajectory (former Big-4 auditor vs red teamer), and recent talks to classify them into 4 distinct archetypes. Each archetype triggers a fundamentally distinct value proposition, tone guideline, and threat angle.
            </p>
          </div>

          {/* Innovation 2: 2-Tier Credit Gating */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-success/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span>2-Tier Cost-Conscious Data Gating</span>
              </h4>
              <Badge variant="emerald" className="font-mono text-xs">
                Cost Optimization UX
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We introduced a bifurcated data model:
              <br />
              • <strong>Tier-1 Cheap Pass ($0 Cost)</strong>: Validates syntax, DNS MX records, and public web footprint across thousands of leads without consuming paid credits.
              <br />
              • <strong>Tier-2 Premium Spend (User-Controlled)</strong>: Users only spend ZoomInfo/Apollo credits once a prospect is verified to possess a vulnerable tech stack and matches target personas.
            </p>
          </div>

          {/* Innovation 3: Observer Mode & Trust Calibration */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-brand/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <span>Observer Mode: Calibrating User Trust with Gmail Drafts</span>
              </h4>
              <Badge variant="cyan" className="font-mono text-xs">
                Human-in-the-Loop UX
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sales leaders will never grant an autonomous AI agent permission to blindly email enterprise CISOs. We solved this adoption barrier by establishing <strong>"Observer Mode"</strong>: the AI performs research and writes the email, but exclusively writes it to the user's connected <strong>Gmail Drafts folder</strong>. Users can review, adjust, and approve directly in the split-screen UI before graduating to automated sequences.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Information Architecture & User Journey Flow */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Workflow className="w-4 h-4 text-brand" />
          <span>3. End-to-End Information Architecture Flow</span>
        </h3>

        <div className="p-4 rounded-xl bg-muted/40 border border-border font-mono text-xs text-foreground space-y-2 overflow-x-auto shadow-2xs">
          <div className="text-brand font-bold">// AegisReach Systems Pipeline</div>
          <div className="flex items-center gap-2 text-muted-foreground py-1">
            <Badge variant="outline">1. Define ICP</Badge>
            <span>→</span>
            <Badge variant="outline">2. Multi-Source Ingestion</Badge>
            <span>→</span>
            <Badge variant="emerald">3. Tier-1 Cheap Pass ($0)</Badge>
            <span>→</span>
            <Badge variant="amber">4. Tier-2 Credit Spend</Badge>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground py-1">
            <Badge variant="purple">5. Persona Decision Engine</Badge>
            <span>→</span>
            <Badge variant="destructive">6. CVE Threat Matcher</Badge>
            <span>→</span>
            <Badge variant="cyan">7. Observer Mode Review</Badge>
            <span>→</span>
            <Badge variant="cyan">8. Gmail API Sync</Badge>
          </div>
        </div>
      </div>

      {/* 4. Design Tokens & UI Aesthetics */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-success" />
          <span>4. Visual Language, Color Semantics & UI Craft</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-1.5">
            <div className="w-full h-4 rounded bg-brand shadow-sm" />
            <div className="font-bold text-foreground">Electric Cyan (#06B6D4)</div>
            <div className="text-xs text-muted-foreground">Primary brand, active intelligence, radar data</div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-1.5">
            <div className="w-full h-4 rounded bg-success shadow-sm" />
            <div className="font-bold text-foreground">Secure Emerald (#10B981)</div>
            <div className="text-xs text-muted-foreground">Tier-1 validated, positive replies, 98%+ health</div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-1.5">
            <div className="w-full h-4 rounded bg-danger shadow-sm" />
            <div className="font-bold text-foreground">Vulnerability Crimson (#EF4444)</div>
            <div className="text-xs text-muted-foreground">Critical CVEs, active KEV exploits, DNC suppression</div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-1.5">
            <div className="w-full h-4 rounded bg-steel shadow-sm" />
            <div className="font-bold text-foreground">Decision Violet (#A855F7)</div>
            <div className="text-xs text-muted-foreground">Persona classification, LLM prompt synthesis</div>
          </div>
        </div>
      </div>
    </div>
  );
};
