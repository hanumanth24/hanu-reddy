import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo, Suspense, createElement as h } from "react";

// Detect touch/mobile — disable heavy canvas on low-power devices
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

function DistortedBlob({ mouse }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.2;
    ref.current.position.x +=
      (mouse.current.x * 0.6 - ref.current.position.x) * 0.04;
    ref.current.position.y +=
      (-mouse.current.y * 0.4 - ref.current.position.y) * 0.04;
  });
  return h(
    "mesh",
    { ref, scale: 1.6 },
    h("icosahedronGeometry", { args: [1, 4] }),
    h(MeshDistortMaterial, {
      color: "#E5FE40",
      distort: 0.45,
      speed: 1.4,
      roughness: 0.15,
      metalness: 0.65,
    })
  );
}

function CosmicDust({ count = 800 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return h(
    Points,
    { ref, positions, stride: 3, frustumCulled: false },
    h(PointMaterial, {
      transparent: true,
      color: "#ffffff",
      size: 0.018,
      sizeAttenuation: true,
      depthWrite: false,
      opacity: 0.6,
    })
  );
}

function FloatingGeo({ mouse }) {
  const torusRef = useRef();
  const icoRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.4;
      torusRef.current.rotation.y = t * 0.3;
      torusRef.current.position.x =
        2.4 + Math.sin(t * 0.5) * 0.2 + mouse.current.x * 0.2;
      torusRef.current.position.y = 1.4 + Math.cos(t * 0.4) * 0.2;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = -t * 0.25;
      icoRef.current.rotation.y = t * 0.35;
      icoRef.current.position.x =
        -2.6 + Math.cos(t * 0.5) * 0.2 + mouse.current.x * 0.15;
      icoRef.current.position.y = -1.2 + Math.sin(t * 0.6) * 0.2;
    }
  });
  return h(
    "group",
    null,
    h(
      "mesh",
      { ref: torusRef, position: [2.4, 1.4, -1] },
      h("torusGeometry", { args: [0.4, 0.12, 12, 48] }),
      h("meshStandardMaterial", {
        color: "#ffffff",
        roughness: 0.1,
        metalness: 1,
        emissive: "#E5FE40",
        emissiveIntensity: 0.08,
      })
    ),
    h(
      "mesh",
      { ref: icoRef, position: [-2.6, -1.2, -1] },
      h("icosahedronGeometry", { args: [0.6, 0] }),
      h("meshStandardMaterial", {
        color: "#0a0a0a",
        roughness: 0.05,
        metalness: 1,
        wireframe: true,
        emissive: "#E5FE40",
        emissiveIntensity: 0.15,
      })
    )
  );
}

function Scene({ mouse }) {
  return h(
    "group",
    null,
    h("color", { attach: "background", args: ["#050505"] }),
    h("ambientLight", { intensity: 0.4 }),
    h("directionalLight", { position: [5, 5, 5], intensity: 0.8, color: "#ffffff" }),
    h("pointLight", { position: [-4, -3, -4], intensity: 1.2, color: "#E5FE40" }),
    h(CosmicDust, { count: 800 }),
    h(DistortedBlob, { mouse }),
    h(FloatingGeo, { mouse })
  );
}

// Mobile fallback: CSS-only gradient (no WebGL context)
function MobileHero() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, rgba(229,254,64,0.12) 0%, transparent 65%), #050505",
      }}
    />
  );
}

export default function HeroCanvas({ mouse }) {
  if (isMobile) return <MobileHero />;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>{h(Scene, { mouse })}</Suspense>
    </Canvas>
  );
}
