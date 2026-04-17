import React, { useState, useEffect } from 'react';

export const VirtualQueueModal = ({ onClose, onJoinStatusChange }) => {
  const [joined, setJoined] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 25);

  useEffect(() => {
    let timer;
    if (joined && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [joined, timeLeft]);

  // Trap focus roughly or just rely on standard dialog if we use native. We use role dialog here.
  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleJoin = () => {
    setJoined(true);
    if (onJoinStatusChange) onJoinStatusChange(true);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progressPercentage = ((865 - timeLeft) / 865) * 100;

  return (
    <div className="fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(10, 11, 16, 0.8)', backdropFilter: 'blur(8px)' }} onClick={onClose} role="presentation">
      <div 
         role="dialog" 
         aria-modal="true" 
         aria-labelledby="queue-title"
         className="glass-panel" 
         style={{ width: '90%', maxWidth: '400px', padding: '2rem', position: 'relative', overflow: 'hidden' }} 
         onClick={e => e.stopPropagation()}
      >
        {joined && <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)', borderRadius: '50%' }} aria-hidden="true"></div>}
        <button onClick={onClose} aria-label="Close Queue Modal" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', zIndex: 10 }}>×</button>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
          <div aria-hidden="true" style={{ fontSize: '3rem', marginBottom: '1rem', transform: joined ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s', animation: joined ? 'pulse-glow 3s infinite' : 'none', borderRadius: '50%', width: '80px', height: '80px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>🌭</div>
          <h2 id="queue-title" className="text-gradient" style={{ margin: 0, marginBottom: '0.5rem' }}>Smashburger Express</h2>
          <p style={{ margin: 0 }}>{joined ? 'You are in line!' : 'Virtual Queue'}</p>
        </div>
        
        <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 2, border: joined ? '1px solid rgba(0, 240, 255, 0.2)' : 'none' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400, margin: 0 }}>{joined ? 'Time remaining' : 'Estimated Wait'}</h3>
          <div aria-live="polite" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--neon-cyan)', margin: '0.5rem 0', fontFamily: 'monospace' }}>
            {mins}:{secs < 10 ? `0${secs}` : secs}
          </div>
          <p style={{ fontSize: '0.85rem', margin: 0 }}>{joined ? "We'll buzz your phone when it's ready!" : "Skip the crowd and wait from your seat."}</p>
          {joined && (
             <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', overflow: 'hidden' }} role="progressbar" aria-valuenow={Math.round(progressPercentage)} aria-valuemin="0" aria-valuemax="100">
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
