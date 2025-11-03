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
  FileCheck,
  Grid3x3,
  SortAsc,
  Bell,
  User,
  Calendar,
  Activity,
  Package,
  Rocket,
  FileType,
  Percent,
  Clock4,
  CheckCheck,
  ArrowLeft,
  ChevronUp
} from 'lucide-react';

// Import data
import { faqData, glossaryData, portalDirectoryData } from './data/knowledgeBase';
import { getAllTemplates } from './data/templates';

const RFPWinningAssistant = () => {
  // App State
  const [appMode, setAppMode] = useState('dashboard'); // dashboard, rfp-detail, knowledge-base
  const [demoMode, setDemoMode] = useState(true);
  const [activeTab, setActiveTab] = useState('analyze');
  const [knowledgeTab, setKnowledgeTab] = useState('faq'); // faq, glossary, portals

  // Dashboard State
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPortal, setFilterPortal] = useState('all');
  const [sortBy, setSortBy] = useState('deadline'); // deadline, winProb, budget, recent
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 10000000 });

  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateDetailsModal, setShowTemplateDetailsModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Upload State
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Notification State
  const [notifications, setNotifications] = useState(12);

  // Comments State (per RFP section)
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showCommentsFor, setShowCommentsFor] = useState(null);

  // Demo RFP Data - Fully populated
  const demoRFPData = {
    1: {
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
      createdAt: '2025-01-15',

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

      scoringCriteria: [
        { id: 1, name: 'Preis', weight: 30, description: 'Kosteneffizienz des Angebots' },
        { id: 2, name: 'Team Kompetenz', weight: 30, description: 'Qualifikation und Erfahrung des Teams' },
        { id: 3, name: 'Konzept Qualität', weight: 40, description: 'Technischer Ansatz und Umsetzungsplan' }
      ],

      team: [
        { id: 1, name: 'Sarah Chen', role: 'Project Lead', rate: 95, availability: 100, skills: ['PM', 'Agile', 'Stakeholder'], score: 95, status: 'assigned' },
        { id: 2, name: 'Marcus Weber', role: 'Senior Developer', rate: 85, availability: 80, skills: ['React', 'Node.js', 'PayloadCMS'], score: 88, status: 'assigned' },
        { id: 3, name: 'Lisa Schmidt', role: 'UI/UX Designer', rate: 75, availability: 60, skills: ['Figma', 'WCAG', 'User Research'], score: 82, status: 'assigned' },
        { id: 4, name: 'Tom Rodriguez', role: 'Backend Developer', rate: 75, availability: 100, skills: ['Python', 'PostgreSQL', 'API'], score: 79, status: 'assigned' }
      ],

      competitors: [
        { id: 1, name: 'BayaLab Agency', strength: 85, estimatedPrice: 125000, strengths: ['Award-winning projects', 'International team'], weaknesses: ['Remote only', 'Higher price'] },
        { id: 2, name: 'TechCorp Solutions', strength: 78, estimatedPrice: 140000, strengths: ['Large team', 'Many references'], weaknesses: ['Expensive', 'Slow delivery'] },
        { id: 3, name: 'Digital Innovations', strength: 72, estimatedPrice: 115000, strengths: ['Innovation focus', 'Good design'], weaknesses: ['Small team', 'Limited capacity'] }
      ],

      proposalSections: [
        { id: 1, name: 'Executive Summary', status: 'complete', score: 90, content: 'Clear value proposition with ROI focus', assignedTo: 'Sarah Chen' },
        { id: 2, name: 'Technical Approach', status: 'complete', score: 85, content: 'Detailed architecture with Next.js and PayloadCMS', assignedTo: 'Marcus Weber' },
        { id: 3, name: 'Team & Qualifications', status: 'complete', score: 95, content: 'Strong team with relevant experience', assignedTo: 'Sarah Chen' },
        { id: 4, name: 'Project Timeline', status: 'review', score: 75, content: '12 weeks development + 2 weeks buffer', assignedTo: 'Sarah Chen' },
        { id: 5, name: 'Pricing', status: 'review', score: 70, content: 'Competitive pricing at €135,000', assignedTo: 'Sarah Chen' },
        { id: 6, name: 'Case Studies', status: 'complete', score: 90, content: '3 relevant Fintech projects showcased', assignedTo: 'Lisa Schmidt' },
        { id: 7, name: 'Risk Mitigation', status: 'draft', score: 60, content: 'Identifying maintenance partner needed', assignedTo: 'Tom Rodriguez' },
        { id: 8, name: 'Value Adds', status: 'complete', score: 85, content: 'Free discovery workshop included', assignedTo: 'Sarah Chen' }
      ],

      activities: [
        { id: 1, type: 'created', user: 'Sarah Chen', date: '2025-01-15', message: 'RFP created and initial analysis completed' },
        { id: 2, type: 'team', user: 'Sarah Chen', date: '2025-01-16', message: 'Team members assigned' },
        { id: 3, type: 'update', user: 'Marcus Weber', date: '2025-01-18', message: 'Technical approach section completed' },
        { id: 4, type: 'comment', user: 'Lisa Schmidt', date: '2025-01-20', message: 'Added case studies and portfolio samples' },
        { id: 5, type: 'update', user: 'Sarah Chen', date: '2025-01-22', message: 'Proposal sections under review' }
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
      createdAt: '2025-01-20',

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
        { id: 1, name: 'Julia Martinez', role: 'Campaign Manager', rate: 85, availability: 100, skills: ['Strategy', 'B2B', 'SaaS'], score: 92, status: 'assigned' },
        { id: 2, name: 'Alex Turner', role: 'Content Creator', rate: 65, availability: 80, skills: ['Writing', 'SEO', 'Social'], score: 85, status: 'assigned' },
        { id: 3, name: 'Nina Patel', role: 'Performance Marketer', rate: 75, availability: 60, skills: ['Google Ads', 'Analytics', 'CRO'], score: 88, status: 'assigned' }
      ],

      competitors: [
        { id: 1, name: 'Creative Studios Berlin', strength: 70, estimatedPrice: 48000, strengths: ['Great creative', 'Local presence'], weaknesses: ['Limited B2B experience'] },
        { id: 2, name: 'Growth Hackers Agency', strength: 65, estimatedPrice: 38000, strengths: ['Performance focus', 'Data-driven'], weaknesses: ['Weak on creative'] }
      ],

      proposalSections: [
        { id: 1, name: 'Campaign Strategy', status: 'complete', score: 95, content: 'Comprehensive B2B SaaS go-to-market strategy', assignedTo: 'Julia Martinez' },
        { id: 2, name: 'Creative Concepts', status: 'complete', score: 90, content: '3 campaign concepts with mockups', assignedTo: 'Alex Turner' },
        { id: 3, name: 'Media Plan', status: 'complete', score: 85, content: 'Detailed channel mix and budget allocation', assignedTo: 'Nina Patel' },
        { id: 4, name: 'KPIs & Metrics', status: 'complete', score: 88, content: 'Clear success metrics and tracking setup', assignedTo: 'Nina Patel' },
        { id: 5, name: 'Pricing', status: 'complete', score: 92, content: 'Competitive at €42,000 with performance bonus', assignedTo: 'Julia Martinez' }
      ],

      activities: [
        { id: 1, type: 'created', user: 'Julia Martinez', date: '2025-01-20', message: 'Campaign RFP received from client' },
        { id: 2, type: 'team', user: 'Julia Martinez', date: '2025-01-21', message: 'Team assembled and sections assigned' },
        { id: 3, type: 'update', user: 'Alex Turner', date: '2025-01-23', message: 'Creative concepts developed' },
        { id: 4, type: 'update', user: 'Nina Patel', date: '2025-01-24', message: 'Media plan and KPIs completed' }
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
      createdAt: '2025-01-10',

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
        { id: 1, name: 'Dr. Michael Hoffmann', role: 'Principal Consultant', rate: 180, availability: 40, skills: ['Strategy', 'Public Sector'], score: 85, status: 'pending' },
        { id: 2, name: 'Sandra Meyer', role: 'Senior Consultant', rate: 120, availability: 60, skills: ['Process', 'Agile'], score: 78, status: 'pending' }
      ],

      competitors: [
        { id: 1, name: 'Big4 Consulting', strength: 95, estimatedPrice: 3000000, strengths: ['Large team', 'All competencies', 'References'], weaknesses: ['Very expensive'] },
        { id: 2, name: 'Boutique Consultancy', strength: 60, estimatedPrice: 2000000, strengths: ['Specialized', 'Flexible'], weaknesses: ['Limited capacity'] }
      ],

      proposalSections: [
        { id: 1, name: 'Company Profile', status: 'draft', score: 40, content: 'Need to emphasize capacity', assignedTo: 'Dr. Michael Hoffmann' },
        { id: 2, name: 'Team Structure', status: 'todo', score: 0, content: 'Partner network required', assignedTo: null },
        { id: 3, name: 'References', status: 'draft', score: 50, content: 'Only 2 public sector references', assignedTo: 'Sandra Meyer' },
        { id: 4, name: 'Methodology', status: 'review', score: 70, content: 'Agile transformation framework', assignedTo: 'Dr. Michael Hoffmann' },
        { id: 5, name: 'Pricing', status: 'todo', score: 0, content: 'Rate card needed', assignedTo: null }
      ],

      activities: [
        { id: 1, type: 'created', user: 'Dr. Michael Hoffmann', date: '2025-01-10', message: 'Framework RFP identified in TED' },
        { id: 2, type: 'comment', user: 'Sandra Meyer', date: '2025-01-12', message: 'Critical gaps identified - need partnerships' },
        { id: 3, type: 'update', user: 'Dr. Michael Hoffmann', date: '2025-01-15', message: 'Methodology section drafted' }
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

  // Calculate Win Factors
  const calculateWinFactors = (rfp) => {
    if (!rfp) return {};

    const mustHaves = rfp.requirements.filter(r => r.priority === 'must-have');
    const strongCapabilities = mustHaves.filter(r => r.ourCapability === 'strong' || r.ourCapability === 'medium');
    const requirementsFit = mustHaves.length > 0 ? (strongCapabilities.length / mustHaves.length) * 100 : 0;

    const teamStrength = rfp.team.length >= 3 ?
      rfp.team.reduce((acc, m) => acc + m.score, 0) / rfp.team.length : 30;

    const proposalQuality = rfp.proposalSections.reduce((acc, s) => acc + s.score, 0) / rfp.proposalSections.length;

    const avgCompetitorPrice = rfp.competitors.reduce((acc, c) => acc + c.estimatedPrice, 0) / rfp.competitors.length;
    const ourPrice = rfp.budget * 0.9;
    const priceCompetitiveness = ourPrice <= avgCompetitorPrice ? 70 : 50;

    return {
      requirementsFit: Math.round(requirementsFit),
      priceCompetitiveness,
      teamStrength: Math.round(teamStrength),
      pastPerformance: 75,
      differentiators: 60,
      clientRelationship: 40,
      proposalQuality: Math.round(proposalQuality),
      localPresence: 50
    };
  };

  // Filter and Sort RFPs
  const getFilteredAndSortedRFPs = () => {
    let filtered = [...activeRFPs];

    // Apply filters
    if (filterStatus !== 'all') {
      filtered = filtered.filter(rfp => rfp.status === filterStatus);
    }

    if (filterPortal !== 'all') {
      filtered = filtered.filter(rfp => rfp.portal === filterPortal);
    }

    if (searchQuery) {
      filtered = filtered.filter(rfp =>
        rfp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfp.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(rfp =>
      rfp.budget >= budgetRange.min && rfp.budget <= budgetRange.max
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'winProb':
          return b.winProbability - a.winProbability;
        case 'budget':
          return b.budget - a.budget;
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  };

  // File Upload Simulation
  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setTimeout(() => {
            setShowUploadModal(false);
            setShowTemplateModal(true);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Export Simulation
  const handleExport = (format) => {
    alert(`Exporting to ${format}... (Demo mode - no actual file generated)`);
    setShowExportModal(false);
  };

  // Add Comment
  const handleAddComment = (sectionId) => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      sectionId,
      user: 'Current User',
      date: new Date().toISOString().split('T')[0],
      message: newComment
    };

    setComments(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), comment]
    }));

    setNewComment('');
  };

  // Components

  // Win Probability Gauge
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

  // AI Coach Panel
  const AICoachPanel = ({ rfp }) => {
    if (!rfp) return null;

    const generateRecommendations = () => {
      const recommendations = [];

      const criticalGaps = rfp.requirements.filter(r =>
        r.priority === 'must-have' && (r.ourCapability === 'weak' || r.ourCapability === 'none')
      );

      if (criticalGaps.length > 0) {
        criticalGaps.forEach(gap => {
          recommendations.push({
            type: 'critical',
            title: `Critical Gap: ${gap.text}`,
            action: 'Consider partnership or hiring specialist',
            impact: 'high',
            quickWin: false
          });
        });
      }

      if (rfp.team.length < 3) {
        recommendations.push({
          type: 'warning',
          title: 'Small team size may affect credibility',
          action: 'Add more team members for larger projects',
          impact: 'medium',
          quickWin: false
        });
      }

      const incompleteSections = rfp.proposalSections.filter(s => s.status === 'todo' || s.status === 'draft');
      if (incompleteSections.length > 0) {
        recommendations.push({
          type: 'warning',
          title: `${incompleteSections.length} sections incomplete`,
          action: 'Focus on completing critical sections first',
          impact: 'high',
          quickWin: true
        });
      }

      // Quick wins
      const lowScoredSections = rfp.proposalSections.filter(s => s.score < 70 && s.score > 0);
      if (lowScoredSections.length > 0) {
        recommendations.push({
          type: 'info',
          title: 'Quick win: Improve low-scored sections',
          action: `Focus on: ${lowScoredSections.map(s => s.name).join(', ')}`,
          impact: 'medium',
          quickWin: true
        });
      }

      // Success patterns
      if (rfp.winProbability > 70) {
        recommendations.push({
          type: 'success',
          title: 'Success Pattern: Strong requirements fit',
          action: 'Emphasize your technical strengths in proposal',
          impact: 'high',
          quickWin: false
        });
      }

      return recommendations;
    };

    const recommendations = generateRecommendations();
    const quickWins = recommendations.filter(r => r.quickWin);

    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow-sm border border-purple-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-900">
          <Brain className="w-5 h-5" />
          AI Coach
        </h3>

        <div className="space-y-3 mb-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white/90 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                {rec.type === 'critical' && <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />}
                {rec.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />}
                {rec.type === 'info' && <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />}
                {rec.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{rec.title}</p>
                  <p className="text-xs text-gray-600 mt-1">→ {rec.action}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 text-xs rounded whitespace-nowrap ${
                    rec.impact === 'high' ? 'bg-red-100 text-red-700' :
                    rec.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {rec.impact}
                  </span>
                  {rec.quickWin && (
                    <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 whitespace-nowrap">
                      Quick Win
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {quickWins.length > 0 && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Wins Available ({quickWins.length})
            </h4>
            <p className="text-xs text-green-700">
              Address these items for immediate impact on win probability
            </p>
          </div>
        )}

        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Generate Winning Strategy
        </button>
      </div>
    );
  };

  // Requirements Analysis with Gap Detection
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
                  <button
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
                    onClick={() => alert('Gap fixing options:\n1. Find partner\n2. Hire specialist\n3. Adjust scope\n(Demo mode)')}
                  >
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

  // Team Analysis with Collaboration
  const TeamAnalysis = ({ rfp }) => {
    if (!rfp) return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Team Configuration & Assignments
        </h3>

        <div className="space-y-3">
          {rfp.team.map(member => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
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
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Rate</p>
                  <p className="font-medium">€{member.rate}/hr</p>
                </div>
                <div className="text-right">
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
                <span className={`px-2 py-1 text-xs rounded ${
                  member.status === 'assigned' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {member.status}
                </span>
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

        <button className="mt-4 w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>
    );
  };

  // Competitor Analysis
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
                  <p className="text-gray-600">vs Our Price</p>
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
                  <p className="font-medium text-green-700 mb-1">Their Strengths</p>
                  <ul>
                    {comp.strengths.map((s, i) => (
                      <li key={i} className="text-gray-600">• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-700 mb-1">Their Weaknesses</p>
                  <ul>
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

  // Proposal Status with Comments
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
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${
                    section.score >= 80 ? 'text-green-600' :
                    section.score >= 60 ? 'text-yellow-600' :
                    section.score > 0 ? 'text-red-600' : 'text-gray-400'
                  }`}>
                    {section.score}%
                  </span>
                  <button
                    onClick={() => setShowCommentsFor(showCommentsFor === section.id ? null : section.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">{section.content}</p>

              {section.assignedTo && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <User className="w-3 h-3" />
                  {section.assignedTo}
                </div>
              )}

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

              {showCommentsFor === section.id && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <h5 className="text-xs font-semibold mb-2">Comments</h5>
                  <div className="space-y-2 mb-2">
                    {(comments[section.id] || []).map(comment => (
                      <div key={comment.id} className="text-xs bg-white p-2 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{comment.user}</span>
                          <span className="text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-2 py-1 text-xs border rounded"
                    />
                    <button
                      onClick={() => handleAddComment(section.id)}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
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

  // Activity Timeline
  const ActivityTimeline = ({ rfp }) => {
    if (!rfp || !rfp.activities) return null;

    const getActivityIcon = (type) => {
      switch(type) {
        case 'created': return <Plus className="w-3 h-3" />;
        case 'team': return <Users className="w-3 h-3" />;
        case 'update': return <Edit3 className="w-3 h-3" />;
        case 'comment': return <MessageSquare className="w-3 h-3" />;
        default: return <Activity className="w-3 h-3" />;
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Activity Feed
        </h3>

        <div className="space-y-3">
          {rfp.activities.map(activity => (
            <div key={activity.id} className="flex gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.type === 'created' ? 'bg-purple-100 text-purple-600' :
                activity.type === 'team' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'update' ? 'bg-green-100 text-green-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.message}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <User className="w-3 h-3" />
                  {activity.user}
                  <span>•</span>
                  <Calendar className="w-3 h-3" />
                  {activity.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // BPMN Process Visualization
  const BPMNProcessFlow = ({ currentPhase }) => {
    const phases = [
      { id: 'screening', name: 'Screening', icon: <Search className="w-4 h-4" /> },
      { id: 'bid-decision', name: 'Bid/No-Bid', icon: <CheckSquare className="w-4 h-4" /> },
      { id: 'requirements', name: 'Requirements', icon: <Target className="w-4 h-4" /> },
      { id: 'team', name: 'Team Assembly', icon: <Users className="w-4 h-4" /> },
      { id: 'proposal', name: 'Proposal Writing', icon: <FileText className="w-4 h-4" /> },
      { id: 'pricing', name: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
      { id: 'review', name: 'Review', icon: <Eye className="w-4 h-4" /> },
      { id: 'submission', name: 'Submission', icon: <Send className="w-4 h-4" /> }
    ];

    const currentIndex = phases.findIndex(p => p.id === currentPhase);

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Process Flow (BPMN)
        </h3>

        <div className="flex items-center justify-between">
          {phases.map((phase, index) => (
            <React.Fragment key={phase.id}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index < currentIndex ? 'bg-green-100 text-green-600' :
                  index === currentIndex ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-200' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {phase.icon}
                </div>
                <p className={`text-xs mt-2 text-center ${
                  index === currentIndex ? 'font-semibold' : ''
                }`}>
                  {phase.name}
                </p>
              </div>
              {index < phases.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  index < currentIndex ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Upload Modal
  const UploadModal = () => {
    if (!showUploadModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Upload className="w-6 h-6" />
              Upload RFP Document
            </h2>
            <button
              onClick={() => setShowUploadModal(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileUp className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 mb-2">Drag and drop your RFP document here</p>
              <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, DOC, DOCX, ZIP</p>
              <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.zip"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
                Browse Files
              </label>
            </div>

            {isUploading && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Uploading and parsing...</span>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  AI is extracting requirements, deadlines, and key information...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Template Selection Modal
  const TemplateSelectionModal = () => {
    if (!showTemplateModal) return null;

    const templates = getAllTemplates();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Layers className="w-6 h-6" />
              Select Industry Template
            </h2>
            <button
              onClick={() => setShowTemplateModal(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            Choose a template that matches your RFP to auto-populate requirements and scoring criteria
          </p>

          <div className="grid grid-cols-2 gap-4">
            {templates.map(template => (
              <div
                key={template.id}
                className="border rounded-lg p-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
                onClick={() => {
                  setSelectedTemplate(template);
                  setShowTemplateDetailsModal(true);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{template.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{template.requirements.length} requirements</span>
                      <span>•</span>
                      <span>€{(template.budgetRange.min / 1000).toFixed(0)}k - €{(template.budgetRange.max / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowTemplateModal(false)}
            className="mt-4 w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Skip Template
          </button>
        </div>
      </div>
    );
  };

  // Template Details Modal
  const TemplateDetailsModal = () => {
    if (!showTemplateDetailsModal || !selectedTemplate) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-3xl">{selectedTemplate.icon}</span>
              {selectedTemplate.name}
            </h2>
            <button
              onClick={() => setShowTemplateDetailsModal(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">{selectedTemplate.description}</p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                Requirements ({selectedTemplate.requirements.length})
              </h3>
              <div className="space-y-2">
                {selectedTemplate.requirements.slice(0, 5).map((req, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{req.text}</span>
                    <span className={`ml-auto px-2 py-0.5 text-xs rounded ${
                      req.priority === 'must-have' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {req.priority}
                    </span>
                  </div>
                ))}
                {selectedTemplate.requirements.length > 5 && (
                  <p className="text-sm text-gray-500 ml-6">
                    + {selectedTemplate.requirements.length - 5} more requirements
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Scoring Criteria
              </h3>
              <div className="space-y-2">
                {selectedTemplate.scoringCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                    <div>
                      <span className="font-medium">{criteria.name}</span>
                      <p className="text-xs text-gray-600">{criteria.description}</p>
                    </div>
                    <span className="font-bold text-blue-600">{criteria.weight}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Typical Team Roles
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.typicalRoles.map((role, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                alert('Template applied! (Demo mode - would create new RFP with template data)');
                setShowTemplateDetailsModal(false);
                setShowTemplateModal(false);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Use This Template
            </button>
            <button
              onClick={() => setShowTemplateDetailsModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Export Modal
  const ExportModal = () => {
    if (!showExportModal) return null;

    const exportOptions = [
      { format: 'Word', icon: <FileText className="w-8 h-8" />, desc: 'Complete proposal document', color: 'blue' },
      { format: 'PDF', icon: <FileDown className="w-8 h-8" />, desc: 'Print-ready proposal', color: 'red' },
      { format: 'Excel', icon: <BarChart className="w-8 h-8" />, desc: 'Pricing and scoring tables', color: 'green' },
      { format: 'CSV', icon: <Database className="w-8 h-8" />, desc: 'Data backup', color: 'gray' }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Download className="w-6 h-6" />
              Export Proposal
            </h2>
            <button
              onClick={() => setShowExportModal(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {exportOptions.map(option => (
              <button
                key={option.format}
                onClick={() => handleExport(option.format)}
                className={`p-4 border-2 rounded-lg hover:border-${option.color}-500 hover:bg-${option.color}-50 transition-all text-left`}
              >
                <div className={`text-${option.color}-600 mb-2`}>{option.icon}</div>
                <h3 className="font-semibold mb-1">{option.format}</h3>
                <p className="text-sm text-gray-600">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Knowledge Base View
  const KnowledgeBaseView = () => {
    const [glossarySearch, setGlossarySearch] = useState('');
    const [portalFilter, setPortalFilter] = useState('all');

    const filteredGlossary = glossaryData.filter(item =>
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(glossarySearch.toLowerCase())
    );

    const filteredPortals = portalFilter === 'all'
      ? portalDirectoryData
      : portalDirectoryData.filter(p => p.coverage.includes(portalFilter));

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-7 h-7" />
            Knowledge Base
          </h2>

          {/* Tabs */}
          <div className="flex gap-4 border-b mb-6">
            {[
              { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" />, count: faqData.length },
              { id: 'glossary', label: 'Glossary', icon: <Book className="w-4 h-4" />, count: glossaryData.length },
              { id: 'portals', label: 'Portal Directory', icon: <Globe className="w-4 h-4" />, count: portalDirectoryData.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setKnowledgeTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all ${
                  knowledgeTab === tab.id
                    ? 'border-purple-600 text-purple-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* FAQ Tab */}
          {knowledgeTab === 'faq' && (
            <div className="space-y-4">
              {faqData.map(faq => (
                <div key={faq.id} className="p-4 border rounded-lg hover:border-blue-500 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded whitespace-nowrap ml-2">
                      {faq.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{faq.answer}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {faq.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {faq.helpfulCount} helpful
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Glossary Tab */}
          {knowledgeTab === 'glossary' && (
            <div>
              <div className="mb-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search glossary terms..."
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {filteredGlossary.map(item => (
                  <div key={item.id} className="p-4 border rounded-lg hover:border-purple-500 transition-all">
                    <h3 className="font-semibold text-lg mb-2">{item.term}</h3>
                    <p className="text-sm text-gray-700 mb-3">{item.definition}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        {item.category}
                      </span>
                      {item.relatedTerms && item.relatedTerms.length > 0 && (
                        <div className="flex gap-1 text-xs text-gray-500">
                          <span>Related:</span>
                          <span className="font-medium">{item.relatedTerms.slice(0, 2).join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portals Tab */}
          {knowledgeTab === 'portals' && (
            <div>
              <div className="mb-4 flex gap-2">
                {['all', 'Bund', 'EU-weit', 'Bayern', 'Berlin'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setPortalFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      portalFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredPortals.map(portal => (
                  <div key={portal.id} className="p-4 border rounded-lg hover:border-blue-500 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{portal.logo}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{portal.name}</h3>
                          <p className="text-sm text-gray-600">{portal.fullName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(portal.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-600">Scope:</p>
                        <p className="font-medium">{portal.scope}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Threshold:</p>
                        <p className="font-medium">{portal.threshold}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{portal.specialFeatures}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {portal.pros.slice(0, 2).map((pro, i) => (
                          <span key={i} className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                            ✓ {pro}
                          </span>
                        ))}
                      </div>
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        Visit Portal
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Autonomous Agent Preview
  const AutonomousAgentPreview = () => {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg shadow-sm border border-indigo-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-900">Autonomous Agent (Coming Soon)</h3>
            <p className="text-sm text-indigo-600">24/7 Portal Monitoring & Auto-Matching</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-white/80 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-sm">Portal Monitoring</span>
              <span className="ml-auto px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">Preview</span>
            </div>
            <p className="text-xs text-gray-600">
              Continuous monitoring of DTVP, TED, and 10+ portals for matching opportunities
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-sm">AI Auto-Matching</span>
              <span className="ml-auto px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">Preview</span>
            </div>
            <p className="text-xs text-gray-600">
              Intelligent matching based on your capability profile and success patterns
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-sm">Smart Alerts</span>
              <span className="ml-auto px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">Preview</span>
            </div>
            <p className="text-xs text-gray-600">
              Instant notifications for high-probability RFPs matching your sweet spot
            </p>
          </div>
        </div>

        <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center gap-2">
          <Settings className="w-4 h-4" />
          Configure Capability Profile
        </button>
      </div>
    );
  };

  // Dashboard View
  const DashboardView = () => {
    const filteredRFPs = getFilteredAndSortedRFPs();

    const stats = {
      active: activeRFPs.filter(r => r.status === 'active').length,
      avgWinRate: Math.round(activeRFPs.reduce((acc, r) => acc + r.winProbability, 0) / activeRFPs.length),
      pipelineValue: activeRFPs.reduce((acc, r) => acc + r.budget, 0),
      dueThisWeek: activeRFPs.filter(r => {
        const deadline = new Date(r.submissionDeadline);
        const today = new Date();
        const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays >= 0;
      }).length
    };

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <FolderOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold">{stats.active}</span>
            </div>
            <p className="text-gray-600">Active RFPs</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold">{stats.avgWinRate}%</span>
            </div>
            <p className="text-gray-600">Avg Win Rate</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <Euro className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold">€{(stats.pipelineValue / 1000000).toFixed(1)}M</span>
            </div>
            <p className="text-gray-600">Pipeline Value</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold">{stats.dueThisWeek}</span>
            </div>
            <p className="text-gray-600">Due This Week</p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active RFPs</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New RFP
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search RFPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={filterPortal}
              onChange={(e) => setFilterPortal(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Portals</option>
              <option value="DTVP">DTVP</option>
              <option value="TED">TED</option>
              <option value="Direct">Direct</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="winProb">Sort by Win Probability</option>
              <option value="budget">Sort by Budget</option>
              <option value="recent">Sort by Recent</option>
            </select>
          </div>
        </div>

        {/* RFPs List/Grid */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {filteredRFPs.map(rfp => (
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
                        €{rfp.budget.toLocaleString()}
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
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredRFPs.map(rfp => (
              <div
                key={rfp.id}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md cursor-pointer transition-all"
                onClick={() => {
                  setSelectedRFP(rfp);
                  setAppMode('rfp-detail');
                  setActiveTab('analyze');
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg flex-1">{rfp.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rfp.status === 'active' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {rfp.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{rfp.client}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">€{(rfp.budget / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Deadline</span>
                    <span className="font-medium">{new Date(rfp.deadline).toLocaleDateString('de-DE')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Portal</span>
                    <span className="font-medium">{rfp.portal}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">Win Probability</span>
                    <span className={`font-bold ${
                      rfp.winProbability >= 70 ? 'text-green-600' :
                      rfp.winProbability >= 40 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {rfp.winProbability}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        rfp.winProbability >= 70 ? 'bg-green-500' :
                        rfp.winProbability >= 40 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${rfp.winProbability}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {rfp.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
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
            <div className="flex-1">
              <button
                onClick={() => setAppMode('dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>

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
                  €{selectedRFP.budget.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(selectedRFP.deadline).toLocaleDateString('de-DE')}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
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
              { id: 'pricing', label: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'timeline', label: 'Timeline', icon: <Activity className="w-4 h-4" /> }
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
          <div className="col-span-2 space-y-6">
            {activeTab === 'analyze' && <RequirementsAnalysis rfp={selectedRFP} />}
            {activeTab === 'team' && <TeamAnalysis rfp={selectedRFP} />}
            {activeTab === 'compete' && <CompetitorAnalysis rfp={selectedRFP} />}
            {activeTab === 'proposal' && <ProposalStatus rfp={selectedRFP} />}
            {activeTab === 'pricing' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing Strategy
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Client Budget</p>
                    <p className="text-2xl font-bold">€{selectedRFP.budget.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Recommended Price</p>
                    <p className="text-2xl font-bold">€{Math.round(selectedRFP.budget * 0.9).toLocaleString()}</p>
                    <p className="text-xs text-gray-600 mt-1">90% of budget - competitive positioning</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Avg. Competitor Price</p>
                    <p className="text-2xl font-bold">
                      €{Math.round(selectedRFP.competitors.reduce((acc, c) => acc + c.estimatedPrice, 0) / selectedRFP.competitors.length).toLocaleString()}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Scoring Weight</h4>
                    <div className="space-y-2">
                      {selectedRFP.scoringCriteria.map(criteria => (
                        <div key={criteria.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{criteria.name}</span>
                          <span className="font-bold text-blue-600">{criteria.weight}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <BPMNProcessFlow currentPhase={selectedRFP.phase} />
                <ActivityTimeline rfp={selectedRFP} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <WinProbabilityGauge probability={selectedRFP.winProbability} />
            <AICoachPanel rfp={selectedRFP} />
            <AutonomousAgentPreview />
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
                <button
                  onClick={() => setAppMode('knowledge-base')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    appMode === 'knowledge-base' ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  Knowledge Base
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-white/10 rounded-lg">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

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
        {appMode === 'knowledge-base' && <KnowledgeBaseView />}
      </div>

      {/* Modals */}
      <UploadModal />
      <TemplateSelectionModal />
      <TemplateDetailsModal />
      <ExportModal />
    </div>
  );
};

export default RFPWinningAssistant;
