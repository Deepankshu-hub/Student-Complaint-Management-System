import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { month: 'Jan', polarity: 0.2 },
  { month: 'Feb', polarity: 0.3 },
  { month: 'Mar', polarity: 0.1 },
  { month: 'Apr', polarity: -0.2 },
  { month: 'May', polarity: 0.4 },
  { month: 'Jun', polarity: 0.6 },
  { month: 'Jul', polarity: 0.5 },
];

export default function Trends() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Long-Term Trends</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Predictive analytics and historical sentiment tracking.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>6-Month Sentiment Trajectory</h3>
        <div style={{ height: '400px', width: '100%' }}>
          <ResponsiveContainer>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorPolarity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
              <Area type="monotone" dataKey="polarity" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPolarity)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>AI Insights</h3>
        <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>Significant drop in sentiment during April aligns with the v2.4 app release.</li>
          <li>Steady recovery observed in May and June after patching bug #402.</li>
          <li>Overall trajectory indicates a positive 15% increase in user satisfaction year-over-year.</li>
        </ul>
      </div>
    </motion.div>
  );
}
