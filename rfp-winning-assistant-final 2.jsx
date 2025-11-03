import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  Brain,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  DollarSign,
  Users,
  FileText,
  Upload,
  Zap,
  Shield,
  Award,
  BarChart,
  Clock,
  Sparkles,
  MessageSquare,
  Lightbulb,
  Calculator,
  Gauge,
  Search,
  Filter,
  ChevronRight,
  Star,
  ArrowRight,
  BookOpen,
  PenTool,
  Send,
  Eye,
  RefreshCw,
  CheckSquare,
  AlertCircle,
  Briefcase,
  GitBranch,
  Plus,
  Trash2,
  Settings,
  FileUp,
  Database,
  Edit3,
  Save,
  X,
  Copy,
  Download,
  ChevronDown,
  Info,
  HelpCircle,
  Book,
  Globe,
  FolderOpen,
  PlayCircle,
  ExternalLink,
  List,
  FileDown,
  Building2,
  Scale,
  Euro,
  Tag,
  Layers,
  Coffee,
  ArrowUpRight,
  FileCheck
} from 'lucide-react';

const RFPWinningAssistant = () => {
  // App Mode
  const [appMode, setAppMode] = useState('dashboard'); // dashboard, rfp-detail, faq, glossary, portals
  const [demoMode, setDemoMode] = useState(true);
  const [activeTab, setActiveTab] = useState('analyze'); // For RFP detail view
  
  // Demo RFP Data - Fully populated
  const demoRFPData = {
    1: {
      // Basic Info
      id: 1,
      title: 'Digital Platform Development',
      client: 'House of Finance & Technology Berlin',
      portal: 'DTVP',
      type: 'VOL/A',
      budget: 150000,
      deadline: '2025-03-15',
      submissionDeadline: '2025-03-01',
      status: 'active',
      winProbability: 72,
      phase: 'proposal',
      isDemo: true,
      tags: ['IT', 'Web Development', 'Public Sector'],
      description: 'Entwicklung einer modernen Fintech-Plattform mit Headless CMS, Multi-Site-Architektur und API-Integration für das Berliner Fintech-Ökosystem.',
      
      // Requirements
      requirements: [
        { id: 1, text: 'Responsive Design für alle Endgeräte', category: 'functional', priority: 'must-have', ourCapability: 'strong' },
        { id: 2, text: 'Headless CMS Integration (PayloadCMS)', category: 'technical', priority: 'must-have', ourCapability: 'strong' },
        { id: 3, text: 'WCAG 2.1 AA Barrierefreiheit', category: 'compliance', priority: 'must-have', ourCapability: 'medium' },
        { id: 4, text: 'Lighthouse Score > 90', category: 'performance', priority: 'nice-to-have', ourCapability: 'strong' },
        { id: 5, text: 'Multi-Language Support (DE/EN)', category: 'functional', priority: 'must-have', ourCapability: 'strong' },
        { id: 6, text: 'HubSpot CRM Integration', category: 'technical', priority: 'nice-to-have', ourCapability: 'medium' },
        { id: 7, text: 'DSGVO-konforme Datenverarbeitung', category: 'compliance', priority: 'must-have', ourCapability: 'strong' },
        { id: 8, text: '3 Jahre Wartung & Support', category: 'service', priority: 'must-have', ourCapability: 'weak' }
      ],
      
      // Scoring Criteria
      scoringCriteria: [
        { id: 1, name: 'Preis', weight: 30, description: 'Kosteneffizienz des Angebots' },
        { id: 2, name: 'Team Kompetenz', weight: 30, description: 'Qualifikation und Erfahrung des Teams' },
        { id: 3, name: 'Konzept Qualität', weight: 40, description: 'Technischer Ansatz und Umsetzungsplan' }
      ],
      
      // Team
      team: [
        { id: 1, name: 'Sarah Chen', role: 'Project Lead', rate: 95, availability: 100, skills: ['PM', 'Agile', 'Stakeholder'], score: 95 },
        { id: 2, name: 'Marcus Weber', role: 'Senior Developer', rate: 85, availability: 80, skills: ['React', 'Node.js', 'PayloadCMS'], score: 88 },
        { id: 3, name: 'Lisa Schmidt', role: 'UI/UX Designer', role: 'UI/UX Designer', rate: 75, availability: 60, skills: ['Figma', 'WCAG', 'User Research'], score: 82 },
        { id: 4, name: 'Tom Rodriguez', role: 'Backend Developer', rate: 75, availability: 100, skills: ['Python', 'PostgreSQL', 'API'], score: 79 }
      ],
      
      // Competitors
      competitors: [
        { id: 1, name: 'BayaLab Agency', strength: 85, estimatedPrice: 125000, strengths: ['Award-winning projects', 'International team'], weaknesses: ['Remote only', 'Higher price'] },
        { id: 2, name: 'TechCorp Solutions', strength: 78, estimatedPrice: 140000, strengths: ['Large team', 'Many references'], weaknesses: ['Expensive', 'Slow delivery'] },
        { id: 3, name: 'Digital Innovations', strength: 72, estimatedPrice: 115000, strengths: ['Innovation focus', 'Good design'], weaknesses: ['Small team', 'Limited capacity'] }
      ],
      
      // Proposal Sections
      proposalSections: [
        { id: 1, name: 'Executive Summary', status: 'complete', score: 90, content: 'Clear value proposition with ROI focus' },
        { id: 2, name: 'Technical Approach', status: 'complete', score: 85, content: 'Detailed architecture with Next.js and PayloadCMS' },
        { id: 3, name: 'Team & Qualifications', status: 'complete', score: 95, content: 'Strong team with relevant experience' },
        { id: 4, name: 'Project Timeline', status: 'review', score: 75, content: '12 weeks development + 2 weeks buffer' },
        { id: 5, name: 'Pricing', status: 'review', score: 70, content: 'Competitive pricing at €135,000' },
        { id: 6, name: 'Case Studies', status: 'complete', score: 90, content: '3 relevant Fintech projects showcased' },
        { id: 7, name: 'Risk Mitigation', status: 'draft', score: 60, content: 'Identifying maintenance partner needed' },
        { id: 8, name: 'Value Adds', status: 'complete', score: 85, content: 'Free discovery workshop included' }
      ]
    },
    
    2: {
      id: 2,
      title: 'Marketing Campaign 2025',
      client: 'StartUp Berlin GmbH',
      portal: 'Direct',
      type: 'Private',
      budget: 45000,
      deadline: '2025-02-28',
      submissionDeadline: '2025-02-15',
      status: 'active',
      winProbability: 85,
      phase: 'evaluation',
      isDemo: true,
      tags: ['Marketing', 'Digital', 'Startup'],
      description: 'Ganzheitliche Marketingkampagne für B2B SaaS-Startup mit Fokus auf Content Marketing, Social Media und Performance Marketing.',
      
      requirements: [
        { id: 1, text: 'Content Strategy & Editorial Calendar', category: 'deliverable', priority: 'must-have', ourCapability: 'strong' },
        { id: 2, text: 'Social Media Management (LinkedIn, Twitter)', category: 'service', priority: 'must-have', ourCapability: 'strong' },
        { id: 3, text: 'Google Ads & Facebook Ads Management', category: 'service', priority: 'must-have', ourCapability: 'strong' },
        { id: 4, text: 'Monthly Performance Reports', category: 'deliverable', priority: 'must-have', ourCapability: 'strong' },
        { id: 5, text: 'Lead Generation (500+ MQLs)', category: 'performance', priority: 'must-have', ourCapability: 'medium' },
        { id: 6, text: 'Video Content Production', category: 'deliverable', priority: 'nice-to-have', ourCapability: 'weak' }
      ],
      
      scoringCriteria: [
        { id: 1, name: 'Creative Quality', weight: 40, description: 'Innovation and creativity of concepts' },
        { id: 2, name: 'Track Record', weight: 30, description: 'Past campaign performance' },
        { id: 3, name: 'Price', weight: 20, description: 'Cost efficiency' },
        { id: 4, name: 'Team', weight: 10, description: 'Team expertise' }
      ],
      
      team: [
        { id: 1, name: 'Julia Martinez', role: 'Campaign Manager', rate: 85, availability: 100, skills: ['Strategy', 'B2B', 'SaaS'], score: 92 },
        { id: 2, name: 'Alex Turner', role: 'Content Creator', rate: 65, availability: 80, skills: ['Writing', 'SEO', 'Social'], score: 85 },
        { id: 3, name: 'Nina Patel', role: 'Performance Marketer', rate: 75, availability: 60, skills: ['Google Ads', 'Analytics', 'CRO'], score: 88 }
      ],
      
      competitors: [
        { id: 1, name: 'Creative Studios Berlin', strength: 70, estimatedPrice: 48000, strengths: ['Great creative', 'Local presence'], weaknesses: ['Limited B2B experience'] },
        { id: 2, name: 'Growth Hackers Agency', strength: 65, estimatedPrice: 38000, strengths: ['Performance focus', 'Data-driven'], weaknesses: ['Weak on creative'] }
      ],
      
      proposalSections: [
        { id: 1, name: 'Campaign Strategy', status: 'complete', score: 95, content: 'Comprehensive B2B SaaS go-to-market strategy' },
        { id: 2, name: 'Creative Concepts', status: 'complete', score: 90, content: '3 campaign concepts with mockups' },
        { id: 3, name: 'Media Plan', status: 'complete', score: 85, content: 'Detailed channel mix and budget allocation' },
        { id: 4, name: 'KPIs & Metrics', status: 'complete', score: 88, content: 'Clear success metrics and tracking setup' },
        { id: 5, name: 'Pricing', status: 'complete', score: 92, content: 'Competitive at €42,000 with performance bonus' }
      ]
    },
    
    3: {
      id: 3,
      title: 'Consulting Services Framework',
      client: 'Federal Ministry of Economics',
      portal: 'TED',
      type: 'EU-wide',
      budget: 2500000,
      deadline: '2025-04-30',
      submissionDeadline: '2025-04-01',
      status: 'draft',
      winProbability: 45,
      phase: 'requirements',
      isDemo: true,
      tags: ['Consulting', 'Framework', 'EU'],
      description: 'Rahmenvertrag für Beratungsleistungen im Bereich Digitalisierung und Innovation für Bundesbehörden. Laufzeit 4 Jahre.',
      
      requirements: [
        { id: 1, text: 'Digital Transformation Consulting', category: 'service', priority: 'must-have', ourCapability: 'medium' },
        { id: 2, text: 'Process Optimization', category: 'service', priority: 'must-have', ourCapability: 'strong' },
        { id: 3, text: 'Change Management', category: 'service', priority: 'must-have', ourCapability: 'weak' },
        { id: 4, text: 'IT Architecture Consulting', category: 'service', priority: 'must-have', ourCapability: 'medium' },
        { id: 5, text: 'Minimum 50 consultants', category: 'qualification', priority: 'must-have', ourCapability: 'none' },
        { id: 6, text: 'ISO 27001 certification', category: 'compliance', priority: 'must-have', ourCapability: 'none' },
        { id: 7, text: 'Previous public sector experience', category: 'qualification', priority: 'must-have', ourCapability: 'medium' }
      ],
      
      scoringCriteria: [
        { id: 1, name: 'Technical Expertise', weight: 35, description: 'Depth of consulting expertise' },
        { id: 2, name: 'Team Size & Capacity', weight: 25, description: 'Available resources' },
        { id: 3, name: 'References', weight: 20, description: 'Public sector track record' },
        { id: 4, name: 'Daily Rates', weight: 20, description: 'Price competitiveness' }
      ],
      
      team: [
        { id: 1, name: 'Dr. Michael Hoffmann', role: 'Principal Consultant', rate: 180, availability: 40, skills: ['Strategy', 'Public Sector'], score: 85 },
        { id: 2, name: 'Sandra Meyer', role: 'Senior Consultant', rate: 120, availability: 60, skills: ['Process', 'Agile'], score: 78 }
      ],
      
      competitors: [
        { id: 1, name: 'Big4 Consulting', strength: 95, estimatedPrice: 3000000, strengths: ['Large team', 'All competencies', 'References'], weaknesses: ['Very expensive'] },
        { id: 2, name: 'Boutique Consultancy', strength: 60, estimatedPrice: 2000000, strengths: ['Specialized', 'Flexible'], weaknesses: ['Limited capacity'] }
      ],
      
      proposalSections: [
        { id: 1, name: 'Company Profile', status: 'draft', score: 40, content: 'Need to emphasize capacity' },
        { id: 2, name: 'Team Structure', status: 'todo', score: 0, content: 'Partner network required' },
        { id: 3, name: 'References', status: 'draft', score: 50, content: 'Only 2 public sector references' },
        { id: 4, name: 'Methodology', status: 'review', score: 70, content: 'Agile transformation framework' },
        { id: 5, name: 'Pricing', status: 'todo', score: 0, content: 'Rate card needed' }
      ]
    }
  };

  // State Management
  const [activeRFPs, setActiveRFPs] = useState([
    demoRFPData[1],
    demoRFPData[2],
    demoRFPData[3]
  ]);
  
  const [selectedRFP, setSelectedRFP] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Calculate Win Factors for selected RFP
  const calculateWinFactors = (rfp) => {
    if (!rfp) return {};
    
    // Requirements Fit
    const mustHaves = rfp.requirements.filter(r => r.priority === 'must-have');
    const strongCapabilities = mustHaves.filter(r => r.ourCapability === 'strong' || r.ourCapability === 'medium');
    const requirementsFit = mustHaves.length > 0 ? (strongCapabilities.length / mustHaves.length) * 100 : 0;
    
    // Team Strength
    const teamStrength = rfp.team.length >= 3 ? 
      rfp.team.reduce((acc, m) => acc + m.score, 0) / rfp.team.length : 30;
    
    // Proposal Quality
    const proposalQuality = rfp.proposalSections.reduce((acc, s) => acc + s.score, 0) / rfp.proposalSections.length;
    
    // Price Competitiveness
    const avgCompetitorPrice = rfp.competitors.reduce((acc, c) => acc + c.estimatedPrice, 0) / rfp.competitors.length;
    const ourPrice = rfp.budget * 0.9; // Assume we bid at 90% of budget
    const priceCompetitiveness = ourPrice <= avgCompetitorPrice ? 70 : 50;
    
    return {
      requirementsFit: Math.round(requirementsFit),
      priceCompetitiveness,
      teamStrength: Math.round(teamStrength),
      pastPerformance: 75, // Default
      differentiators: 60, // Default
      clientRelationship: 40, // Default
      proposalQuality: Math.round(proposalQuality),
      localPresence: 50 // Default
    };
  };

  // Win Probability Gauge Component
  const WinProbabilityGauge = ({ probability = 0 }) => {
    const color = probability >= 70 ? 'green' : probability >= 40 ? 'yellow' : 'red';
    const colorClasses = {
      green: 'text-green-600 bg-green-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      red: 'text-red-600 bg-red-100'
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          Win Probability Analysis
        </h3>
        
        <div className="flex flex-col items-center">
          <div className={`text-6xl font-bold ${colorClasses[color].split(' ')[0]}`}>
            {probability}%
          </div>
          
          <div className="w-full mt-4">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  color === 'green' ? 'bg-green-500' : 
                  color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${probability}%` }}
              />
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}>
              {probability >= 70 ? 'Strong Position' : 
               probability >= 40 ? 'Competitive' : 'Needs Improvement'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Requirements Analysis Component
  const RequirementsAnalysis = ({ rfp }) => {
    if (!rfp) return null;
    
    const gaps = rfp.requirements.filter(r => r.ourCapability === 'weak' || r.ourCapability === 'none');
    const strengths = rfp.requirements.filter(r => r.ourCapability === 'strong');
    const improvements = rfp.requirements.filter(r => r.ourCapability === 'medium');

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Requirements Gap Analysis
        </h3>
        
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{strengths.length}</div>
              <div className="text-sm text-gray-600">Strengths</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{improvements.length}</div>
              <div className="text-sm text-gray-600">Can Improve</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{gaps.length}</div>
              <div className="text-sm text-gray-600">Gaps</div>
            </div>
          </div>

          {/* Detailed Requirements */}
          <div className="space-y-2">
            {rfp.requirements.map(req => (
              <div key={req.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded ${
                  req.ourCapability === 'strong' ? 'bg-green-100' :
                  req.ourCapability === 'medium' ? 'bg-yellow-100' :
                  req.ourCapability === 'weak' ? 'bg-orange-100' : 'bg-red-100'
                }`}>
                  {req.ourCapability === 'strong' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> :
                   req.ourCapability === 'medium' ? <AlertCircle className="w-4 h-4 text-yellow-600" /> :
                   req.ourCapability === 'weak' ? <AlertTriangle className="w-4 h-4 text-orange-600" /> :
                   <XCircle className="w-4 h-4 text-red-600" />}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm font-medium">{req.text}</p>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      req.category === 'functional' ? 'bg-blue-100 text-blue-700' :
                      req.category === 'technical' ? 'bg-purple-100 text-purple-700' :
                      req.category === 'compliance' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {req.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      req.priority === 'must-have' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {req.priority}
                    </span>
                  </div>
                </div>
                
                {(req.ourCapability === 'weak' || req.ourCapability === 'none') && (
                  <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                    Fix Gap
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Team Analysis Component
  const TeamAnalysis = ({ rfp }) => {
    if (!rfp) return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Team Configuration
        </h3>
        
        <div className="space-y-3">
          {rfp.team.map(member => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-600">{member.role}</p>
                <div className="flex gap-1 mt-1">
                  {member.skills.map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-white rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Rate</p>
                    <p className="font-medium">€{member.rate}/hr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available</p>
                    <p className="font-medium">{member.availability}%</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    member.score >= 85 ? 'bg-green-100 text-green-700' :
                    member.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    <span className="text-sm font-bold">{member.score}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Team Score</span>
            <span className="text-lg font-bold text-blue-700">
              {Math.round(rfp.team.reduce((acc, m) => acc + m.score, 0) / rfp.team.length)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Competitor Analysis Component
  const CompetitorAnalysis = ({ rfp }) => {
    if (!rfp) return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Competitor Analysis
        </h3>
        
        <div className="space-y-3">
          {rfp.competitors.map(comp => (
            <div key={comp.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{comp.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Threat:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-8 rounded-sm ${
                          i < Math.ceil(comp.strength / 20) ? 
                          comp.strength >= 80 ? 'bg-red-500' :
                          comp.strength >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                          : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-bold">{comp.strength}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Estimated Price</p>
                  <p className="font-semibold">€{comp.estimatedPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Price Difference</p>
                  <p className={`font-semibold ${
                    comp.estimatedPrice > rfp.budget * 0.9 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {comp.estimatedPrice > rfp.budget * 0.9 ? '+' : ''}
                    €{(comp.estimatedPrice - rfp.budget * 0.9).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                <div>
                  <p className="font-medium text-green-700">Their Strengths</p>
                  <ul className="mt-1">
                    {comp.strengths.map((s, i) => (
                      <li key={i} className="text-gray-600">• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-700">Their Weaknesses</p>
                  <ul className="mt-1">
                    {comp.weaknesses.map((w, i) => (
                      <li key={i} className="text-gray-600">• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Proposal Status Component
  const ProposalStatus = ({ rfp }) => {
    if (!rfp) return null;

    const overallScore = Math.round(
      rfp.proposalSections.reduce((acc, s) => acc + s.score, 0) / rfp.proposalSections.length
    );

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Proposal Sections
        </h3>
        
        <div className="space-y-3">
          {rfp.proposalSections.map(section => (
            <div key={section.id} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{section.name}</h4>
                  <span className={`px-2 py-0.5 text-xs rounded ${
                    section.status === 'complete' ? 'bg-green-100 text-green-700' :
                    section.status === 'review' ? 'bg-blue-100 text-blue-700' :
                    section.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {section.status}
                  </span>
                </div>
                <span className={`font-bold ${
                  section.score >= 80 ? 'text-green-600' :
                  section.score >= 60 ? 'text-yellow-600' :
                  section.score > 0 ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {section.score}%
                </span>
              </div>
              
              <p className="text-sm text-gray-600">{section.content}</p>
              
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      section.score >= 80 ? 'bg-green-500' :
                      section.score >= 60 ? 'bg-yellow-500' :
                      section.score > 0 ? 'bg-red-500' : 'bg-gray-300'
                    }`}
                    style={{ width: `${section.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Proposal Score</span>
            <span className={`text-2xl font-bold ${
              overallScore >= 80 ? 'text-green-700' :
              overallScore >= 60 ? 'text-yellow-700' : 'text-red-700'
            }`}>
              {overallScore}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  // AI Recommendations Component
  const AIRecommendations = ({ rfp }) => {
    if (!rfp) return null;

    const generateRecommendations = () => {
      const recommendations = [];
      
      // Check for critical gaps
      const criticalGaps = rfp.requirements.filter(r => 
        r.priority === 'must-have' && (r.ourCapability === 'weak' || r.ourCapability === 'none')
      );
      
      if (criticalGaps.length > 0) {
        criticalGaps.forEach(gap => {
          recommendations.push({
            type: 'critical',
            title: `Gap: ${gap.text}`,
            action: 'Consider partnership or hiring specialist',
            impact: 'high'
          });
        });
      }

      // Check team size
      if (rfp.team.length < 3) {
        recommendations.push({
          type: 'warning',
          title: 'Small team size',
          action: 'Add more team members for credibility',
          impact: 'medium'
        });
      }

      // Check proposal completion
      const incompleteSections = rfp.proposalSections.filter(s => s.status === 'todo' || s.status === 'draft');
      if (incompleteSections.length > 0) {
        recommendations.push({
          type: 'warning',
          title: `${incompleteSections.length} sections incomplete`,
          action: 'Focus on completing critical sections first',
          impact: 'high'
        });
      }

      // Price competitiveness
      const avgCompetitorPrice = rfp.competitors.reduce((acc, c) => acc + c.estimatedPrice, 0) / rfp.competitors.length;
      if (avgCompetitorPrice < rfp.budget * 0.9) {
        recommendations.push({
          type: 'info',
          title: 'Price pressure from competitors',
          action: 'Consider value-adds to justify premium pricing',
          impact: 'medium'
        });
      }

      return recommendations;
    };

    const recommendations = generateRecommendations();

    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-sm border border-purple-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-900">
          <Brain className="w-5 h-5" />
          AI Recommendations
        </h3>
        
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white/90 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                {rec.type === 'critical' && <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />}
                {rec.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />}
                {rec.type === 'info' && <Info className="w-4 h-4 text-blue-500 mt-0.5" />}
                
                <div className="flex-1">
                  <p className="text-sm font-medium">{rec.title}</p>
                  <p className="text-xs text-gray-600 mt-1">→ {rec.action}</p>
                </div>
                
                <span className={`px-2 py-0.5 text-xs rounded ${
                  rec.impact === 'high' ? 'bg-red-100 text-red-700' :
                  rec.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {rec.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700">
          Generate Winning Strategy
        </button>
      </div>
    );
  };

  // RFP Detail View
  const RFPDetailView = () => {
    if (!selectedRFP) return null;

    const winFactors = calculateWinFactors(selectedRFP);

    return (
      <div>
        {/* RFP Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{selectedRFP.title}</h2>
              <p className="text-gray-600 mb-3">{selectedRFP.description}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {selectedRFP.client}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {selectedRFP.portal}
                </span>
                <span className="flex items-center gap-1">
                  <Euro className="w-4 h-4" />
                  {selectedRFP.budget.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(selectedRFP.deadline).toLocaleDateString('de-DE')}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setAppMode('dashboard')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b mb-6 sticky top-0 z-10">
          <div className="flex gap-6 px-6">
            {[
              { id: 'analyze', label: 'Requirements', icon: <Target className="w-4 h-4" /> },
              { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
              { id: 'compete', label: 'Competition', icon: <GitBranch className="w-4 h-4" /> },
              { id: 'proposal', label: 'Proposal', icon: <FileText className="w-4 h-4" /> },
              { id: 'pricing', label: 'Pricing', icon: <DollarSign className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all ${
                  activeTab === tab.id 
                    ? 'border-purple-600 text-purple-600 font-medium' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            {activeTab === 'analyze' && <RequirementsAnalysis rfp={selectedRFP} />}
            {activeTab === 'team' && <TeamAnalysis rfp={selectedRFP} />}
            {activeTab === 'compete' && <CompetitorAnalysis rfp={selectedRFP} />}
            {activeTab === 'proposal' && <ProposalStatus rfp={selectedRFP} />}
            {activeTab === 'pricing' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Pricing Strategy</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="text-2xl font-bold">€{selectedRFP.budget.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Recommended Price</p>
                    <p className="text-2xl font-bold">€{Math.round(selectedRFP.budget * 0.9).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Avg. Competitor Price</p>
                    <p className="text-2xl font-bold">
                      €{Math.round(selectedRFP.competitors.reduce((acc, c) => acc + c.estimatedPrice, 0) / selectedRFP.competitors.length).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <WinProbabilityGauge probability={selectedRFP.winProbability} />
            <AIRecommendations rfp={selectedRFP} />
          </div>
        </div>
      </div>
    );
  };

  // Dashboard View (keep existing)
  const DashboardView = () => {
    return (
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <FolderOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold">{activeRFPs.filter(r => r.status === 'active').length}</span>
            </div>
            <p className="text-gray-600">Active RFPs</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold">
                {Math.round(activeRFPs.reduce((acc, r) => acc + r.winProbability, 0) / activeRFPs.length)}%
              </span>
            </div>
            <p className="text-gray-600">Avg Win Rate</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <Euro className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold">
                €{(activeRFPs.reduce((acc, r) => acc + r.budget, 0) / 1000000).toFixed(1)}M
              </span>
            </div>
            <p className="text-gray-600">Pipeline Value</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold">
                {activeRFPs.filter(r => {
                  const deadline = new Date(r.submissionDeadline);
                  const today = new Date();
                  const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                  return diffDays <= 7 && diffDays >= 0;
                }).length}
              </span>
            </div>
            <p className="text-gray-600">Due This Week</p>
          </div>
        </div>

        {/* Active RFPs List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Active RFPs</h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New RFP
              </button>
            </div>
          </div>
          
          <div className="divide-y">
            {activeRFPs.map(rfp => (
              <div 
                key={rfp.id} 
                className="p-6 hover:bg-gray-50 cursor-pointer" 
                onClick={() => {
                  setSelectedRFP(rfp);
                  setAppMode('rfp-detail');
                  setActiveTab('analyze');
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{rfp.title}</h3>
                      {rfp.isDemo && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          DEMO
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        rfp.status === 'active' ? 'bg-green-100 text-green-700' :
                        rfp.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rfp.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {rfp.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {rfp.portal}
                      </span>
                      <span className="flex items-center gap-1">
                        <Scale className="w-4 h-4" />
                        {rfp.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        {rfp.budget.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(rfp.deadline).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{rfp.description}</p>
                    
                    <div className="flex gap-2">
                      {rfp.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center ml-6">
                    <div className={`text-3xl font-bold ${
                      rfp.winProbability >= 70 ? 'text-green-600' :
                      rfp.winProbability >= 40 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {rfp.winProbability}%
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Win Chance</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Main App
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-7 h-7" />
                RFP Winning Assistant
              </h1>
              
              <nav className="flex gap-4">
                <button
                  onClick={() => setAppMode('dashboard')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    appMode === 'dashboard' || appMode === 'rfp-detail' ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                <span className="text-sm">Demo Mode</span>
                <button
                  onClick={() => setDemoMode(!demoMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    demoMode ? 'bg-white/40' : 'bg-white/20'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    demoMode ? 'translate-x-6' : ''
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {appMode === 'dashboard' && <DashboardView />}
        {appMode === 'rfp-detail' && <RFPDetailView />}
      </div>
    </div>
  );
};

export default RFPWinningAssistant;