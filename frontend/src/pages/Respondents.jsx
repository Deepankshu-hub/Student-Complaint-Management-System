import React from 'react';
import { motion } from 'framer-motion';

const mockRespondents = [
  { name: 'Alice Smith', email: 'alice@example.com', total: 4, sentiment: 'Positive' },
  { name: 'Bob Jones', email: 'bob@example.com', total: 2, sentiment: 'Negative' },
  { name: 'Charlie Brown', email: 'charlie@example.com', total: 1, sentiment: 'Neutral' },
  { name: 'Diana Prince', email: 'diana@example.com', total: 8, sentiment: 'Positive' },
];

export default function Respondents() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Respondents Directory</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Identify your most active and vocal users.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <th style={{ padding: '1rem 1.5rem' }}>User</th>
              <th style={{ padding: '1rem 1.5rem' }}>Email</th>
              <th style={{ padding: '1rem 1.5rem' }}>Total Submissions</th>
              <th style={{ padding: '1rem 1.5rem' }}>Avg. Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {mockRespondents.map((user, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    {user.name.charAt(0)}
                  </div>
                  {user.name}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{user.total}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ color: user.sentiment === 'Positive' ? '#166534' : user.sentiment === 'Negative' ? '#991B1B' : 'var(--text-secondary)' }}>
                    {user.sentiment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
