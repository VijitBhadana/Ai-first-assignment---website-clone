import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Home page has its own dark CTA + nav tiles above this footer, 
// so this Footer only shows nav tiles on non-home pages.
export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const tiles = [
    { label: 'Our Industries', to: '/our-industries' },
    { label: 'Our Mission',    to: '/our-mission' },
    { label: 'Apply',          to: '/apply' },
  ];

  return (
    <footer style={{ background: '#080c18', color: '#fff' }}>
      {/* Nav tiles — only on non-home pages */}
      {!isHome && (
        <div className="footer-nav-tiles">
          {tiles.map((t) => {
            const isActive = location.pathname === t.to;
            return (
              <Link key={t.label} to={t.to} className={`footer-tile ${isActive ? 'active' : ''}`}>
                <span className="footer-tile-label">{t.label}</span>
                <span style={{ color: '#3b5bdb', fontSize: 22, fontWeight: 700 }}>→</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Giant wordmark */}
      <div style={{ padding: '0 40px 0' }}>
        <div className="footer-wordmark">VECTR</div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '18px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 16,
      }}>
        <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          © 2026 Vectr, Inc.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'ToS', 'Made by Utsubo'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
