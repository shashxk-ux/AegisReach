export type PersonaType = 'compliance' | 'soc_ops' | 'vulnerability_mgmt' | 'technical';

export type SourcingChannel = 'ZoomInfo' | 'Apollo' | 'Trivly' | 'CSV Upload' | 'Public URL' | 'XLS Import';

export interface TechStackItem {
  name: string;
  category: string;
  icon?: string;
  detectedVia: string;
}

export interface ThreatVulnerability {
  cveId: string;
  name: string;
  severity: 'Critical' | 'High' | 'Medium';
  cvss: number;
  epssScore: string;
  cisaKev: boolean;
  advisorySource: string;
  summary: string;
  businessImpact: string;
}

export interface PersonaClassification {
  type: PersonaType;
  label: string;
  confidence: number;
  rationale: string;
  triggerSignals: string[];
  recommendedTone: string;
}

export interface OutreachDraft {
  subject: string;
  body: string;
  previewHook: string;
  isDraftedInGmail: boolean;
  gmailDraftId?: string;
  status: 'pending_review' | 'gmail_draft' | 'approved' | 'sent';
  lastEdited?: string;
}

export interface Prospect {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  companyLogo?: string;
  companySize: string;
  industry: string;
  location: string;
  source: SourcingChannel;
  
  // 2-Tier Enrichment Status
  tier1CheapPass: {
    verified: boolean;
    syntaxValid: boolean;
    mxActive: boolean;
    publicFootprintFound: boolean;
    cost: number; // always $0
  };
  tier2Enriched: {
    unlocked: boolean;
    workEmail: string;
    directPhone: string;
    creditCost: number; // 1 credit
    unlockedAt?: string;
  };

  // Intelligence & Personalization
  techStack: TechStackItem[];
  matchedVulnerability: ThreatVulnerability;
  persona: PersonaClassification;
  
  researchSignals: {
    linkedinBioSnippet: string;
    recentPublications: string[];
    recentTalks: string[];
    awardsOrCertifications: string[];
  };

  outreachDraft: OutreachDraft;
}

export interface PersonaStrategy {
  id: PersonaType;
  title: string;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  iconName: string;
  targetTitles: string[];
  certifications: string[];
  corePainPoints: string[];
  messagingHook: string;
  cvePitchAngle: string;
  sampleSubject: string;
  sampleBody: string;
  systemPromptSnippet: string;
}

export interface EmailAccount {
  id: string;
  email: string;
  displayName: string;
  avatar: string;
  provider: 'Google Workspace' | 'Gmail OAuth';
  status: 'active' | 'warming' | 'paused';
  healthScore: number;
  dailyQuota: number;
  sentToday: number;
  warmupStage: string;
  warmupDaysRemaining: number;
  connectedSince: string;
}

export interface FunnelStats {
  totalSourced: number;
  tier1Validated: number;
  tier2Unlocked: number;
  draftsApproved: number;
  emailsSent: number;
  deliveredRate: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  positiveSentimentCount: number;
  objectionCount: number;
  dncCount: number;
}
