import React from 'react';

export const EventHero = React.memo(() => (
  <section className="glass-panel fade-in" style={{ padding: '2rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }} aria-labelledby="hero-title">
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="flex-between">
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--neon-purple)', display: 'flex', alignItems: 'center' }}>
          <span className="live-indicator" style={{ marginRight: '8px' }} aria-hidden="true"></span>
          <span>Live Event</span>
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Section 114</span>
      </div>
      <h2 id="hero-title" style={{ marginTop: '0.5rem', fontSize: '2rem', marginLeft: 0, marginBottom: '0.5rem' }}>Global Series Finals</h2>
      <p style={{ margin: 0, opacity: 0.8 }}>Halftime approaching. Congestion expected in main concourse.</p>
    </div>
    <div style={{ position: 'absolute', right: '-20%', top: '-50%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, transparent 70%)', borderRadius: '50%' }} aria-hidden="true"></div>
  </section>
));
