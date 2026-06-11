import React from 'react';
import { motion } from 'framer-motion';

export default function Settings() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Settings</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your workspace preferences.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Profile Information</h3>
        <div className="input-group">
          <label>Company/Workspace Name</label>
          <input type="text" defaultValue="Acme Corp" />
        </div>
        <div className="input-group">
          <label>Support Email</label>
          <input type="email" defaultValue="support@acme.com" />
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div className="card" style={{ border: '1px solid #F87171' }}>
        <h3 style={{ marginBottom: '1rem', color: '#EF4444' }}>Danger Zone</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Once you delete a workspace, there is no going back. Please be certain.</p>
        <button className="btn" style={{ backgroundColor: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5' }}>
          Delete Workspace
        </button>
      </div>
    </motion.div>
  );
}
