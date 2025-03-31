export type FormData = {
    industry: string;
    budget: string;
    teamSize: string;
    marketSize: string;
    problemStatement: string;
    targetCustomer: string;
    uniqueValueProposition: string;
    competitors: string;
    goToMarketStrategy: string;
    revenueModel: string;
    country: string;
    region: string;
  };
  export type FormContextType = {
    formData: FormData;
    updateFormData: (field: keyof FormData, value: string) => void;
    resetForm: () => void;
    isFormComplete: boolean;
  };

  export type RoadmapItem = {
    taskTitle: string;
    id?: string;
  formData: FormData
  };

  export type FailurePredictionData = {
    businessIdea:string,
     industry:string, 
     investment:string,
     targetMarket:string
  }

  type Competitor = {
    name: string;
    description: string;
    differentiators: string[];
    strengths: string[];
    weaknesses: string[];
  };
  
  type AnalysisPoint = {
    point: string;
    impact: string;
    evidence: string;
  };
  
  type SWOTAnalysis = {
    strengths: AnalysisPoint[];
    weaknesses: AnalysisPoint[];
    opportunities: AnalysisPoint[];
    threats: AnalysisPoint[];
  };
  
  export type LocalState = {
    competitors: Competitor[];
    fullAnalysis: SWOTAnalysis;
  };

  export type LegalDetailDataType = {
    title: string;
    what: string;
    why: string;
    how: string[];
    timeline: string;
    cost: string;
    resources: { title: string; url: string }[];
    documents: string[];
  };
  