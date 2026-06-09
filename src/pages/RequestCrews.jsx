import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RequestCrews() {
  const [form, setForm] = useState({ firstName:'', lastName:'', company:'', email:'', phone:'', industry:'Nuclear' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo('.rc-title', { opacity:0, y:40 }, { opacity:1, y:0, duration:0.9, ease:'power3.out', delay:0.3 });
    gsap.fromTo('.rc-form',  { opacity:0, x:40 }, { opacity:1, x:0, duration:0.9, ease:'power3.out', delay:0.5 });
  }, []);

  const inp = {
    width:'100%', padding:'12px 18px', border:'1px solid #e0e0e0',
    borderRadius:100, fontSize:14, fontFamily:'DM Sans', color:'#0d1117',
    outline:'none', background:'#fafafa', boxSizing:'border-box',
  };

  return (
    <div style={{ background:'#fff', minHeight:'100vh' }}>
      <Navbar />
      <div style={{ maxWidth:1400, margin:'0 auto', padding:'120px 64px 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>

        <div className="rc-title" style={{ opacity:0, paddingTop:16 }}>
          <h1 className="section-heading" style={{ fontSize:'clamp(36px,4.5vw,64px)', marginBottom:40 }}>Request Crews</h1>
          <p style={{ fontFamily:'DM Sans', fontSize:15, color:'#6b7f8e', lineHeight:1.8, marginBottom:12 }}>
            Critical outages don't wait.<br />
            Contact Vectr 24/7 to mobilize a specialized team to your site immediately.
          </p>
          <p style={{ fontFamily:'DM Sans', fontSize:15, color:'#6b7f8e', lineHeight:1.8 }}>
            Tell us your scope; we'll handle the scale.
          </p>
        </div>

        <div className="rc-form" style={{ opacity:0 }}>
          {!submitted ? (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {[['firstName','First Name',true],['lastName','Last Name',true]].map(([k,l,req]) => (
                  <div key={k}>
                    <label style={{ fontFamily:'DM Sans', fontSize:11, fontWeight:600, letterSpacing:'0.08em', color:'#374151', display:'block', marginBottom:6 }}>
                      {l} {req && <span style={{ color:'#ef4444' }}>*</span>}
                    </label>
                    <input value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} style={inp}/>
                  </div>
                ))}
              </div>

              {[['company','Company Name',true,'text'],['email','Work email',true,'email'],['phone','Contact Number',false,'tel']].map(([k,l,req,t]) => (
                <div key={k}>
                  <label style={{ fontFamily:'DM Sans', fontSize:11, fontWeight:600, letterSpacing:'0.08em', color:'#374151', display:'block', marginBottom:6 }}>
                    {l} {req && <span style={{ color:'#ef4444' }}>*</span>}
                  </label>
                  <input type={t} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} style={inp}/>
                </div>
              ))}

              <div>
                <label style={{ fontFamily:'DM Sans', fontSize:11, fontWeight:600, letterSpacing:'0.08em', color:'#374151', display:'block', marginBottom:10 }}>
                  Industry <span style={{ color:'#ef4444' }}>*</span>
                </label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'10px 20px' }}>
                  {['Nuclear','Gas','Data Centers','Semiconductors','Other'].map(ind => (
                    <label key={ind} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
                      <div onClick={()=>setForm(p=>({...p,industry:ind}))} style={{
                        width:16, height:16, borderRadius:'50%', border:`2px solid ${form.industry===ind?'#0d1117':'#ccc'}`,
                        background: form.industry===ind?'#0d1117':'transparent',
                        display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0,
                      }}>
                        {form.industry===ind && <div style={{ width:5, height:5, borderRadius:'50%', background:'#fff' }}/>}
                      </div>
                      <span style={{ fontFamily:'DM Sans', fontSize:13, color:'#374151' }}>{ind}</span>
                    </label>
                  ))}
                </div>
              </div>

              <p style={{ fontFamily:'DM Sans', fontSize:11, color:'#9ca3af', lineHeight:1.6 }}>
                By submitting, you agree that Vectr collects the information in this form to respond to your staffing inquiry. We do not sell or share it for advertising.{' '}
                <a href="#" style={{ textDecoration:'underline' }}>See our Privacy Policy.</a>
              </p>

              <button
                onClick={()=>{ if(form.firstName&&form.email&&form.company) setSubmitted(true); }}
                className="btn-dark"
                style={{ width:'100%', justifyContent:'center', padding:'16px', fontSize:11 }}
              >Submit</button>
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'#dcfce7', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                <span style={{ color:'#16a34a', fontSize:22 }}>✓</span>
              </div>
              <h3 className="section-heading" style={{ fontSize:28, marginBottom:12 }}>Request Submitted</h3>
              <p style={{ fontFamily:'DM Sans', fontSize:14, color:'#6b7f8e' }}>Thank you, {form.firstName}. Our team will contact you within the hour.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
