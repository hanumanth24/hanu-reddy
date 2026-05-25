import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const NODE_COUNT = 55;
const CONNECT_DIST = 2.4;

export default function SkillNetCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
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

    // Node positions and drift velocities
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

    // Node points
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

    // Edge lines between nearby nodes
    let edgePts = [];
    const computeEdges = () => {
      edgePts = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodePos[i].x - nodePos[j].x;
          const dy = nodePos[i].y - nodePos[j].y;
          const dz = nodePos[i].z - nodePos[j].z;
          if (Math.sqrt(dx*dx + dy*dy + dz*dz) < CONNECT_DIST) {
            edgePts.push(nodePos[i].x, nodePos[i].y, nodePos[i].z);
            edgePts.push(nodePos[j].x, nodePos[j].y, nodePos[j].z);
          }
        }
      }
      return edgePts;
    };
    computeEdges();

    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edgePts), 3));
    const eMat = new THREE.LineBasicMaterial({ color: 0x166534, transparent: true, opacity: 0 });
    const eLines = new THREE.LineSegments(eGeo, eMat);
    scene.add(eLines);
    gsap.to(eMat, { opacity: 0.4, duration: 1.2, delay: 0.7 });

    // Accent highlight nodes (larger, brighter)
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

    // Camera drift
    const camXY = { x: 0, y: 0 };
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Drift nodes
      nodePos.forEach((p, i) => {
        p.x += nodeDrift[i].vx;
        p.y += nodeDrift[i].vy;
        if (Math.abs(p.x) > 6.5) nodeDrift[i].vx *= -1;
        if (Math.abs(p.y) > 4.0) nodeDrift[i].vy *= -1;
        nPos[i*3] = p.x; nPos[i*3+1] = p.y; nPos[i*3+2] = p.z;
      });
      nGeo.attributes.position.needsUpdate = true;

      // Recompute edges every 4 frames
      if (Math.round(performance.now() / 16) % 4 === 0) {
        const newEdges = computeEdges();
        const maxVerts = Math.max(newEdges.length, eGeo.attributes.position.array.length);
        const buf = new Float32Array(maxVerts);
        buf.set(newEdges);
        eGeo.setAttribute("position", new THREE.BufferAttribute(buf, 3));
        eGeo.setDrawRange(0, newEdges.length / 3);
      }

      // Update accent positions
      accentIdx.forEach((ni, i) => {
        accPos[i*3] = nodePos[ni].x; accPos[i*3+1] = nodePos[ni].y; accPos[i*3+2] = nodePos[ni].z;
      });
      accGeo.attributes.position.needsUpdate = true;

      // Subtle camera tilt
      camXY.x += (Math.sin(performance.now() * 0.0001) * 0.3 - camXY.x) * 0.01;
      camXY.y += (Math.cos(performance.now() * 0.00007) * 0.15 - camXY.y) * 0.01;
      camera.position.x = camXY.x;
      camera.position.y = camXY.y;

      renderer.render(scene, camera);
    };
    tick();

    const ro = new ResizeObserver(onResize);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
