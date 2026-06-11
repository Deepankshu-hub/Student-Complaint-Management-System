import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar } from 'lucide-react';

const mockReports = [
  { id: 1, name: 'Q1 Sentiment Overview', date: 'Mar 31, 2026', size: '2.4 MB', type: 'PDF' },
  { id: 2, name: 'March Customer Feedback', date: 'Mar 15, 2026', size: '1.1 MB', type: 'CSV' },
  { id: 3, name: 'Product Launch Sentiment', date: 'Feb 28, 2026', size: '4.8 MB', type: 'PDF' },
  { id: 4, name: 'January Bug Reports Analysis', date: 'Jan 31, 2026', size: '840 KB', type: 'CSV' },
];

export default function Reports() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Generated Reports</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Download and view your historical analysis reports.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} /> Generate New Report
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Report Name</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Date Generated</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Size</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockReports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    padding: '0.5rem', 
                    borderRadius: 'var(--radius-md)', 
                    backgroundColor: report.type === 'PDF' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                    color: report.type === 'PDF' ? '#EC4899' : '#4F46E5'
                  }}>
                    <FileText size={20} />
                  </div>
                  {report.name}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} /> {report.date}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{report.size}</td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={16} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
