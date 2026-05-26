import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense, createElement as h } from "react";
import * as THREE from "three";

// Reduced grid: 28×12 = 336 JS-updated points (was 48×22 = 1056)
const COLS = 28;
const ROWS = 12;
const COUNT = COLS * ROWS;

function WaveGrid() {
  const meshRef = useRef();
  const frameRef = useRef(0);
  const geo = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[idx++] = (c / (COLS - 1) - 0.5) * 14;
        positions[idx++] = 0;
        positions[idx++] = (r / (ROWS - 1) - 0.5) * 6;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (++frameRef.current % 2 !== 0) return;
    const t = state.clock.getElapsedTime();
    const pos = meshRef.current?.geometry?.attributes?.position;
    if (!pos) return;
    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c / (COLS - 1) - 0.5) * 14;
        const z = (r / (ROWS - 1) - 0.5) * 6;
        const dist = Math.sqrt(x * x + z * z);
        pos.array[idx * 3 + 1] =
          Math.sin(x * 0.6 + t * 1.1) * 0.28 *
          Math.cos(z * 0.5 + t * 0.7) *
          Math.max(0, 1 - dist / 9);
        idx++;
      }
    }
    pos.needsUpdate = true;
  });

  return h(
    "points",
    { ref: meshRef, geometry: geo, frustumCulled: false },
    h("pointsMaterial", {
      color: "#E5FE40",
      size: 0.055,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
    })
  );
}

// Reduced horizon lines: 4 (was 8), fewer vertices per line
function HorizonLines() {
  const LINE_COUNT = 4;
  const lineGeos = useMemo(() => {
    return Array.from({ length: LINE_COUNT }, (_, i) => {
      const z = (i / (LINE_COUNT - 1) - 0.5) * 6;
      const pts = [];
      for (let x = -7; x <= 7; x += 0.28) pts.push(x, 0, z);
      const arr = new Float32Array(pts);
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      return g;
    });
  }, []);

  const refs = useRef([]);
  const frameRef = useRef(0);
  useFrame((state) => {
    if (++frameRef.current % 2 !== 0) return;
    const t = state.clock.getElapsedTime();
    refs.current.forEach((r, i) => {
      if (!r) return;
      const pos = r.geometry?.attributes?.position;
      if (!pos) return;
      const z = (i / (LINE_COUNT - 1) - 0.5) * 6;
      for (let j = 0; j < pos.count; j++) {
        const x = pos.array[j * 3];
        pos.array[j * 3 + 1] =
          Math.sin(x * 0.6 + t * 1.1) * 0.28 *
          Math.cos(z * 0.5 + t * 0.7) *
          Math.max(0, 1 - Math.sqrt(x * x + z * z) / 9);
      }
      pos.needsUpdate = true;
    });
  });

  return h(
    "group",
    null,
    ...lineGeos.map((geo, i) =>
      h("line", {
        key: i,
        ref: (el) => { refs.current[i] = el; },
        geometry: geo,
      },
        h("lineBasicMaterial", { color: "#E5FE40", transparent: true, opacity: 0.14 })
      )
    )
  );
}

function Scene() {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        -0.52 + Math.sin(state.clock.getElapsedTime() * 0.15) * 0.04;
    }
  });
  return h(
    "group",
    { ref: groupRef },
    h("color", { attach: "background", args: ["#050505"] }),
    h("ambientLight", { intensity: 0.3 }),
    h(HorizonLines, null),
    h(WaveGrid, null)
  );
}

export default function DataWaveCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 7], fov: 55 }}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1]}
    >
      <Suspense fallback={null}>
        {h(Scene, null)}
      </Suspense>
    </Canvas>
  );
}
