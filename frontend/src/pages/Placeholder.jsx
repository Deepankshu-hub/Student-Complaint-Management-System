import React from 'react';
import { motion } from 'framer-motion';

export default function Placeholder({ title }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '3rem',
        textAlign: 'center'
      }}
    >
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
          This page is currently under construction. High-end features are coming soon!
        </p>
        <div style={{
          height: '200px',
          width: '100%',
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          backgroundColor: 'var(--bg-color)'
        }}>
          Feature coming soon
        </div>
      </div>
    </motion.div>
  );
}
