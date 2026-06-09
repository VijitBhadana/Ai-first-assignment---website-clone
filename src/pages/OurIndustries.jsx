import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    name: 'Nuclear Power',
    tagline: 'Precision staffing for nuclear facilities and outages',
    img: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=900&q=80',
    roles: ['Schedulers','Welders','Radiation Protection','Instrument Techs','Electricians','Mechanics','QA/QC Inspectors','Laborers'],
  },
  {
    name: 'Gas',
    tagline: 'Staffing for high-output, time-critical turbine operations',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
    roles: ['Schedulers','Welders','Scaffolders','Laborers','Boilermakers','Pipefitters','Millwrights','Electricians'],
  },
  {
    name: 'Data Centers',
    tagline: 'Precision staffing for data center build-outs and uptime',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80',
    roles: ['Low Voltage Techs','HVAC Techs','Electricians','Environmental Electricians','Commissioning Agents','Laborers','Project Managers','Safety Officers'],
  },
  {
    name: 'Semiconductors',
    tagline: 'Specialized staffing for advanced chip manufacturing',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
    roles: ['Process Techs','Equipment Techs','Facilities Engineers','EHS Specialists','Metrology Techs','Cleanroom Workers','Automation Engineers','Quality Engineers'],
  },
];

export default function OurIndustries() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.fromTo('.ind-hero-title', { opacity:0, y:60 }, { opacity:1, y:0, duration:1, ease:'power3.out', delay:0.3 });
    gsap.fromTo('.ind-hero-sub',   { opacity:0, y:30 }, { opacity:1, y:0, duration:0.8, delay:0.6 });
    gsap.fromTo('.ind-panel',      { opacity:0, y:40 }, { opacity:1, y:0, duration:0.8, ease:'power2.out', scrollTrigger:{ trigger:'.ind-panel', start:'top 80%' }});
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const cur = industries[active];

  return (
    <div style={{ background: '#fff' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(155deg, #f2f6fa 0%, #e6eff6 100%)',
        minHeight: '60vh', display:'flex', alignItems:'flex-end',
        padding:'140px 64px 64px', position:'relative', overflow:'hidden'
      }}>
        <div style={{ position:'absolute', inset:0, opacity:0.25,
          backgroundImage:'radial-gradient(circle, #a0b4c8 1px, transparent 1px)',
          backgroundSize:'28px 28px', pointerEvents:'none' }}/>
        <div style={{ maxWidth:1400, margin:'0 auto', width:'100%' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
            <div>
              <p className="ind-hero-sub" style={{ fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'#9aacba', marginBottom:16, opacity:0 }}>
                Our Industries
              </p>
              <h1 className="ind-hero-title section-heading" style={{ fontSize:'clamp(48px,7vw,96px)', opacity:0 }}>
                Staffing the World's<br />Critical Systems
              </h1>
            </div>
            <p style={{ fontFamily:'DM Sans', fontSize:15, color:'#6b7f8e', maxWidth:320, textAlign:'right', paddingBottom:8 }}>
              We specialize in high-stakes environments: Nuclear Power, Gas Turbines, Data Centers, and Semiconductors.
            </p>
          </div>
        </div>
      </section>

      {/* Industry selector */}
      <section className="ind-panel" style={{ padding:'72px 64px', opacity:0 }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'260px 1fr', gap:64 }}>
          {/* Tabs */}
          <div style={{ display:'flex', flexDirection:'column', gap:8, paddingTop:8 }}>
            {industries.map((ind, i) => (
              <button key={ind.name} onClick={() => setActive(i)} style={{
                background:'none', border:'none', cursor:'pointer', textAlign:'left', padding:'6px 0',
                fontFamily:'Barlow Condensed', fontWeight:700, letterSpacing:'-0.01em',
                fontSize: i === active ? 30 : 22,
                color: i === active ? '#0d1117' : '#b0bec9',
                transition:'all 0.3s',
              }}>
                {ind.name}
              </button>
            ))}
          </div>

          {/* Detail */}
          <div>
            <div style={{ borderRadius:24, overflow:'hidden', height:400, marginBottom:28 }}>
              <img src={cur.img} alt={cur.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'opacity 0.4s' }}/>
            </div>
            <h3 style={{ fontFamily:'DM Sans', fontSize:20, fontWeight:700, color:'#0d1117', marginBottom:20 }}>{cur.tagline}</h3>
            <div style={{ borderTop:'1px solid #e8e8e8' }}>
              {cur.roles.map(r => (
                <div key={r} style={{ padding:'12px 0', borderBottom:'1px solid #f0f0f0', fontFamily:'DM Sans', fontSize:15, color:'#374151' }}>{r}</div>
              ))}
            </div>
            <div style={{ marginTop:32 }}>
              <Link to="/request-crews" style={{ textDecoration:'none' }}>
                <button className="btn-dark">Request Crews</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nuclear grade banner */}
      <section style={{ background:'linear-gradient(155deg,#f2f6fa 0%,#e6eff6 100%)', padding:'72px 64px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div className="img-rounded" style={{ overflow:'hidden', aspectRatio:'4/3' }}>
            <img src="https://images.unsplash.com/photo-1581094651181-35942459ef62?w=800&q=80" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          </div>
          <div>
            <h2 className="section-heading" style={{ fontSize:'clamp(32px,4vw,52px)', marginBottom:20 }}>
              Nuclear-grade<br />standards across<br />every site.
            </h2>
            <p style={{ fontFamily:'DM Sans', fontSize:15, color:'#6b7f8e', lineHeight:1.7, marginBottom:32 }}>
              Modeled on nuclear-grade environments, our process enforces badge compliance, protected timelines and zero-error tolerance.
            </p>
            <Link to="/request-crews" style={{ textDecoration:'none' }}>
              <button className="btn-dark">Explore Our Industries</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
