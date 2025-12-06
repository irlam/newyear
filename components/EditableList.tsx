// List component for shopping lists and equipment items
// Allows users to add and remove items with name attribution
'use client';

import { useState, useEffect } from 'react';
import { formatUKDateTime } from '@/lib/dateUtils';

interface ListItem {
  id: number;
  item_text: string;
  name: string;
  created_at: string;
}

interface ListProps {
  listKey: string;
  title: string;
  placeholder?: string;
}

export default function EditableList({ listKey, title, placeholder = 'Enter item...' }: ListProps) {
  const [items, setItems] = useState<ListItem[]>([]);
  const [itemText, setItemText] = useState('');
  const [name, setName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [listKey]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`/api/lists?list_key=${listKey}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAdd = async () => {
    if (!name.trim() || !itemText.trim()) {
      alert('Please enter both item and your name');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          list_key: listKey,
          item_text: itemText,
          name,
        }),
      });

      if (response.ok) {
        setItemText('');
        setName('');
        setIsAdding(false);
        fetchItems();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await fetch(`/api/lists?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchItems();
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  return (
    <div className="neon-card mb-6">
      <h3 className="text-xl font-bold text-neon-pink mb-4">{title}</h3>
      
      <div className="space-y-3 mb-4">
        {items.length === 0 ? (
          <div className="text-gray-500 italic text-center py-4">No items yet</div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 p-4 rounded-lg flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <div className="text-gray-100 mb-2">{item.item_text}</div>
                <div className="text-sm text-gray-400">
                  Added by <span className="text-neon-green">{item.name}</span> on{' '}
                  {formatUKDateTime(item.created_at)}
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-400 hover:text-red-300 text-sm px-3 py-1 border border-red-400 rounded hover:bg-red-400 hover:text-gray-900 transition-all"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {isAdding ? (
        <div className="space-y-3 border-t border-gray-700 pt-4">
          <input
            type="text"
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
            placeholder={placeholder}
            className="neon-input w-full"
            maxLength={500}
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
              onClick={handleAdd}
              disabled={isSaving}
              className="neon-button"
            >
              {isSaving ? 'Adding...' : 'Add Item'}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setItemText('');
                setName('');
              }}
              className="bg-gray-700 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="neon-button w-full"
        >
          + Add Item
        </button>
      )}
    </div>
  );
}
