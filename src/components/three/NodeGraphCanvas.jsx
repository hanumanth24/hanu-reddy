import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const NODES = [
  { id: "aep",       label: "AEP",           sub: "EXPERIENCE PLATFORM",  x:  0.0,  y:  0.3,  color: "#E5FE40", r: 0.30, primary: true },
  { id: "aem",       label: "AEM CLOUD",     sub: "CONTENT HUB",          x: -3.2,  y:  0.3,  color: "#E5FE40", r: 0.22 },
  { id: "rtcdp",     label: "RT-CDP",        sub: "REAL-TIME PROFILES",   x:  2.2,  y:  2.0,  color: "#a78bfa", r: 0.20 },
  { id: "ajo",       label: "AJO",           sub: "JOURNEY OPTIMIZER",    x:  4.0,  y:  0.3,  color: "#ff9a3c", r: 0.20 },
  { id: "cja",       label: "CJA",           sub: "JOURNEY ANALYTICS",    x:  5.4,  y:  2.0,  color: "#60a5fa", r: 0.18 },
  { id: "eds",       label: "EDGE DELIVERY", sub: "CDN · <200ms TTFB",    x: -5.6,  y:  0.3,  color: "#4ade80", r: 0.18 },
  { id: "analytics", label: "ANALYTICS",     sub: "MEASUREMENT LAYER",    x:  1.5,  y: -2.3,  color: "#f87171", r: 0.16 },
  { id: "launch",    label: "LAUNCH",        sub: "TAG MANAGEMENT",       x:  4.0,  y: -2.3,  color: "#facc15", r: 0.15 },
];

// Directed edges: from → to
const EDGES = [
  { from: "aem",       to: "aep",       color: "#E5FE40", label: "CONTENT DATA" },
  { from: "aep",       to: "rtcdp",     color: "#a78bfa", label: "PROFILES" },
  { from: "rtcdp",     to: "ajo",       color: "#a78bfa", label: "ACTIVATION" },
  { from: "aep",       to: "cja",       color: "#60a5fa", label: "DATASETS" },
  { from: "aem",       to: "eds",       color: "#4ade80", label: "DELIVERY" },
  { from: "analytics", to: "aep",       color: "#f87171", label: "EVENTS" },
  { from: "launch",    to: "aep",       color: "#facc15", label: "WEB DATA" },
  { from: "ajo",       to: "analytics", color: "#ff9a3c", label: "OUTCOMES" },
];

const EDGE_SEGS = 40;
// Node bounding box + padding — used to fit camera for any aspect ratio
const CONTENT_W = 13.0; // x range -5.6..5.4 + 1.0 each side
const CONTENT_H = 6.0;  // y range -2.3..2.0 + ~0.85 each side

function makeNodeLabel(text, sub, color) {
  const W = 280, H = 68;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");
  ctx.font = "bold 20px monospace";
  ctx.fillStyle = color;
  ctx.fillText(text, 4, 26);
  ctx.font = "10px monospace";
  ctx.fillStyle = "#52525b";
  ctx.fillText(sub, 4, 48);
  const tex = new THREE.CanvasTexture(cv);
  tex.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false });
  const spr = new THREE.Sprite(mat);
  spr.scale.set(2.1, 0.51, 1);
  return spr;
}

function makeEdgeLabel(text, color) {
  const W = 192, H = 32;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#1f1f22";
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
  ctx.font = "9px monospace";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, W / 2, 21);
  const tex = new THREE.CanvasTexture(cv);
  tex.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false });
  const spr = new THREE.Sprite(mat);
  spr.scale.set(1.2, 0.2, 1);
  return spr;
}

export default function NodeGraphCanvas({ mouse }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    // Fit frustum to node bounding box — works at any aspect ratio (mobile/desktop)
    const getFrustumH = (w, h) => Math.max(CONTENT_H, CONTENT_W / (w / h)) * 1.06;

    const buildOrtho = () => {
      const w = parent.clientWidth || 1;
      const h = parent.clientHeight || 1;
      const a = w / h;
      const vh = getFrustumH(w, h);
      const cam = new THREE.OrthographicCamera(
        -vh * a / 2, vh * a / 2,
        vh / 2, -vh / 2,
        0.1, 100
      );
      cam.position.z = 10;
      return cam;
    };
    let camera = buildOrtho();

    const onResize = () => {
      const w = parent.clientWidth || 1;
      const h = parent.clientHeight || 1;
      renderer.setSize(w, h);
      const a = w / h;
      const vh = getFrustumH(w, h);
      camera.left   = -vh * a / 2;
      camera.right  =  vh * a / 2;
      camera.top    =  vh / 2;
      camera.bottom = -vh / 2;
      camera.updateProjectionMatrix();
    };
    onResize();

    const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

    // Stars
    {
      const count = 280;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 24;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = -3;
      }
      const sg = new THREE.BufferGeometry();
      sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0x1e1e24, size: 0.04 })));
    }

    const nodeMeshes = [];
    const nodeLabelSprites = [];

    NODES.forEach((n, i) => {
      // Glow halo
      const glowGeo = new THREE.CircleGeometry(n.r * 3.2, 32);
      const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(n.color), transparent: true, opacity: 0 });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.set(n.x, n.y, -0.1);
      glow.scale.set(0, 0, 1);
      scene.add(glow);

      // Filled circle
      const geo = new THREE.CircleGeometry(n.r, 48);
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(n.color) });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(n.x, n.y, 0);
      mesh.scale.set(0, 0, 1);
      scene.add(mesh);

      // Rotating outer ring for primary node (AEP)
      let ring = null;
      if (n.primary) {
        const rGeo = new THREE.RingGeometry(n.r * 1.6, n.r * 1.76, 48);
        const rMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(n.color), transparent: true, opacity: 0.35, side: THREE.DoubleSide });
        ring = new THREE.Mesh(rGeo, rMat);
        ring.position.set(n.x, n.y, 0.01);
        ring.scale.set(0, 0, 1);
        scene.add(ring);
      }

      const label = makeNodeLabel(n.label, n.sub, n.color);
      label.position.set(n.x, n.y - n.r - 0.5, 0.05);
      scene.add(label);
      nodeLabelSprites.push(label);

      nodeMeshes.push({ mesh, glow, ring, n });
    });

    const edgeGeos = [];
    const edgeLabelSprites = [];
    const particles = [];

    EDGES.forEach(({ from, to, color, label }, ei) => {
      const nf = nodeMap[from], nt = nodeMap[to];
      const dx = nt.x - nf.x, dy = nt.y - nf.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const ux = dx / len, uy = dy / len;

      const sx = nf.x + ux * (nf.r + 0.04);
      const sy = nf.y + uy * (nf.r + 0.04);
      const ex = nt.x - ux * (nt.r + 0.14);
      const ey = nt.y - uy * (nt.r + 0.14);

      // Edge line with draw-in via drawRange
      const pts = Array.from({ length: EDGE_SEGS }, (_, j) => {
        const t = j / (EDGE_SEGS - 1);
        return new THREE.Vector3(sx + (ex - sx) * t, sy + (ey - sy) * t, -0.05);
      });
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      const lineMat = new THREE.LineBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.28 });
      scene.add(new THREE.Line(geo, lineMat));
      edgeGeos.push(geo);

      // Arrowhead triangle at destination
      const tip = new THREE.Vector2(nt.x - ux * (nt.r + 0.02), nt.y - uy * (nt.r + 0.02));
      const base = new THREE.Vector2(tip.x - ux * 0.22, tip.y - uy * 0.22);
      const perp = new THREE.Vector2(-uy, ux).multiplyScalar(0.085);
      const aVerts = new Float32Array([
        tip.x, tip.y, 0.01,
        base.x + perp.x, base.y + perp.y, 0.01,
        base.x - perp.x, base.y - perp.y, 0.01,
      ]);
      const aGeo = new THREE.BufferGeometry();
      aGeo.setAttribute("position", new THREE.BufferAttribute(aVerts, 3));
      const aMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0 });
      scene.add(new THREE.Mesh(aGeo, aMat));

      // Edge label at midpoint, offset perpendicularly
      const midX = (sx + ex) / 2;
      const midY = (sy + ey) / 2;
      const eLabelSpr = makeEdgeLabel(label, color);
      eLabelSpr.position.set(midX + (-uy) * 0.38, midY + ux * 0.38, 0.1);
      scene.add(eLabelSpr);
      edgeLabelSprites.push(eLabelSpr);

      // 2 particles per edge, staggered
      for (let p = 0; p < 2; p++) {
        const pGeo = new THREE.BufferGeometry();
        const pArr = new Float32Array([sx, sy, 0.15]);
        pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3));
        const pMat = new THREE.PointsMaterial({ color: new THREE.Color(color), size: 0.1, sizeAttenuation: true, transparent: true, opacity: 0 });
        const pts2 = new THREE.Points(pGeo, pMat);
        scene.add(pts2);

        const proxy = { t: 0 };
        const updateParticle = () => {
          const arr = pGeo.attributes.position.array;
          arr[0] = sx + (ex - sx) * proxy.t;
          arr[1] = sy + (ey - sy) * proxy.t;
          pGeo.attributes.position.needsUpdate = true;
        };

        const tween = gsap.to(proxy, {
          t: 1,
          duration: 2.0 + Math.random() * 1.5,
          ease: "none",
          repeat: -1,
          delay: p * 1.1 + ei * 0.15 + Math.random() * 0.4,
          onUpdate: updateParticle,
        });

        particles.push({ pts: pts2, tween, pGeo, pMat });

        // Reveal arrowhead after edge fully drawn
        gsap.to(aMat, { opacity: 0.85, duration: 0.3, delay: 0.8 + 0.9 + ei * 0.1 + 1.0 });

        // Reveal particles
        gsap.to(pMat, { opacity: 1, duration: 0.4, delay: 0.8 + 2.0 + (ei * 2 + p) * 0.06 });
      }
    });

    // Entrance — nodes
    const D0 = 0.3;
    NODES.forEach((n, i) => {
      const { mesh, glow, ring } = nodeMeshes[i];
      const d = D0 + i * 0.12;
      gsap.to(mesh.scale, { x: 1, y: 1, duration: 0.6, ease: "back.out(2)", delay: d });
      gsap.to(glow.scale, { x: 1, y: 1, duration: 0.8, ease: "back.out(1.5)", delay: d });
      gsap.to(glow.material, { opacity: 0.08, duration: 0.8, delay: d });
      if (ring) gsap.to(ring.scale, { x: 1, y: 1, duration: 0.6, ease: "back.out(2)", delay: d });
      gsap.to(nodeLabelSprites[i].material, { opacity: 1, duration: 0.5, delay: d + 0.3 });
    });

    // Entrance — edges draw in
    edgeGeos.forEach((geo, i) => {
      const proxy = { v: 0 };
      gsap.to(proxy, {
        v: EDGE_SEGS,
        duration: 0.9,
        ease: "expo.out",
        delay: D0 + 0.8 + i * 0.1,
        onUpdate() { geo.setDrawRange(0, Math.round(proxy.v)); },
      });
    });

    // Entrance — edge labels
    edgeLabelSprites.forEach((spr, i) => {
      gsap.to(spr.material, { opacity: 1, duration: 0.4, delay: D0 + 1.8 + i * 0.1 });
    });

    // Camera drift on mouse
    const camXY = { x: 0, y: 0 };
    let raf;
    let running = false;
    const clock = new THREE.Clock();

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      if (mouse?.current) {
        camXY.x += (mouse.current.x * 0.8 - camXY.x) * 0.03;
        camXY.y += (mouse.current.y * 0.35 - camXY.y) * 0.03;
      }
      camera.position.x = camXY.x;
      camera.position.y = camXY.y;

      // Pulse AEP glow + rotate ring
      const aep = nodeMeshes[0];
      if (aep) {
        aep.glow.material.opacity = 0.06 + Math.sin(t * 1.3) * 0.04;
        if (aep.ring) {
          aep.ring.rotation.z = t * 0.28;
          aep.ring.material.opacity = 0.22 + Math.sin(t * 0.95) * 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; tick(); }
      else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    }, { rootMargin: "100px" });
    io.observe(canvas);
    running = true;
    tick();

    const ro = new ResizeObserver(onResize);
    ro.observe(parent);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      particles.forEach((p) => p.tween.kill());
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
