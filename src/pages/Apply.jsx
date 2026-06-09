import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Apply() {
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', trade:'', experience:'', state:'' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo('.ap-left',  { opacity:0, y:40 }, { opacity:1, y:0, duration:0.9, ease:'power3.out', delay:0.3 });
    gsap.fromTo('.ap-right', { opacity:0, x:40 }, { opacity:1, x:0, duration:0.9, ease:'power3.out', delay:0.5 });
  }, []);

  const inp = {
    width:'100%', padding:'12px 18px', border:'1px solid #e0e0e0',
    borderRadius:100, fontSize:14, fontFamily:'DM Sans', color:'#0d1117',
    outline:'none', background:'#fafafa', boxSizing:'border-box',
  };

  return (
    <div style={{ background:'linear-gradient(155deg,#f2f6fa 0%,#e6eff6 100%)', minHeight:'100vh' }}>
      <Navbar />
      <div style={{ maxWidth:1400, margin:'0 auto', padding:'120px 64px 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>

        <div className="ap-left" style={{ opacity:0 }}>
          <p style={{ fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'#9aacba', marginBottom:16 }}>Join the network</p>
          <h1 className="section-heading" style={{ fontSize:'clamp(36px,4.5vw,64px)', marginBottom:28 }}>
            Great projects rely<br />on great people.
          </h1>
          <p style={{ fontFamily:'DM Sans', fontSize:15, color:'#6b7f8e', lineHeight:1.7, marginBottom:40, maxWidth:400 }}>
            We continuously source top industry talent, from engineers to precision millwrights. So when work begins, the right team is already in place.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {[
              { h:'The search never stops', b:"We don't wait for an outage to find a crew. We are constantly scouting for top-tier tradespeople." },
              { h:'Skill is our currency', b:"We specialize in high-stakes environments. Precision isn't optional." },
              { h:'An open door for professionals', b:"Joining the Vectr Network puts your name at the top when high-value contracts open up." },
            ].map(v => (
              <div key={v.h} style={{ display:'flex', gap:12 }}>
                <div style={{ width:2, background:'#c8d8e4', borderRadius:1, flexShrink:0 }}/>
                <div>
                  <div style={{ fontFamily:'Barlow Condensed', fontSize:16, fontWeight:700, color:'#0d1117', marginBottom:4 }}>{v.h}</div>
                  <div style={{ fontFamily:'DM Sans', fontSize:13, color:'#6b7f8e' }}>{v.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ap-right" style={{ opacity:0, background:'#fff', borderRadius:24, padding:40, boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>
          <h2 className="section-heading" style={{ fontSize:28, marginBottom:28 }}>Apply Now To Vectr</h2>
          {!submitted ? (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {[['firstName','First Name',true],['lastName','Last Name',false]].map(([k,l,req]) => (
                  <div key={k}>
                    <label style={{ fontFamily:'DM Sans', fontSize:11, fontWeight:600, letterSpacing:'0.08em', color:'#374151', display:'block', marginBottom:5 }}>
                      {l}{req && <span style={{ color:'#ef4444' }}> *</span>}
                    </label>
                    <input value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} style={inp}/>
                  </div>
                ))}
              </div>
              {[['email','Email','email',true],['phone','Phone','tel',false],['trade','Primary Trade / Role','text',false,'e.g. Welder, Electrician'],['experience','Years of Experience','number',false],['state','State / Location','text',false,'e.g. Texas, Ohio']].map(([k,l,t,req,ph]) => (
                <div key={k}>
                  <label style={{ fontFamily:'DM Sans', fontSize:11, fontWeight:600, letterSpacing:'0.08em', color:'#374151', display:'block', marginBottom:5 }}>
                    {l}{req && <span style={{ color:'#ef4444' }}> *</span>}
                  </label>
                  <input type={t} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder={ph||''} style={inp}/>
                </div>
              ))}
              <button
                onClick={()=>{ if(form.firstName&&form.email) setSubmitted(true); }}
                className="btn-dark"
                style={{ width:'100%', justifyContent:'center', padding:'16px', marginTop:6, fontSize:11 }}
              >Apply Now To Vectr</button>
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'48px 0' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'#dcfce7', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                <span style={{ color:'#16a34a', fontSize:22 }}>✓</span>
              </div>
              <h3 className="section-heading" style={{ fontSize:26, marginBottom:12 }}>Application Received</h3>
              <p style={{ fontFamily:'DM Sans', fontSize:14, color:'#6b7f8e' }}>Welcome to the Vectr Network, {form.firstName}.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
