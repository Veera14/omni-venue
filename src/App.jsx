import { useState, useEffect } from 'react';
import Stadium3D from './Stadium3D';

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
    <div style={{ position: 'absolute', right: '-20%', top: '-50%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
  </div>
);

const ActionCard = ({ title, icon, description, badge, onClick, style, activeStatus }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s', position: 'relative', overflow: 'hidden', ...style }} onClick={onClick} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--glass-shadow), 0 0 15px rgba(0,240,255,0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--glass-shadow)'; }}>
    {activeStatus && (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'var(--gradient-primary)' }}></div>
    )}
    <div className="flex-between" style={{ marginBottom: '1rem' }}>
      <div style={{ fontSize: '2rem' }}>{icon}</div>
      {badge && <span style={{ background: 'var(--bg-dark)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--neon-cyan)', border: '1px solid rgba(0, 240, 255, 0.3)' }}>{badge}</span>}
    </div>
    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ fontSize: '0.85rem' }}>{description}</p>
  </div>
);

const WayfindingWidget = ({ onMapLink }) => {
  const [routingState, setRoutingState] = useState('idle');
  
  const handleRoute = () => {
    setRoutingState('routing');
    setTimeout(() => {
      setRoutingState('active');
    }, 1200);
  };

  return (
    <div className="glass-panel fade-in" style={{ padding: '1.5rem', marginTop: '1.5rem', transition: 'all 0.5s ease' }}>
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🗺️</span> Smart Wayfinding
        </h3>
        <span style={{ fontSize: '0.8rem', color: routingState === 'active' ? 'var(--neon-green)' : 'var(--neon-cyan)' }}>
          {routingState === 'active' ? 'Navigating...' : 'Real-time'}
        </span>
      </div>
      
      <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', padding: '1rem', border: routingState === 'active' ? '1px solid rgba(57, 255, 20, 0.4)' : '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s ease' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(57, 255, 20, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--neon-green)', transition: 'transform 0.3s', transform: routingState === 'active' ? 'scale(1.1)' : 'scale(1)' }}>
            🚽
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0 }}>Restroom (Concourse C)</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Low congestion • 2 min walk</p>
          </div>
          
          {routingState === 'idle' && <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={handleRoute}>Route</button>}
          {routingState === 'routing' && <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', opacity: 0.7 }} disabled>...</button>}
          {routingState === 'active' && <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: 'rgba(255,0,85,0.1)', color: 'var(--neon-pink)', borderColor: 'rgba(255,0,85,0.2)' }} onClick={() => setRoutingState('idle')}>Cancel</button>}
        </div>
        
        {routingState === 'active' && (
          <div className="fade-in" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(57, 255, 20, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--neon-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><span className="live-indicator"></span> Head straight, then turn right</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>1 min left</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ background: 'var(--neon-green)', width: '35%', height: '100%', borderRadius: '3px', transition: 'width 1s' }}></div>
            </div>
          </div>
        )}

        {routingState !== 'active' && (
          <>
            <div style={{ margin: '1rem 0', height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
            <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={onMapLink}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--neon-cyan)' }}>
                🪑
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Find My Seat</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interactive 3D View</p>
              </div>
              <div style={{ marginLeft: 'auto', color: 'var(--neon-cyan)' }}>→</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const VirtualQueueModal = ({ onClose, onJoinStatusChange }) => {
  const [joined, setJoined] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 25);

  useEffect(() => {
    let timer;
    if (joined && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [joined, timeLeft]);

  const handleJoin = () => {
    setJoined(true);
    if (onJoinStatusChange) onJoinStatusChange(true);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progressPercentage = ((865 - timeLeft) / 865) * 100;

  return (
    <div className="fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(10, 11, 16, 0.8)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div className="glass-panel" style={{ width: '90%', maxWidth: '400px', padding: '2rem', position: 'relative', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        {joined && <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)', borderRadius: '50%' }}></div>}
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', zIndex: 10 }}>×</button>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', transform: joined ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s', animation: joined ? 'pulse-glow 3s infinite' : 'none', borderRadius: '50%', width: '80px', height: '80px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>🌭</div>
          <h2 className="text-gradient">Smashburger Express</h2>
          <p>{joined ? 'You are in line!' : 'Virtual Queue'}</p>
        </div>
        
        <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 2, border: joined ? '1px solid rgba(0, 240, 255, 0.2)' : 'none' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>{joined ? 'Time remaining' : 'Estimated Wait'}</h3>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--neon-cyan)', margin: '0.5rem 0', fontFamily: 'monospace' }}>
            {mins}:{secs < 10 ? `0${secs}` : secs}
          </div>
          <p style={{ fontSize: '0.85rem' }}>{joined ? "We'll buzz your phone when it's ready!" : "Skip the crowd and wait from your seat."}</p>
          {joined && (
             <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
               <div style={{ background: 'var(--gradient-primary)', width: `${Math.max(5, progressPercentage)}%`, height: '100%', borderRadius: '3px', transition: 'width 1s linear' }}></div>
             </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 2 }}>
          {joined ? (
            <>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { setJoined(false); if (onJoinStatusChange) onJoinStatusChange(false); }}>Drop Out</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>Hide</button>
            </>
          ) : (
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleJoin}>Join Queue Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationSnackbar = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 3500);
        return () => clearTimeout(timer);
    }, []);

    if(!show) return null;
    return (
        <div className="glass-panel fade-in" style={{ position: 'fixed', top: '5rem', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '400px', zIndex: 100, padding: '1rem', borderLeft: '4px solid var(--neon-purple)', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 10px 30px rgba(138,43,226,0.3)', animation: 'fadeIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}>
           <div style={{ fontSize: '1.5rem', background: 'rgba(138,43,226,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏟️</div>
           <div style={{ flex: 1 }}>
               <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#fff' }}>Venue Update</h4>
               <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Crowd flow is optimal at the North Exit.</p>
           </div>
           <button onClick={() => setShow(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', opacity: 0.5 }}>×</button>
        </div>
    )
}

export default function App() {
  const [showQueue, setShowQueue] = useState(false);
  const [inFoodQueue, setInFoodQueue] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeVenueSection, setActiveVenueSection] = useState(null);
  const [navigationMode, setNavigationMode] = useState(false);

  // When tab changes, reset map state
  useEffect(() => {
    if (activeTab !== 'map') {
        setActiveVenueSection(null);
        setNavigationMode(false);
    }
  }, [activeTab]);

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

      {activeTab === 'home' && <NotificationSnackbar />}

      {activeTab === 'home' && (
        <main className="container fade-in" style={{ padding: '2rem 1.5rem', paddingBottom: '7rem', minHeight: '100vh' }}>
          <EventHero />
          
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Quick Actions</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            <ActionCard 
              title="Food Express" 
              icon="🍔" 
              description={inFoodQueue ? "You are currently in line." : "Order to seat or pickup."}
              badge={inFoodQueue ? "In Queue" : "0 Wait"}
              onClick={() => setShowQueue(true)}
              activeStatus={inFoodQueue}
            />
            <ActionCard 
              title="Merch Setup" 
              icon="👕" 
              description="Skip the line, grab gear." 
              badge="10m Queue"
              style={{ borderTop: '2px solid var(--neon-purple)' }}
            />
          </div>

          <WayfindingWidget onMapLink={() => { setActiveTab('map'); setTimeout(() => setActiveVenueSection('114'), 500); }} />
        </main>
      )}

      {activeTab === 'map' && (
        <main className="fade-in" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10, background: '#0a0b10' }}>
          <Stadium3D activeSection={activeVenueSection} navigationMode={navigationMode} />
          
          <div className="glass-panel fade-in" style={{ position: 'absolute', bottom: '7rem', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '400px', padding: '1.5rem', zIndex: 20, textAlign: 'center', background: 'rgba(20, 22, 31, 0.85)' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🪑</span>
            <h3 style={{ margin: 0, marginBottom: '0.5rem', color: '#fff' }}>Interactive 3D Venue</h3>
            
            {navigationMode ? (
              <>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--neon-green)', marginBottom: '1rem', fontWeight: 600 }}>
                  <span className="live-indicator" style={{background: 'var(--neon-green)'}}></span> Active Navigation Mode
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary" style={{ flex: 1, borderColor: 'var(--neon-pink)', color: 'var(--neon-pink)' }} onClick={() => setNavigationMode(false)}>
                    End Route
                  </button>
                  <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => setActiveVenueSection(null)}>
                    Clear Map
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Locate your exact seat or route from your phone's GPS position in the stadium.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setActiveVenueSection(activeVenueSection ? null : '114')}>
                    {activeVenueSection ? 'Hide Seat' : 'Find Seat'}
                  </button>
                  {activeVenueSection && (
                    <button className="btn btn-primary" style={{ flex: 2, background: 'var(--neon-green)', color: '#000', textShadow: 'none' }} onClick={() => setNavigationMode(true)}>
                      Navigate Here
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      )}

      <nav className="glass-panel" style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '400px', display: 'flex', justifyContent: 'space-around', padding: '0.75rem', borderRadius: '30px', zIndex: 50, backdropFilter: 'blur(20px)' }}>
        <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: activeTab === 'home' ? 'var(--neon-cyan)' : 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'color 0.3s' }}>
          <span style={{ fontSize: '1.2rem', transform: activeTab === 'home' ? 'scale(1.1)' : 'scale(1)' }}>🏠</span>
          <span style={{ fontSize: '0.65rem', fontWeight: activeTab === 'home' ? 600 : 400 }}>Home</span>
        </button>
        <button onClick={() => setActiveTab('map')} style={{ background: 'transparent', border: 'none', color: activeTab === 'map' ? 'var(--neon-cyan)' : 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'color 0.3s' }}>
          <span style={{ fontSize: '1.2rem', transform: activeTab === 'map' ? 'scale(1.1)' : 'scale(1)' }}>🗺️</span>
          <span style={{ fontSize: '0.65rem', fontWeight: activeTab === 'map' ? 600 : 400 }}>Map</span>
        </button>
        <button onClick={() => setActiveTab('tickets')} style={{ background: 'transparent', border: 'none', color: activeTab === 'tickets' ? 'var(--neon-cyan)' : 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'color 0.3s' }}>
          <span style={{ fontSize: '1.2rem', transform: activeTab === 'tickets' ? 'scale(1.1)' : 'scale(1)' }}>🎟️</span>
          <span style={{ fontSize: '0.65rem', fontWeight: activeTab === 'tickets' ? 600 : 400 }}>Tickets</span>
        </button>
      </nav>

      {showQueue && (
        <VirtualQueueModal 
          onClose={() => setShowQueue(false)} 
          onJoinStatusChange={(status) => setInFoodQueue(status)}
        />
      )}
    </>
  );
}
