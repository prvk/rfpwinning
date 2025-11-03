// Industry-specific RFP Templates

export const industryTemplates = {
  'it-web': {
    id: 'it-web',
    name: 'IT - Web Development',
    description: 'Template for web platform and application development projects',
    icon: '💻',
    requirements: [
      { text: 'Responsive Design for all devices', category: 'functional', priority: 'must-have' },
      { text: 'Modern Frontend Framework (React/Vue/Angular)', category: 'technical', priority: 'must-have' },
      { text: 'RESTful API Architecture', category: 'technical', priority: 'must-have' },
      { text: 'Database Design & Implementation', category: 'technical', priority: 'must-have' },
      { text: 'WCAG 2.1 AA Accessibility', category: 'compliance', priority: 'must-have' },
      { text: 'DSGVO Compliance', category: 'compliance', priority: 'must-have' },
      { text: 'Performance Optimization (Lighthouse > 90)', category: 'performance', priority: 'nice-to-have' },
      { text: 'Multi-Language Support', category: 'functional', priority: 'nice-to-have' },
      { text: 'CMS Integration', category: 'technical', priority: 'nice-to-have' },
      { text: '12 months Warranty & Maintenance', category: 'service', priority: 'must-have' }
    ],
    scoringCriteria: [
      { name: 'Technical Approach', weight: 35, description: 'Quality and innovation of technical solution' },
      { name: 'Team Competence', weight: 25, description: 'Skills and experience of development team' },
      { name: 'Price', weight: 25, description: 'Cost efficiency' },
      { name: 'Timeline', weight: 15, description: 'Realistic project schedule' }
    ],
    typicalRoles: ['Project Manager', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'QA Engineer'],
    budgetRange: { min: 50000, max: 500000 },
    durationRange: { min: 2, max: 12 } // months
  },

  'it-enterprise': {
    id: 'it-enterprise',
    name: 'IT - Enterprise Software',
    description: 'Large-scale enterprise software development and integration',
    icon: '🏢',
    requirements: [
      { text: 'Enterprise Architecture Design', category: 'technical', priority: 'must-have' },
      { text: 'Microservices Architecture', category: 'technical', priority: 'must-have' },
      { text: 'CI/CD Pipeline Implementation', category: 'technical', priority: 'must-have' },
      { text: 'Cloud Infrastructure (AWS/Azure/GCP)', category: 'technical', priority: 'must-have' },
      { text: 'Security Architecture & Implementation', category: 'compliance', priority: 'must-have' },
      { text: 'ISO 27001 Certification', category: 'compliance', priority: 'must-have' },
      { text: 'Legacy System Integration', category: 'technical', priority: 'must-have' },
      { text: 'Load Balancing & Scalability', category: 'performance', priority: 'must-have' },
      { text: 'Disaster Recovery Plan', category: 'service', priority: 'must-have' },
      { text: '24/7 Support & Maintenance', category: 'service', priority: 'must-have' }
    ],
    scoringCriteria: [
      { name: 'Technical Expertise', weight: 40, description: 'Enterprise architecture knowledge' },
      { name: 'References', weight: 25, description: 'Similar project experience' },
      { name: 'Team Capacity', weight: 20, description: 'Size and availability of team' },
      { name: 'Price', weight: 15, description: 'Daily rates and total cost' }
    ],
    typicalRoles: ['Solution Architect', 'Senior Developer', 'DevOps Engineer', 'Security Specialist', 'Project Manager'],
    budgetRange: { min: 500000, max: 5000000 },
    durationRange: { min: 12, max: 48 }
  },

  'consulting-strategy': {
    id: 'consulting-strategy',
    name: 'Consulting - Strategy',
    description: 'Strategic consulting and business transformation',
    icon: '📊',
    requirements: [
      { text: 'Current State Analysis', category: 'deliverable', priority: 'must-have' },
      { text: 'Market & Competitive Analysis', category: 'deliverable', priority: 'must-have' },
      { text: 'Strategic Options Development', category: 'deliverable', priority: 'must-have' },
      { text: 'Business Case & ROI Calculation', category: 'deliverable', priority: 'must-have' },
      { text: 'Implementation Roadmap', category: 'deliverable', priority: 'must-have' },
      { text: 'Stakeholder Workshops', category: 'service', priority: 'must-have' },
      { text: 'Senior Consultant (10+ years)', category: 'qualification', priority: 'must-have' },
      { text: 'Industry-specific Experience', category: 'qualification', priority: 'must-have' },
      { text: 'Change Management Support', category: 'service', priority: 'nice-to-have' },
      { text: 'Executive Presentations', category: 'deliverable', priority: 'must-have' }
    ],
    scoringCriteria: [
      { name: 'Methodology', weight: 30, description: 'Quality of consulting approach' },
      { name: 'Team Expertise', weight: 30, description: 'Senior consultant experience' },
      { name: 'References', weight: 25, description: 'Track record in similar projects' },
      { name: 'Price', weight: 15, description: 'Daily rates' }
    ],
    typicalRoles: ['Principal Consultant', 'Senior Consultant', 'Business Analyst', 'Project Manager'],
    budgetRange: { min: 100000, max: 2000000 },
    durationRange: { min: 3, max: 18 }
  },

  'consulting-process': {
    id: 'consulting-process',
    name: 'Consulting - Process Optimization',
    description: 'Business process analysis and optimization',
    icon: '⚙️',
    requirements: [
      { text: 'Process Mapping & Documentation', category: 'deliverable', priority: 'must-have' },
      { text: 'Bottleneck Identification', category: 'deliverable', priority: 'must-have' },
      { text: 'Process Optimization Recommendations', category: 'deliverable', priority: 'must-have' },
      { text: 'KPI Definition & Measurement', category: 'deliverable', priority: 'must-have' },
      { text: 'Tool Evaluation & Selection', category: 'service', priority: 'nice-to-have' },
      { text: 'Process Automation Concepts', category: 'deliverable', priority: 'nice-to-have' },
      { text: 'Training & Documentation', category: 'deliverable', priority: 'must-have' },
      { text: 'Lean/Six Sigma Methodology', category: 'qualification', priority: 'nice-to-have' },
      { text: 'Workshops with Teams', category: 'service', priority: 'must-have' },
      { text: 'Implementation Support', category: 'service', priority: 'must-have' }
    ],
    scoringCriteria: [
      { name: 'Methodology', weight: 35, description: 'Process optimization approach' },
      { name: 'Experience', weight: 30, description: 'Similar projects completed' },
      { name: 'Price', weight: 20, description: 'Cost structure' },
      { name: 'Timeline', weight: 15, description: 'Project duration' }
    ],
    typicalRoles: ['Process Consultant', 'Business Analyst', 'Change Manager', 'Trainer'],
    budgetRange: { min: 50000, max: 500000 },
    durationRange: { min: 2, max: 12 }
  },

  'marketing-campaign': {
    id: 'marketing-campaign',
    name: 'Marketing - Campaign',
    description: 'Integrated marketing campaign development and execution',
    icon: '📣',
    requirements: [
      { text: 'Campaign Strategy & Concept', category: 'deliverable', priority: 'must-have' },
      { text: 'Target Group Analysis', category: 'deliverable', priority: 'must-have' },
      { text: 'Creative Development (Copy, Design)', category: 'deliverable', priority: 'must-have' },
      { text: 'Multi-Channel Media Plan', category: 'deliverable', priority: 'must-have' },
      { text: 'Social Media Management', category: 'service', priority: 'must-have' },
      { text: 'Content Creation (Text, Image, Video)', category: 'deliverable', priority: 'must-have' },
      { text: 'Performance Marketing (Ads)', category: 'service', priority: 'must-have' },
      { text: 'Analytics & Reporting', category: 'deliverable', priority: 'must-have' },
      { text: 'Campaign Optimization', category: 'service', priority: 'must-have' },
      { text: 'Lead Generation & Nurturing', category: 'performance', priority: 'nice-to-have' }
    ],
    scoringCriteria: [
      { name: 'Creative Quality', weight: 40, description: 'Innovation and creativity' },
      { name: 'Track Record', weight: 25, description: 'Past campaign performance' },
      { name: 'Strategy', weight: 20, description: 'Strategic approach' },
      { name: 'Price', weight: 15, description: 'Cost efficiency' }
    ],
    typicalRoles: ['Campaign Manager', 'Creative Director', 'Content Creator', 'Performance Marketer', 'Designer'],
    budgetRange: { min: 30000, max: 500000 },
    durationRange: { min: 3, max: 12 }
  },

  'marketing-digital': {
    id: 'marketing-digital',
    name: 'Marketing - Digital Strategy',
    description: 'Digital marketing strategy and implementation',
    icon: '🎯',
    requirements: [
      { text: 'Digital Marketing Strategy', category: 'deliverable', priority: 'must-have' },
      { text: 'Customer Journey Mapping', category: 'deliverable', priority: 'must-have' },
      { text: 'SEO Strategy & Implementation', category: 'service', priority: 'must-have' },
      { text: 'Content Marketing Strategy', category: 'deliverable', priority: 'must-have' },
      { text: 'Marketing Automation Setup', category: 'service', priority: 'nice-to-have' },
      { text: 'CRM Integration', category: 'technical', priority: 'nice-to-have' },
      { text: 'A/B Testing & Optimization', category: 'service', priority: 'must-have' },
      { text: 'Conversion Rate Optimization', category: 'service', priority: 'must-have' },
      { text: 'Analytics Dashboard Setup', category: 'deliverable', priority: 'must-have' },
      { text: 'Monthly Performance Reports', category: 'deliverable', priority: 'must-have' }
    ],
    scoringCriteria: [
      { name: 'Strategy Quality', weight: 35, description: 'Strategic depth and innovation' },
      { name: 'Technical Expertise', weight: 25, description: 'Marketing tech stack knowledge' },
      { name: 'Track Record', weight: 25, description: 'Measurable results from past projects' },
      { name: 'Price', weight: 15, description: 'Cost structure' }
    ],
    typicalRoles: ['Digital Strategist', 'SEO Specialist', 'Content Marketer', 'Analytics Expert', 'Marketing Technologist'],
    budgetRange: { min: 40000, max: 300000 },
    durationRange: { min: 3, max: 12 }
  },

  'construction': {
    id: 'construction',
    name: 'Construction - Infrastructure',
    description: 'Construction and infrastructure projects',
    icon: '🏗️',
    requirements: [
      { text: 'Detailed Construction Plan', category: 'deliverable', priority: 'must-have' },
      { text: 'Building Permits & Approvals', category: 'compliance', priority: 'must-have' },
      { text: 'Quality Assurance Plan', category: 'deliverable', priority: 'must-have' },
      { text: 'Safety & Health Protection Concept', category: 'compliance', priority: 'must-have' },
      { text: 'Environmental Impact Assessment', category: 'compliance', priority: 'must-have' },
      { text: 'Project Management (DIN 69901)', category: 'service', priority: 'must-have' },
      { text: 'Insurance Coverage', category: 'qualification', priority: 'must-have' },
      { text: 'Qualified Construction Manager', category: 'qualification', priority: 'must-have' },
      { text: 'Warranty Period (5 years)', category: 'service', priority: 'must-have' },
      { text: 'Sustainability Certification (DGNB/LEED)', category: 'compliance', priority: 'nice-to-have' }
    ],
    scoringCriteria: [
      { name: 'Technical Concept', weight: 30, description: 'Construction approach' },
      { name: 'References', weight: 25, description: 'Similar project experience' },
      { name: 'Price', weight: 30, description: 'Total construction cost' },
      { name: 'Timeline', weight: 15, description: 'Construction schedule' }
    ],
    typicalRoles: ['Construction Manager', 'Site Manager', 'Civil Engineer', 'Safety Officer', 'Quality Manager'],
    budgetRange: { min: 500000, max: 50000000 },
    durationRange: { min: 6, max: 48 }
  },

  'research': {
    id: 'research',
    name: 'Research & Innovation',
    description: 'Research projects and innovation development',
    icon: '🔬',
    requirements: [
      { text: 'Research Proposal & Methodology', category: 'deliverable', priority: 'must-have' },
      { text: 'Literature Review', category: 'deliverable', priority: 'must-have' },
      { text: 'Data Collection & Analysis Plan', category: 'deliverable', priority: 'must-have' },
      { text: 'Prototype Development', category: 'deliverable', priority: 'nice-to-have' },
      { text: 'Testing & Validation', category: 'service', priority: 'must-have' },
      { text: 'Research Report & Documentation', category: 'deliverable', priority: 'must-have' },
      { text: 'Scientific Publications', category: 'deliverable', priority: 'nice-to-have' },
      { text: 'PhD-level Researchers', category: 'qualification', priority: 'must-have' },
      { text: 'Ethics Approval Process', category: 'compliance', priority: 'must-have' },
      { text: 'IP Rights Management', category: 'compliance', priority: 'must-have' }
    ],
    scoringCriteria: [
      { name: 'Scientific Quality', weight: 40, description: 'Research methodology' },
      { name: 'Team Qualifications', weight: 30, description: 'Academic credentials' },
      { name: 'Innovation Potential', weight: 20, description: 'Breakthrough potential' },
      { name: 'Budget', weight: 10, description: 'Cost efficiency' }
    ],
    typicalRoles: ['Principal Investigator', 'Senior Researcher', 'Research Associate', 'PhD Student', 'Lab Technician'],
    budgetRange: { min: 100000, max: 5000000 },
    durationRange: { min: 12, max: 60 }
  }
};

export const getTemplateById = (templateId) => {
  return industryTemplates[templateId] || null;
};

export const getAllTemplates = () => {
  return Object.values(industryTemplates);
};

export default industryTemplates;
