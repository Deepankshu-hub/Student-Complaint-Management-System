import React from 'react';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';

const mockTopics = [
  { name: 'Customer Service', count: 1240, sentiment: 'Positive', score: 0.8 },
  { name: 'Pricing', count: 980, sentiment: 'Negative', score: -0.6 },
  { name: 'App Crashes', count: 850, sentiment: 'Negative', score: -0.9 },
  { name: 'New UI Update', count: 620, sentiment: 'Positive', score: 0.5 },
  { name: 'Shipping Speed', count: 430, sentiment: 'Neutral', score: 0.1 },
  { name: 'Product Quality', count: 1100, sentiment: 'Positive', score: 0.9 },
];

export default function Topics() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Extracted Topics</h2>
        <p style={{ color: 'var(--text-secondary)' }}>AI-driven topic extraction from all processed feedback.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {mockTopics.map((topic, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: -5 }}
            className="card" 
            style={{ 
              borderTop: `4px solid ${
                topic.sentiment === 'Positive' ? '#4ADE80' : 
                topic.sentiment === 'Negative' ? '#F87171' : '#9CA3AF'
              }`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.2rem' }}>
                <Hash size={20} color="var(--primary)" /> {topic.name}
              </div>
              <span style={{ 
                padding: '0.25rem 0.75rem', 
                borderRadius: '999px', 
                fontSize: '0.8rem', 
                fontWeight: 600,
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-secondary)'
              }}>
                {topic.count} mentions
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Avg Sentiment</p>
                <p style={{ 
                  fontWeight: 800, 
                  fontSize: '1.1rem',
                  color: topic.sentiment === 'Positive' ? '#166534' : 
                         topic.sentiment === 'Negative' ? '#991B1B' : 'var(--text-secondary)'
                }}>
                  {topic.sentiment}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>Polarity Score</p>
                <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{topic.score > 0 ? `+${topic.score}` : topic.score}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
