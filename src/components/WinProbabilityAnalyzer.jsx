import React, { useState, useEffect } from 'react';
import {
  Target,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Info,
  Lightbulb,
  Sliders,
  BarChart3,
  Award,
  Users,
  DollarSign,
  Clock,
  Star,
  Zap,
  Brain,
  Activity,
  ArrowRight,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// ML Model Factors
const WIN_FACTORS = {
  relationship: {
    label: 'Client Relationship',
    description: 'Existing relationship and trust with client',
    weight: 0.20,
    currentValue: 75,
    impact: 'high',
    icon: Users
  },
  pricing: {
    label: 'Pricing Competitiveness',
    description: 'How competitive is your pricing vs market',
    weight: 0.18,
    currentValue: 68,
    impact: 'high',
    icon: DollarSign
  },
  technical: {
    label: 'Technical Capability',
    description: 'Technical fit and expertise demonstration',
    weight: 0.15,
    currentValue: 85,
    impact: 'medium',
    icon: Zap
  },
  experience: {
    label: 'Relevant Experience',
    description: 'Past projects and case studies relevance',
    weight: 0.15,
    currentValue: 80,
    impact: 'medium',
    icon: Award
  },
  timeline: {
    label: 'Timeline Alignment',
    description: 'Ability to meet client deadlines',
    weight: 0.12,
    currentValue: 90,
    impact: 'medium',
    icon: Clock
  },
  team: {
    label: 'Team Quality',
    description: 'Proposed team expertise and availability',
    weight: 0.10,
    currentValue: 82,
    impact: 'low',
    icon: Users
  },
  innovation: {
    label: 'Innovation Factor',
    description: 'Unique approach and innovative solutions',
    weight: 0.10,
    currentValue: 70,
    impact: 'low',
    icon: Brain
  }
};

// Historical comparison data
const HISTORICAL_WINS = [
  { name: 'ERP Project', winProb: 75, result: 'won', similarity: 85 },
  { name: 'Cloud Migration', winProb: 68, result: 'won', similarity: 78 },
  { name: 'Security Audit', winProb: 82, result: 'won', similarity: 65 },
  { name: 'Data Analytics', winProb: 55, result: 'lost', similarity: 72 },
  { name: 'Mobile App', winProb: 45, result: 'lost', similarity: 60 }
];

const WinProbabilityAnalyzer = ({ rfpId, rfpTitle }) => {
  const [factors, setFactors] = useState(WIN_FACTORS);
  const [winProbability, setWinProbability] = useState(0);
  const [confidenceInterval, setConfidenceInterval] = useState({ lower: 0, upper: 0 });
  const [recommendations, setRecommendations] = useState([]);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [whatIfFactors, setWhatIfFactors] = useState(WIN_FACTORS);
  const [whatIfProbability, setWhatIfProbability] = useState(0);

  // Calculate win probability
  useEffect(() => {
    calculateWinProbability(factors);
  }, [factors]);

  const calculateWinProbability = (factorsToUse) => {
    let totalScore = 0;
    Object.entries(factorsToUse).forEach(([key, factor]) => {
      totalScore += (factor.currentValue / 100) * factor.weight;
    });

    const probability = Math.round(totalScore * 100);
    setWinProbability(probability);

    // Calculate confidence interval (simulated)
    const variance = 8; // +/- 8%
    setConfidenceInterval({
      lower: Math.max(0, probability - variance),
      upper: Math.min(100, probability + variance)
    });

    // Generate recommendations
    generateRecommendations(factorsToUse, probability);
  };

  const generateRecommendations = (factorsToUse, probability) => {
    const recs = [];

    // Find weak factors
    const weakFactors = Object.entries(factorsToUse)
      .filter(([_, factor]) => factor.currentValue < 70)
      .sort((a, b) => (b[1].weight * (100 - b[1].currentValue)) - (a[1].weight * (100 - a[1].currentValue)));

    weakFactors.slice(0, 3).forEach(([key, factor]) => {
      const potentialGain = factor.weight * (80 - factor.currentValue);
      recs.push({
        factor: factor.label,
        currentValue: factor.currentValue,
        issue: `Score below 70% - High improvement potential`,
        action: getRecommendationAction(key),
        impact: Math.round(potentialGain * 100),
        priority: factor.impact
      });
    });

    // Add strategic recommendations
    if (probability < 60) {
      recs.push({
        factor: 'Overall Strategy',
        currentValue: probability,
        issue: 'Win probability below 60%',
        action: 'Consider if this opportunity aligns with your strengths. May need significant resource investment.',
        impact: 0,
        priority: 'high'
      });
    }

    setRecommendations(recs);
  };

  const getRecommendationAction = (factorKey) => {
    const actions = {
      relationship: 'Schedule executive meeting with client. Leverage existing relationships.',
      pricing: 'Review pricing model. Consider value-based pricing or flexible payment terms.',
      technical: 'Add technical proof-of-concept or demo. Include detailed architecture diagrams.',
      experience: 'Add 2-3 highly relevant case studies. Request client references.',
      timeline: 'Revise project timeline. Add buffer for risk mitigation.',
      team: 'Highlight key team members expertise. Add resumes and certifications.',
      innovation: 'Emphasize unique approach. Add innovation/differentiation section.'
    };
    return actions[factorKey] || 'Review and improve this area';
  };

  const handleFactorChange = (factorKey, newValue) => {
    setFactors({
      ...factors,
      [factorKey]: {
        ...factors[factorKey],
        currentValue: newValue
      }
    });
  };

  const handleWhatIfChange = (factorKey, newValue) => {
    const newFactors = {
      ...whatIfFactors,
      [factorKey]: {
        ...whatIfFactors[factorKey],
        currentValue: newValue
      }
    };
    setWhatIfFactors(newFactors);

    // Calculate what-if probability
    let totalScore = 0;
    Object.entries(newFactors).forEach(([key, factor]) => {
      totalScore += (factor.currentValue / 100) * factor.weight;
    });
    setWhatIfProbability(Math.round(totalScore * 100));
  };

  const resetWhatIf = () => {
    setWhatIfFactors(factors);
    setWhatIfProbability(winProbability);
  };

  // Prepare chart data
  const factorChartData = Object.entries(factors).map(([key, factor]) => ({
    name: factor.label.split(' ').slice(0, 2).join(' '),
    score: factor.currentValue,
    weight: factor.weight * 100,
    weighted: (factor.currentValue * factor.weight).toFixed(1)
  }));

  const radarData = Object.entries(factors).map(([key, factor]) => ({
    factor: factor.label.split(' ')[0],
    current: factor.currentValue,
    target: 85
  }));

  const trendData = [
    { stage: 'Initial', probability: 45 },
    { stage: 'Analysis', probability: 58 },
    { stage: 'Draft', probability: 68 },
    { stage: 'Review', probability: 73 },
    { stage: 'Current', probability: winProbability },
    { stage: 'Optimized', probability: Math.min(95, winProbability + 15) }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Win Probability Analysis</h2>
            <p className="text-gray-600 mt-1">{rfpTitle}</p>
          </div>
          <button
            onClick={() => setShowWhatIf(!showWhatIf)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              showWhatIf
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sliders className="w-5 h-5" />
            What-If Analysis
          </button>
        </div>

        {/* Main Score */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-8 h-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Win Probability</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-blue-600">{winProbability}%</span>
                <span className="text-gray-600">
                  ({confidenceInterval.lower}% - {confidenceInterval.upper}%)
                </span>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  winProbability >= 75 ? 'bg-green-100 text-green-700' :
                  winProbability >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {winProbability >= 75 ? 'Strong' : winProbability >= 60 ? 'Moderate' : 'Weak'}
                </div>
                {winProbability >= 70 && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    High confidence
                  </span>
                )}
              </div>
            </div>

            {/* Mini gauge */}
            <div className="w-32 h-32">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  strokeDasharray={`${winProbability * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Factor Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Success Factors
          </h3>

          <div className="space-y-4">
            {Object.entries(factors).map(([key, factor]) => {
              const Icon = factor.icon;
              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{factor.label}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        factor.impact === 'high' ? 'bg-red-100 text-red-700' :
                        factor.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {Math.round(factor.weight * 100)}% weight
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{factor.currentValue}%</span>
                      <span className="text-xs text-gray-500 w-12 text-right">
                        +{((factor.currentValue * factor.weight) / factor.weight).toFixed(0)}pts
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={factor.currentValue}
                      onChange={(e) => handleFactorChange(key, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${factor.currentValue}%, #E5E7EB ${factor.currentValue}%, #E5E7EB 100%)`
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">{factor.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Factor Contribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Factor Contribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={factorChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="weighted" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Capability Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Radar name="Target" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Probability Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Win Probability Evolution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorProbability" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="probability" stroke="#3B82F6" fillOpacity={1} fill="url(#colorProbability)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            AI Recommendations
          </h3>

          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600">All factors are performing well!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === 'high' ? 'border-red-500 bg-red-50' :
                  rec.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{rec.factor}</h4>
                        {rec.impact > 0 && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                            +{rec.impact}% potential
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{rec.issue}</p>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-900">{rec.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historical Comparison */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Historical Projects</h3>
          <div className="space-y-3">
            {HISTORICAL_WINS.map((project, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{project.name}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      project.result === 'won'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {project.result.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Win Probability: {project.winProb}% • Similarity: {project.similarity}%
                  </p>
                </div>
                {project.result === 'won' && (
                  <Award className="w-5 h-5 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What-If Analysis Modal */}
      {showWhatIf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">What-If Analysis</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Adjust factors to see potential impact on win probability
                  </p>
                </div>
                <button
                  onClick={() => setShowWhatIf(false)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Comparison */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-medium text-blue-700 mb-1">Current Probability</p>
                  <p className="text-3xl font-bold text-blue-600">{winProbability}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-medium text-green-700 mb-1">What-If Probability</p>
                  <p className="text-3xl font-bold text-green-600">{whatIfProbability}%</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {whatIfProbability > winProbability ? '+' : ''}
                    {whatIfProbability - winProbability}% change
                  </p>
                </div>
              </div>

              {/* Adjustable Factors */}
              <div className="space-y-4">
                {Object.entries(whatIfFactors).map(([key, factor]) => {
                  const Icon = factor.icon;
                  const change = factor.currentValue - factors[key].currentValue;
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-900">{factor.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{factor.currentValue}%</span>
                          {change !== 0 && (
                            <span className={`text-xs font-medium ${
                              change > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              ({change > 0 ? '+' : ''}{change}%)
                            </span>
                          )}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={factor.currentValue}
                        onChange={(e) => handleWhatIfChange(key, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #10B981 0%, #10B981 ${factor.currentValue}%, #E5E7EB ${factor.currentValue}%, #E5E7EB 100%)`
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={resetWhatIf}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={() => setShowWhatIf(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinProbabilityAnalyzer;
