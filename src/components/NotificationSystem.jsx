import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  BellRing,
  X,
  Check,
  CheckCheck,
  AlertCircle,
  AlertTriangle,
  Info,
  Clock,
  MessageSquare,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  Filter,
  Trash2,
  Archive,
  Eye,
  EyeOff,
  ChevronDown,
  Circle,
  Star,
  Pin,
  MoreVertical
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

// Notification priority levels
const PRIORITY_LEVELS = {
  high: {
    label: 'High',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: AlertCircle,
    badge: 'bg-red-500'
  },
  medium: {
    label: 'Medium',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: AlertTriangle,
    badge: 'bg-orange-500'
  },
  low: {
    label: 'Low',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: Info,
    badge: 'bg-blue-500'
  }
};

// Notification types
const NOTIFICATION_TYPES = {
  deadline: {
    label: 'Deadline',
    icon: Clock,
    color: 'text-red-600',
    bg: 'bg-red-50'
  },
  comment: {
    label: 'Comment',
    icon: MessageSquare,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  mention: {
    label: 'Mention',
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  status: {
    label: 'Status Change',
    icon: TrendingUp,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  update: {
    label: 'Update',
    icon: FileText,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  meeting: {
    label: 'Meeting',
    icon: Calendar,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  }
};

// Generate realistic notifications
const generateInitialNotifications = () => {
  return [
    {
      id: 1,
      type: 'deadline',
      priority: 'high',
      title: 'RFP Submission Deadline in 2 Days',
      message: 'Cloud Migration RFP submission is due on Nov 6, 2025 at 5:00 PM',
      rfpId: 1,
      rfpTitle: 'Cloud Migration RFP',
      timestamp: new Date(Date.now() - 10 * 60000),
      read: false,
      starred: true,
      actionable: true,
      actions: [
        { label: 'View RFP', type: 'primary' },
        { label: 'Set Reminder', type: 'secondary' }
      ]
    },
    {
      id: 2,
      type: 'mention',
      priority: 'high',
      title: 'You were mentioned in Technical Approach',
      message: 'Sarah Mueller mentioned you: @You Please review the cloud architecture before EOD',
      rfpId: 1,
      rfpTitle: 'Cloud Migration RFP',
      user: { name: 'Sarah Mueller', avatar: 'SM', color: 'bg-blue-500' },
      timestamp: new Date(Date.now() - 25 * 60000),
      read: false,
      starred: false,
      actionable: true,
      actions: [
        { label: 'Reply', type: 'primary' },
        { label: 'View Section', type: 'secondary' }
      ]
    },
    {
      id: 3,
      type: 'comment',
      priority: 'medium',
      title: 'New comment on Pricing Section',
      message: 'Thomas Weber: "The license costs seem high. Can we optimize?"',
      rfpId: 2,
      rfpTitle: 'ERP System RFP',
      user: { name: 'Thomas Weber', avatar: 'TW', color: 'bg-green-500' },
      timestamp: new Date(Date.now() - 45 * 60000),
      read: false,
      starred: false,
      actionable: true,
      actions: [
        { label: 'Reply', type: 'primary' },
        { label: 'View Comment', type: 'secondary' }
      ]
    },
    {
      id: 4,
      type: 'status',
      priority: 'medium',
      title: 'RFP Status Changed to "In Review"',
      message: 'ERP System RFP has been moved to In Review status',
      rfpId: 2,
      rfpTitle: 'ERP System RFP',
      timestamp: new Date(Date.now() - 60 * 60000),
      read: true,
      starred: false,
      actionable: false
    },
    {
      id: 5,
      type: 'update',
      priority: 'low',
      title: 'Requirements Updated',
      message: '5 new requirements added to Security Audit RFP',
      rfpId: 3,
      rfpTitle: 'Security Audit RFP',
      timestamp: new Date(Date.now() - 90 * 60000),
      read: true,
      starred: false,
      actionable: true,
      actions: [
        { label: 'View Requirements', type: 'primary' }
      ]
    },
    {
      id: 6,
      type: 'meeting',
      priority: 'high',
      title: 'Proposal Review Meeting Tomorrow',
      message: 'Team meeting scheduled for Nov 5, 2025 at 10:00 AM to review Cloud Migration proposal',
      rfpId: 1,
      rfpTitle: 'Cloud Migration RFP',
      timestamp: new Date(Date.now() - 120 * 60000),
      read: false,
      starred: true,
      actionable: true,
      actions: [
        { label: 'Add to Calendar', type: 'primary' },
        { label: 'View Details', type: 'secondary' }
      ]
    },
    {
      id: 7,
      type: 'deadline',
      priority: 'medium',
      title: 'Draft Review Deadline Today',
      message: 'Internal review deadline for Security Audit RFP is today at 6:00 PM',
      rfpId: 3,
      rfpTitle: 'Security Audit RFP',
      timestamp: new Date(Date.now() - 180 * 60000),
      read: true,
      starred: false,
      actionable: true,
      actions: [
        { label: 'Submit Draft', type: 'primary' }
      ]
    }
  ];
};

const NotificationSystem = ({ onNotificationClick, compact = false }) => {
  const [notifications, setNotifications] = useState(generateInitialNotifications());
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, unread, starred
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    enableSound: true,
    enableDesktop: true,
    autoMarkRead: false,
    showBadge: true,
    notifyTypes: {
      deadline: true,
      comment: true,
      mention: true,
      status: true,
      update: true,
      meeting: true
    }
  });

  const panelRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowSettings(false);
      }
    };

    if (isOpen || showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, showSettings]);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const types = Object.keys(NOTIFICATION_TYPES);
        const priorities = Object.keys(PRIORITY_LEVELS);
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];

        const newNotification = {
          id: Date.now(),
          type: randomType,
          priority: randomPriority,
          title: `New ${NOTIFICATION_TYPES[randomType].label}`,
          message: 'You have a new notification',
          timestamp: new Date(),
          read: false,
          starred: false,
          actionable: Math.random() > 0.5
        };

        setNotifications(prev => [newNotification, ...prev]);

        // Play sound if enabled
        if (settings.enableSound) {
          // Would play notification sound
        }

        // Show desktop notification if enabled
        if (settings.enableDesktop && Notification.permission === 'granted') {
          new Notification(newNotification.title, {
            body: newNotification.message,
            icon: '/notification-icon.png'
          });
        }
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [settings]);

  // Request desktop notification permission
  useEffect(() => {
    if (settings.enableDesktop && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [settings.enableDesktop]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => !n.read && n.priority === 'high').length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'starred' && !notification.starred) return false;
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    if (priorityFilter !== 'all' && notification.priority !== priorityFilter) return false;
    return true;
  });

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleToggleStar = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, starred: !n.starred } : n)
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowSettings(false);
        }}
        className={`relative p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          unreadCount > 0 ? 'text-blue-600' : 'text-gray-600'
        }`}
        title={`${unreadCount} unread notifications`}
      >
        {unreadCount > 0 ? (
          <BellRing className="w-6 h-6 animate-pulse" />
        ) : (
          <Bell className="w-6 h-6" />
        )}

        {/* Unread Badge */}
        {unreadCount > 0 && settings.showBadge && (
          <span className={`absolute -top-1 -right-1 ${
            highPriorityCount > 0 ? 'bg-red-500' : 'bg-blue-500'
          } text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                  filter === 'unread'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('starred')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                  filter === 'starred'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Star className="w-4 h-4" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
              >
                <option value="all">All Types</option>
                {Object.entries(NOTIFICATION_TYPES).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
              >
                <option value="all">All Priorities</option>
                {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded"
                >
                  <CheckCheck className="w-4 h-4 inline mr-1" />
                  Mark all read
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-3">Notification Settings</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Sound notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.enableSound}
                    onChange={(e) => setSettings({ ...settings, enableSound: e.target.checked })}
                    className="rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Desktop notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.enableDesktop}
                    onChange={(e) => setSettings({ ...settings, enableDesktop: e.target.checked })}
                    className="rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Auto-mark as read</span>
                  <input
                    type="checkbox"
                    checked={settings.autoMarkRead}
                    onChange={(e) => setSettings({ ...settings, autoMarkRead: e.target.checked })}
                    className="rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Show badge</span>
                  <input
                    type="checkbox"
                    checked={settings.showBadge}
                    onChange={(e) => setSettings({ ...settings, showBadge: e.target.checked })}
                    className="rounded"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No notifications</p>
                <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredNotifications.map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onToggleStar={handleToggleStar}
                    onDelete={handleDelete}
                    onClick={onNotificationClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Notification Card Component
const NotificationCard = ({ notification, onMarkAsRead, onToggleStar, onDelete, onClick }) => {
  const [showActions, setShowActions] = useState(false);
  const TypeIcon = NOTIFICATION_TYPES[notification.type]?.icon || Bell;
  const PriorityIcon = PRIORITY_LEVELS[notification.priority]?.icon || Info;
  const priorityConfig = PRIORITY_LEVELS[notification.priority];
  const typeConfig = NOTIFICATION_TYPES[notification.type];

  return (
    <div
      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer relative ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Unread Indicator */}
      {!notification.read && (
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${priorityConfig.badge}`} />
      )}

      <div className="flex items-start gap-3 pl-2">
        {/* Icon */}
        <div className={`p-2 rounded-lg ${typeConfig.bg} flex-shrink-0`}>
          <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-semibold text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notification.title}
                </h4>
                {notification.starred && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
            </div>

            {/* Priority Badge */}
            <div className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color} flex-shrink-0`}>
              {priorityConfig.label}
            </div>
          </div>

          {/* User Info */}
          {notification.user && (
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-6 h-6 rounded-full ${notification.user.color} flex items-center justify-center text-white text-xs font-semibold`}>
                {notification.user.avatar}
              </div>
              <span className="text-xs text-gray-600">{notification.user.name}</span>
            </div>
          )}

          {/* RFP Title */}
          {notification.rfpTitle && (
            <div className="mt-2">
              <span className="text-xs text-gray-500">{notification.rfpTitle}</span>
            </div>
          )}

          {/* Actions */}
          {notification.actionable && notification.actions && (
            <div className="flex items-center gap-2 mt-3">
              {notification.actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.(notification, action);
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    action.type === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </span>

            {/* Quick Actions */}
            {showActions && (
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsRead(notification.id);
                    }}
                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar(notification.id);
                  }}
                  className="p-1 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded"
                  title={notification.starred ? 'Unstar' : 'Star'}
                >
                  <Star className={`w-4 h-4 ${notification.starred ? 'fill-current text-yellow-500' : ''}`} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.id);
                  }}
                  className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem;
