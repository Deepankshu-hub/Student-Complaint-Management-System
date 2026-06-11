import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const barData = [
  { name: 'Mon', positive: 400, negative: 240, neutral: 200 },
  { name: 'Tue', positive: 300, negative: 139, neutral: 221 },
  { name: 'Wed', positive: 200, negative: 980, neutral: 229 },
  { name: 'Thu', positive: 278, negative: 390, neutral: 200 },
  { name: 'Fri', positive: 189, negative: 480, neutral: 218 },
  { name: 'Sat', positive: 239, negative: 380, neutral: 250 },
  { name: 'Sun', positive: 349, negative: 430, neutral: 210 },
];

const pieData = [
  { name: 'Positive', value: 400 },
  { name: 'Negative', value: 300 },
  { name: 'Neutral', value: 300 },
];

const COLORS = ['#4ADE80', '#F87171', '#9CA3AF'];

export default function Analytics() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Analytics Overview</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Deep dive into your sentiment metrics and platform usage.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Analyzed</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>24,592</p>
          <span style={{ color: '#4ADE80', fontSize: '0.9rem', fontWeight: 600 }}>↑ 12% this week</span>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Avg. Polarity</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4ADE80' }}>+0.42</p>
          <span style={{ color: '#4ADE80', fontSize: '0.9rem', fontWeight: 600 }}>↑ 0.05 this week</span>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Active Users</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>1,204</p>
          <span style={{ color: '#F87171', fontSize: '0.9rem', fontWeight: 600 }}>↓ 3% this week</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Weekly Sentiment Volume</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                <Bar dataKey="positive" stackId="a" fill="#4ADE80" />
                <Bar dataKey="neutral" stackId="a" fill="#9CA3AF" />
                <Bar dataKey="negative" stackId="a" fill="#F87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Overall Distribution</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <span style={{ color: '#4ADE80', fontWeight: 600, fontSize: '0.9rem' }}>• Positive</span>
            <span style={{ color: '#9CA3AF', fontWeight: 600, fontSize: '0.9rem' }}>• Neutral</span>
            <span style={{ color: '#F87171', fontWeight: 600, fontSize: '0.9rem' }}>• Negative</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
