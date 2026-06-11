import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Admin User', email: 'admin@acme.com', role: 'Owner' },
  { name: 'Sarah Connor', email: 'sarah@acme.com', role: 'Editor' },
  { name: 'John Smith', email: 'john@acme.com', role: 'Viewer' },
];

export default function UserManagement() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>User Management</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your team's access to the SentimentAI dashboard.</p>
        </div>
        <button className="btn btn-primary">Invite Member</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <th style={{ padding: '1rem 1.5rem' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem' }}>Email</th>
              <th style={{ padding: '1rem 1.5rem' }}>Role</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{member.name}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{member.email}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    backgroundColor: member.role === 'Owner' ? 'rgba(79, 70, 229, 0.1)' : 'var(--bg-color)',
                    color: member.role === 'Owner' ? 'var(--primary)' : 'var(--text-secondary)'
                  }}>
                    {member.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button className="btn" style={{ padding: '0.4rem', color: 'var(--text-secondary)', background: 'transparent' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
