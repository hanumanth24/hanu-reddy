import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const NODE_COUNT = 30;
const CONNECT_DIST = 2.4;
// pre-allocate worst-case edge buffer: N*(N-1)/2 pairs × 2 pts × 3 floats
const MAX_EDGE_FLOATS = NODE_COUNT * (NODE_COUNT - 1) * 3;
const edgeBuf = new Float32Array(MAX_EDGE_FLOATS);

export default function SkillNetCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      canvas.style.display = "none";
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 7;

    const onResize = () => {
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();

    const nodePos  = [];
    const nodeDrift = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePos.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 7,
        z: (Math.random() - 0.5) * 3,
      });
      nodeDrift.push({
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
      });
    }

    const nPos = new Float32Array(NODE_COUNT * 3);
    nodePos.forEach((p, i) => { nPos[i*3]=p.x; nPos[i*3+1]=p.y; nPos[i*3+2]=p.z; });
    const nGeo = new THREE.BufferGeometry();
    nGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));
    const nMat = new THREE.PointsMaterial({
      color: 0x4ade80,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
    });
    scene.add(new THREE.Points(nGeo, nMat));
    gsap.to(nMat, { opacity: 0.9, duration: 1.2, delay: 0.4 });

    // Edge geometry with pre-allocated buffer — avoids GC churn
    const eGeo = new THREE.BufferGeometry();
    const edgeAttr = new THREE.BufferAttribute(edgeBuf, 3);
    edgeAttr.setUsage(THREE.DynamicDrawUsage);
    eGeo.setAttribute("position", edgeAttr);
    eGeo.setDrawRange(0, 0);
    const eMat = new THREE.LineBasicMaterial({ color: 0x166534, transparent: true, opacity: 0 });
    scene.add(new THREE.LineSegments(eGeo, eMat));
    gsap.to(eMat, { opacity: 0.4, duration: 1.2, delay: 0.7 });

    const accentIdx = Array.from({ length: 8 }, (_, i) => Math.floor(i * NODE_COUNT / 8));
    const accPos = new Float32Array(accentIdx.length * 3);
    accentIdx.forEach((ni, i) => {
      accPos[i*3] = nodePos[ni].x; accPos[i*3+1] = nodePos[ni].y; accPos[i*3+2] = nodePos[ni].z;
    });
    const accGeo = new THREE.BufferGeometry();
    accGeo.setAttribute("position", new THREE.BufferAttribute(accPos, 3));
    const accMat = new THREE.PointsMaterial({ color: 0xE5FE40, size: 0.14, transparent: true, opacity: 0 });
    scene.add(new THREE.Points(accGeo, accMat));
    gsap.to(accMat, { opacity: 1, duration: 1, delay: 1.0 });

    const camXY = { x: 0, y: 0 };
    let frame = 0;
    let raf;
    let running = false;

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      frame++;

      // Drift nodes
      nodePos.forEach((p, i) => {
        p.x += nodeDrift[i].vx;
        p.y += nodeDrift[i].vy;
        if (Math.abs(p.x) > 6.5) nodeDrift[i].vx *= -1;
        if (Math.abs(p.y) > 4.0) nodeDrift[i].vy *= -1;
        nPos[i*3] = p.x; nPos[i*3+1] = p.y; nPos[i*3+2] = p.z;
      });
      nGeo.attributes.position.needsUpdate = true;

      // Recompute edges every 12 frames — write into pre-allocated buffer, no allocation
      if (frame % 12 === 0) {
        let idx = 0;
        for (let i = 0; i < NODE_COUNT; i++) {
          for (let j = i + 1; j < NODE_COUNT; j++) {
            const dx = nodePos[i].x - nodePos[j].x;
            const dy = nodePos[i].y - nodePos[j].y;
            const dz = nodePos[i].z - nodePos[j].z;
            if (dx*dx + dy*dy + dz*dz < CONNECT_DIST * CONNECT_DIST) {
              edgeBuf[idx++] = nodePos[i].x; edgeBuf[idx++] = nodePos[i].y; edgeBuf[idx++] = nodePos[i].z;
              edgeBuf[idx++] = nodePos[j].x; edgeBuf[idx++] = nodePos[j].y; edgeBuf[idx++] = nodePos[j].z;
            }
          }
        }
        eGeo.setDrawRange(0, idx / 3);
        edgeAttr.needsUpdate = true;
      }

      // Update accent positions
      accentIdx.forEach((ni, i) => {
        accPos[i*3] = nodePos[ni].x; accPos[i*3+1] = nodePos[ni].y; accPos[i*3+2] = nodePos[ni].z;
      });
      accGeo.attributes.position.needsUpdate = true;

      camXY.x += (Math.sin(performance.now() * 0.0001) * 0.3 - camXY.x) * 0.01;
      camXY.y += (Math.cos(performance.now() * 0.00007) * 0.15 - camXY.y) * 0.01;
      camera.position.x = camXY.x;
      camera.position.y = camXY.y;

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
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
