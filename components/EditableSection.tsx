// Editable section component for timetable, rooms, and activities
// Allows users to view and edit content with name attribution
'use client';

import { useState, useEffect } from 'react';
import { formatUKDateTime } from '@/lib/dateUtils';

interface SectionProps {
  sectionKey: string;
  title: string;
  placeholder?: string;
}

export default function EditableSection({ sectionKey, title, placeholder = 'Enter details...' }: SectionProps) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [lastUpdatedBy, setLastUpdatedBy] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSection();
  }, [sectionKey]);

  const fetchSection = async () => {
    try {
      const response = await fetch(`/api/sections?key=${sectionKey}`);
      const data = await response.json();
      setContent(data.content || '');
      setLastUpdatedBy(data.name || '');
      if (data.updated_at) {
        setLastUpdated(formatUKDateTime(data.updated_at));
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_key: sectionKey,
          title,
          content,
          name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLastUpdatedBy(data.name);
        setLastUpdated(formatUKDateTime(data.updated_at));
        setIsEditing(false);
        setName('');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="neon-card mb-6">
      <h3 className="text-xl font-bold text-neon-pink mb-4">{title}</h3>
      
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="neon-input w-full min-h-[100px] resize-y"
            maxLength={5000}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="neon-input w-full"
            maxLength={100}
          />
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="neon-button"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setName('');
                fetchSection();
              }}
              className="bg-gray-700 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 p-4 rounded-lg mb-4 min-h-[60px] whitespace-pre-wrap">
            {content || <span className="text-gray-500 italic">No details yet</span>}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {lastUpdated && (
                <>
                  Last updated: {lastUpdated}
                  {lastUpdatedBy && <> by <span className="text-neon-green">{lastUpdatedBy}</span></>}
                </>
              )}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="neon-button text-sm px-4 py-2"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
