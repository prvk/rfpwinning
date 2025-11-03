import React, { useState, useMemo } from 'react';
import {
  Users, Plus, Trash2, Settings, DollarSign, TrendingUp,
  User, Bot, Cpu, Clock, Zap, CheckCircle, AlertCircle,
  Edit3, X, ChevronDown, ChevronUp, BarChart, Target,
  Euro, Activity, Award, Percent, Calculator, Eye
} from 'lucide-react';

// Preset AI Agent Templates
const AI_AGENT_TEMPLATES = {
  proposalWriter: {
    name: 'ProposalGPT',
    role: 'Proposal Writing Specialist',
    provider: 'openai',
    model: 'gpt-4-turbo',
    tokenBudget: 100000,
    costPerToken: 0.00003,
    temperature: 0.7,
    topP: 0.9,
    systemPrompt: 'You are an expert proposal writer with 15 years of experience in B2B sales. You specialize in creating persuasive, well-structured proposals that win deals.',
    skills: ['Technical Writing', 'Content Generation', 'Persuasive Writing']
  },
  requirementsAnalyzer: {
    name: 'RequirementsAnalyzer',
    role: 'Requirements Analysis Specialist',
    provider: 'anthropic',
    model: 'claude-3-opus',
    tokenBudget: 50000,
    costPerToken: 0.000015,
    temperature: 0.3,
    topP: 0.95,
    systemPrompt: 'You are a meticulous requirements analyst specializing in RFP analysis. You excel at identifying gaps, compliance issues, and critical requirements.',
    skills: ['Document Analysis', 'Critical Thinking', 'Compliance']
  },
  competitorResearcher: {
    name: 'CompetitorResearcher',
    role: 'Competitive Intelligence Specialist',
    provider: 'perplexity',
    model: 'sonar-pro',
    tokenBudget: 30000,
    costPerToken: 0.00001,
    temperature: 0.4,
    systemPrompt: 'You are a competitive intelligence analyst with expertise in technology markets. You provide real-time competitor insights and market trends.',
    skills: ['Market Research', 'Web Research', 'SWOT Analysis']
  },
  technicalWriter: {
    name: 'TechDocWriter',
    role: 'Technical Documentation Specialist',
    provider: 'openai',
    model: 'gpt-4',
    tokenBudget: 75000,
    costPerToken: 0.00002,
    temperature: 0.5,
    topP: 0.9,
    systemPrompt: 'You are a technical writer specializing in clear, accurate documentation for complex systems and architectures.',
    skills: ['Technical Writing', 'Documentation', 'Architecture']
  }
};

// Preset Compute Resources
const COMPUTE_TEMPLATES = {
  gpuCluster: {
    name: 'DocumentVision GPU Cluster',
    role: 'Document Processing & Vision Analysis',
    resourceType: 'gpu',
    gpuModel: 'NVIDIA A100',
    gpuCount: 4,
    hours: 10,
    costPerHour: 2.5,
    throughput: '500 pages/hour',
    useCase: 'Document Processing'
  },
  apiCredits: {
    name: 'LLM API Credits Pool',
    role: 'API Credits Management',
    resourceType: 'api_credits',
    tokenBudget: 500000,
    costPerToken: 0.00002,
    throughput: '10k tokens/minute',
    useCase: 'Multi-Model Access'
  }
};

// Sample initial team
const INITIAL_TEAM = [
  {
    id: 'human_1',
    type: 'human',
    name: 'Sarah Chen',
    role: 'Senior Project Manager',
    cost: 95,
    capacity: 40,
    availability: 100,
    skills: ['Project Management', 'Agile', 'Technical Writing'],
    experience: 12
  },
  {
    id: 'human_2',
    type: 'human',
    name: 'Marcus Weber',
    role: 'Senior Developer',
    cost: 85,
    capacity: 40,
    availability: 80,
    skills: ['Development', 'Cloud Architecture', 'DevOps'],
    experience: 10
  },
  {
    id: 'ai_1',
    type: 'ai-agent',
    name: 'ProposalGPT',
    role: 'Proposal Writing Specialist',
    model: 'gpt-4-turbo',
    provider: 'openai',
    tokenBudget: 100000,
    tokenUsed: 0,
    costPerToken: 0.00003,
    skills: ['Technical Writing', 'Content Generation']
  },
  {
    id: 'ai_2',
    type: 'ai-agent',
    name: 'RequirementsAnalyzer',
    role: 'Requirements Analysis Specialist',
    model: 'claude-3-opus',
    provider: 'anthropic',
    tokenBudget: 50000,
    tokenUsed: 0,
    costPerToken: 0.000015,
    skills: ['Document Analysis', 'Compliance']
  },
  {
    id: 'compute_1',
    type: 'compute',
    name: 'GPU Cluster',
    role: 'Document Processing',
    resourceType: 'gpu',
    hours: 10,
    hoursUsed: 0,
    costPerHour: 2.5,
    gpuModel: 'NVIDIA A100',
    gpuCount: 4
  }
];

const HybridTeam = () => {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMemberTab, setAddMemberTab] = useState('human'); // human, ai-agent, compute
  const [selectedMember, setSelectedMember] = useState(null);
  const [projectDuration, setProjectDuration] = useState(40); // hours
  const [totalBudget, setTotalBudget] = useState(15000);

  // Add Member Form State
  const [newHuman, setNewHuman] = useState({
    name: '',
    role: '',
    cost: 85,
    capacity: 40,
    availability: 100,
    skills: []
  });

  const [newAI, setNewAI] = useState({
    template: '',
    name: '',
    role: '',
    provider: 'openai',
    model: 'gpt-4-turbo',
    tokenBudget: 50000,
    costPerToken: 0.00003,
    temperature: 0.7,
    topP: 0.9,
    systemPrompt: '',
    skills: []
  });

  const [newCompute, setNewCompute] = useState({
    template: '',
    name: '',
    role: '',
    resourceType: 'gpu',
    hours: 10,
    costPerHour: 2.5,
    gpuModel: 'NVIDIA A100',
    gpuCount: 4,
    tokenBudget: 0
  });

  // Cost Calculations
  const costBreakdown = useMemo(() => {
    let humanCost = 0;
    let aiCost = 0;
    let computeCost = 0;

    const humanDetails = [];
    const aiDetails = [];
    const computeDetails = [];

    team.forEach(member => {
      if (member.type === 'human') {
        const hours = projectDuration * (member.availability / 100);
        const cost = hours * member.cost;
        humanCost += cost;
        humanDetails.push({
          name: member.name,
          hours,
          rate: member.cost,
          cost
        });
      } else if (member.type === 'ai-agent') {
        const cost = (member.tokenBudget / 1000) * member.costPerToken;
        aiCost += cost;
        aiDetails.push({
          name: member.name,
          tokens: member.tokenBudget,
          rate: member.costPerToken,
          cost
        });
      } else if (member.type === 'compute') {
        const cost = member.hours * member.costPerHour;
        computeCost += cost;
        computeDetails.push({
          name: member.name,
          hours: member.hours,
          rate: member.costPerHour,
          cost
        });
      }
    });

    const total = humanCost + aiCost + computeCost;
    const traditionalCost = projectDuration * 90; // avg human rate
    const savings = traditionalCost - total;
    const savingsPercent = traditionalCost > 0 ? (savings / traditionalCost) * 100 : 0;

    return {
      human: { total: humanCost, details: humanDetails },
      ai: { total: aiCost, details: aiDetails },
      compute: { total: computeCost, details: computeDetails },
      total,
      traditionalCost,
      savings,
      savingsPercent
    };
  }, [team, projectDuration]);

  // Add Member Functions
  const handleAddHuman = () => {
    const member = {
      id: `human_${Date.now()}`,
      type: 'human',
      ...newHuman,
      tokenUsed: 0
    };
    setTeam([...team, member]);
    setShowAddModal(false);
    resetForms();
  };

  const handleAddAI = () => {
    const member = {
      id: `ai_${Date.now()}`,
      type: 'ai-agent',
      name: newAI.name,
      role: newAI.role,
      provider: newAI.provider,
      model: newAI.model,
      tokenBudget: newAI.tokenBudget,
      tokenUsed: 0,
      costPerToken: newAI.costPerToken,
      temperature: newAI.temperature,
      topP: newAI.topP,
      systemPrompt: newAI.systemPrompt,
      skills: newAI.skills
    };
    setTeam([...team, member]);
    setShowAddModal(false);
    resetForms();
  };

  const handleAddCompute = () => {
    const member = {
      id: `compute_${Date.now()}`,
      type: 'compute',
      name: newCompute.name,
      role: newCompute.role,
      resourceType: newCompute.resourceType,
      hours: newCompute.hours,
      hoursUsed: 0,
      costPerHour: newCompute.costPerHour,
      gpuModel: newCompute.gpuModel,
      gpuCount: newCompute.gpuCount
    };
    setTeam([...team, member]);
    setShowAddModal(false);
    resetForms();
  };

  const resetForms = () => {
    setNewHuman({
      name: '',
      role: '',
      cost: 85,
      capacity: 40,
      availability: 100,
      skills: []
    });
    setNewAI({
      template: '',
      name: '',
      role: '',
      provider: 'openai',
      model: 'gpt-4-turbo',
      tokenBudget: 50000,
      costPerToken: 0.00003,
      temperature: 0.7,
      topP: 0.9,
      systemPrompt: '',
      skills: []
    });
    setNewCompute({
      template: '',
      name: '',
      role: '',
      resourceType: 'gpu',
      hours: 10,
      costPerHour: 2.5,
      gpuModel: 'NVIDIA A100',
      gpuCount: 4
    });
  };

  const handleRemoveMember = (id) => {
    setTeam(team.filter(m => m.id !== id));
  };

  const handleTemplateSelect = (templateKey) => {
    const template = AI_AGENT_TEMPLATES[templateKey];
    if (template) {
      setNewAI({
        template: templateKey,
        name: template.name,
        role: template.role,
        provider: template.provider,
        model: template.model,
        tokenBudget: template.tokenBudget,
        costPerToken: template.costPerToken,
        temperature: template.temperature,
        topP: template.topP,
        systemPrompt: template.systemPrompt,
        skills: template.skills
      });
    }
  };

  const handleComputeTemplateSelect = (templateKey) => {
    const template = COMPUTE_TEMPLATES[templateKey];
    if (template) {
      setNewCompute({
        template: templateKey,
        name: template.name,
        role: template.role,
        resourceType: template.resourceType,
        hours: template.hours,
        costPerHour: template.costPerHour,
        gpuModel: template.gpuModel || '',
        gpuCount: template.gpuCount || 1,
        tokenBudget: template.tokenBudget || 0
      });
    }
  };

  const getMemberIcon = (type) => {
    switch (type) {
      case 'human': return <User className="w-5 h-5" />;
      case 'ai-agent': return <Bot className="w-5 h-5" />;
      case 'compute': return <Cpu className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'human': return 'Human';
      case 'ai-agent': return 'AI Agent';
      case 'compute': return 'Compute';
      default: return type;
    }
  };

  const budgetSpent = costBreakdown.total;
  const budgetRemaining = totalBudget - budgetSpent;
  const budgetProgress = (budgetSpent / totalBudget) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hybrid Team Manager</h1>
              <p className="text-sm text-gray-600">Digital Platform RFP Team</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-700 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Total Budget</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              €{totalBudget.toLocaleString()}
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-700 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Estimated Cost</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              €{Math.round(budgetSpent).toLocaleString()}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700 mb-1">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Remaining</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              €{Math.round(budgetRemaining).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Budget Usage</span>
            <span className="font-medium text-gray-900">{Math.round(budgetProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                budgetProgress > 90 ? 'bg-red-500' :
                budgetProgress > 70 ? 'bg-orange-500' :
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-xs text-purple-700 font-medium mb-1">Human Resources</div>
            <div className="text-lg font-bold text-purple-900">
              €{Math.round(costBreakdown.human.total).toLocaleString()}
            </div>
            <div className="text-xs text-purple-600">
              {costBreakdown.total > 0
                ? Math.round((costBreakdown.human.total / costBreakdown.total) * 100)
                : 0}% of total
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs text-blue-700 font-medium mb-1">AI Agents</div>
            <div className="text-lg font-bold text-blue-900">
              €{Math.round(costBreakdown.ai.total).toLocaleString()}
            </div>
            <div className="text-xs text-blue-600">
              {costBreakdown.total > 0
                ? Math.round((costBreakdown.ai.total / costBreakdown.total) * 100)
                : 0}% of total
            </div>
          </div>

          <div className="bg-cyan-50 rounded-lg p-3">
            <div className="text-xs text-cyan-700 font-medium mb-1">Compute</div>
            <div className="text-lg font-bold text-cyan-900">
              €{Math.round(costBreakdown.compute.total).toLocaleString()}
            </div>
            <div className="text-xs text-cyan-600">
              {costBreakdown.total > 0
                ? Math.round((costBreakdown.compute.total / costBreakdown.total) * 100)
                : 0}% of total
            </div>
          </div>
        </div>
      </div>

      {/* Cost Calculator Widget */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Cost Calculator</h2>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Duration: {projectDuration} hours
          </label>
          <input
            type="range"
            min="10"
            max="160"
            step="10"
            value={projectDuration}
            onChange={(e) => setProjectDuration(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="bg-white rounded-lg p-4 space-y-3">
          {/* Human Cost Details */}
          {costBreakdown.human.details.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-2">Human Resources</div>
              {costBreakdown.human.details.map((detail, idx) => (
                <div key={idx} className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">
                    {detail.name} · {Math.round(detail.hours)}h × €{detail.rate}
                  </span>
                  <span className="font-medium">€{Math.round(detail.cost).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-purple-700 pt-2 border-t">
                <span>Subtotal Human</span>
                <span>€{Math.round(costBreakdown.human.total).toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* AI Cost Details */}
          {costBreakdown.ai.details.length > 0 && (
            <div className="pt-3">
              <div className="text-sm font-semibold text-gray-700 mb-2">AI Agents</div>
              {costBreakdown.ai.details.map((detail, idx) => (
                <div key={idx} className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">
                    {detail.name} · {(detail.tokens / 1000).toFixed(0)}k tokens
                  </span>
                  <span className="font-medium">€{detail.cost.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-blue-700 pt-2 border-t">
                <span>Subtotal AI</span>
                <span>€{costBreakdown.ai.total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Compute Cost Details */}
          {costBreakdown.compute.details.length > 0 && (
            <div className="pt-3">
              <div className="text-sm font-semibold text-gray-700 mb-2">Compute Resources</div>
              {costBreakdown.compute.details.map((detail, idx) => (
                <div key={idx} className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">
                    {detail.name} · {detail.hours}h × €{detail.rate}
                  </span>
                  <span className="font-medium">€{Math.round(detail.cost).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold text-cyan-700 pt-2 border-t">
                <span>Subtotal Compute</span>
                <span>€{Math.round(costBreakdown.compute.total).toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-gray-900">TOTAL ESTIMATED COST</span>
              <span className="text-2xl font-bold text-blue-600">
                €{Math.round(costBreakdown.total).toLocaleString()}
              </span>
            </div>

            {/* Savings Analysis */}
            <div className="border-t border-blue-200 pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Traditional team cost:</span>
                <span className="text-gray-900 font-medium">
                  €{Math.round(costBreakdown.traditionalCost).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Your hybrid cost:</span>
                <span className="text-gray-900 font-medium">
                  €{Math.round(costBreakdown.total).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-green-700">Savings:</span>
                <span className="text-green-700">
                  €{Math.round(costBreakdown.savings).toLocaleString()}
                  ({Math.round(costBreakdown.savingsPercent)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Team Members ({team.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {team.map((member) => (
            <div
              key={member.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  member.type === 'human' ? 'bg-purple-100 text-purple-600' :
                  member.type === 'ai-agent' ? 'bg-blue-100 text-blue-600' :
                  'bg-cyan-100 text-cyan-600'
                }`}>
                  {getMemberIcon(member.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.type === 'human' ? 'bg-purple-100 text-purple-700' :
                        member.type === 'ai-agent' ? 'bg-blue-100 text-blue-700' :
                        'bg-cyan-100 text-cyan-700'
                      }`}>
                        {getTypeLabel(member.type)}
                      </span>
                    </div>

                    {member.type === 'human' && (
                      <>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Euro className="w-4 h-4" />
                          <span>{member.cost}/hr</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Percent className="w-4 h-4" />
                          <span>{member.availability}% available</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          <span>{member.experience}y exp</span>
                        </div>
                      </>
                    )}

                    {member.type === 'ai-agent' && (
                      <>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Bot className="w-4 h-4" />
                          <span>{member.model}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Activity className="w-4 h-4" />
                          <span>€{(member.costPerToken * 1000).toFixed(2)}/1k tokens</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Zap className="w-4 h-4" />
                          <span>{(member.tokenBudget / 1000).toFixed(0)}k tokens</span>
                        </div>
                      </>
                    )}

                    {member.type === 'compute' && (
                      <>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Cpu className="w-4 h-4" />
                          <span>{member.gpuModel || 'Compute Resource'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Euro className="w-4 h-4" />
                          <span>{member.costPerHour}/hr</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{member.hours} hours</span>
                        </div>
                      </>
                    )}
                  </div>

                  {member.skills && member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Cost Summary */}
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Expected Cost</div>
                  <div className="text-lg font-bold text-gray-900">
                    {member.type === 'human' && (
                      `€${Math.round(projectDuration * (member.availability / 100) * member.cost).toLocaleString()}`
                    )}
                    {member.type === 'ai-agent' && (
                      `€${((member.tokenBudget / 1000) * member.costPerToken).toFixed(2)}`
                    )}
                    {member.type === 'compute' && (
                      `€${(member.hours * member.costPerHour).toFixed(2)}`
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add Team Member</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6">
              <button
                onClick={() => setAddMemberTab('human')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  addMemberTab === 'human'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Human
                </div>
              </button>
              <button
                onClick={() => setAddMemberTab('ai-agent')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  addMemberTab === 'ai-agent'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AI Agent
                </div>
              </button>
              <button
                onClick={() => setAddMemberTab('compute')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  addMemberTab === 'compute'
                    ? 'border-cyan-600 text-cyan-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Compute
                </div>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Human Tab */}
              {addMemberTab === 'human' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newHuman.name}
                      onChange={(e) => setNewHuman({ ...newHuman, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={newHuman.role}
                      onChange={(e) => setNewHuman({ ...newHuman, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Senior Developer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hourly Rate (€)
                      </label>
                      <input
                        type="number"
                        value={newHuman.cost}
                        onChange={(e) => setNewHuman({ ...newHuman, cost: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Availability (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newHuman.availability}
                        onChange={(e) => setNewHuman({ ...newHuman, availability: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={newHuman.skills.join(', ')}
                      onChange={(e) => setNewHuman({
                        ...newHuman,
                        skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., React, Node.js, AWS"
                    />
                  </div>

                  <button
                    onClick={handleAddHuman}
                    disabled={!newHuman.name || !newHuman.role}
                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Add Human Member
                  </button>
                </div>
              )}

              {/* AI Agent Tab */}
              {addMemberTab === 'ai-agent' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Template
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(AI_AGENT_TEMPLATES).map(([key, template]) => (
                        <button
                          key={key}
                          onClick={() => handleTemplateSelect(key)}
                          className={`p-3 border rounded-lg text-left hover:border-blue-500 transition-colors ${
                            newAI.template === key ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-sm">{template.name}</div>
                          <div className="text-xs text-gray-600">{template.model}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newAI.name}
                      onChange={(e) => setNewAI({ ...newAI, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={newAI.role}
                      onChange={(e) => setNewAI({ ...newAI, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provider
                      </label>
                      <select
                        value={newAI.provider}
                        onChange={(e) => setNewAI({ ...newAI, provider: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="google">Google</option>
                        <option value="perplexity">Perplexity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model
                      </label>
                      <input
                        type="text"
                        value={newAI.model}
                        onChange={(e) => setNewAI({ ...newAI, model: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Token Budget
                      </label>
                      <input
                        type="number"
                        value={newAI.tokenBudget}
                        onChange={(e) => setNewAI({ ...newAI, tokenBudget: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost per Token (€)
                      </label>
                      <input
                        type="number"
                        step="0.000001"
                        value={newAI.costPerToken}
                        onChange={(e) => setNewAI({ ...newAI, costPerToken: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm text-blue-900">
                      Estimated Cost: <span className="font-bold">
                        €{((newAI.tokenBudget / 1000) * newAI.costPerToken).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddAI}
                    disabled={!newAI.name || !newAI.role}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Add AI Agent
                  </button>
                </div>
              )}

              {/* Compute Tab */}
              {addMemberTab === 'compute' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Choose Template
                    </label>
                    <div className="space-y-2">
                      {Object.entries(COMPUTE_TEMPLATES).map(([key, template]) => (
                        <button
                          key={key}
                          onClick={() => handleComputeTemplateSelect(key)}
                          className={`w-full p-3 border rounded-lg text-left hover:border-cyan-500 transition-colors ${
                            newCompute.template === key ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-sm">{template.name}</div>
                          <div className="text-xs text-gray-600">{template.role}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newCompute.name}
                      onChange={(e) => setNewCompute({ ...newCompute, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={newCompute.role}
                      onChange={(e) => setNewCompute({ ...newCompute, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hours Allocated
                      </label>
                      <input
                        type="number"
                        value={newCompute.hours}
                        onChange={(e) => setNewCompute({ ...newCompute, hours: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost per Hour (€)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={newCompute.costPerHour}
                        onChange={(e) => setNewCompute({ ...newCompute, costPerHour: Number(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {newCompute.resourceType === 'gpu' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GPU Model
                        </label>
                        <input
                          type="text"
                          value={newCompute.gpuModel}
                          onChange={(e) => setNewCompute({ ...newCompute, gpuModel: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GPU Count
                        </label>
                        <input
                          type="number"
                          value={newCompute.gpuCount}
                          onChange={(e) => setNewCompute({ ...newCompute, gpuCount: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-cyan-50 rounded-lg p-3">
                    <div className="text-sm text-cyan-900">
                      Estimated Cost: <span className="font-bold">
                        €{(newCompute.hours * newCompute.costPerHour).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddCompute}
                    disabled={!newCompute.name || !newCompute.role}
                    className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Add Compute Resource
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Budget Tracker */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">Budget Tracker</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700 mb-1">Total Budget</div>
            <div className="text-2xl font-bold text-blue-900">€{totalBudget.toLocaleString()}</div>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-sm text-orange-700 mb-1">Allocated</div>
            <div className="text-2xl font-bold text-orange-900">€{Math.round(budgetSpent).toLocaleString()}</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-700 mb-1">Remaining</div>
            <div className="text-2xl font-bold text-green-900">€{Math.round(budgetRemaining).toLocaleString()}</div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-700 mb-1">Utilization</div>
            <div className="text-2xl font-bold text-purple-900">{Math.round(budgetProgress)}%</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Cost Efficiency</span>
          </div>
          <p className="text-sm text-gray-700">
            Your hybrid team is {Math.round(costBreakdown.savingsPercent)}% more cost-efficient than a traditional all-human team,
            saving €{Math.round(costBreakdown.savings).toLocaleString()} on this project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HybridTeam;
