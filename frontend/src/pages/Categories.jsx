import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Settings2, Bug, Star } from 'lucide-react';

const mockCategories = [
  { name: 'Feature Requests', icon: Star, color: '#F59E0B', count: 124 },
  { name: 'Bug Reports', icon: Bug, color: '#EF4444', count: 58 },
  { name: 'Account Issues', icon: Settings2, color: '#3B82F6', count: 89 },
  { name: 'General Inquiries', icon: FolderOpen, color: '#10B981', count: 215 },
];

export default function Categories() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Feedback Categories</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Automatically organized folders based on AI content tagging.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
        {mockCategories.map((cat, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ scale: 1.02 }}
            className="card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '2rem',
              cursor: 'pointer'
            }}
          >
            <div style={{ 
              width: '64px', height: '64px', 
              borderRadius: '50%', 
              backgroundColor: `${cat.color}20`, 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <cat.icon size={32} color={cat.color} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{cat.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{cat.count} items</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
