import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 180;
const ORB_COUNT = 16;

export default function AchievementCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 6;

    const onResize = () => {
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();

    // Glow circle texture
    const texCv = document.createElement("canvas");
    texCv.width = 64; texCv.height = 64;
    const ctx = texCv.getContext("2d");
    const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(229,254,64,1)");
    grd.addColorStop(0.35, "rgba(229,254,64,0.6)");
    grd.addColorStop(1, "rgba(229,254,64,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(texCv);

    // Rising particles
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i]         = 0.006 + Math.random() * 0.016;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      map: glowTex,
      size: 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color("#E5FE40"),
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // Large translucent orbs for depth glow
    const orbPos = new Float32Array(ORB_COUNT * 3);
    const orbVel = new Float32Array(ORB_COUNT);
    for (let i = 0; i < ORB_COUNT; i++) {
      orbPos[i * 3]     = (Math.random() - 0.5) * 12;
      orbPos[i * 3 + 1] = (Math.random() - 0.5) * 8 - 4;
      orbPos[i * 3 + 2] = (Math.random() - 0.5) * 2 - 1;
      orbVel[i]         = 0.003 + Math.random() * 0.005;
    }
    const orbGeo = new THREE.BufferGeometry();
    orbGeo.setAttribute("position", new THREE.BufferAttribute(orbPos, 3));
    scene.add(new THREE.Points(orbGeo, new THREE.PointsMaterial({
      map: glowTex,
      size: 1.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.05,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color("#E5FE40"),
    })));

    let raf;
    let running = false;
    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);

      const arr = pGeo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] += vel[i];
        arr[i * 3]     += Math.sin(arr[i * 3 + 1] * 0.4 + i * 0.1) * 0.001;
        if (arr[i * 3 + 1] > 6) {
          arr[i * 3]     = (Math.random() - 0.5) * 14;
          arr[i * 3 + 1] = -6;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      const oa = orbGeo.attributes.position.array;
      for (let i = 0; i < ORB_COUNT; i++) {
        oa[i * 3 + 1] += orbVel[i];
        if (oa[i * 3 + 1] > 5) {
          oa[i * 3]     = (Math.random() - 0.5) * 12;
          oa[i * 3 + 1] = -5;
        }
      }
      orbGeo.attributes.position.needsUpdate = true;

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
