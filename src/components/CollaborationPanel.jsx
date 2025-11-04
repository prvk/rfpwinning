import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  MessageSquare,
  Send,
  AtSign,
  Circle,
  Clock,
  Eye,
  Edit3,
  FileText,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Reply,
  MoreVertical,
  UserPlus,
  Bell,
  Pin,
  ThumbsUp,
  Filter,
  Search
} from 'lucide-react';
import { format } from 'date-fns';

// Simulated team members
const TEAM_MEMBERS = [
  { id: 1, name: 'Sarah Mueller', role: 'Project Lead', avatar: 'SM', status: 'online', color: 'bg-blue-500' },
  { id: 2, name: 'Thomas Weber', role: 'Technical Writer', avatar: 'TW', status: 'online', color: 'bg-green-500' },
  { id: 3, name: 'Lisa Schmidt', role: 'Sales Manager', avatar: 'LS', status: 'away', color: 'bg-purple-500' },
  { id: 4, name: 'Michael Fischer', role: 'Solution Architect', avatar: 'MF', status: 'offline', color: 'bg-orange-500' },
  { id: 5, name: 'Anna Koch', role: 'Legal Advisor', avatar: 'AK', status: 'online', color: 'bg-pink-500' }
];

const ACTIVITY_TYPES = {
  comment: { icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
  edit: { icon: Edit3, color: 'text-green-600', bg: 'bg-green-50' },
  status: { icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
  upload: { icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
  mention: { icon: AtSign, color: 'text-pink-600', bg: 'bg-pink-50' },
  review: { icon: Eye, color: 'text-indigo-600', bg: 'bg-indigo-50' }
};

// Generate realistic activity feed
const generateInitialActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'comment',
      user: TEAM_MEMBERS[0],
      section: 'Executive Summary',
      message: 'Updated the value proposition based on client feedback',
      timestamp: new Date(Date.now() - 5 * 60000),
      likes: 3,
      replies: []
    },
    {
      id: 2,
      type: 'edit',
      user: TEAM_MEMBERS[1],
      section: 'Technical Approach',
      message: 'Added cloud architecture diagram and security details',
      timestamp: new Date(Date.now() - 15 * 60000),
      likes: 1,
      replies: []
    },
    {
      id: 3,
      type: 'status',
      user: TEAM_MEMBERS[2],
      section: 'Pricing',
      message: 'Marked pricing section as complete',
      timestamp: new Date(Date.now() - 30 * 60000),
      likes: 2,
      replies: [
        {
          id: 301,
          user: TEAM_MEMBERS[3],
          message: 'Can we review the license costs once more?',
          timestamp: new Date(Date.now() - 25 * 60000)
        }
      ]
    },
    {
      id: 4,
      type: 'mention',
      user: TEAM_MEMBERS[3],
      section: 'Requirements',
      message: '@Anna Koch Please review the compliance section before 3 PM',
      timestamp: new Date(Date.now() - 45 * 60000),
      likes: 0,
      replies: []
    },
    {
      id: 5,
      type: 'upload',
      user: TEAM_MEMBERS[4],
      section: 'Compliance',
      message: 'Uploaded ISO 27001 certification and GDPR compliance docs',
      timestamp: new Date(Date.now() - 60 * 60000),
      likes: 4,
      replies: []
    }
  ];
  return activities;
};

const CollaborationPanel = ({ rfpId = null, rfpTitle = 'Current RFP' }) => {
  const [activities, setActivities] = useState(generateInitialActivities());
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [mentionMenuOpen, setMentionMenuOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTeamPanel, setShowTeamPanel] = useState(true);
  const activityEndRef = useRef(null);

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate new activity
      if (Math.random() > 0.7) {
        const randomUser = TEAM_MEMBERS[Math.floor(Math.random() * TEAM_MEMBERS.length)];
        const types = Object.keys(ACTIVITY_TYPES);
        const randomType = types[Math.floor(Math.random() * types.length)];
        const sections = ['Executive Summary', 'Technical Approach', 'Pricing', 'Requirements', 'Team'];
        const randomSection = sections[Math.floor(Math.random() * sections.length)];

        const messages = {
          comment: ['Great progress on this section!', 'I have some suggestions here', 'This looks good to me'],
          edit: ['Updated content', 'Made some improvements', 'Revised based on feedback'],
          status: ['Completed review', 'Ready for approval', 'Needs revision'],
          upload: ['Added supporting documents', 'Uploaded latest version', 'New attachment added'],
          mention: ['@Team please review', 'Need your input here', 'Urgent review needed'],
          review: ['Started review', 'Reviewing section', 'Review in progress']
        };

        const newActivity = {
          id: Date.now(),
          type: randomType,
          user: randomUser,
          section: randomSection,
          message: messages[randomType][Math.floor(Math.random() * messages[randomType].length)],
          timestamp: new Date(),
          likes: 0,
          replies: []
        };

        setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep last 50
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate team member status changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const statuses = ['online', 'away', 'offline'];
        // This would update team member status in real app
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSendComment = () => {
    if (!newComment.trim()) return;

    const currentUser = TEAM_MEMBERS[0]; // Current user
    const newActivity = {
      id: Date.now(),
      type: 'comment',
      user: currentUser,
      section: selectedSection === 'all' ? 'General' : selectedSection,
      message: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };

    setActivities(prev => [newActivity, ...prev]);
    setNewComment('');
  };

  const handleLike = (activityId) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? { ...activity, likes: activity.likes + 1 }
          : activity
      )
    );
  };

  const handleReply = (activityId, replyText) => {
    if (!replyText.trim()) return;

    const currentUser = TEAM_MEMBERS[0];
    const newReply = {
      id: Date.now(),
      user: currentUser,
      message: replyText,
      timestamp: new Date()
    };

    setActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? { ...activity, replies: [...activity.replies, newReply] }
          : activity
      )
    );
  };

  const handleMention = (member) => {
    setNewComment(prev => prev + `@${member.name} `);
    setMentionMenuOpen(false);
  };

  const filteredActivities = activities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesSection = selectedSection === 'all' || activity.section === selectedSection;
    const matchesSearch = searchTerm === '' ||
      activity.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSection && matchesSearch;
  });

  const sections = ['all', 'Executive Summary', 'Technical Approach', 'Pricing', 'Requirements', 'Team', 'Compliance'];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Main Activity Feed */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Team Collaboration</h2>
              <p className="text-sm text-gray-600 mt-1">{rfpTitle}</p>
            </div>
            <button
              onClick={() => setShowTeamPanel(!showTeamPanel)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Team ({TEAM_MEMBERS.filter(m => m.status === 'online').length} online)
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap gap-3">
            {/* Section Filter */}
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sections.map(section => (
                <option key={section} value={section}>
                  {section === 'all' ? 'All Sections' : section}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Activities</option>
              <option value="comment">Comments</option>
              <option value="edit">Edits</option>
              <option value="status">Status Changes</option>
              <option value="upload">Uploads</option>
              <option value="mention">Mentions</option>
            </select>

            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search activities..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No activities found</p>
            </div>
          ) : (
            filteredActivities.map(activity => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onLike={handleLike}
                onReply={handleReply}
              />
            ))
          )}
          <div ref={activityEndRef} />
        </div>

        {/* Comment Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full ${TEAM_MEMBERS[0].color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
              {TEAM_MEMBERS[0].avatar}
            </div>
            <div className="flex-1">
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                    if (e.target.value.endsWith('@')) {
                      setMentionMenuOpen(true);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendComment();
                    }
                  }}
                  placeholder="Add a comment... (use @ to mention team members)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />

                {/* Mention Menu */}
                {mentionMenuOpen && (
                  <div className="absolute bottom-full mb-2 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2 border-b border-gray-200">
                      <p className="text-xs font-semibold text-gray-700">Mention team member</p>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {TEAM_MEMBERS.map(member => (
                        <button
                          key={member.id}
                          onClick={() => handleMention(member)}
                          className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-50 text-left"
                        >
                          <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-semibold`}>
                            {member.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMentionMenuOpen(!mentionMenuOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Mention team member"
                  >
                    <AtSign className="w-4 h-4" />
                  </button>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="text-sm px-2 py-1 border border-gray-300 rounded"
                  >
                    {sections.filter(s => s !== 'all').map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleSendComment}
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Sidebar */}
      {showTeamPanel && (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Team Members</h3>
            <p className="text-sm text-gray-600 mt-1">
              {TEAM_MEMBERS.filter(m => m.status === 'online').length} of {TEAM_MEMBERS.length} online
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {TEAM_MEMBERS.map(member => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-white font-semibold`}>
                    {member.avatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    member.status === 'online' ? 'bg-green-500' :
                    member.status === 'away' ? 'bg-yellow-500' :
                    'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{member.name}</p>
                  <p className="text-sm text-gray-600 truncate">{member.role}</p>
                  <p className={`text-xs mt-1 ${
                    member.status === 'online' ? 'text-green-600' :
                    member.status === 'away' ? 'text-yellow-600' :
                    'text-gray-500'
                  }`}>
                    {member.status === 'online' ? 'Online' :
                     member.status === 'away' ? 'Away' :
                     'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              Invite Team Member
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Notification Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Activity Card Component
const ActivityCard = ({ activity, onLike, onReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const ActivityIcon = ACTIVITY_TYPES[activity.type]?.icon || MessageSquare;
  const iconColor = ACTIVITY_TYPES[activity.type]?.color || 'text-gray-600';
  const iconBg = ACTIVITY_TYPES[activity.type]?.bg || 'bg-gray-50';

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onReply(activity.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
      setShowReplies(true);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full ${activity.user.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
          {activity.user.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">{activity.user.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${iconBg} ${iconColor}`}>
                  {activity.type}
                </span>
                <span className="text-sm text-gray-500">in {activity.section}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.message}</p>
            </div>

            <div className={`p-2 rounded-lg ${iconBg}`}>
              <ActivityIcon className={`w-4 h-4 ${iconColor}`} />
            </div>
          </div>

          {/* Timestamp and Actions */}
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {format(activity.timestamp, 'HH:mm')}
            </span>

            <button
              onClick={() => onLike(activity.id)}
              className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1"
            >
              <ThumbsUp className="w-3 h-3" />
              {activity.likes > 0 && <span>{activity.likes}</span>}
            </button>

            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1"
            >
              <Reply className="w-3 h-3" />
              Reply
            </button>

            {activity.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                {showReplies ? 'Hide' : 'Show'} {activity.replies.length} {activity.replies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>

          {/* Replies */}
          {showReplies && activity.replies.length > 0 && (
            <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-200">
              {activity.replies.map(reply => (
                <div key={reply.id} className="flex items-start gap-2">
                  <div className={`w-8 h-8 rounded-full ${reply.user.color} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                    {reply.user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900">{reply.user.name}</span>
                      <span className="text-xs text-gray-500">
                        {format(reply.timestamp, 'HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{reply.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply Input */}
          {showReplyInput && (
            <div className="mt-3 flex items-start gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmitReply();
                  }
                }}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSubmitReply}
                disabled={!replyText.trim()}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationPanel;
