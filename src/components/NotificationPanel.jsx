import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Clock,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const NotificationPanel = ({ notifications, onMarkAsRead, onClearAll, onNotificationClick, isOpen, onClose }) => {
  const panelRef = useRef(null);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getNotificationIcon = (type) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'update':
        return <FileText className={iconClass} />;
      case 'comment':
        return <MessageSquare className={iconClass} />;
      case 'team':
        return <Users className={iconClass} />;
      case 'deadline':
        return <Clock className={iconClass} />;
      case 'ai-suggestion':
        return <Sparkles className={iconClass} />;
      case 'win-probability':
        return <TrendingUp className={iconClass} />;
      case 'created':
        return <AlertCircle className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'update':
        return 'bg-blue-100 text-blue-600';
      case 'comment':
        return 'bg-purple-100 text-purple-600';
      case 'team':
        return 'bg-green-100 text-green-600';
      case 'deadline':
        return 'bg-red-100 text-red-600';
      case 'ai-suggestion':
        return 'bg-yellow-100 text-yellow-600';
      case 'win-probability':
        return 'bg-indigo-100 text-indigo-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const notifDate = new Date(timestamp);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return notifDate.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' });
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[600px] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-purple-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <p className="text-xs text-gray-500">{unreadCount} unread</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 px-4 pt-2">
        {['all', 'unread', 'read'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              filter === tab
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
            {tab === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Actions */}
      {filteredNotifications.length > 0 && (
        <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <button
            onClick={() => {
              const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
              if (unreadIds.length > 0) {
                onMarkAsRead(unreadIds);
              }
            }}
            className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={unreadCount === 0}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all as read
          </button>
          <button
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:text-gray-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Notification List */}
      <div className="overflow-y-auto flex-1">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              {filter === 'unread' ? 'No unread notifications' :
               filter === 'read' ? 'No read notifications' :
               'No notifications yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
                  !notification.read ? 'bg-purple-50/30' : ''
                }`}
                onClick={() => onNotificationClick(notification)}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-1.5"></div>
                      )}
                    </div>

                    {notification.rfpTitle && (
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {notification.rfpTitle}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {notification.user && (
                          <span className="font-medium">{notification.user}</span>
                        )}
                        <span>•</span>
                        <span>{getRelativeTime(notification.timestamp)}</span>
                      </div>

                      {notification.actionUrl && (
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>

                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkAsRead([notification.id]);
                        }}
                        className="mt-2 text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Check className="w-3 h-3" />
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <button className="w-full text-sm text-center text-purple-600 hover:text-purple-700 font-medium">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
