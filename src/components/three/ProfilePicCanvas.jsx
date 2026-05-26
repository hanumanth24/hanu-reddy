import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef, Suspense, createElement as h, useMemo, useEffect } from "react";
import * as THREE from "three";

function ProfileMesh({ mouse }) {
  const texture = useLoader(TextureLoader, "/hanu.png");
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.45) * 0.06;
    meshRef.current.rotation.y +=
      (mouse.current.x * 0.18 - meshRef.current.rotation.y) * 0.06;
    meshRef.current.rotation.x +=
      (-mouse.current.y * 0.12 - meshRef.current.rotation.x) * 0.06;
  });

  return h(
    "mesh",
    { ref: meshRef },
    h("planeGeometry", { args: [2.2, 2.8, 32, 32] }),
    h(MeshDistortMaterial, { map: texture, distort: 0.07, speed: 1.4, roughness: 0, metalness: 0.1 })
  );
}

function OrbitRing() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.5;
    ref.current.rotation.y = t * 0.3;
    ref.current.rotation.z = t * 0.2;
  });
  return h(
    "mesh",
    { ref },
    h("torusGeometry", { args: [1.7, 0.008, 4, 80] }),
    h("meshBasicMaterial", { color: "#E5FE40", transparent: true, opacity: 0.55 })
  );
}

// 2 sonar rings (was 3)
function SonarRing({ phase }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.getElapsedTime() * 0.5 + phase) % 1;
    ref.current.scale.setScalar(1.2 + t * 2.2);
    ref.current.material.opacity = (1 - t) * 0.28;
  });
  return h(
    "mesh",
    { ref },
    h("ringGeometry", { args: [1.3, 1.32, 48] }),
    h("meshBasicMaterial", {
      color: "#E5FE40",
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
}

// Reduced: 300 edge particles + 150 spiral (was 800 + 400)
function Particles() {
  const edgeRef = useRef();
  const spiralRef = useRef();

  const edgeGeo = useMemo(() => {
    const count = 300;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const side = Math.floor(Math.random() * 4);
      let x, y;
      if (side === 0)      { x = (Math.random() - 0.5) * 2.8; y = 1.6; }
      else if (side === 1) { x = (Math.random() - 0.5) * 2.8; y = -1.6; }
      else if (side === 2) { x = 1.4; y = (Math.random() - 0.5) * 3.6; }
      else                 { x = -1.4; y = (Math.random() - 0.5) * 3.6; }
      arr[i * 3]     = x + (Math.random() - 0.5) * 0.35;
      arr[i * 3 + 1] = y + (Math.random() - 0.5) * 0.35;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  const spiralGeo = useMemo(() => {
    const count = 150;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 8;
      const r = 1.8 + t * 1.2;
      arr[i * 3]     = Math.cos(angle) * r * 0.7;
      arr[i * 3 + 1] = (t - 0.5) * 4.5;
      arr[i * 3 + 2] = Math.sin(angle) * r * 0.7;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (edgeRef.current) edgeRef.current.rotation.z = t * 0.05;
    if (spiralRef.current) {
      spiralRef.current.rotation.y = t * 0.18;
      spiralRef.current.rotation.x = Math.sin(t * 0.12) * 0.3;
    }
  });

  return h(
    "group",
    null,
    h("points", { ref: edgeRef, geometry: edgeGeo, frustumCulled: false },
      h("pointsMaterial", { color: "#E5FE40", size: 0.025, transparent: true, opacity: 0.6, sizeAttenuation: true, depthWrite: false })
    ),
    h("points", { ref: spiralRef, geometry: spiralGeo, frustumCulled: false },
      h("pointsMaterial", { color: "#ffffff", size: 0.018, transparent: true, opacity: 0.35, sizeAttenuation: true, depthWrite: false })
    )
  );
}

function Scene({ mouse }) {
  return h(
    "group",
    null,
    h("ambientLight", { intensity: 1.3 }),
    h("directionalLight", { position: [2, 3, 3], intensity: 0.5, color: "#ffffff" }),
    h("pointLight", { position: [-2, -2, 2], intensity: 1.0, color: "#E5FE40" }),
    h("pointLight", { position: [2, 2, 1], intensity: 0.4, color: "#ffffff" }),
    h(OrbitRing, null),
    h(SonarRing, { phase: 0 }),
    h(SonarRing, { phase: 0.5 }),
    h(Particles, null),
    h(ProfileMesh, { mouse })
  );
}

function PauseController() {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    let rafId, running = false;
    const tick = () => {
      if (!running) return;
      invalidate();
      rafId = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; tick(); }
      else if (!e.isIntersecting) { running = false; cancelAnimationFrame(rafId); }
    }, { rootMargin: "100px" });
    io.observe(canvas);
    running = true;
    tick();
    return () => { running = false; cancelAnimationFrame(rafId); io.disconnect(); };
  }, [gl, invalidate]);
  return null;
}

export default function ProfilePicCanvas({ mouse }) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 3.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        {h(PauseController, null)}
        {h(Scene, { mouse })}
      </Suspense>
    </Canvas>
  );
}
