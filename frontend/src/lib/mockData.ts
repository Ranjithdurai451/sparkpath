import { FormData } from "./types";

// Startup Industries
export const industries = [
  { value: "Technology & SaaS", label: "Technology & SaaS" },
  { value: "health", label: "Healthcare & Biotech" },
  { value: "finance", label: "Fintech & Finance" },
  { value: "ecommerce", label: "E-commerce & Retail" },
  { value: "education", label: "Education & EdTech" },
  { value: "food", label: "Food & Beverage" },
  { value: "transportation", label: "Transportation & Logistics" },
  { value: "real_estate", label: "Real Estate & PropTech" },
  { value: "media", label: "Media & Entertainment" },
  { value: "energy", label: "Energy & CleanTech" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "other", label: "Other" }
];

// Budget Ranges
export const budgetRanges = [
  { value: "bootstrap", label: "Bootstrapped (< ₹10,000)" },
  { value: "seed", label: "Seed ($10,000 - ₹100,000)" },
  { value: "angel", label: "Angel ($100,000 - ₹500,000)" },
  { value: "series_a", label: "Series A (₹500,000 - ₹2 million)" },
  { value: "series_b", label: "Series B (₹2 million - ₹10 million)" },
  { value: "series_c", label: "Series C+ (₹10 million+)" }
];

// Team Sizes
export const teamSizes = [
  { value: "solo", label: "Solo Founder" },
  { value: "small", label: "Small (2-5 people)" },
  { value: "medium", label: "Medium (6-20 people)" },
  { value: "large", label: "Large (21-100 people)" },
  { value: "enterprise", label: "Enterprise (100+ people)" }
];

// Market Sizes
export const marketSizes = [
  { value: "niche", label: "Niche Market (< ₹1 million)" },
  { value: "medium", label: "Medium Market (₹1-10 million)" },
  { value: "large", label: "Large Market (₹10-100 million)" },
  { value: "massive", label: "Massive Market (₹100 million+)" }
];


// Sample data for countries and regions
export const countries = [
  { value: 'india', label: 'India' },
  { value: 'united_states', label: 'United States' },
  { value: 'united_kingdom', label: 'United Kingdom' },
  { value: 'canada', label: 'Canada' },
  { value: 'australia', label: 'Australia' },
  { value: 'germany', label: 'Germany' },
  { value: 'france', label: 'France' },
  { value: 'japan', label: 'Japan' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'brazil', label: 'Brazil' },
];

// Regions will be dynamically populated based on the selected country
export const regionsByCountry: Record<string, Array<{ value: string; label: string }>> = {
  united_states: [
    { value: 'northeast', label: 'Northeast' },
    { value: 'midwest', label: 'Midwest' },
    { value: 'south', label: 'South' },
    { value: 'west', label: 'West' },
  ],
  united_kingdom: [
    { value: 'england', label: 'England' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'wales', label: 'Wales' },
    { value: 'northern-ireland', label: 'Northern Ireland' },
  ],
  canada: [
    { value: 'ontario', label: 'Ontario' },
    { value: 'quebec', label: 'Quebec' },
    { value: 'british-columbia', label: 'British Columbia' },
    { value: 'alberta', label: 'Alberta' },
  ],
  australia: [
    { value: 'nsw', label: 'New South Wales' },
    { value: 'vic', label: 'Victoria' },
    { value: 'qld', label: 'Queensland' },
    { value: 'wa', label: 'Western Australia' },
  ],
  germany: [
    { value: 'bayern', label: 'Bavaria' },
    { value: 'berlin', label: 'Berlin' },
    { value: 'hamburg', label: 'Hamburg' },
    { value: 'hessen', label: 'Hesse' },
  ],
  france: [
    { value: 'ile-de-france', label: 'Île-de-France' },
    { value: 'provence', label: 'Provence-Alpes-Côte d\'Azur' },
    { value: 'aquitaine', label: 'Nouvelle-Aquitaine' },
    { value: 'auvergne', label: 'Auvergne-Rhône-Alpes' },
  ],
  japan: [
    { value: 'kanto', label: 'Kanto' },
    { value: 'kansai', label: 'Kansai' },
    { value: 'chubu', label: 'Chubu' },
    { value: 'hokkaido', label: 'Hokkaido' },
  ],
  singapore: [
    { value: 'central', label: 'Central Region' },
    { value: 'east', label: 'East Region' },
    { value: 'north', label: 'North Region' },
    { value: 'west', label: 'West Region' },
  ],
  india: [
    { value: 'chennai', label: 'Tamil Nadu' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Maharashtra' },
    { value: 'bangalore', label: 'Karnataka' },
    { value: 'hyderabad', label: 'Telangana' },
    { value: 'kolkata', label: 'West Bengal' },
    { value: 'ahmedabad', label: 'Gujarat' },
    { value: 'lucknow', label: 'Uttar Pradesh' },
    { value: 'jaipur', label: 'Rajasthan' },
    { value: 'chandigarh', label: 'Punjab' },
    { value: 'bhopal', label: 'Madhya Pradesh' },
    { value: 'patna', label: 'Bihar' },
    { value: 'guwahati', label: 'Assam' },
    { value: 'bhubaneswar', label: 'Odisha' },
    { value: 'thiruvananthapuram', label: 'Kerala' },
    { value: 'raipur', label: 'Chhattisgarh' },
    { value: 'ranchi', label: 'Jharkhand' },
    { value: 'dehradun', label: 'Uttarakhand' },
    { value: 'shimla', label: 'Himachal Pradesh' },
    { value: 'srinagar', label: 'Jammu & Kashmir' },
    { value: 'gangtok', label: 'Sikkim' },
    { value: 'aizawl', label: 'Mizoram' },
    { value: 'kohima', label: 'Nagaland' },
    { value: 'shillong', label: 'Meghalaya' },
    { value: 'agartala', label: 'Tripura' },
    { value: 'itanagar', label: 'Arunachal Pradesh' },
    { value: 'panaji', label: 'Goa' },
    { value: 'silvassa', label: 'Dadra & Nagar Haveli' },
    { value: 'daman', label: 'Daman & Diu' },
    { value: 'kavaratti', label: 'Lakshadweep' },
    { value: 'port-blair', label: 'Andaman & Nicobar Islands' },
    { value: 'puducherry', label: 'Puducherry' },
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'ladakh', label: 'Ladakh' },
  ],
  brazil: [
    { value: 'sao-paulo', label: 'São Paulo' },
    { value: 'rio-de-janeiro', label: 'Rio de Janeiro' },
    { value: 'minas-gerais', label: 'Minas Gerais' },
    { value: 'bahia', label: 'Bahia' },
  ],
};


export const defaultFormData: FormData = {
  industry: '',
  budget: '',
  teamSize: '',
  marketSize: '',
  problemStatement: 'In IT companies, lunch hour leads to overcrowded cafeterias, long food queues, and inefficient seating arrangements, causing delays and discomfort for employees.',
  targetCustomer: 'IT Companies & Corporate Offices – HR and facility managers looking to improve cafeteria efficiency. Cafeteria Vendors & Catering Services – Businesses managing food distribution in corporate spaces. Workforce Employees – IT professionals facing long wait times and seating issues during lunch hours.',
  uniqueValueProposition: 'AI-powered smart cafeteria management system that reduces wait times, optimizes seating, and enhances employee dining experience through real-time queue tracking, pre-ordering, and dynamic seat allocation.',
  competitors: '',
  goToMarketStrategy: '',
  revenueModel: '',
  country: '',
  region: '',
};


// Mock Roadmap Data
export const mockRoadmap = {
  tech: {
    phases: [
      {
        title: "Validation Phase",
        duration: "3 months",
        steps: [
          { title: "Conduct market research & customer interviews", completed: false },
          { title: "Build MVP (Minimum Viable Product)", completed: false },
          { title: "Launch beta testing with 10-20 early users", completed: false },
          { title: "Refine product based on feedback", completed: false },
          { title: "Define core metrics to track success", completed: false }
        ]
      },
      {
        title: "Launch Phase",
        duration: "4 months",
        steps: [
          { title: "Finalize product features for v1.0", completed: false },
          { title: "Set up analytics and tracking", completed: false },
          { title: "Create marketing website and materials", completed: false },
          { title: "Develop go-to-market strategy", completed: false },
          { title: "Official product launch", completed: false },
          { title: "Begin customer acquisition campaigns", completed: false }
        ]
      },
      {
        title: "Growth Phase",
        duration: "6 months",
        steps: [
          { title: "Implement customer feedback loop", completed: false },
          { title: "Optimize user onboarding process", completed: false },
          { title: "Explore partnership opportunities", completed: false },
          { title: "Invest in content marketing", completed: false },
          { title: "Build customer success team", completed: false },
          { title: "Begin fundraising for Series A", completed: false }
        ]
      },
      {
        title: "Scale Phase",
        duration: "12 months",
        steps: [
          { title: "Expand team across key departments", completed: false },
          { title: "Implement scalable processes", completed: false },
          { title: "Explore international market expansion", completed: false },
          { title: "Develop advanced product features", completed: false },
          { title: "Optimize pricing strategy", completed: false },
          { title: "Secure enterprise customers", completed: false }
        ]
      }
    ]
  }
};

// Mock Failure Prediction Data
export const mockFailurePrediction = {
  overallRisk: 32,
  riskAreas: [
    { 
      name: "Market Fit", 
      score: 25, 
      details: "Your product-market fit is strong, but continue gathering user feedback to refine your offering." 
    },
    { 
      name: "Cash Flow", 
      score: 60, 
      details: "Your runway may be insufficient. Consider securing additional funding or reducing burn rate." 
    },
    { 
      name: "Team Composition", 
      score: 15, 
      details: "Your team has the right mix of skills, though you may need to hire a dedicated marketing person." 
    },
    { 
      name: "Competition", 
      score: 40, 
      details: "Your market has strong competitors. Ensure your differentiation strategy is clear and defensible." 
    },
    { 
      name: "Scalability", 
      score: 20, 
      details: "Your technology stack is well-positioned for growth with minimal technical debt." 
    }
  ]
};

// Mock SWOT Analysis
export const mockCompetitors = [
  {
    name: "TechStart Solutions",
    swot: {
      strengths: ["Market leader", "Well-funded ($50M Series C)", "Strong brand recognition"],
      weaknesses: ["Slower innovation cycle", "High pricing", "Customer service issues"],
      opportunities: ["International expansion", "New product lines", "Enterprise market"],
      threats: ["New competitors", "Changing regulations", "Market saturation"]
    }
  },
  {
    name: "InnovateCorp",
    swot: {
      strengths: ["Cutting-edge technology", "Aggressive marketing", "Low-cost structure"],
      weaknesses: ["Limited feature set", "Small customer base", "Inexperienced management"],
      opportunities: ["Strategic partnerships", "Untapped market segments", "Proprietary tech patents"],
      threats: ["Funding challenges", "Rapid market changes", "Talent acquisition"]
    }
  },
  {
    name: "NextGen Systems",
    swot: {
      strengths: ["User-friendly interface", "Strong developer community", "Innovative business model"],
      weaknesses: ["Limited market presence", "Narrow product focus", "Scaling challenges"],
      opportunities: ["API ecosystem expansion", "Premium service tiers", "Industry consolidation"],
      threats: ["Price competition", "Feature commoditization", "Technical debt"]
    }
  }
];

// Mock Legal & Compliance Checklist
export const mockLegalChecklist = [
  { title: "Business Registration", completed: true, details: "Register your business entity (LLC, C-Corp, etc.)" },
  { title: "EIN Number", completed: true, details: "Obtain Employer Identification Number from the IRS" },
  { title: "Business Licenses", completed: false, details: "Secure necessary business licenses and permits" },
  { title: "Founder Agreements", completed: true, details: "Create and sign founder agreements with equity details" },
  { title: "Intellectual Property", completed: false, details: "File trademarks, patents, and protect your IP" },
  { title: "Privacy Policy", completed: false, details: "Create privacy policy and terms of service" },
  { title: "Data Regulations", completed: false, details: "Ensure compliance with GDPR, CCPA, or other data regulations" },
  { title: "Employment Laws", completed: false, details: "Understand and comply with employment and labor laws" },
  { title: "Tax Obligations", completed: false, details: "Set up systems for sales tax, income tax, and other tax obligations" },
  { title: "Insurance Coverage", completed: false, details: "Obtain business insurance (liability, E&O, etc.)" }
];

// Mock AI Mentor Questions & Answers
export const mockMentorQA = [
  { 
    question: "How do I find my first customers?", 
    answer: "Start with your network and early adopters who understand your vision. Identify communities where your target users gather, both online and offline. Offer a compelling incentive for early users such as free access, discounts, or added services. Focus on delivering exceptional value to these first users to generate word-of-mouth referrals." 
  },
  { 
    question: "When should I hire my first employee?", 
    answer: "Hire your first employee when you consistently cannot handle the workload, and it's limiting growth. Look for skills complementary to yours that address critical business needs. Consider starting with contractors or part-time help before full-time hires. The right timing is usually when the cost of the hire is outweighed by the revenue or time they'll generate." 
  },
  { 
    question: "How much equity should I give early employees?", 
    answer: "Early employees typically receive 0.5-2% equity, depending on their role, experience, and stage of your startup. Use a vesting schedule (typically 4 years with a 1-year cliff) to protect everyone's interests. Consider the total dilution across your team, advisors, and future funding rounds. The key is balancing meaningful ownership that motivates employees while preserving enough equity for future growth." 
  },
  { 
    question: "What metrics should I focus on initially?", 
    answer: "Focus on metrics that directly reflect product-market fit and customer value: user engagement (daily/weekly active users), retention rates, conversion rate (from free to paid), customer acquisition cost (CAC), and customer lifetime value (LTV). Avoid vanity metrics that don't translate to business health. Pick 3-5 key metrics that align with your specific business model and growth stage." 
  }
];

// Mock Legal Details
export const mockLegalDetails = [
  {
    title: "Register Your Business Entity",
    what: "This involves officially registering your business with the appropriate government agencies. The registration process establishes your business as a legal entity and determines your business structure (LLC, corporation, partnership, etc.).",
    why: "Registering your business entity provides legal protection, tax benefits, and credibility. It separates your personal assets from your business assets, protecting you from personal liability for business debts and obligations.",
    how: [
      "Decide on your business structure (LLC, Corporation, Partnership, Sole Proprietorship)",
      "Choose a unique business name and check its availability",
      "File formation documents with your state's business agency",
      "Pay the required filing fees",
      "Obtain an Employer Identification Number (EIN) from the IRS",
      "Create an operating agreement or bylaws",
      "Hold initial meetings and keep records of key decisions"
    ],
    timeline: "Typically 1-4 weeks, depending on your state's processing times",
    cost: "$50-$500, varying by state and business structure",
    resources: [
      {
        title: "SBA Business Guide - Choose a Business Structure",
        url: "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure"
      },
      {
        title: "IRS - Apply for an Employer Identification Number (EIN)",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
      }
    ],
    documents: [
      "Articles of Incorporation/Organization",
      "Operating Agreement/Bylaws",
      "EIN Confirmation Letter",
      "Business Name Registration"
    ]
  },
  {
    title: "Obtain Business Licenses and Permits",
    what: "Business licenses and permits are official documents that allow you to operate legally within your jurisdiction. They vary based on your location, industry, and business activities.",
    why: "Operating without the required licenses and permits can result in penalties, fines, or even forced closure of your business. They ensure you're complying with local regulations and industry standards.",
    how: [
      "Research federal, state, and local license requirements for your specific industry",
      "Contact your city or county clerk's office about local business licenses",
      "Apply for industry-specific permits (if applicable)",
      "Submit applications with required documentation",
      "Pay applicable fees",
      "Display licenses as required by law",
      "Set up reminders for renewal dates"
    ],
    timeline: "2 weeks to 3 months, depending on license types and processing times",
    cost: "$50-$1,000+, varying by license type and location",
    resources: [
      {
        title: "SBA Business Licenses & Permits",
        url: "https://www.sba.gov/business-guide/launch-your-business/apply-licenses-permits"
      },
      {
        title: "U.S. Small Business Licenses and Permits Search Tool",
        url: "https://www.usa.gov/business-licenses"
      }
    ],
    documents: [
      "Business License Application",
      "Proof of Business Registration",
      "Professional Certifications",
      "Zoning Permits"
    ]
  },
  {
    title: "Set Up Tax Accounts",
    what: "Setting up tax accounts involves registering your business with federal, state, and local tax authorities and understanding your tax obligations based on your business structure and activities.",
    why: "Proper tax compliance prevents penalties and legal issues. It also ensures you're taking advantage of all available tax deductions and credits for your business type.",
    how: [
      "Register for an Employer Identification Number (EIN) with the IRS",
      "Register for state tax IDs (income tax, sales tax, etc.)",
      "Set up payroll tax accounts if you have employees",
      "Determine your tax year and accounting method",
      "Learn about industry-specific tax regulations",
      "Consider consulting with a tax professional",
      "Set up a system for tracking income and expenses"
    ],
    timeline: "1-4 weeks to set up all necessary accounts",
    cost: "Minimal direct costs for registration, $200-$500 for professional tax consultation",
    resources: [
      {
        title: "IRS Small Business and Self-Employed Tax Center",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed"
      },
      {
        title: "State Tax Registration Information",
        url: "https://www.sba.gov/business-guide/manage-your-business/pay-taxes"
      }
    ],
    documents: [
      "EIN Confirmation",
      "State Tax Registration Documents",
      "Sales Tax Permit",
      "Payroll Tax Registration"
    ]
  },
  {
    title: "Comply with Employment Laws",
    what: "Employment laws are regulations that govern the relationship between employers and employees, covering areas such as hiring, wages, safety, discrimination, and termination.",
    why: "Compliance with employment laws protects both your business and your employees. Violations can lead to lawsuits, penalties, damaged reputation, and poor employee morale.",
    how: [
      "Understand federal laws like FLSA, FMLA, and ADA",
      "Learn about state and local employment regulations",
      "Create compliant hiring procedures and employment contracts",
      "Develop employee handbooks and policies",
      "Set up proper payroll systems for wage and hour compliance",
      "Display required workplace posters",
      "Implement safety standards and training"
    ],
    timeline: "Ongoing requirement; initial setup takes 1-2 months",
    cost: "$500-$2,000 for professional help with policy development; ongoing compliance costs vary",
    resources: [
      {
        title: "Department of Labor - Employer Responsibilities",
        url: "https://www.dol.gov/general/aboutdol/majorlaws"
      },
      {
        title: "EEOC Small Business Resources",
        url: "https://www.eeoc.gov/employers/smallbusiness/index.cfm"
      }
    ],
    documents: [
      "Employee Handbook",
      "Employment Contracts",
      "I-9 Forms",
      "Workplace Policy Documents",
      "Required Workplace Posters"
    ]
  },
  {
    title: "Protect Intellectual Property",
    what: "Intellectual property (IP) protection involves securing legal rights to your business's unique creations, inventions, designs, and brand identifiers through patents, trademarks, copyrights, and trade secrets.",
    why: "Protecting your IP prevents competitors from copying your innovations, builds brand value, creates additional revenue streams through licensing, and enhances your company's valuation.",
    how: [
      "Conduct an IP audit to identify what needs protection",
      "Research existing IP to avoid infringement",
      "File trademark applications for your business name, logo, and slogans",
      "Apply for patents for unique inventions or processes",
      "Register copyrights for original creative works",
      "Implement trade secret protection measures",
      "Create employee and contractor IP agreements"
    ],
    timeline: "Trademarks: 8-10 months; Patents: 2-3+ years; Copyrights: 3-9 months",
    cost: "Trademarks: $250-$750 per class; Patents: $5,000-$15,000+; Copyrights: $45-$65 per work",
    resources: [
      {
        title: "USPTO Trademark Basics",
        url: "https://www.uspto.gov/trademarks/basics"
      },
      {
        title: "U.S. Copyright Office - Registration Portal",
        url: "https://www.copyright.gov/registration/"
      }
    ],
    documents: [
      "Trademark Registration Certificates",
      "Patent Applications and Grants",
      "Copyright Registrations",
      "Confidentiality and Non-Disclosure Agreements",
      "IP Assignment Agreements"
    ]
  }
];
