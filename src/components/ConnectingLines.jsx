import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ConnectingLines({ color = '#3b82f6', opacity = 0.3 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('.anim-path');
    paths.forEach((p, i) => {
      const len = p.getTotalLength ? p.getTotalLength() : 600;
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p, {
        strokeDashoffset: 0,
        duration: 2.8 + i * 0.5,
        delay: i * 0.25,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 2,
      });
    });
  }, []);

  return (
    <svg ref={svgRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity }}
      viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0"/>
          <stop offset="40%" stopColor={color} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
        <filter id="blur1"><feGaussianBlur stdDeviation="1.5"/></filter>
      </defs>

      {/* Main horizontal beam */}
      <path className="anim-path" d="M -20,460 C 200,440 500,455 780,448 S 1100,460 1420,450"
        stroke="url(#lg1)" strokeWidth="2" fill="none" filter="url(#blur1)"/>

      {/* Diagonal top-left */}
      <path className="anim-path" d="M 80,180 Q 300,320 520,400 T 880,480"
        stroke={color} strokeWidth="1" fill="none" strokeOpacity="0.45"/>

      {/* Right side vertical */}
      <path className="anim-path" d="M 950,80 Q 970,280 960,450 T 990,820"
        stroke={color} strokeWidth="0.8" fill="none" strokeOpacity="0.3"/>

      {/* Bottom gentle curve */}
      <path className="anim-path" d="M 0,640 Q 250,600 480,620 T 750,600"
        stroke="url(#lg1)" strokeWidth="1.2" fill="none"/>

      {/* Node dots */}
      {[[520,400],[780,448],[350,420],[650,310]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3" fill={color} opacity="0.7"/>
          <circle cx={cx} cy={cy} r="7" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3">
            <animate attributeName="r" values="3;14;3" dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
    </svg>
  );
}
