import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import IsometricScene from '../components/IsometricScene';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01', title: 'Activation, simplified',
    body: 'One call triggers mobilization. Your requirements: craft, count, and start date route directly to our verified crews. No hand-offs. No escalations. Just boots on the ground in minutes.',
  },
  {
    num: '02', title: 'Cleared to count',
    body: 'Our team handles all screening and verification before dispatch. Compliance, background, certifications, and fitness-for-duty — we enforce a zero-fail model to guarantee every worker clears the gate on Day 1.',
  },
  {
    num: '03', title: 'Proven field match',
    body: "We don't just provide available workers. We deploy proven crews. By filtering for past performance, role fit, and reliability, we deliver teams engineered for endurance — ensuring your project stays fully manned from first break to completion.",
  },
  {
    num: '04', title: 'Seamless arrival',
    body: 'We manage the "last mile" of mobilization. Every crew arrives site-ready with finalized reporting details. With real-time arrival monitoring and active coordination, we ensure your shift starts on time, even when field conditions shift.',
  },
];

const FEATURES = [
  {
    title: 'Rapid Activation',
    body: 'We believe speed is a skill. Our platform uses machine learning to turn staffing into instant logistics, deploying a precisely matched workforce the moment demand strikes.',
    icon: <svg viewBox="0 0 64 64" fill="none" style={{width:64,height:64}}><rect x="6" y="6" width="26" height="26" rx="3" stroke="#111" strokeWidth="2.2" fill="none"/><rect x="20" y="20" width="12" height="12" rx="1.5" stroke="#111" strokeWidth="1.8" fill="none"/><path d="M32 6 L58 6 L58 26" stroke="#111" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M38 38 L56 56" stroke="#111" strokeWidth="2.2" strokeLinecap="round"/><circle cx="48" cy="50" r="7" stroke="#111" strokeWidth="2" fill="none"/><path d="M44.5 50 L47 52.5 L51.5 46.5" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    title: 'Rigorous Selection',
    body: 'Geography is a core metric. Our engine uses AI to find and contact qualified talent within defined radii, securing top local contractors first, filtered for cost and skill.',
    icon: <svg viewBox="0 0 64 64" fill="none" style={{width:64,height:64}}><circle cx="32" cy="20" r="13" stroke="#111" strokeWidth="2.2" fill="none"/><ellipse cx="32" cy="20" rx="6.5" ry="13" stroke="#111" strokeWidth="1.8" fill="none"/><path d="M19 20 Q32 28 45 20M19 20 Q32 12 45 20" stroke="#111" strokeWidth="1.8" fill="none"/><rect x="20" y="36" width="24" height="6" rx="1.5" stroke="#111" strokeWidth="1.8" fill="none"/><rect x="23" y="42" width="18" height="5" rx="1" fill="#111" opacity="0.12"/><rect x="26" y="47" width="12" height="4" rx="1" stroke="#111" strokeWidth="1.5" fill="none"/><rect x="28" y="51" width="8" height="3.5" rx="1" fill="#111" opacity="0.1"/></svg>
  },
  {
    title: '100% Verified Before Arrival',
    body: 'We use a Zero-Trust verification model with secure API integrations to run automated background checks and drug testing, blocking dispatch access until fully cleared.',
    icon: <svg viewBox="0 0 64 64" fill="none" style={{width:64,height:64}}><circle cx="24" cy="19" r="7.5" stroke="#111" strokeWidth="2.2" fill="none"/><path d="M11 46 C11 37 37 37 37 46" stroke="#111" strokeWidth="2.2" fill="none" strokeLinecap="round"/><circle cx="44" cy="21" r="5.5" stroke="#111" strokeWidth="1.8" fill="none"/><path d="M38 42 C38 35 56 35 56 42" stroke="#111" strokeWidth="1.8" fill="none" strokeLinecap="round"/><path d="M38 25 L41.5 28.5 L48 21" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    title: 'Controlled Outcomes',
    body: "We guarantee controlled outcomes by managing staffing's biggest variables—cost and compliance—prioritizing local mobilization and automating safety for every dispatch.",
    icon: <svg viewBox="0 0 64 64" fill="none" style={{width:64,height:64}}><rect x="6" y="10" width="18" height="24" rx="2" stroke="#111" strokeWidth="2.2" fill="none"/><rect x="9" y="14" width="12" height="2.5" rx="0.5" fill="#111" opacity="0.2"/><rect x="9" y="19" width="12" height="2.5" rx="0.5" fill="#111" opacity="0.2"/><rect x="9" y="24" width="8" height="2.5" rx="0.5" fill="#111" opacity="0.2"/><rect x="18" y="20" width="18" height="24" rx="2" stroke="#111" strokeWidth="2.2" fill="none"/><rect x="21" y="24" width="12" height="2.5" rx="0.5" fill="#111" opacity="0.2"/><rect x="21" y="29" width="12" height="2.5" rx="0.5" fill="#111" opacity="0.2"/><rect x="21" y="34" width="8" height="2.5" rx="0.5" fill="#111" opacity="0.2"/><rect x="34" y="16" width="18" height="24" rx="2" stroke="#111" strokeWidth="2.2" fill="none"/><rect x="37" y="20" width="12" height="2.5" rx="0.5" fill="#111" opacity="0.2"/><rect x="37" y="25" width="12" height="2.5" rx="0.5" fill="#111" opacity="0.2"/><rect x="37" y="30" width="8" height="2.5" rx="0.5" fill="#111" opacity="0.2"/></svg>
  },
];

export default function Home() {
  const [activeStep, setActiveStep]     = useState(0);
  const [scrollProgress, setScrollProg] = useState(0);
  const [openFaq, setOpenFaq]           = useState(0);

  const scrollWrapRef = useRef(null);
  const stickyBgRef   = useRef(null);
  const stepRefs      = useRef([]);

  const faqs = [
    { q: 'How fast can crews be mobilized?',
      a: 'We move at the speed of your schedule. Our platform maintains a deep network of verified industrial craft, eliminating the weeks wasted in traditional hiring cycles. One call activates our mobilization engine to source and deploy precision-matched crews in hours, not days, ensuring your most critical paths remain fully manned.' },
    { q: 'How do you handle compliance & background checks?',
      a: 'All compliance, background, and certification verification is handled before dispatch using automated API integrations with major screening providers, ensuring zero-fail clearance on Day 1.' },
    { q: 'What industries do you serve?',
      a: 'We specialize in Nuclear Power, Gas Turbines, Data Centers, and Semiconductors — high-consequence environments where precision staffing is non-negotiable.' },
  ];

  // Update scrollProgress for 3D scene
  const handleScroll = useCallback(() => {
    if (!scrollWrapRef.current) return;
    const rect = scrollWrapRef.current.getBoundingClientRect();
    const totalH = scrollWrapRef.current.scrollHeight - window.innerHeight;
    const scrolled = -rect.top;
    setScrollProg(Math.max(0, Math.min(1, scrolled / (totalH * 0.8))));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // ── HERO entrance
    gsap.timeline({ delay: 0.15 })
      .fromTo('.v-hero-h1',   { opacity:0, y:80, skewY:2 }, { opacity:1, y:0, skewY:0, duration:1.1, ease:'power4.out' })
      .fromTo('.v-hero-sub',  { opacity:0, y:32 },           { opacity:1, y:0, duration:0.85, ease:'power3.out' }, '-=0.65')
      .fromTo('.v-hero-cta',  { opacity:0, y:14 },           { opacity:1, y:0, duration:0.6 }, '-=0.4');

    // ── Steps: update activeStep from scroll position
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end:   'bottom 45%',
        onEnter:     () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      });
    });

    // ── Section reveals
    gsap.fromTo('.v-designed-h', { opacity:0, y:50 }, {
      opacity:1, y:0, duration:0.9, ease:'power3.out',
      scrollTrigger: { trigger:'.v-designed-h', start:'top 82%' }
    });

    gsap.utils.toArray('.v-feat').forEach((card, i) => {
      gsap.fromTo(card, { opacity:0, y:50 }, {
        opacity:1, y:0, duration:0.72, ease:'power2.out', delay: i * 0.1,
        scrollTrigger: { trigger:'.v-feat-grid', start:'top 85%' }
      });
    });

    gsap.fromTo('.v-nuc-img',  { opacity:0, x:-50, scale:0.96 }, {
      opacity:1, x:0, scale:1, duration:1, ease:'power2.out',
      scrollTrigger: { trigger:'.v-nuc-img', start:'top 78%' }
    });
    gsap.fromTo('.v-nuc-txt',  { opacity:0, x:40 }, {
      opacity:1, x:0, duration:1, ease:'power2.out',
      scrollTrigger: { trigger:'.v-nuc-txt', start:'top 78%' }
    });

    gsap.fromTo('.v-faq-h', { opacity:0, y:40 }, {
      opacity:1, y:0, duration:0.85,
      scrollTrigger: { trigger:'.v-faq-h', start:'top 82%' }
    });

    gsap.utils.toArray('.v-faq-i').forEach((el, i) => {
      gsap.fromTo(el, { opacity:0, y:20 }, {
        opacity:1, y:0, duration:0.55, delay: i*0.1,
        scrollTrigger: { trigger:el, start:'top 88%' }
      });
    });

    gsap.fromTo('.v-dcta-h', { opacity:0, y:55 }, {
      opacity:1, y:0, duration:1, ease:'power3.out',
      scrollTrigger: { trigger:'.v-dcta-h', start:'top 80%' }
    });
    gsap.fromTo('.v-dcta-btn', { opacity:0, y:20 }, {
      opacity:1, y:0, duration:0.7, delay:0.25,
      scrollTrigger: { trigger:'.v-dcta-btn', start:'top 85%' }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════ */}
      <section style={{
        position:'relative', minHeight:'100vh', overflow:'hidden',
        background:'linear-gradient(155deg, #d5e5f2 0%, #dce8f0 50%, #c8d8e8 100%)'
      }}>
        {/* Hero uses the very start of the 3D scene (scrollProgress near 0) */}
        <IsometricScene scrollProgress={0} />

        <div style={{
          position:'relative', zIndex:10,
          minHeight:'100vh', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          padding:'80px 32px 64px', textAlign:'center'
        }}>
          <h1 className="v-hero-h1" style={{
            fontFamily:'Barlow Condensed', fontWeight:800,
            fontSize:'clamp(64px,9.5vw,132px)', letterSpacing:'-0.025em',
            lineHeight:0.95, color:'#0d1117', opacity:0
          }}>
            The New Standard<br />in Staffing
          </h1>

          <p className="v-hero-sub" style={{
            fontFamily:'DM Sans', fontSize:16, lineHeight:1.75,
            color:'#567080', marginTop:28, maxWidth:500, opacity:0
          }}>
            AI driven speed. Expert curation.<br />
            We mobilize verified crews to protect your schedule and<br />
            your bottom line in high-consequence environments.
          </p>

          <div className="v-hero-cta" style={{ marginTop:52, display:'flex', flexDirection:'column', alignItems:'center', gap:8, opacity:0 }}>
            <span style={{ fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.34em', textTransform:'uppercase', color:'#8aa0ae' }}>
              Scroll to discover our process
            </span>
            <div className="scroll-bounce" style={{ width:1, height:32, background:'#9aacba' }} />
          </div>
        </div>
      </section>

      {/* ══ STEPS — sticky 3D background + left panel ═ */}
      {/*
        Structure: outer wrapper is position:relative with height = 100vh * 4
        Inner sticky container = 100vh, sticks to top
        3D scene covers the full sticky container
        Left panel content scrolls via GSAP / step state
      */}
      <div
        ref={scrollWrapRef}
        style={{
          position:'relative',
          background:'linear-gradient(160deg,#dce8f0 0%,#cfe0ea 100%)',
        }}
      >
        {/* Each step gets its own 100vh section to trigger ScrollTrigger */}
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={el => (stepRefs.current[i] = el)}
            style={{ position:'relative', minHeight:'100vh' }}
          />
        ))}

        {/* Sticky overlay — sits on top of all steps */}
        <div
          ref={stickyBgRef}
          style={{
            position:'sticky', top:0,
            height:'100vh',
            marginTop: `-${STEPS.length * 100}vh`,
            pointerEvents:'none',
            zIndex:5,
            overflow:'hidden',
          }}
        >
          {/* 3D Scene — scrollProgress drives camera pan */}
          <IsometricScene scrollProgress={scrollProgress} />

          {/* Horizontal blue beam flash line (thin, across viewport at 50%) */}
          <div style={{
            position:'absolute', left:0, right:0, top:'50%',
            height:'1.5px',
            background:'linear-gradient(90deg, transparent 0%, #3b82f6 20%, #93c5fd 55%, transparent 100%)',
            filter:'blur(0.8px)',
            opacity: 0.7,
            pointerEvents:'none',
          }}/>

          {/* Left panel — always visible while sticky */}
          <div style={{
            position:'absolute', left:0, top:0, bottom:0,
            width:560, display:'flex', alignItems:'center',
            padding:'0 64px',
            pointerEvents:'all',
            zIndex:10,
          }}>
            <div style={{ display:'flex', flexDirection:'column', gap:24, width:'100%' }}>
              {STEPS.map((s, j) => {
                const isActive = j === activeStep;
                return (
                  <div key={s.num} style={{ display:'flex', gap:16, alignItems:'flex-start' }}>
                    {/* Badge */}
                    {isActive ? (
                      <div style={{
                        width:44, height:44, background:'#fff',
                        borderRadius:11, boxShadow:'0 2px 14px rgba(0,0,0,0.11)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontFamily:'JetBrains Mono', fontSize:13, fontWeight:700, color:'#0d1117',
                        flexShrink:0,
                      }}>{s.num}</div>
                    ) : (
                      <div style={{ width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <span style={{ fontFamily:'JetBrains Mono', fontSize:11, fontWeight:600, color:'#9aacba' }}>{s.num}</span>
                      </div>
                    )}

                    {/* Text */}
                    <div style={{ paddingTop: isActive ? 2 : 11 }}>
                      <h3 style={{
                        fontFamily: isActive ? 'Barlow Condensed' : 'DM Sans',
                        fontSize: isActive ? 'clamp(26px,2.8vw,36px)' : 14,
                        fontWeight: isActive ? 800 : 600,
                        color: isActive ? '#0d1117' : '#8fa4b4',
                        lineHeight: 1.1,
                        letterSpacing: isActive ? '-0.01em' : 0,
                        transition: 'all 0.4s ease',
                      }}>{s.title}</h3>

                      {isActive && (
                        <div style={{ marginTop:14, display:'flex', gap:12 }}>
                          <div style={{ width:2, borderRadius:1, background:'#b0c0cc', flexShrink:0, minHeight:60 }}/>
                          <p style={{
                            fontFamily:'DM Sans', fontSize:14, lineHeight:1.68,
                            color:'#6b7f8e', maxWidth:280,
                          }}>{s.body}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══ DESIGNED FOR / FEATURES ═══════════════════ */}
      <section style={{ background:'#fff', padding:'88px 64px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <h2 className="v-designed-h" style={{
            fontFamily:'Barlow Condensed', fontWeight:800,
            fontSize:'clamp(36px,5.5vw,70px)', letterSpacing:'-0.02em',
            lineHeight:1.0, color:'#0d1117', marginBottom:52, opacity:0
          }}>
            Designed for today's operations,<br />
            beyond legacy staffing workflows.
          </h2>

          <div className="v-feat-grid" style={{
            display:'grid', gridTemplateColumns:'repeat(4,1fr)',
            gap:1, background:'#e8e8e8',
            border:'1px solid #e8e8e8', borderRadius:16, overflow:'hidden'
          }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="v-feat" style={{
                background:'#fff', padding:'40px 32px',
                display:'flex', flexDirection:'column', opacity:0
              }}>
                <div style={{ marginBottom:22 }}>{f.icon}</div>
                <div style={{ fontFamily:'DM Sans', fontSize:16, fontWeight:700, color:'#0d1117', marginBottom:10, lineHeight:1.35 }}>{f.title}</div>
                <p style={{ fontFamily:'DM Sans', fontSize:13, lineHeight:1.68, color:'#6b7f8e' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NUCLEAR GRADE ═════════════════════════════ */}
      <section style={{ background:'#fff', padding:'60px 64px 88px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div className="v-nuc-img" style={{ borderRadius:20, overflow:'hidden', aspectRatio:'4/3', opacity:0 }}>
            <img src="https://images.unsplash.com/photo-1581094651181-35942459ef62?w=900&q=80" alt="Industrial workers" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          </div>
          <div className="v-nuc-txt" style={{ opacity:0 }}>
            <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(34px,4vw,56px)', letterSpacing:'-0.015em', lineHeight:1.05, color:'#0d1117', marginBottom:18 }}>
              Nuclear-grade<br />standards across<br />every site.
            </h2>
            <p style={{ fontFamily:'DM Sans', fontSize:15, color:'#6b7f8e', lineHeight:1.72, marginBottom:36, maxWidth:400 }}>
              Modeled on nuclear-grade environments, our process enforces badge compliance, protected timelines and zero-error tolerance.
            </p>
            <Link to="/our-industries" style={{ textDecoration:'none' }}>
              <button className="btn-dark">Explore Our Industries</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════ */}
      <section style={{ background:'#fff', padding:'60px 64px 88px', borderTop:'1px solid #f0f0f0' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
          <div className="v-faq-h" style={{ opacity:0 }}>
            <h2 style={{ fontFamily:'Barlow Condensed', fontWeight:800, fontSize:'clamp(32px,4vw,58px)', letterSpacing:'-0.015em', lineHeight:1.05, color:'#0d1117' }}>
              How we work and<br />how we deliver<br />industrial-grade<br />staffing.
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="v-faq-i" style={{ borderBottom:'1px solid #ececec', padding:'22px 0', opacity:0 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
                  <span style={{ fontFamily:'Barlow Condensed', fontSize:19, fontWeight:700, color:'#0d1117' }}>{faq.q}</span>
                  <span style={{
                    width:30, height:30, background:'#0d1117', color:'#fff',
                    borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, flexShrink:0,
                    transform: openFaq===i ? 'rotate(180deg)' : 'none', transition:'transform 0.3s'
                  }}>∨</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily:'DM Sans', fontSize:14, color:'#6b7f8e', lineHeight:1.7, marginTop:12 }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DARK CTA ══════════════════════════════════ */}
      <section style={{ background:'#080c18', color:'#fff', padding:'88px 64px 0', position:'relative', overflow:'hidden' }}>
        <div style={{
          position:'absolute', inset:0, opacity:0.04,
          backgroundImage:'radial-gradient(circle, #60a5fa 1px, transparent 1px)',
          backgroundSize:'32px 32px', pointerEvents:'none'
        }}/>
        <div style={{ position:'relative', maxWidth:1400, margin:'0 auto' }}>
          <h2 className="v-dcta-h" style={{
            fontFamily:'Barlow Condensed', fontWeight:800,
            fontSize:'clamp(40px,5.5vw,78px)', letterSpacing:'-0.02em',
            lineHeight:1.0, color:'#fff', maxWidth:900, marginBottom:40, opacity:0
          }}>
            Staff your outage with fast response,<br />and crews you can rely on.
          </h2>
          <div className="v-dcta-btn" style={{ opacity:0 }}>
            <Link to="/request-crews" style={{ textDecoration:'none' }}>
              <button className="btn-outline-white">Request Crews</button>
            </Link>
          </div>

          {/* Footer nav tiles */}
          <div style={{
            marginTop:60, display:'grid', gridTemplateColumns:'repeat(3,1fr)',
            borderTop:'1px solid rgba(255,255,255,0.1)'
          }}>
            {[
              { label:'Our Industries', to:'/our-industries' },
              { label:'Our Mission',    to:'/our-mission' },
              { label:'Apply',          to:'/apply' },
            ].map(item => (
              <Link key={item.label} to={item.to} style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'30px 0 30px', borderRight:'1px solid rgba(255,255,255,0.1)',
                textDecoration:'none', marginRight:40,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity='0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                <span style={{ fontFamily:'Barlow Condensed', fontSize:'clamp(20px,2vw,28px)', fontWeight:700, color:'#fff' }}>{item.label}</span>
                <span style={{ color:'#3b5bdb', fontSize:22 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wordmark footer */}
      <footer style={{ background:'#080c18' }}>
        <div style={{ padding:'0 40px' }}>
          <div style={{
            fontFamily:'Barlow Condensed', fontWeight:900,
            fontSize:'clamp(100px,18vw,240px)', lineHeight:0.88,
            letterSpacing:'-0.02em', color:'#fff',
            paddingTop:8, userSelect:'none'
          }}>VECTR</div>
        </div>
        <div style={{
          borderTop:'1px solid rgba(255,255,255,0.08)',
          padding:'18px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:16
        }}>
          <span style={{ fontFamily:'DM Sans', fontSize:12, color:'rgba(255,255,255,0.3)' }}>© 2026 Vectr, Inc.</span>
          <div style={{ display:'flex', gap:24 }}>
            {['Privacy Policy','ToS','Made by Utsubo'].map(l => (
              <a key={l} href="#" style={{ fontFamily:'DM Sans', fontSize:12, color:'rgba(255,255,255,0.3)', textDecoration:'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
