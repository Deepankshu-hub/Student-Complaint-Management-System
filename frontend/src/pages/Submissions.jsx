import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical } from 'lucide-react';

const mockSubmissions = [
  { id: 'SUB-101', user: 'alice@example.com', text: 'The new dashboard is incredibly fast and intuitive!', polarity: 0.85, label: 'Positive', date: '2 hours ago' },
  { id: 'SUB-102', user: 'bob@example.com', text: 'I keep getting logged out randomly. Please fix this.', polarity: -0.7, label: 'Negative', date: '5 hours ago' },
  { id: 'SUB-103', user: 'charlie@example.com', text: 'It works fine but I wish there was a dark mode.', polarity: 0.1, label: 'Neutral', date: '1 day ago' },
  { id: 'SUB-104', user: 'diana@example.com', text: 'Absolutely love the new sentiment analysis feature.', polarity: 0.9, label: 'Positive', date: '1 day ago' },
  { id: 'SUB-105', user: 'eve@example.com', text: 'Pricing is too high for what you get.', polarity: -0.8, label: 'Negative', date: '2 days ago' },
];

export default function Submissions() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Inbox / Submissions</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Review raw feedback submissions in real-time.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input type="text" placeholder="Search submissions..." style={{ paddingLeft: '2.5rem' }} />
            </div>
          </div>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} /> Filter
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1rem' }}>ID</th>
                <th style={{ padding: '1rem' }}>User</th>
                <th style={{ padding: '1rem', width: '40%' }}>Feedback snippet</th>
                <th style={{ padding: '1rem' }}>Sentiment</th>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {mockSubmissions.map(sub => (
                <tr key={sub.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>{sub.id}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{sub.user}</td>
                  <td style={{ padding: '1rem' }}>"{sub.text}"</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '999px', 
                      fontSize: '0.8rem', 
                      fontWeight: 600,
                      backgroundColor: sub.label === 'Positive' ? 'rgba(74, 222, 128, 0.2)' : sub.label === 'Negative' ? 'rgba(248, 113, 113, 0.2)' : 'var(--border-color)',
                      color: sub.label === 'Positive' ? '#166534' : sub.label === 'Negative' ? '#991B1B' : 'var(--text-secondary)'
                    }}>
                      {sub.label}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{sub.date}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <MoreVertical size={18} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
