import React from 'react';

export const Header = React.memo(() => (
  <header className="glass-panel" style={{ padding: '1rem 0', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 50 }}>
    <div className="container flex-between">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--gradient-primary)' }}></div>
        <h1 style={{ fontSize: '1.25rem', letterSpacing: '1px', margin: 0 }}>OMNI<span style={{ fontWeight: 300 }}>VENUE</span></h1>
      </div>
      <button aria-label="User Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-panel-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'var(--glass-border)', cursor: 'pointer', color: '#fff' }}>
        👤
      </button>
    </div>
  </header>
));
