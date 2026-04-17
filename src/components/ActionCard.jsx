import React from 'react';

export const ActionCard = React.memo(({ title, icon, description, badge, onClick, style, activeStatus }) => (
  <button 
    className="glass-panel" 
    style={{ padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', position: 'relative', overflow: 'hidden', textAlign: 'left', border: 'none', background: 'rgba(20,22,31,0.6)', color: '#fff', width: '100%', ...style }} 
    onClick={onClick} 
    aria-pressed={activeStatus}
    aria-label={`${title}: ${description}`}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--glass-shadow), 0 0 15px rgba(0,240,255,0.2)'; }} 
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--glass-shadow)'; }}
  >
    {activeStatus && (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'var(--gradient-primary)' }} aria-hidden="true"></div>
    )}
    <div className="flex-between" style={{ marginBottom: '1rem' }}>
      <div style={{ fontSize: '2rem' }} aria-hidden="true">{icon}</div>
      {badge && <span style={{ background: 'var(--bg-dark)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--neon-cyan)', border: '1px solid rgba(0, 240, 255, 0.3)' }} aria-live="polite">{badge}</span>}
    </div>
    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{description}</p>
  </button>
));
