import { useState } from 'react';

const EventHero = () => (
  <div className="glass-panel fade-in" style={{ padding: '2rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="flex-between">
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--neon-purple)' }}>
          <span className="live-indicator" style={{ marginRight: '8px' }}></span>
          Live Event
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Section 114</span>
      </div>
      <h2 style={{ marginTop: '0.5rem', fontSize: '2rem' }}>Global Series Finals</h2>
      <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>Halftime approaching. Congestion expected in main concourse.</p>
    </div>
    {/* Decorative background element */}
    <div style={{ position: 'absolute', right: '-20%', top: '-50%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
  </div>
);

const ActionCard = ({ title, icon, description, badge, onClick, style }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.3s', ...style }} onClick={onClick} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
    <div className="flex-between" style={{ marginBottom: '1rem' }}>
      <div style={{ fontSize: '2rem' }}>{icon}</div>
      {badge && <span style={{ background: 'var(--bg-dark)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--neon-cyan)', border: '1px solid rgba(0, 240, 255, 0.3)' }}>{badge}</span>}
    </div>
    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ fontSize: '0.85rem' }}>{description}</p>
  </div>
);

const WayfindingWidget = () => (
  <div className="glass-panel fade-in" style={{ padding: '1.5rem', marginTop: '1.5rem', animationDelay: '0.2s' }}>
    <div className="flex-between" style={{ marginBottom: '1rem' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🗺️</span> Smart Wayfinding
      </h3>
      <span style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)' }}>Real-time</span>
    </div>
    
    <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(57, 255, 20, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--neon-green)' }}>
          🚽
        </div>
        <div>
          <h4 style={{ margin: 0 }}>Restroom (Concourse C)</h4>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Low congestion • 2 min walk</p>
        </div>
        <button className="btn btn-secondary" style={{ marginLeft: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Route</button>
      </div>
      
      <div style={{ margin: '1rem 0', height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 0, 85, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--neon-pink)' }}>
          🍔
        </div>
        <div>
          <h4 style={{ margin: 0 }}>Main Concessions</h4>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>High congestion • Avoid right now</p>
        </div>
      </div>
    </div>
  </div>
);

const VirtualQueueModal = ({ onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(10, 11, 16, 0.8)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
    <div className="glass-panel" style={{ width: '90%', maxWidth: '400px', padding: '2rem', position: 'relative' }} onClick={e => e.stopPropagation()}>
      <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌭</div>
        <h2 className="text-gradient">Virtual Queue</h2>
        <p>Smashburger Express</p>
      </div>
      
      <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>Estimated Wait</h3>
        <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--neon-cyan)', margin: '0.5rem 0' }}>14<span style={{ fontSize: '1.5rem' }}>min</span></div>
        <p style={{ fontSize: '0.85rem' }}>We'll notify you when it's your turn.</p>
      </div>
      
      <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { alert('Joined queue!'); onClose(); }}>
        Join Virtual Queue
      </button>
    </div>
  </div>
);

export default function App() {
  const [showQueue, setShowQueue] = useState(false);

  return (
    <>
      <header className="glass-panel" style={{ padding: '1rem 0', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--gradient-primary)' }}></div>
            <h1 style={{ fontSize: '1.25rem', letterSpacing: '1px' }}>OMNI<span style={{ fontWeight: 300 }}>VENUE</span></h1>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-panel-solid)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'var(--glass-border)' }}>
            👤
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 1.5rem', paddingBottom: '6rem' }}>
        <EventHero />
        
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Quick Actions</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <ActionCard 
            title="Food Express" 
            icon="🍔" 
            description="Order to seat or pickup." 
            badge="0 Wait"
            onClick={() => setShowQueue(true)}
          />
          <ActionCard 
            title="Merch Setup" 
            icon="👕" 
            description="Skip the line, grab gear." 
            badge="10m Queue"
            style={{ borderTop: '2px solid var(--neon-purple)' }}
          />
        </div>

        <WayfindingWidget />
      </main>

      <nav className="glass-panel" style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '400px', display: 'flex', justifyContent: 'space-around', padding: '0.75rem', borderRadius: '30px', zIndex: 50 }}>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--neon-cyan)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <span style={{ fontSize: '1.2rem' }}>🏠</span>
          <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>Home</span>
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <span style={{ fontSize: '1.2rem' }}>🗺️</span>
          <span style={{ fontSize: '0.65rem' }}>Map</span>
        </button>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <span style={{ fontSize: '1.2rem' }}>🎟️</span>
          <span style={{ fontSize: '0.65rem' }}>Tickets</span>
        </button>
      </nav>

      {showQueue && <VirtualQueueModal onClose={() => setShowQueue(false)} />}
    </>
  );
}
