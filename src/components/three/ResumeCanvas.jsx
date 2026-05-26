import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function ResumeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 7;

    const onResize = () => {
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();

    // Floating document frames (wireframe rectangles)
    const frames = [];
    const frameData = [
      { w: 2.2, h: 2.8, x:  0.0, y:  0.0, z:  0.0, rx: 0.05, ry: -0.1 },
      { w: 1.6, h: 2.1, x: -2.2, y:  0.4, z: -1.2, rx: -0.1, ry: 0.2 },
      { w: 1.2, h: 1.6, x:  2.4, y: -0.3, z: -0.8, rx: 0.15, ry: -0.15 },
      { w: 0.9, h: 1.2, x: -1.2, y: -1.8, z: -2.0, rx: -0.08, ry: 0.12 },
    ];

    frameData.forEach(({ w, h, x, y, z, rx, ry }, i) => {
      const geo = new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, h));
      const mat = new THREE.LineBasicMaterial({ color: 0x27272a, transparent: true, opacity: 0 });
      const mesh = new THREE.LineSegments(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.x = rx;
      mesh.rotation.y = ry;
      scene.add(mesh);
      frames.push({ mesh, mat, baseX: x, baseY: y, phase: i * Math.PI * 0.5 });
      gsap.to(mat, { opacity: 0.6 - i * 0.1, duration: 1.2, delay: 0.3 + i * 0.2 });
    });

    // Horizontal scan lines (document text simulation)
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    const LINE_COLORS = [0x3f3f46, 0xE5FE40, 0x3f3f46, 0x3f3f46, 0x3f3f46, 0x27272a];
    const lineWidths = [1.6, 1.0, 1.6, 1.4, 1.6, 0.9];

    for (let i = 0; i < 18; i++) {
      const w = lineWidths[i % lineWidths.length] * (0.7 + Math.random() * 0.3);
      const geo = new THREE.PlaneGeometry(w, 0.025);
      const mat = new THREE.MeshBasicMaterial({
        color: LINE_COLORS[i % LINE_COLORS.length],
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(-0.9 + w / 2 - 1.1, 1.1 - i * 0.125, 0.01);
      lineGroup.add(mesh);

      gsap.to(mat, {
        opacity: i === 1 ? 0.9 : (0.3 + Math.random() * 0.25),
        duration: 0.4,
        delay: 0.8 + i * 0.06,
      });
    }

    // Floating particles around the main frame
    const partCount = 60;
    const partPos = new Float32Array(partCount * 3);
    const partVel = new Float32Array(partCount * 2);
    for (let i = 0; i < partCount; i++) {
      partPos[i*3]   = (Math.random() - 0.5) * 8;
      partPos[i*3+1] = (Math.random() - 0.5) * 6;
      partPos[i*3+2] = (Math.random() - 0.5) * 3 - 1;
      partVel[i*2]   = (Math.random() - 0.5) * 0.003;
      partVel[i*2+1] = (Math.random() - 0.5) * 0.003;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x52525b, size: 0.04, transparent: true, opacity: 0 });
    scene.add(new THREE.Points(pGeo, pMat));
    gsap.to(pMat, { opacity: 0.7, duration: 1.5, delay: 0.5 });

    let raf;
    let running = false;
    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const t = performance.now() * 0.001;

      // Float frames
      frames.forEach(({ mesh, baseX, baseY, phase }) => {
        mesh.position.y = baseY + Math.sin(t * 0.4 + phase) * 0.08;
        mesh.rotation.z = Math.sin(t * 0.3 + phase) * 0.015;
      });

      // Subtle line group rock
      lineGroup.rotation.z = Math.sin(t * 0.25) * 0.01;

      // Drift particles
      for (let i = 0; i < partCount; i++) {
        partPos[i*3]   += partVel[i*2];
        partPos[i*3+1] += partVel[i*2+1];
        if (Math.abs(partPos[i*3]) > 4.5)   partVel[i*2]   *= -1;
        if (Math.abs(partPos[i*3+1]) > 3.5) partVel[i*2+1] *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Slow camera sway
      camera.position.x = Math.sin(t * 0.18) * 0.3;
      camera.position.y = Math.cos(t * 0.14) * 0.15;

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
