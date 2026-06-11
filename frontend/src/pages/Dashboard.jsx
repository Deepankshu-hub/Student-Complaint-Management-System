import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { UploadCloud, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ user }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/history');
      setHistory(res.data.history);
    } catch (err) {
      toast.error('Failed to load history');
    }
  };

  const handleAnalyzeText = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post('/sentiment', { text });
      toast.success('Analysis complete!');
      setHistory([res.data, ...history]);
      setText('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.result) {
        toast.success('File analyzed successfully!');
        setHistory([res.data.result, ...history]);
      } else {
        toast.success('File uploaded successfully!');
      }
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const chartData = [...history].reverse().map((item, index) => ({
    name: `Entry ${index + 1}`,
    polarity: item.polarity
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name}. Here's your sentiment overview.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} /> Text Analysis
          </h3>
          <form onSubmit={handleAnalyzeText}>
            <div className="input-group">
              <textarea 
                rows="4"
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Paste or type text to analyze its sentiment..."
                style={{ resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading || !text.trim()}>
              {loading ? 'Analyzing...' : 'Analyze Text'}
            </button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UploadCloud size={20} /> Batch Analysis
          </h3>
          <form onSubmit={handleFileUpload}>
            <div className="input-group">
              <input 
                type="file" 
                accept=".txt,.csv"
                onChange={(e) => setFile(e.target.files[0])} 
              />
            </div>
            <button type="submit" className="btn btn-outline" disabled={loading || !file}>
              {loading ? 'Uploading...' : 'Upload & Analyze File'}
            </button>
          </form>
        </div>
      </div>

      {history.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Sentiment Trends</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
                <Line type="monotone" dataKey="polarity" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Analyses</h3>
        {history.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No history yet. Analyze some text to see results!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {history.map((item, idx) => (
              <div key={idx} style={{ 
                padding: '1rem', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1, marginRight: '1rem' }}>
                  <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>"{item.text || item.full_text?.substring(0, 100)}..."</p>
                  {item.timestamp && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(item.timestamp).toLocaleString()}</p>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    backgroundColor: item.label === 'Positive' ? 'rgba(74, 222, 128, 0.2)' : item.label === 'Negative' ? 'rgba(248, 113, 113, 0.2)' : 'var(--border-color)',
                    color: item.label === 'Positive' ? '#166534' : item.label === 'Negative' ? '#991B1B' : 'var(--text-secondary)'
                  }}>
                    {item.label}
                  </span>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.25rem' }}>Score: {item.polarity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
