import React, { useState, useEffect } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  List,
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Target,
  Award,
  Users,
  Filter,
  Download,
  Settings,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  Archive,
  Copy,
  Star,
  Search,
  ArrowRight,
  Zap,
  Trophy,
  Percent
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';
import { BarChart, Bar, LineChart, Line, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Sample RFP data with status
const SAMPLE_RFPS = [
  {
    id: 1,
    title: 'Cloud Migration RFP',
    client: 'TechCorp AG',
    value: 450000,
    deadline: new Date(2025, 10, 6),
    status: 'in_progress',
    priority: 'high',
    winProbability: 75,
    assignedTo: ['SM', 'TW'],
    progress: 85
  },
  {
    id: 2,
    title: 'ERP System Implementation',
    client: 'Manufacturing GmbH',
    value: 850000,
    deadline: new Date(2025, 10, 15),
    status: 'draft',
    priority: 'high',
    winProbability: 62,
    assignedTo: ['LS', 'MF'],
    progress: 45
  },
  {
    id: 3,
    title: 'Security Audit Services',
    client: 'FinanceBank',
    value: 120000,
    deadline: new Date(2025, 10, 10),
    status: 'in_progress',
    priority: 'medium',
    winProbability: 85,
    assignedTo: ['AK'],
    progress: 70
  },
  {
    id: 4,
    title: 'Data Analytics Platform',
    client: 'Retail Solutions',
    value: 320000,
    deadline: new Date(2025, 10, 20),
    status: 'submitted',
    priority: 'medium',
    winProbability: 58,
    assignedTo: ['SM', 'TW', 'MF'],
    progress: 100
  },
  {
    id: 5,
    title: 'Mobile App Development',
    client: 'Startup Ventures',
    value: 180000,
    deadline: new Date(2025, 10, 8),
    status: 'draft',
    priority: 'low',
    winProbability: 45,
    assignedTo: ['TW'],
    progress: 30
  },
  {
    id: 6,
    title: 'AI Consulting Project',
    client: 'Healthcare Systems',
    value: 620000,
    deadline: new Date(2025, 10, 25),
    status: 'won',
    priority: 'high',
    winProbability: 100,
    assignedTo: ['SM', 'MF'],
    progress: 100
  },
  {
    id: 7,
    title: 'Network Infrastructure',
    client: 'Global Logistics',
    value: 280000,
    deadline: new Date(2025, 9, 28),
    status: 'lost',
    priority: 'medium',
    winProbability: 0,
    assignedTo: ['LS'],
    progress: 100
  }
];

const STATUS_CONFIG = {
  draft: {
    label: 'Draft',
    color: 'bg-gray-100 text-gray-700',
    icon: FileText,
    border: 'border-gray-300'
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-700',
    icon: Clock,
    border: 'border-blue-300'
  },
  submitted: {
    label: 'Submitted',
    color: 'bg-purple-100 text-purple-700',
    icon: CheckCircle2,
    border: 'border-purple-300'
  },
  won: {
    label: 'Won',
    color: 'bg-green-100 text-green-700',
    icon: Trophy,
    border: 'border-green-300'
  },
  lost: {
    label: 'Lost',
    color: 'bg-red-100 text-red-700',
    icon: XCircle,
    border: 'border-red-300'
  }
};

const PRIORITY_CONFIG = {
  high: { color: 'text-red-600', bg: 'bg-red-50', label: 'High' },
  medium: { color: 'text-orange-600', bg: 'bg-orange-50', label: 'Medium' },
  low: { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Low' }
};

// Analytics data
const generateAnalyticsData = () => {
  const winRate = (SAMPLE_RFPS.filter(r => r.status === 'won').length /
    SAMPLE_RFPS.filter(r => ['won', 'lost'].includes(r.status)).length * 100) || 0;

  const totalPipeline = SAMPLE_RFPS
    .filter(r => !['won', 'lost'].includes(r.status))
    .reduce((sum, rfp) => sum + rfp.value, 0);

  const wonValue = SAMPLE_RFPS
    .filter(r => r.status === 'won')
    .reduce((sum, rfp) => sum + rfp.value, 0);

  const avgWinProbability = SAMPLE_RFPS
    .filter(r => !['won', 'lost'].includes(r.status))
    .reduce((sum, rfp) => sum + rfp.winProbability, 0) /
    SAMPLE_RFPS.filter(r => !['won', 'lost'].includes(r.status)).length || 0;

  // Monthly data for trends
  const monthlyData = [
    { month: 'Jul', proposals: 8, won: 3, value: 420000 },
    { month: 'Aug', proposals: 12, won: 5, value: 680000 },
    { month: 'Sep', proposals: 10, won: 4, value: 520000 },
    { month: 'Oct', proposals: 15, won: 6, value: 820000 },
    { month: 'Nov', proposals: 7, won: 1, value: 620000 }
  ];

  // Status distribution
  const statusData = Object.entries(
    SAMPLE_RFPS.reduce((acc, rfp) => {
      acc[rfp.status] = (acc[rfp.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, count]) => ({
    name: STATUS_CONFIG[status].label,
    value: count,
    color: STATUS_CONFIG[status].color
  }));

  // Value by status
  const valueByStatus = Object.entries(
    SAMPLE_RFPS.reduce((acc, rfp) => {
      acc[rfp.status] = (acc[rfp.status] || 0) + rfp.value;
      return acc;
    }, {})
  ).map(([status, value]) => ({
    status: STATUS_CONFIG[status].label,
    value: value / 1000, // in thousands
    fill: getStatusColor(status)
  }));

  return {
    winRate,
    totalPipeline,
    wonValue,
    avgWinProbability,
    monthlyData,
    statusData,
    valueByStatus
  };
};

const getStatusColor = (status) => {
  const colors = {
    draft: '#9CA3AF',
    in_progress: '#3B82F6',
    submitted: '#8B5CF6',
    won: '#10B981',
    lost: '#EF4444'
  };
  return colors[status] || '#9CA3AF';
};

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

const EnhancedDashboard = ({ onRFPClick, onCreateNew }) => {
  const [viewMode, setViewMode] = useState('kanban'); // kanban, calendar, analytics
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [rfps, setRfps] = useState(SAMPLE_RFPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [analytics, setAnalytics] = useState(generateAnalyticsData());
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    setAnalytics(generateAnalyticsData());
  }, [rfps]);

  // Filter RFPs
  const filteredRfps = rfps.filter(rfp => {
    const matchesSearch = searchQuery === '' ||
      rfp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfp.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || rfp.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || rfp.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Kanban columns
  const kanbanColumns = [
    { id: 'draft', title: 'Draft', rfps: filteredRfps.filter(r => r.status === 'draft') },
    { id: 'in_progress', title: 'In Progress', rfps: filteredRfps.filter(r => r.status === 'in_progress') },
    { id: 'submitted', title: 'Submitted', rfps: filteredRfps.filter(r => r.status === 'submitted') },
    { id: 'won', title: 'Won', rfps: filteredRfps.filter(r => r.status === 'won') },
    { id: 'lost', title: 'Lost', rfps: filteredRfps.filter(r => r.status === 'lost') }
  ];

  const handleDragStart = (e, rfp) => {
    setDraggedItem(rfp);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedItem && draggedItem.status !== newStatus) {
      setRfps(prev =>
        prev.map(rfp =>
          rfp.id === draggedItem.id
            ? { ...rfp, status: newStatus }
            : rfp
        )
      );
    }
    setDraggedItem(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">RFP Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage and track all your proposals</p>
          </div>
          <button
            onClick={onCreateNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New RFP
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Pipeline Value</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  €{(analytics.totalPipeline / 1000).toFixed(0)}K
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Win Rate</p>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {analytics.winRate.toFixed(0)}%
                </p>
              </div>
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Active RFPs</p>
                <p className="text-2xl font-bold text-purple-900 mt-1">
                  {rfps.filter(r => ['draft', 'in_progress'].includes(r.status)).length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Avg. Win Prob.</p>
                <p className="text-2xl font-bold text-orange-900 mt-1">
                  {analytics.avgWinProbability.toFixed(0)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Filters and View Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search RFPs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-2 rounded ${viewMode === 'kanban' ? 'bg-white shadow' : 'text-gray-600'}`}
              title="Kanban View"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-2 rounded ${viewMode === 'calendar' ? 'bg-white shadow' : 'text-gray-600'}`}
              title="Calendar View"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-3 py-2 rounded ${viewMode === 'analytics' ? 'bg-white shadow' : 'text-gray-600'}`}
              title="Analytics View"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'kanban' && (
          <KanbanView
            columns={kanbanColumns}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onRFPClick={onRFPClick}
          />
        )}

        {viewMode === 'calendar' && (
          <CalendarView
            rfps={filteredRfps}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            onRFPClick={onRFPClick}
          />
        )}

        {viewMode === 'analytics' && (
          <AnalyticsView analytics={analytics} />
        )}
      </div>
    </div>
  );
};

// Kanban View Component
const KanbanView = ({ columns, onDragStart, onDragOver, onDrop, onRFPClick }) => {
  return (
    <div className="h-full overflow-x-auto p-6">
      <div className="flex gap-4 h-full min-w-max">
        {columns.map(column => (
          <div
            key={column.id}
            className="flex-1 min-w-[300px] flex flex-col"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {column.rfps.length}
                </span>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pb-4">
              {column.rfps.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500 text-sm">No RFPs</p>
                </div>
              ) : (
                column.rfps.map(rfp => (
                  <KanbanCard
                    key={rfp.id}
                    rfp={rfp}
                    onDragStart={onDragStart}
                    onClick={() => onRFPClick(rfp)}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Kanban Card Component
const KanbanCard = ({ rfp, onDragStart, onClick }) => {
  const StatusIcon = STATUS_CONFIG[rfp.status].icon;
  const daysUntilDeadline = Math.ceil((rfp.deadline - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, rfp)}
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-4 cursor-move hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 flex-1">{rfp.title}</h4>
        <span className={`px-2 py-1 rounded text-xs font-medium ${PRIORITY_CONFIG[rfp.priority].bg} ${PRIORITY_CONFIG[rfp.priority].color}`}>
          {PRIORITY_CONFIG[rfp.priority].label}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3">{rfp.client}</p>

      <div className="flex items-center gap-4 mb-3 text-sm">
        <div className="flex items-center gap-1 text-gray-700">
          <DollarSign className="w-4 h-4" />
          €{(rfp.value / 1000).toFixed(0)}K
        </div>
        <div className={`flex items-center gap-1 ${daysUntilDeadline <= 3 ? 'text-red-600' : 'text-gray-700'}`}>
          <Clock className="w-4 h-4" />
          {daysUntilDeadline}d
        </div>
        <div className="flex items-center gap-1 text-gray-700">
          <Target className="w-4 h-4" />
          {rfp.winProbability}%
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{rfp.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${rfp.progress}%` }}
          />
        </div>
      </div>

      {/* Assigned team */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {rfp.assignedTo.map((avatar, idx) => (
            <div
              key={idx}
              className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
            >
              {avatar}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Calendar View Component
const CalendarView = ({ rfps, currentMonth, onMonthChange, onRFPClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getRFPsForDay = (day) => {
    return rfps.filter(rfp =>
      format(rfp.deadline, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="h-full flex flex-col p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onMonthChange(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onMonthChange(new Date())}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Today
          </button>
          <button
            onClick={() => onMonthChange(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center font-semibold text-gray-700 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {days.map(day => {
            const dayRfps = getRFPsForDay(day);
            const isCurrentDay = isToday(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <div
                key={day.toString()}
                className={`border-r border-b border-gray-200 p-2 min-h-[120px] ${
                  !isCurrentMonth ? 'bg-gray-50' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isCurrentDay
                    ? 'w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center'
                    : isCurrentMonth
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}>
                  {format(day, 'd')}
                </div>

                <div className="space-y-1">
                  {dayRfps.slice(0, 3).map(rfp => (
                    <button
                      key={rfp.id}
                      onClick={() => onRFPClick(rfp)}
                      className={`w-full text-left px-2 py-1 rounded text-xs truncate ${
                        STATUS_CONFIG[rfp.status].color
                      } hover:opacity-80`}
                    >
                      {rfp.title}
                    </button>
                  ))}
                  {dayRfps.length > 3 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{dayRfps.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Analytics View Component
const AnalyticsView = ({ analytics }) => {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Total Pipeline"
          value={`€${(analytics.totalPipeline / 1000).toFixed(0)}K`}
          icon={DollarSign}
          color="blue"
          trend="+12%"
          trendUp={true}
        />
        <MetricCard
          title="Win Rate"
          value={`${analytics.winRate.toFixed(0)}%`}
          icon={Trophy}
          color="green"
          trend="+5%"
          trendUp={true}
        />
        <MetricCard
          title="Won Value"
          value={`€${(analytics.wonValue / 1000).toFixed(0)}K`}
          icon={Award}
          color="purple"
          trend="+18%"
          trendUp={true}
        />
        <MetricCard
          title="Avg. Win Prob."
          value={`${analytics.avgWinProbability.toFixed(0)}%`}
          icon={Target}
          color="orange"
          trend="-3%"
          trendUp={false}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.monthlyData}>
              <defs>
                <linearGradient id="colorProposals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="proposals" stroke="#3B82F6" fillOpacity={1} fill="url(#colorProposals)" />
              <Area type="monotone" dataKey="won" stroke="#10B981" fillOpacity={1} fill="url(#colorWon)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">RFP Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={analytics.statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Value by Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Value by Status (€K)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.valueByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {analytics.valueByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend (€K)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Quick Insight</h4>
          </div>
          <p className="text-sm text-blue-700">
            Your win rate is 10% above industry average. Focus on high-value opportunities.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h4 className="font-semibold text-green-900">Recommendation</h4>
          </div>
          <p className="text-sm text-green-700">
            2 RFPs with 70%+ win probability. Prioritize these for maximum ROI.
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h4 className="font-semibold text-orange-900">Action Required</h4>
          </div>
          <p className="text-sm text-orange-700">
            3 deadlines in the next 5 days. Review progress and allocate resources.
          </p>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon: Icon, color, trend, trendUp }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <div className="flex items-center gap-1">
        {trendUp ? (
          <TrendingUp className="w-4 h-4 text-green-600" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-600" />
        )}
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
        <span className="text-sm text-gray-500">vs last month</span>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
