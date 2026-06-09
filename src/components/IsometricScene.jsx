import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * ONE large continuous scene — camera position driven by scrollProgress (0→1)
 * The world contains all 4 step scenes laid out along the X/Z axis
 * Camera pans smoothly as scroll increases
 */
export default function IsometricScene({ scrollProgress = 0 }) {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);
  const cameraRef = useRef(null);

  scrollRef.current = scrollProgress;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth, H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Camera — isometric-style perspective
    const camera = new THREE.PerspectiveCamera(28, W / H, 0.1, 800);
    cameraRef.current = camera;
    camera.position.set(22, 18, 22);
    camera.lookAt(2, 0, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xdce8f0, 1.5));
    const sun = new THREE.DirectionalLight(0xffffff, 2.0);
    sun.position.set(15, 28, 15);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xb8d0e8, 0.6);
    fill.position.set(-12, 8, -12);
    scene.add(fill);

    // ── helpers ──────────────────────────────────────
    const M = (c, rough = 0.6) =>
      new THREE.MeshStandardMaterial({ color: c, roughness: rough, metalness: 0.05 });
    const blueGlow = new THREE.MeshStandardMaterial({
      color: 0x60a5fa, emissive: 0x2563eb, emissiveIntensity: 1.0,
      transparent: true, opacity: 0.95, roughness: 0.2
    });
    const purpleM = new THREE.MeshStandardMaterial({
      color: 0x6d5fe0, emissive: 0x4338ca, emissiveIntensity: 0.5,
      roughness: 0.3, metalness: 0.1
    });
    const purpleDarkM = new THREE.MeshStandardMaterial({
      color: 0x5b50cc, emissive: 0x3730a3, emissiveIntensity: 0.4,
      roughness: 0.3, metalness: 0.1
    });

    const addBox = (w, h, d, mat, x, y, z, parent = scene) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y + h / 2, z);
      parent.add(m);
      return m;
    };

    // ── Ground plane (very large) ─────────────────────
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      M(0xd0dde8, 0.95)
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Subtle dot grid texture via small spheres
    for (let ix = -20; ix <= 30; ix += 1.1) {
      for (let iz = -10; iz <= 15; iz += 1.1) {
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 4, 4),
          new THREE.MeshStandardMaterial({ color: 0xb8ccd8, roughness: 0.9 })
        );
        dot.position.set(ix, 0.02, iz);
        scene.add(dot);
      }
    }

    // ══════════════════════════════════════════════════
    // SCENE 01 — Industrial complex  (X: 0..18, Z: -8..8)
    // ══════════════════════════════════════════════════
    const s1 = new THREE.Group();

    // Main building
    addBox(2.8, 4.2, 2.8, M(0xcdd9e3), 0, 0, 0, s1);
    addBox(1.5, 2.8, 2.0, M(0xbdcdd8), 2.5, 0, 0.2, s1);
    addBox(1.0, 0.6, 1.0, M(0xadbdcc), 0, 4.2, 0, s1);
    // Blue snowflake
    const emblem = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 10), blueGlow.clone());
    emblem.position.set(0, 2.2, 1.5);
    s1.add(emblem);

    // Red beams (4 parallel diagonal lines from top-left)
    const redM2 = M(0xef4444, 0.35);
    for (let i = 0; i < 4; i++) {
      const rb = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 8.5, 6), redM2);
      rb.rotation.z = Math.PI / 5.5;
      rb.position.set(-3.2 + i * 0.2, 6.5 - i * 0.5, -1.5 + i * 0.1);
      s1.add(rb);
    }

    // Cooling towers (right)
    const ct1 = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 2.2, 5.5, 18), M(0xccd8e2));
    ct1.position.set(10, 2.75, -5);
    s1.add(ct1);
    const ct2 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.55, 4.2, 18), M(0xbdcdd8));
    ct2.position.set(7.5, 2.1, -4.5);
    s1.add(ct2);

    // Container stacks
    const ccc = [M(0xcdd9e3), M(0xbdcdd8), M(0xadbdcc)];
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 3; c++)
        addBox(1.25, 0.72, 0.62, ccc[(r + c) % 3], c * 1.4 + 13, r * 0.75, -4, s1);
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        addBox(1.25, 0.72, 0.62, ccc[(r + c) % 3], c * 1.4 + 13, r * 0.75, -1.5, s1);

    // Wind turbines
    [[0, 0, 7], [2.2, 0, 8], [4.4, 0, 7], [6.6, 0, 8], [8.8, 0, 7], [-2, 0, 8]].forEach(([x, y, z]) => {
      const tg = new THREE.Group();
      addBox(0.13, 3.5, 0.13, M(0xbdcdd8), 0, 0, 0, tg);
      addBox(0.95, 0.07, 0.07, M(0xadbdcc), 0, 3.5, 0, tg);
      tg.position.set(x, y, z);
      s1.add(tg);
    });

    // Figures
    [[1, 0, 3], [3, 0, 4.5], [5, 0, 3.5]].forEach(([x, y, z]) => {
      const fg = new THREE.Group();
      addBox(0.18, 0.38, 0.12, M(0xbdcdd8), 0, 0.38, 0, fg);
      const fh = new THREE.Mesh(new THREE.SphereGeometry(0.11, 7, 7), M(0xcdd9e3));
      fh.position.set(0, 0.95, 0);
      fg.add(fh);
      fg.position.set(x, y, z);
      s1.add(fg);
    });

    s1.position.set(0, 0, 0);
    scene.add(s1);

    // ══════════════════════════════════════════════════
    // SCENE 02 — Industrial complex continued (X: 18..36, Z: -8..8)
    // (cooling towers left, warehouse/hangars center, more containers, factory right)
    // ══════════════════════════════════════════════════
    const s2 = new THREE.Group();

    // Cooling towers (far left of this zone, connecting from s1)
    const ct3 = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.4, 6, 18), M(0xccd8e2));
    ct3.position.set(0, 3, -5);
    s2.add(ct3);
    const ct4 = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.7, 4.5, 18), M(0xbdcdd8));
    ct4.position.set(-2.5, 2.25, -4.5);
    s2.add(ct4);

    // Large warehouse / hangar (arched roof)
    const wh = new THREE.Group();
    addBox(8, 2, 5.5, M(0xcdd9e3), 0, 0, 0, wh);
    // Arched roof (approximated with rotated boxes)
    for (let i = 0; i < 5; i++) {
      addBox(8.2, 0.7, 0.55, M(0xbdcdd8), 0, 2.0, -2.2 + i * 1.1, wh);
    }
    wh.position.set(5, 0, -4);
    s2.add(wh);

    // Smaller buildings scattered
    addBox(2.5, 1.8, 2.0, M(0xcdd9e3), 10, 0, -2, s2);
    addBox(1.5, 1.2, 1.5, M(0xbdcdd8), 12, 0, -1.5, s2);
    addBox(1.0, 2.8, 1.0, M(0xadbdcc), 9, 0, 0, s2); // tower

    // Container rows
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++)
        addBox(1.25, 0.72, 0.62, ccc[(r + c) % 3], c * 1.4 + 2, r * 0.75, 2, s2);

    // Factory complex right side (matches frame_3.0s)
    const fac = new THREE.Group();
    addBox(3, 3.2, 3, M(0xcdd9e3), 0, 0, 0, fac);
    addBox(1.5, 2.2, 1.5, M(0xbdcdd8), 2.5, 0, 0, fac);
    addBox(1.0, 0.6, 1.0, M(0xadbdcc), 0, 3.2, 0, fac);
    // Smokestacks
    const sm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, 3, 10), M(0xbdcdd8));
    sm1.position.set(-0.3, 2.7, -1.2);
    fac.add(sm1);
    const sm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 2.4, 10), M(0xadbdcc));
    sm2.position.set(0.8, 2.5, -0.8);
    fac.add(sm2);
    fac.position.set(14, 0, -3);
    s2.add(fac);

    // Crane/tower
    const crane = new THREE.Group();
    addBox(0.4, 4.5, 0.4, M(0xbdcdd8), 0, 0, 0, crane);
    addBox(0.3, 0.3, 2.5, M(0xadbdcc), 0, 4.5, 1.2, crane);
    crane.position.set(6, 0, -6.5);
    s2.add(crane);

    // Figures
    [[3, 0, 1], [8, 0, 0.5], [11, 0, -4.5]].forEach(([x, y, z]) => {
      const fg = new THREE.Group();
      addBox(0.18, 0.38, 0.12, M(0xbdcdd8), 0, 0.38, 0, fg);
      const fh = new THREE.Mesh(new THREE.SphereGeometry(0.11, 7, 7), M(0xcdd9e3));
      fh.position.set(0, 0.95, 0); fg.add(fh);
      fg.position.set(x, y, z);
      s2.add(fg);
    });

    s2.position.set(20, 0, 0);
    scene.add(s2);

    // ══════════════════════════════════════════════════
    // SCENE 03 — Large grid of rounded tiles  (X: 36..60)
    // Isometric view of a 12×12 grid of pillowed-top blocks
    // One highlighted taller block with figure
    // Blue glow burst from center
    // ══════════════════════════════════════════════════
    const s3 = new THREE.Group();
    const tileSize = 1.15;
    const tileGap  = 0.12;
    const tilePitch = tileSize + tileGap;
    const gridCols = 12, gridRows = 12;
    const tileNorm = M(0xdce8f4, 0.55);

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const isCenter = (r === 5 && c === 5);
        const isNear = (Math.abs(r - 5) <= 1 && Math.abs(c - 5) <= 1);
        const h = isCenter ? 0.7 : isNear ? 0.35 : 0.22;

        // Rounded-top tile (box + top sphere-subdiv approximation with a taller box)
        const mat = isCenter
          ? M(0xeef2f6, 0.35)
          : isNear ? M(0xe4ecf4, 0.5) : tileNorm;

        const tile = new THREE.Mesh(
          new THREE.BoxGeometry(tileSize, h, tileSize),
          mat
        );
        tile.position.set(c * tilePitch, h / 2, r * tilePitch);
        s3.add(tile);

        if (isCenter) {
          // Standing figure on top
          const fg = new THREE.Group();
          addBox(0.20, 0.42, 0.14, M(0x8ba8c0), 0, 0.42, 0, fg);
          const fh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), M(0xaabdcc));
          fh.position.set(0, 1.0, 0);
          fg.add(fh);
          fg.position.set(c * tilePitch, h, r * tilePitch);
          s3.add(fg);

          // Blue glow point light at center
          const gLight = new THREE.PointLight(0x60a5fa, 4.0, 8);
          gLight.position.set(c * tilePitch, h + 1, r * tilePitch);
          s3.add(gLight);
        }
      }
    }

    // Center the grid nicely
    const gw = (gridCols - 1) * tilePitch;
    const gd = (gridRows - 1) * tilePitch;
    s3.position.set(40 - gw / 2, 0, -gd / 2 - 2);
    scene.add(s3);

    // ══════════════════════════════════════════════════
    // SCENE 04 — Arrow + diamonds + dot grid  (X: 60..80)
    // Purple/indigo 3D chevron arrow pointing right
    // Floating nested diamond shapes around it
    // Large teal dot grid on ground
    // ══════════════════════════════════════════════════
    const s4 = new THREE.Group();

    // Teal dots on ground (override)
    for (let ix = -8; ix <= 8; ix += 0.9) {
      for (let iz = -8; iz <= 8; iz += 0.9) {
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 5, 5),
          new THREE.MeshStandardMaterial({ color: 0x7dd3c4, emissive: 0x2dd4bf, emissiveIntensity: 0.4, transparent: true, opacity: 0.7 })
        );
        dot.position.set(ix, 0.06, iz);
        s4.add(dot);
      }
    }

    // Chevron arrow (made from 3 boxes arranged like ">")
    const arrowGrp = new THREE.Group();
    // Top arm
    const arm1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.1, 1.0), purpleM);
    arm1.rotation.y = -Math.PI / 4;
    arm1.position.set(0.8, 0.55, -1.8);
    arrowGrp.add(arm1);
    // Bottom arm
    const arm2 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.1, 1.0), purpleM);
    arm2.rotation.y = Math.PI / 4;
    arm2.position.set(0.8, 0.55, 1.8);
    arrowGrp.add(arm2);
    // Middle connector
    addBox(2.2, 1.1, 1.0, purpleDarkM, -0.5, 0, 0, arrowGrp);

    arrowGrp.position.set(0, 0.5, 0);
    s4.add(arrowGrp);

    // Nested diamond shapes (layered squares rotated 45°)
    const makeDiamondStack = (ox, oy, oz, baseSize) => {
      const dg = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const s = baseSize * (1 - i * 0.18);
        const tile = new THREE.Mesh(
          new THREE.BoxGeometry(s, 0.14 - i * 0.015, s),
          i % 2 === 0 ? purpleM : purpleDarkM
        );
        tile.rotation.y = Math.PI / 4;
        tile.position.y = i * 0.1;
        dg.add(tile);
      }
      dg.position.set(ox, oy, oz);
      return dg;
    };

    s4.add(makeDiamondStack(6, 1.5, -4.5, 2.2));   // top-right big
    s4.add(makeDiamondStack(-2, 2.5, -5, 1.4));     // top-left medium
    s4.add(makeDiamondStack(7.5, 0.8, 2.5, 1.6));   // bottom-right
    s4.add(makeDiamondStack(4, 3.0, 3.5, 1.0));     // bottom-mid small

    s4.position.set(64, 0, -4);
    scene.add(s4);

    // ══════════════════════════════════════════════════
    // BLUE BEAM — curved arc traveling across the whole scene
    // Implemented as a TubeGeometry along a CatmullRomCurve3
    // ══════════════════════════════════════════════════
    const beamPoints = [
      new THREE.Vector3(-2, 0.6, 2),      // start (before s1)
      new THREE.Vector3(5, 0.6, 0),       // through s1 building
      new THREE.Vector3(12, 0.5, 1),      // curve down across s1
      new THREE.Vector3(20, 0.5, 0.5),    // entering s2
      new THREE.Vector3(28, 0.5, 0.3),    // through s2 warehouse
      new THREE.Vector3(36, 0.45, 0),     // between s2 and s3
      new THREE.Vector3(44, 0.4, 0),      // through s3 grid
      new THREE.Vector3(52, 0.4, 0),      // exiting s3
      new THREE.Vector3(62, 0.45, 0),     // entering s4
      new THREE.Vector3(70, 0.5, 0),      // through s4 arrow
    ];
    const beamCurve = new THREE.CatmullRomCurve3(beamPoints);
    const beamGeo   = new THREE.TubeGeometry(beamCurve, 120, 0.08, 8, false);
    const beamMat   = new THREE.MeshStandardMaterial({
      color: 0x60a5fa, emissive: 0x2563eb, emissiveIntensity: 1.4,
      transparent: true, opacity: 0.92, roughness: 0.1
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    scene.add(beamMesh);

    // Beam glow halo (slightly thicker, more transparent)
    const beamGlowMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd, emissive: 0x3b82f6, emissiveIntensity: 0.8,
      transparent: true, opacity: 0.3, roughness: 0.1
    });
    const beamGlowMesh = new THREE.Mesh(
      new THREE.TubeGeometry(beamCurve, 80, 0.22, 8, false),
      beamGlowMat
    );
    scene.add(beamGlowMesh);

    // ══════════════════════════════════════════════════
    // Camera waypoints for each step (0-3)
    // ══════════════════════════════════════════════════
    const camWaypoints = [
      // Step 0 — looking at s1 (original website's step 01 view)
      { pos: new THREE.Vector3(20, 16, 22),  look: new THREE.Vector3(2, 0, -1) },
      // Step 1 — looking at s2 (warehouse scene)
      { pos: new THREE.Vector3(36, 14, 20),  look: new THREE.Vector3(24, 0, -2) },
      // Step 2 — looking at s3 from above-front (tile grid)
      { pos: new THREE.Vector3(48, 16, 18),  look: new THREE.Vector3(40, 0, 4) },
      // Step 3 — looking at s4 (arrow/diamonds)
      { pos: new THREE.Vector3(70, 14, 18),  look: new THREE.Vector3(64, 0, -2) },
    ];

    // ── Animation loop ────────────────────────────────
    let t = 0, rafId;
    const tmpVec = new THREE.Vector3();
    const tmpLook = new THREE.Vector3();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.012;

      // Beam pulse
      beamMat.emissiveIntensity   = 1.2 + Math.sin(t * 3) * 0.4;
      beamMat.opacity             = 0.85 + Math.sin(t * 2.5) * 0.1;
      beamGlowMat.opacity         = 0.2 + Math.sin(t * 2) * 0.1;

      // Emblem glow pulse
      emblem.material.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.4;

      // Diamonds float
      s4.children.forEach((child, i) => {
        if (child.isGroup) child.position.y += Math.sin(t * 1.5 + i) * 0.003;
      });

      // S3 tiles glow ripple (center light pulse)
      s3.children.forEach(ch => {
        if (ch.isPointLight) {
          ch.intensity = 3.5 + Math.sin(t * 2.5) * 1.5;
        }
      });

      // Camera lerp based on scroll
      const sc = Math.max(0, Math.min(1, scrollRef.current));
      const seg = sc * 3; // 0→3
      const segIdx = Math.min(Math.floor(seg), 2);
      const alpha  = seg - segIdx;
      const wpA = camWaypoints[segIdx];
      const wpB = camWaypoints[Math.min(segIdx + 1, 3)];

      tmpVec.lerpVectors(wpA.pos, wpB.pos, alpha);
      tmpLook.lerpVectors(wpA.look, wpB.look, alpha);

      camera.position.lerp(tmpVec, 0.06);
      const currentLook = new THREE.Vector3();
      currentLook.lerpVectors(wpA.look, wpB.look, alpha);
      camera.lookAt(currentLook);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const W = mount.clientWidth, H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
