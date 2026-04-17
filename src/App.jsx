import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { EventHero } from './components/EventHero';
import { ActionCard } from './components/ActionCard';
import { WayfindingWidget } from './components/WayfindingWidget';
import { VirtualQueueModal } from './components/VirtualQueueModal';
import { OmniAssistant } from './components/OmniAssistant';

// Efficiency: Code-Split the heavy 3D WebGL bundle
const Stadium3D = lazy(() => import('./Stadium3D'));

export default function App() {
  const [showQueue, setShowQueue] = useState(false);
  const [inFoodQueue, setInFoodQueue] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeVenueSection, setActiveVenueSection] = useState(null);
  const [navigationMode, setNavigationMode] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    if (activeTab !== 'map') {
        setActiveVenueSection(null);
        setNavigationMode(false);
    }
  }, [activeTab]);

  return (
    <div className="app-container">
      <Header />

      {activeTab === 'home' && (
        <main className="container fade-in" style={{ padding: '2rem 1.5rem', paddingBottom: '7rem', minHeight: '100vh' }}>
          <EventHero />
          
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }} id="quick-actions-heading">Quick Actions</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }} role="group" aria-labelledby="quick-actions-heading">
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
          <Suspense fallback={<div style={{ color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2rem' }} role="status">Loading Immersive Map...</div>}>
            <Stadium3D activeSection={activeVenueSection} navigationMode={navigationMode} />
          </Suspense>
          
          <div className="glass-panel fade-in" style={{ position: 'absolute', bottom: '7rem', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '400px', padding: '1.5rem', zIndex: 20, textAlign: 'center', background: 'rgba(20, 22, 31, 0.85)' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }} aria-hidden="true">🪑</span>
            <h3 style={{ margin: 0, marginBottom: '0.5rem', color: '#fff' }}>Interactive 3D Venue</h3>
            
            {navigationMode ? (
              <>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--neon-green)', marginBottom: '1rem', fontWeight: 600 }}>
                  <span className="live-indicator" style={{background: 'var(--neon-green)'}} aria-hidden="true"></span> Active Navigation Mode
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

      {!assistantOpen && (
        <button 
          onClick={() => setAssistantOpen(true)}
          aria-label="Open Omni Assistant"
          className="fade-in"
          style={{ position: 'fixed', bottom: '6rem', right: '1.5rem', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--gradient-primary)', color: '#fff', border: 'none', fontSize: '1.8rem', cursor: 'pointer', zIndex: 90, boxShadow: '0 5px 20px rgba(138,43,226,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          ✨
        </button>
      )}

      {showQueue && (
        <VirtualQueueModal 
          onClose={() => setShowQueue(false)} 
          onJoinStatusChange={(status) => setInFoodQueue(status)}
        />
      )}
      
      <OmniAssistant 
        isOpen={assistantOpen} 
        onClose={() => setAssistantOpen(false)} 
        onAction={(action) => {
          if (action === 'SHOW_QUEUE') setShowQueue(true);
          if (action === 'NAVIGATE_SEAT') {
            setActiveTab('map');
            setTimeout(() => {
              setActiveVenueSection('114');
              setNavigationMode(true);
            }, 800);
          }
        }}
      />

      <nav aria-label="Main Navigation" className="glass-panel" style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '400px', display: 'flex', justifyContent: 'space-around', padding: '0.75rem', borderRadius: '30px', zIndex: 50, backdropFilter: 'blur(20px)' }}>
        <button aria-label="Go to Home" onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: activeTab === 'home' ? 'var(--neon-cyan)' : 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'color 0.3s' }}>
          <span aria-hidden="true" style={{ fontSize: '1.2rem', transform: activeTab === 'home' ? 'scale(1.1)' : 'scale(1)' }}>🏠</span>
          <span style={{ fontSize: '0.65rem', fontWeight: activeTab === 'home' ? 600 : 400 }}>Home</span>
        </button>
        <button aria-label="Go to Map" onClick={() => setActiveTab('map')} style={{ background: 'transparent', border: 'none', color: activeTab === 'map' ? 'var(--neon-cyan)' : 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'color 0.3s' }}>
          <span aria-hidden="true" style={{ fontSize: '1.2rem', transform: activeTab === 'map' ? 'scale(1.1)' : 'scale(1)' }}>🗺️</span>
          <span style={{ fontSize: '0.65rem', fontWeight: activeTab === 'map' ? 600 : 400 }}>Map</span>
        </button>
        <button aria-label="Go to Tickets" onClick={() => setActiveTab('tickets')} style={{ background: 'transparent', border: 'none', color: activeTab === 'tickets' ? 'var(--neon-cyan)' : 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'color 0.3s' }}>
          <span aria-hidden="true" style={{ fontSize: '1.2rem', transform: activeTab === 'tickets' ? 'scale(1.1)' : 'scale(1)' }}>🎟️</span>
          <span style={{ fontSize: '0.65rem', fontWeight: activeTab === 'tickets' ? 600 : 400 }}>Tickets</span>
        </button>
      </nav>
    </div>
  );
}
