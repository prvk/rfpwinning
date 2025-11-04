import React, { useState, useEffect, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  History,
  Download,
  Upload,
  FileText,
  Trash2,
  Copy,
  Scissors,
  Clipboard,
  MoreVertical,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';
import { format } from 'date-fns';

// Toolbar configuration
const TOOLBAR_GROUPS = [
  {
    name: 'history',
    items: [
      { id: 'undo', icon: Undo, label: 'Undo', shortcut: 'Ctrl+Z' },
      { id: 'redo', icon: Redo, label: 'Redo', shortcut: 'Ctrl+Y' }
    ]
  },
  {
    name: 'text-style',
    items: [
      { id: 'bold', icon: Bold, label: 'Bold', shortcut: 'Ctrl+B', command: 'bold' },
      { id: 'italic', icon: Italic, label: 'Italic', shortcut: 'Ctrl+I', command: 'italic' },
      { id: 'underline', icon: Underline, label: 'Underline', shortcut: 'Ctrl+U', command: 'underline' }
    ]
  },
  {
    name: 'headings',
    items: [
      { id: 'h1', icon: Heading1, label: 'Heading 1', command: 'formatBlock', value: 'h1' },
      { id: 'h2', icon: Heading2, label: 'Heading 2', command: 'formatBlock', value: 'h2' },
      { id: 'h3', icon: Heading3, label: 'Heading 3', command: 'formatBlock', value: 'h3' }
    ]
  },
  {
    name: 'lists',
    items: [
      { id: 'ul', icon: List, label: 'Bullet List', command: 'insertUnorderedList' },
      { id: 'ol', icon: ListOrdered, label: 'Numbered List', command: 'insertOrderedList' }
    ]
  },
  {
    name: 'alignment',
    items: [
      { id: 'left', icon: AlignLeft, label: 'Align Left', command: 'justifyLeft' },
      { id: 'center', icon: AlignCenter, label: 'Align Center', command: 'justifyCenter' },
      { id: 'right', icon: AlignRight, label: 'Align Right', command: 'justifyRight' }
    ]
  },
  {
    name: 'insert',
    items: [
      { id: 'link', icon: Link, label: 'Insert Link', shortcut: 'Ctrl+K' },
      { id: 'image', icon: Image, label: 'Insert Image' },
      { id: 'quote', icon: Quote, label: 'Quote', command: 'formatBlock', value: 'blockquote' },
      { id: 'code', icon: Code, label: 'Code Block', command: 'formatBlock', value: 'pre' }
    ]
  }
];

const RichTextEditor = ({
  initialContent = '',
  onChange,
  onSave,
  autoSave = true,
  autoSaveInterval = 30000, // 30 seconds
  placeholder = 'Start writing your proposal...',
  section = 'Untitled Section'
}) => {
  const [content, setContent] = useState(initialContent);
  const [history, setHistory] = useState([initialContent]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [viewMode, setViewMode] = useState('edit'); // edit, preview

  const editorRef = useRef(null);
  const autoSaveTimerRef = useRef(null);

  // Version history (simulated)
  const [versions, setVersions] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 3600000),
      content: initialContent,
      author: 'Sarah Mueller',
      changes: 'Initial draft'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1800000),
      content: initialContent + '\n\nAdditional content...',
      author: 'Thomas Weber',
      changes: 'Added technical details'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 900000),
      content: content,
      author: 'Sarah Mueller',
      changes: 'Current version'
    }
  ]);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialContent || '';
      updateCounts(initialContent);
    }
  }, [initialContent]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave) {
      autoSaveTimerRef.current = setInterval(() => {
        handleAutoSave();
      }, autoSaveInterval);

      return () => {
        if (autoSaveTimerRef.current) {
          clearInterval(autoSaveTimerRef.current);
        }
      };
    }
  }, [autoSave, autoSaveInterval, content]);

  // Update word and character counts
  const updateCounts = (text) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    const words = plainText.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
    setCharCount(plainText.length);
  };

  const handleInput = () => {
    const newContent = editorRef.current?.innerHTML || '';
    setContent(newContent);
    updateCounts(newContent);
    onChange?.(newContent);

    // Add to history
    if (historyIndex < history.length - 1) {
      setHistory([...history.slice(0, historyIndex + 1), newContent]);
    } else {
      setHistory([...history, newContent]);
    }
    setHistoryIndex(history.length);
  };

  const handleAutoSave = async () => {
    if (!content || isSaving) return;

    setIsSaving(true);
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 500));
      onSave?.(content);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualSave = async () => {
    await handleAutoSave();
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleToolbarClick = (item) => {
    switch (item.id) {
      case 'undo':
        handleUndo();
        break;
      case 'redo':
        handleRedo();
        break;
      case 'link':
        setShowLinkDialog(true);
        break;
      case 'image':
        setShowImageDialog(true);
        break;
      default:
        if (item.command) {
          execCommand(item.command, item.value);
        }
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousContent = history[newIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = previousContent;
      }
      setContent(previousContent);
      updateCounts(previousContent);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextContent = history[newIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = nextContent;
      }
      setContent(nextContent);
      updateCounts(nextContent);
    }
  };

  const handleInsertLink = (url) => {
    if (url) {
      execCommand('createLink', url);
    }
    setShowLinkDialog(false);
  };

  const handleInsertImage = (url) => {
    if (url) {
      execCommand('insertImage', url);
    }
    setShowImageDialog(false);
  };

  const handleKeyDown = (e) => {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'k':
          e.preventDefault();
          setShowLinkDialog(true);
          break;
        case 'z':
          e.preventDefault();
          handleUndo();
          break;
        case 'y':
          e.preventDefault();
          handleRedo();
          break;
        case 's':
          e.preventDefault();
          handleManualSave();
          break;
      }
    }
  };

  const handleRestoreVersion = (version) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = version.content;
    }
    setContent(version.content);
    updateCounts(version.content);
    setShowVersionHistory(false);

    // Add to versions
    const newVersion = {
      id: versions.length + 1,
      timestamp: new Date(),
      content: version.content,
      author: 'You',
      changes: `Restored version from ${format(version.timestamp, 'MMM d, HH:mm')}`
    };
    setVersions([...versions, newVersion]);
  };

  return (
    <div className={`flex flex-col bg-white rounded-lg border border-gray-200 ${
      isFullscreen ? 'fixed inset-0 z-50' : 'h-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-gray-600" />
          <div>
            <h3 className="font-semibold text-gray-900">{section}</h3>
            <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
              {lastSaved && (
                <span className="flex items-center gap-1">
                  {isSaving ? (
                    <>
                      <Clock className="w-3 h-3 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      Saved {format(lastSaved, 'HH:mm')}
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${
              viewMode === 'preview'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {viewMode === 'preview' ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {viewMode === 'preview' ? 'Edit' : 'Preview'}
          </button>

          <button
            onClick={() => setShowVersionHistory(!showVersionHistory)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 text-sm"
          >
            <History className="w-4 h-4" />
            Versions
          </button>

          <button
            onClick={handleManualSave}
            disabled={isSaving}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      {viewMode === 'edit' && (
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-gray-50 flex-wrap">
          {TOOLBAR_GROUPS.map((group, groupIdx) => (
            <React.Fragment key={group.name}>
              {groupIdx > 0 && <div className="w-px h-6 bg-gray-300" />}
              <div className="flex items-center gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleToolbarClick(item)}
                      className="p-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
                      title={`${item.label}${item.shortcut ? ` (${item.shortcut})` : ''}`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Editor / Preview Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Main Editor */}
        <div className={`flex-1 overflow-y-auto ${showVersionHistory ? 'border-r border-gray-200' : ''}`}>
          {viewMode === 'edit' ? (
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              className="h-full p-6 focus:outline-none prose prose-lg max-w-none"
              style={{ minHeight: '500px' }}
              suppressContentEditableWarning
            >
              {!content && (
                <p className="text-gray-400 pointer-events-none">{placeholder}</p>
              )}
            </div>
          ) : (
            <div className="h-full p-6 prose prose-lg max-w-none overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">No content to preview</p>' }} />
            </div>
          )}
        </div>

        {/* Version History Sidebar */}
        {showVersionHistory && (
          <div className="w-80 bg-gray-50 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Version History</h3>
                <button
                  onClick={() => setShowVersionHistory(false)}
                  className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {versions.length} versions saved
              </p>
            </div>

            <div className="p-4 space-y-3">
              {versions.slice().reverse().map((version) => (
                <div
                  key={version.id}
                  className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleRestoreVersion(version)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {version.author}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {format(version.timestamp, 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                    {version.id === versions.length && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-700 mt-2">
                    {version.changes}
                  </p>
                  <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 flex items-center gap-1">
                    <History className="w-3 h-3" />
                    Restore this version
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <LinkDialog
          onInsert={handleInsertLink}
          onClose={() => setShowLinkDialog(false)}
        />
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <ImageDialog
          onInsert={handleInsertImage}
          onClose={() => setShowImageDialog(false)}
        />
      )}
    </div>
  );
};

// Link Dialog Component
const LinkDialog = ({ onInsert, onClose }) => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onInsert(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Insert Link</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link Text (optional)
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Click here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!url}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Insert Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Image Dialog Component
const ImageDialog = ({ onInsert, onClose }) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onInsert(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Insert Image</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alt Text (optional)
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Description of image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!url}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Insert Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RichTextEditor;
