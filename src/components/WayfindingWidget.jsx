import React, { useState, useMemo } from 'react';

export const WayfindingWidget = React.memo(({ onMapLink }) => {
  const [routingState, setRoutingState] = useState('idle');
  
  const handleRoute = () => {
    setRoutingState('routing');
    setTimeout(() => {
      setRoutingState('active');
    }, 1200);
  };

  const statusText = useMemo(() => {
     return routingState === 'active' ? 'Navigating...' : 'Real-time';
  }, [routingState]);

  return (
    <section className="glass-panel fade-in" style={{ padding: '1.5rem', marginTop: '1.5rem', transition: 'all 0.5s ease' }} aria-labelledby="wayfinding-title">
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h3 id="wayfinding-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <span aria-hidden="true">🗺️</span> Smart Wayfinding
        </h3>
        <span style={{ fontSize: '0.8rem', color: routingState === 'active' ? 'var(--neon-green)' : 'var(--neon-cyan)' }} aria-live="polite">
          {statusText}
        </span>
      </div>
      
      <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', padding: '1rem', border: routingState === 'active' ? '1px solid rgba(57, 255, 20, 0.4)' : '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s ease' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div aria-hidden="true" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(57, 255, 20, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--neon-green)', transition: 'transform 0.3s', transform: routingState === 'active' ? 'scale(1.1)' : 'scale(1)' }}>
            🚽
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>Restroom (Concourse C)</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Low congestion • 2 min walk</p>
          </div>
          
          {routingState === 'idle' && <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={handleRoute}>Route</button>}
          {routingState === 'routing' && <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', opacity: 0.7 }} disabled aria-busy="true">...</button>}
          {routingState === 'active' && <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: 'rgba(255,0,85,0.1)', color: 'var(--neon-pink)', borderColor: 'rgba(255,0,85,0.2)' }} onClick={() => setRoutingState('idle')}>Cancel</button>}
        </div>
        
        {routingState === 'active' && (
          <div className="fade-in" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(57, 255, 20, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--neon-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><span className="live-indicator" aria-hidden="true"></span> Head straight, then turn right</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>1 min left</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', position: 'relative', overflow: 'hidden' }} role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">
              <div style={{ background: 'var(--neon-green)', width: '35%', height: '100%', borderRadius: '3px', transition: 'width 1s' }}></div>
            </div>
          </div>
        )}

        {routingState !== 'active' && (
          <>
            <div style={{ margin: '1rem 0', height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
            <button className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', background: 'transparent', border: 'none', width: '100%', textAlign: 'left', padding: 0, color: '#fff' }} onClick={onMapLink}>
              <div aria-hidden="true" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--neon-cyan)' }}>
                🪑
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>Find My Seat</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interactive 3D View</p>
              </div>
              <div style={{ color: 'var(--neon-cyan)' }} aria-hidden="true">→</div>
            </button>
          </>
        )}
      </div>
    </section>
  );
});
