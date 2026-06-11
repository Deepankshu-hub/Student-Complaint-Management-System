import React, { useState } from 'react';
import { motion } from 'framer-motion';

const integrationsList = [
  { name: 'Slack', desc: 'Send sentiment alerts directly to Slack channels.', connected: true },
  { name: 'Zendesk', desc: 'Auto-tag support tickets based on sentiment.', connected: false },
  { name: 'Salesforce', desc: 'Sync user sentiment scores to their CRM profile.', connected: false },
  { name: 'Webhooks', desc: 'Stream raw analysis data to your own servers.', connected: true },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(integrationsList);

  const toggle = (idx) => {
    const newInts = [...integrations];
    newInts[idx].connected = !newInts[idx].connected;
    setIntegrations(newInts);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Integrations</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Connect SentimentAI to your existing toolchain.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {integrations.map((app, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{app.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{app.desc}</p>
            </div>
            <button 
              onClick={() => toggle(idx)}
              className={app.connected ? 'btn btn-outline' : 'btn btn-primary'}
              style={{ width: '120px' }}
            >
              {app.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
