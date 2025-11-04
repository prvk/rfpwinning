import React, { useState, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Info,
  Search,
  Filter,
  Eye,
  Award,
  DollarSign,
  MapPin,
  Building2,
  Globe,
  Star,
  BarChart3,
  Target,
  Zap,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RefreshCw,
  Download,
  Plus,
  Edit3,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Minus,
  Activity
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Simulated competitor data
const COMPETITORS = [
  {
    id: 1,
    name: 'TechSolutions AG',
    logo: 'TS',
    color: 'bg-blue-500',
    status: 'active',
    threatLevel: 'high',
    overview: {
      founded: '2010',
      employees: '500-1000',
      revenue: '€50M - €100M',
      headquarters: 'Munich, Germany',
      specialization: 'Enterprise Software, Cloud Migration',
      website: 'techsolutions.de'
    },
    strengths: [
      'Strong presence in DACH region',
      'Excellent technical reputation',
      'Competitive pricing for large deals',
      'Fast implementation timelines'
    ],
    weaknesses: [
      'Limited international experience',
      'Smaller team than market leaders',
      'Less innovative in AI/ML space',
      'Customer support rated 3.5/5'
    ],
    recentWins: [
      { client: 'Automotive Corp', value: 2.5, date: '2025-09' },
      { client: 'Finance Bank', value: 1.8, date: '2025-08' },
      { client: 'Retail Chain', value: 3.2, date: '2025-07' }
    ],
    pricing: {
      hourlyRate: { min: 120, max: 180 },
      projectMin: 50000,
      competitiveness: 85
    },
    capabilities: {
      technical: 85,
      innovation: 65,
      experience: 80,
      pricing: 85,
      speed: 90,
      quality: 75
    }
  },
  {
    id: 2,
    name: 'GlobalConsult Partners',
    logo: 'GC',
    color: 'bg-green-500',
    status: 'active',
    threatLevel: 'high',
    overview: {
      founded: '2005',
      employees: '2000+',
      revenue: '€200M+',
      headquarters: 'Frankfurt, Germany',
      specialization: 'Digital Transformation, Strategy Consulting',
      website: 'globalconsult.com'
    },
    strengths: [
      'Global presence and brand recognition',
      'Extensive methodology and frameworks',
      'C-level relationships',
      'Comprehensive service portfolio'
    ],
    weaknesses: [
      'Premium pricing (20-30% above market)',
      'Slower to adapt to new technologies',
      'Complex procurement process',
      'Less hands-on technical implementation'
    ],
    recentWins: [
      { client: 'Pharma International', value: 5.5, date: '2025-09' },
      { client: 'Logistics Group', value: 4.2, date: '2025-08' }
    ],
    pricing: {
      hourlyRate: { min: 200, max: 350 },
      projectMin: 150000,
      competitiveness: 55
    },
    capabilities: {
      technical: 70,
      innovation: 75,
      experience: 95,
      pricing: 50,
      speed: 60,
      quality: 90
    }
  },
  {
    id: 3,
    name: 'Innovate Systems',
    logo: 'IS',
    color: 'bg-purple-500',
    status: 'active',
    threatLevel: 'medium',
    overview: {
      founded: '2018',
      employees: '100-250',
      revenue: '€10M - €25M',
      headquarters: 'Berlin, Germany',
      specialization: 'AI/ML, Data Analytics, Innovation',
      website: 'innovatesystems.io'
    },
    strengths: [
      'Cutting-edge AI/ML expertise',
      'Agile and flexible approach',
      'Strong innovation track record',
      'Attractive pricing for startups'
    ],
    weaknesses: [
      'Limited experience with large enterprises',
      'Smaller team may lack capacity',
      'Less established brand',
      'Limited geographic coverage'
    ],
    recentWins: [
      { client: 'Tech Startup', value: 0.8, date: '2025-10' },
      { client: 'Digital Agency', value: 1.2, date: '2025-09' }
    ],
    pricing: {
      hourlyRate: { min: 100, max: 150 },
      projectMin: 30000,
      competitiveness: 90
    },
    capabilities: {
      technical: 90,
      innovation: 95,
      experience: 60,
      pricing: 90,
      speed: 85,
      quality: 80
    }
  },
  {
    id: 4,
    name: 'Enterprise Solutions Ltd',
    logo: 'ES',
    color: 'bg-orange-500',
    status: 'monitoring',
    threatLevel: 'low',
    overview: {
      founded: '2000',
      employees: '1000-2000',
      revenue: '€100M - €150M',
      headquarters: 'London, UK',
      specialization: 'ERP, Legacy System Integration',
      website: 'enterprisesolutions.co.uk'
    },
    strengths: [
      'Deep ERP implementation experience',
      'Strong SAP and Oracle partnerships',
      'Proven methodology',
      'Extensive training programs'
    ],
    weaknesses: [
      'Focused mainly on UK market',
      'Slower innovation cycle',
      'Higher rates for DACH region',
      'Complex organizational structure'
    ],
    recentWins: [
      { client: 'Manufacturing UK', value: 3.5, date: '2025-08' }
    ],
    pricing: {
      hourlyRate: { min: 150, max: 250 },
      projectMin: 100000,
      competitiveness: 65
    },
    capabilities: {
      technical: 80,
      innovation: 55,
      experience: 90,
      pricing: 60,
      speed: 65,
      quality: 85
    }
  }
];

// Simulated news feed
const NEWS_FEED = [
  {
    id: 1,
    competitor: 'TechSolutions AG',
    title: 'TechSolutions wins major automotive contract',
    summary: 'Secured €5M deal for cloud transformation project',
    date: new Date(Date.now() - 2 * 86400000),
    category: 'win',
    source: 'Industry News'
  },
  {
    id: 2,
    competitor: 'Innovate Systems',
    title: 'Innovate Systems launches new AI product',
    summary: 'Released AI-powered proposal automation tool',
    date: new Date(Date.now() - 5 * 86400000),
    category: 'product',
    source: 'Tech Blog'
  },
  {
    id: 3,
    competitor: 'GlobalConsult Partners',
    title: 'GlobalConsult expands DACH team',
    summary: 'Hired 50 new consultants in Germany',
    date: new Date(Date.now() - 7 * 86400000),
    category: 'team',
    source: 'LinkedIn'
  },
  {
    id: 4,
    competitor: 'TechSolutions AG',
    title: 'Price increase announced',
    summary: 'Raising rates by 10% starting Q1 2026',
    date: new Date(Date.now() - 10 * 86400000),
    category: 'pricing',
    source: 'Company Blog'
  }
];

const CompetitorIntelligence = ({ rfpId }) => {
  const [competitors, setCompetitors] = useState(COMPETITORS);
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [newsFeed, setNewsFeed] = useState(NEWS_FEED);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterThreat, setFilterThreat] = useState('all');
  const [showSWOT, setShowSWOT] = useState(false);
  const [swotData, setSWotData] = useState(null);
  const [showAddCompetitor, setShowAddCompetitor] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, comparison

  useEffect(() => {
    // Simulate real-time news updates
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const randomCompetitor = COMPETITORS[Math.floor(Math.random() * COMPETITORS.length)];
        const newItem = {
          id: Date.now(),
          competitor: randomCompetitor.name,
          title: 'New development detected',
          summary: 'Latest activity from competitor monitoring',
          date: new Date(),
          category: 'update',
          source: 'Auto-Monitor'
        };
        setNewsFeed(prev => [newItem, ...prev].slice(0, 20));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredCompetitors = competitors.filter(comp => {
    const matchesSearch = searchQuery === '' ||
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.overview.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesThreat = filterThreat === 'all' || comp.threatLevel === filterThreat;
    return matchesSearch && matchesThreat;
  });

  const handleSWOTAnalysis = (competitor) => {
    setSWotData({
      competitor: competitor.name,
      strengths: competitor.strengths,
      weaknesses: competitor.weaknesses,
      opportunities: [
        'Market expansion in Eastern Europe',
        'Growing demand for AI/ML services',
        'Shift to cloud-first strategies',
        'Remote work transformation needs'
      ],
      threats: [
        'New market entrants with lower pricing',
        'Rapid technology changes',
        'Economic uncertainty',
        'Talent shortage in tech sector'
      ]
    });
    setShowSWOT(true);
  };

  // Calculate competitive positioning
  const competitivePositioningData = filteredCompetitors.map(comp => ({
    name: comp.name.split(' ')[0],
    pricing: comp.pricing.competitiveness,
    capability: (Object.values(comp.capabilities).reduce((a, b) => a + b, 0) / Object.values(comp.capabilities).length)
  }));

  // Market share simulation
  const marketShareData = [
    { name: 'GlobalConsult', value: 28, color: '#10B981' },
    { name: 'TechSolutions', value: 22, color: '#3B82F6' },
    { name: 'Enterprise Sol.', value: 18, color: '#F59E0B' },
    { name: 'Innovate Sys.', value: 12, color: '#8B5CF6' },
    { name: 'Others', value: 20, color: '#6B7280' }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Competitor Intelligence</h2>
            <p className="text-gray-600 mt-1">Track and analyze competitive landscape</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {/* Refresh data */}}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => setShowAddCompetitor(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Competitor
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search competitors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterThreat}
            onChange={(e) => setFilterThreat(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Threats</option>
            <option value="high">High Threat</option>
            <option value="medium">Medium Threat</option>
            <option value="low">Low Threat</option>
          </select>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-3 py-2 rounded ${viewMode === 'comparison' ? 'bg-white shadow' : 'text-gray-600'}`}
            >
              Compare
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Competitors List/Grid */}
        <div className={`${selectedCompetitor ? 'w-1/2' : 'flex-1'} overflow-y-auto p-6 transition-all`}>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredCompetitors.map(competitor => (
                <CompetitorCard
                  key={competitor.id}
                  competitor={competitor}
                  onSelect={() => setSelectedCompetitor(competitor)}
                  onSWOT={() => handleSWOTAnalysis(competitor)}
                  isSelected={selectedCompetitor?.id === competitor.id}
                />
              ))}
            </div>
          ) : (
            <ComparisonView competitors={filteredCompetitors} />
          )}
        </div>

        {/* Competitor Detail Panel */}
        {selectedCompetitor && (
          <div className="w-1/2 border-l border-gray-200 bg-white overflow-y-auto">
            <CompetitorDetail
              competitor={selectedCompetitor}
              onClose={() => setSelectedCompetitor(null)}
              onSWOT={() => handleSWOTAnalysis(selectedCompetitor)}
            />
          </div>
        )}
      </div>

      {/* News Feed Sidebar (bottom) */}
      <div className="h-48 border-t border-gray-200 bg-white p-4 overflow-y-auto">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Recent Intelligence
        </h3>
        <div className="space-y-2">
          {newsFeed.slice(0, 5).map(news => (
            <div key={news.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                news.category === 'win' ? 'bg-green-100 text-green-700' :
                news.category === 'product' ? 'bg-blue-100 text-blue-700' :
                news.category === 'team' ? 'bg-purple-100 text-purple-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {news.category}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{news.title}</p>
                <p className="text-xs text-gray-600">{news.competitor} • {news.source}</p>
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {Math.floor((Date.now() - news.date) / 86400000)}d ago
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SWOT Analysis Modal */}
      {showSWOT && swotData && (
        <SWOTModal
          data={swotData}
          onClose={() => setShowSWOT(false)}
        />
      )}
    </div>
  );
};

// Competitor Card Component
const CompetitorCard = ({ competitor, onSelect, onSWOT, isSelected }) => {
  const avgCapability = Object.values(competitor.capabilities).reduce((a, b) => a + b, 0) / Object.values(competitor.capabilities).length;

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${competitor.color} flex items-center justify-center text-white font-bold text-lg`}>
            {competitor.logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
            <p className="text-xs text-gray-600">{competitor.overview.headquarters}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          competitor.threatLevel === 'high' ? 'bg-red-100 text-red-700' :
          competitor.threatLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {competitor.threatLevel.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3">{competitor.overview.specialization}</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 rounded p-2">
          <p className="text-xs text-gray-600">Avg. Capability</p>
          <p className="text-lg font-bold text-gray-900">{avgCapability.toFixed(0)}%</p>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <p className="text-xs text-gray-600">Recent Wins</p>
          <p className="text-lg font-bold text-gray-900">{competitor.recentWins.length}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSWOT();
          }}
          className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm font-medium hover:bg-blue-100"
        >
          SWOT
        </button>
        <button className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Competitor Detail Component
const CompetitorDetail = ({ competitor, onClose, onSWOT }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${competitor.color} flex items-center justify-center text-white font-bold text-lg`}>
              {competitor.logo}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{competitor.name}</h3>
              <a
                href={`https://${competitor.overview.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {competitor.overview.website}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
              activeTab === 'overview' ? 'bg-white shadow' : 'text-gray-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('capabilities')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
              activeTab === 'capabilities' ? 'bg-white shadow' : 'text-gray-600'
            }`}
          >
            Capabilities
          </button>
          <button
            onClick={() => setActiveTab('wins')}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
              activeTab === 'wins' ? 'bg-white shadow' : 'text-gray-600'
            }`}
          >
            Wins
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Founded</p>
                <p className="font-semibold text-gray-900">{competitor.overview.founded}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Employees</p>
                <p className="font-semibold text-gray-900">{competitor.overview.employees}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Revenue</p>
                <p className="font-semibold text-gray-900">{competitor.overview.revenue}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Pricing</p>
                <p className="font-semibold text-gray-900">
                  €{competitor.pricing.hourlyRate.min}-{competitor.pricing.hourlyRate.max}/h
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Strengths</h4>
              <ul className="space-y-2">
                {competitor.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Weaknesses</h4>
              <ul className="space-y-2">
                {competitor.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onSWOT}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Full SWOT Analysis
            </button>
          </div>
        )}

        {activeTab === 'capabilities' && (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={Object.entries(competitor.capabilities).map(([key, value]) => ({
                capability: key.charAt(0).toUpperCase() + key.slice(1),
                value
              }))}>
                <PolarGrid />
                <PolarAngleAxis dataKey="capability" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name={competitor.name} dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>

            {Object.entries(competitor.capabilities).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                  <span className="text-sm font-semibold text-gray-900">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wins' && (
          <div className="space-y-3">
            {competitor.recentWins.map((win, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{win.client}</span>
                  <span className="text-sm font-bold text-green-600">€{win.value}M</span>
                </div>
                <p className="text-xs text-gray-600">{win.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Comparison View Component
const ComparisonView = ({ competitors }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Capability Comparison</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={competitors.slice(0, 4).map(comp => ({
          name: comp.name.split(' ')[0],
          ...comp.capabilities
        }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="technical" fill="#3B82F6" />
          <Bar dataKey="innovation" fill="#8B5CF6" />
          <Bar dataKey="experience" fill="#10B981" />
          <Bar dataKey="pricing" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// SWOT Modal Component
const SWOTModal = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">SWOT Analysis: {data.competitor}</h3>
            <button onClick={onClose} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {data.strengths.map((item, idx) => (
                  <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                    <Plus className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Weaknesses
              </h4>
              <ul className="space-y-2">
                {data.weaknesses.map((item, idx) => (
                  <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                    <Minus className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Opportunities
              </h4>
              <ul className="space-y-2">
                {data.opportunities.map((item, idx) => (
                  <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                    <Plus className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Threats
              </h4>
              <ul className="space-y-2">
                {data.threats.map((item, idx) => (
                  <li key={idx} className="text-sm text-orange-800 flex items-start gap-2">
                    <Minus className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompetitorIntelligence;
