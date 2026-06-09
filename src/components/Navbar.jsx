import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // Dark pages: our-mission has dark hero
  const isDarkPage = location.pathname === '/our-mission';

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 }
    );
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollClass = scrolled
    ? (isDarkPage ? 'scrolled-dark' : 'scrolled-light')
    : '';

  const textColor = isDarkPage ? '#fff' : '#0d1117';
  const mutedColor = isDarkPage ? 'rgba(255,255,255,0.6)' : '#6b7f8e';

  return (
    <nav ref={navRef} className={`nav-root ${scrollClass}`} style={{ opacity: 0 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Left nav links */}
        <div style={{ display: 'flex', gap: 32 }}>
          <Link to="/our-industries" style={{ fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: mutedColor, textDecoration: 'none' }}>
            Our Industries
          </Link>
          <Link to="/our-mission" style={{ fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: mutedColor, textDecoration: 'none' }}>
            Our Mission
          </Link>
        </div>

        {/* Center logo */}
        <Link to="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textDecoration: 'none' }}>
          <div style={{
            border: `1.5px solid ${isDarkPage ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)'}`,
            borderRadius: 6,
            padding: '7px 18px',
          }}>
            <span style={{ fontFamily: 'Barlow Condensed', fontSize: 17, fontWeight: 800, letterSpacing: '0.18em', color: textColor }}>
              VECTR
            </span>
          </div>
        </Link>

        {/* Right buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/apply" style={{ textDecoration: 'none' }}>
            <button className="btn-ghost" style={isDarkPage ? { background: 'rgba(255,255,255,0.12)', color: '#fff' } : {}}>
              Apply
            </button>
          </Link>
          <Link to="/request-crews" style={{ textDecoration: 'none' }}>
            <button className="btn-dark" style={isDarkPage ? { background: '#fff', color: '#0d1117' } : {}}>
              Request Crews
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
