import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    heading: 'Great projects rely\non great people.',
    body: 'We continuously source top industry talent, from engineers to precision millwrights. So when work begins, the right team is already in place.',
    cta: { label: 'Apply Now To Vectr', to: '/apply' },
  },
  {
    heading: 'The search never stops',
    body: "We don't wait for an outage to start looking for a crew. We are constantly scouting for top-tier tradespeople. Whether you are available right now or locked in on another job for six months, we want to know who you are.",
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  },
  {
    heading: 'Skill is our currency',
    body: "We specialize in high-stakes environments. Nuclear, gas, data infrastructure. In these industries, precision isn't optional. We prioritize talent, experience, and certification above all else. If you take pride in your craft, you belong here.",
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
  {
    heading: 'An open door for\nprofessionals',
    body: "This isn't just an application for a single job; it's an entry into a premier talent pool. By joining the Vectr Network, you ensure that when high-value contracts open up, your name is at the top of the list.",
    img: 'https://images.unsplash.com/photo-1581094651181-35942459ef62?w=800&q=80',
  },
];

export default function OurMission() {
  useEffect(() => {
    gsap.fromTo('.m-hero-heading',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
    );
    gsap.fromTo('.m-hero-btn',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.8 }
    );

    gsap.utils.toArray('.m-section').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }, delay: i * 0.05 }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Dark hero */}
      <section style={{
        background: '#080c18', minHeight: '72vh',
        display: 'flex', alignItems: 'center', padding: '120px 64px 80px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
          backgroundSize: '28px 28px', pointerEvents: 'none'
        }}/>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, #3b82f6 0%, transparent 70%)',
          filter: 'blur(60px)', opacity: 0.15, pointerEvents: 'none'
        }}/>
        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <h1 className="m-hero-heading section-heading" style={{ fontSize:'clamp(40px,6vw,80px)', color:'#fff', opacity:0, maxWidth: 900, lineHeight: 1.05 }}>
            Staff your outage with fast response,<br />
            and crews you can rely on.
          </h1>
          <div className="m-hero-btn" style={{ marginTop: 40, opacity: 0 }}>
            <Link to="/request-crews" style={{ textDecoration: 'none' }}>
              <button className="btn-outline-white">Request Crews</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content sections */}
      {sections.map((s, i) => (
        <section key={i} className="m-section" style={{ padding: '72px 64px', borderBottom: '1px solid #f0f0f0', opacity: 0 }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
            <div>
              <h2 className="section-heading" style={{ fontSize: 'clamp(30px,3.5vw,50px)', whiteSpace: 'pre-line' }}>
                {s.heading}
              </h2>
              {i === 0 && (
                <Link to={s.cta.to} style={{ textDecoration: 'none' }}>
                  <button className="btn-dark" style={{ marginTop: 32 }}>{s.cta.label}</button>
                </Link>
              )}
            </div>
            <div>
              <p style={{ fontFamily: 'DM Sans', fontSize: 15, color: '#6b7f8e', lineHeight: 1.7, marginBottom: s.img ? 28 : 0 }}>
                {s.body}
              </p>
              {s.img && (
                <div className="img-rounded" style={{ marginTop: 16, overflow: 'hidden', borderRadius: 20 }}>
                  <img src={s.img} alt="" style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}/>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}
