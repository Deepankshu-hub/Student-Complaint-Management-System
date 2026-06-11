import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, BarChart2, FileText, Activity, Hash, TrendingUp, 
  MessageSquare, Folder, Users, Plug, Settings, UserCog, 
  Sun, Moon, ChevronLeft, ChevronRight, LayoutDashboard
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', icon: Home, path: '/dashboard' },
        { name: 'Analytics', icon: BarChart2, path: '/analytics' },
        { name: 'Reports', icon: FileText, path: '/reports' }
      ]
    },
    {
      title: 'AI ANALYSIS',
      items: [
        { name: 'Sentiment Analysis', icon: Activity, path: '/sentiment' },
        { name: 'Topics', icon: Hash, path: '/topics' },
        { name: 'Trends', icon: TrendingUp, path: '/trends' }
      ]
    },
    {
      title: 'FEEDBACK',
      items: [
        { name: 'Submissions', icon: MessageSquare, path: '/submissions' },
        { name: 'Categories', icon: Folder, path: '/categories' },
        { name: 'Respondents', icon: Users, path: '/respondents' }
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        { name: 'Integrations', icon: Plug, path: '/integrations' },
        { name: 'Settings', icon: Settings, path: '/settings' },
        { name: 'User Management', icon: UserCog, path: '/user-management' }
      ]
    }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', color: 'var(--primary)' }}>
          <LayoutDashboard size={28} />
          {!isCollapsed && <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>SentimentAI</span>}
        </div>
      </div>

      <div className="sidebar-content">
        {navGroups.map((group, idx) => (
          <div key={idx} className="sidebar-group">
            {!isCollapsed && <h4 className="sidebar-group-title">{group.title}</h4>}
            {isCollapsed && <div className="sidebar-group-divider" />}
            
            <ul className="sidebar-list">
              {group.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-link theme-toggle" onClick={toggleTheme} style={{ width: '100%', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
          {!isCollapsed && <span style={{ flex: 1, textAlign: 'left' }}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>}
        </button>

        <button 
          className="sidebar-link collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
