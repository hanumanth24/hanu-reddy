import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense, createElement as h } from "react";
import * as THREE from "three";

// ── Adobe Experience Cloud topology ──────────────────────────────────────────
// Hub: Adobe Experience Cloud at center
// Inner ring (r=1.8): AEM, AJO, RT-CDP
// Outer ring (r=2.7): EDS, CJA, Analytics, Launch

const R_IN = 1.8;
const R_OUT = 2.7;

function orbital(angle, radius, yOff = 0) {
  const a = (angle * Math.PI) / 180;
  return [Math.cos(a) * radius, yOff, Math.sin(a) * radius];
}

const HUB = { id: "hub", pos: [0, 0, 0], color: "#E5FE40", size: 0.28, label: "AEC" };

const PRODUCT_NODES = [
  // inner ring
  { id: "aem",      pos: orbital(0,   R_IN,  0.10), color: "#E5FE40", size: 0.18, label: "AEM" },
  { id: "ajo",      pos: orbital(120, R_IN,  0.05), color: "#ff9a3c", size: 0.16, label: "AJO" },
  { id: "rtcdp",    pos: orbital(240, R_IN, -0.08), color: "#a78bfa", size: 0.16, label: "RT-CDP" },
  // outer ring
  { id: "eds",      pos: orbital(60,  R_OUT,  0.20), color: "#4ade80", size: 0.13, label: "EDS" },
  { id: "cja",      pos: orbital(160, R_OUT,  0.00), color: "#60a5fa", size: 0.13, label: "CJA" },
  { id: "analytics",pos: orbital(260, R_OUT, -0.15), color: "#f87171", size: 0.12, label: "ANALYTICS" },
  { id: "launch",   pos: orbital(340, R_OUT,  0.10), color: "#facc15", size: 0.12, label: "LAUNCH" },
];

// Hub → every product; product cross-wires
const EDGES = [
  ["hub","aem"], ["hub","ajo"], ["hub","rtcdp"],
  ["hub","eds"], ["hub","cja"], ["hub","analytics"], ["hub","launch"],
  ["aem","eds"], ["ajo","rtcdp"], ["ajo","analytics"],
  ["rtcdp","cja"], ["analytics","cja"], ["launch","aem"],
];

const ALL_NODES = [HUB, ...PRODUCT_NODES];
const nodeById = Object.fromEntries(ALL_NODES.map((n) => [n.id, n]));

// ── Static edge lines ─────────────────────────────────────────────────────────
function EdgeLines() {
  const geo = useMemo(() => {
    const pts = [];
    EDGES.forEach(([a, b]) => {
      pts.push(...nodeById[a].pos, ...nodeById[b].pos);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
    return g;
  }, []);
  return h("lineSegments", { geometry: geo },
    h("lineBasicMaterial", { color: "#E5FE40", transparent: true, opacity: 0.14 })
  );
}

// ── Data-flow particle that travels from→to, looping ─────────────────────────
function FlowParticle({ from, to, speed, phase, color }) {
  const ref = useRef();
  const f = useMemo(() => new THREE.Vector3(...from), []);
  const t2 = useMemo(() => new THREE.Vector3(...to), []);

  useFrame((state) => {
    if (!ref.current) return;
    const p = ((state.clock.getElapsedTime() * speed + phase) % 1 + 1) % 1;
    ref.current.position.lerpVectors(f, t2, p);
    ref.current.material.opacity = Math.sin(p * Math.PI) * 0.95;
  });
  return h("mesh", { ref },
    h("sphereGeometry", { args: [0.035, 6, 6] }),
    h("meshBasicMaterial", { color, transparent: true, opacity: 0, depthWrite: false })
  );
}

function DataFlow() {
  const particles = useMemo(() => {
    const list = [];
    EDGES.forEach(([a, b]) => {
      const na = nodeById[a];
      const nb = nodeById[b];
      const color = na.color;
      // 3 particles per edge, evenly spaced in phase, bidirectional
      for (let i = 0; i < 3; i++) {
        list.push({ from: na.pos, to: nb.pos, speed: 0.28 + Math.random() * 0.14, phase: i / 3, color });
        list.push({ from: nb.pos, to: na.pos, speed: 0.22 + Math.random() * 0.12, phase: i / 3 + 0.5, color: nb.color });
      }
    });
    return list;
  }, []);

  return h("group", null, ...particles.map((p, i) =>
    h(FlowParticle, { key: i, ...p })
  ));
}

// ── Hub: central glowing sphere + double ring ─────────────────────────────────
function HubNode() {
  const ringA = useRef();
  const ringB = useRef();
  const sphere = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphere.current) {
      sphere.current.material.emissiveIntensity = 0.6 + Math.sin(t * 1.8) * 0.3;
    }
    if (ringA.current) {
      const ta = (t * 0.4) % 1;
      ringA.current.scale.setScalar(1 + ta * 2.8);
      ringA.current.material.opacity = (1 - ta) * 0.5;
    }
    if (ringB.current) {
      const tb = ((t * 0.4) + 0.5) % 1;
      ringB.current.scale.setScalar(1 + tb * 2.8);
      ringB.current.material.opacity = (1 - tb) * 0.5;
    }
  });

  return h("group", null,
    // glow sphere
    h("mesh", { ref: sphere },
      h("sphereGeometry", { args: [0.28, 32, 32] }),
      h("meshStandardMaterial", {
        color: "#E5FE40", roughness: 0.1, metalness: 0.9,
        emissive: "#E5FE40", emissiveIntensity: 0.7,
      })
    ),
    // pulsing rings
    h("mesh", { ref: ringA },
      h("ringGeometry", { args: [0.28, 0.30, 48] }),
      h("meshBasicMaterial", { color: "#E5FE40", transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false })
    ),
    h("mesh", { ref: ringB },
      h("ringGeometry", { args: [0.28, 0.30, 48] }),
      h("meshBasicMaterial", { color: "#E5FE40", transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false })
    )
  );
}

// ── Product node: sphere + orbit ring + pulse ─────────────────────────────────
function ProductNode({ node }) {
  const sphereRef = useRef();
  const pulseRef = useRef();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.position.y = node.pos[1] + Math.sin(t * 0.7 + phase) * 0.07;
      sphereRef.current.material.emissiveIntensity = 0.35 + Math.sin(t * 1.2 + phase) * 0.2;
    }
    if (pulseRef.current) {
      const tp = ((t * 0.55 + phase) % 1 + 1) % 1;
      pulseRef.current.scale.setScalar(1 + tp * 2.4);
      pulseRef.current.material.opacity = (1 - tp) * 0.4;
    }
  });

  return h("group", { position: node.pos },
    // floating sphere (y managed in useFrame via ref)
    h("mesh", { ref: sphereRef },
      h("sphereGeometry", { args: [node.size, 24, 24] }),
      h("meshStandardMaterial", {
        color: node.color, roughness: 0.15, metalness: 0.85,
        emissive: node.color, emissiveIntensity: 0.35,
      })
    ),
    // sonar pulse ring
    h("mesh", { ref: pulseRef },
      h("ringGeometry", { args: [node.size, node.size + 0.01, 32] }),
      h("meshBasicMaterial", { color: node.color, transparent: true, opacity: 0.4, side: THREE.DoubleSide, depthWrite: false })
    )
  );
}

// ── Orbit torus rings showing the two orbital paths ──────────────────────────
function OrbitPath({ radius, yOff = 0 }) {
  return h("mesh", { position: [0, yOff, 0], rotation: [Math.PI / 2, 0, 0] },
    h("torusGeometry", { args: [radius, 0.003, 4, 120] }),
    h("meshBasicMaterial", { color: "#27272a", transparent: true, opacity: 0.7 })
  );
}

// ── Background starfield ──────────────────────────────────────────────────────
function Stars() {
  const ref = useRef();
  const geo = useMemo(() => {
    const arr = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12 - 3;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.012;
  });

  return h("points", { ref, geometry: geo, frustumCulled: false },
    h("pointsMaterial", { color: "#52525b", size: 0.03, transparent: true, opacity: 0.6, sizeAttenuation: true, depthWrite: false })
  );
}

// ── Full scene ────────────────────────────────────────────────────────────────
function Scene({ mouse }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0022;
    groupRef.current.rotation.y += (mouse.current.x * 0.4 - groupRef.current.rotation.y) * 0.012;
    groupRef.current.rotation.x += (-mouse.current.y * 0.15 - groupRef.current.rotation.x) * 0.012;
  });

  return h("group", null,
    h("color", { attach: "background", args: ["#050505"] }),
    h("ambientLight", { intensity: 0.5 }),
    h("pointLight", { position: [0, 0, 4],  intensity: 2.0, color: "#E5FE40" }),
    h("pointLight", { position: [4, 4, 2],  intensity: 0.8, color: "#ffffff" }),
    h("pointLight", { position: [-4, -3, 1], intensity: 0.6, color: "#a78bfa" }),
    h("pointLight", { position: [0, -4, 2],  intensity: 0.5, color: "#ff9a3c" }),
    h(Stars, null),
    h("group", { ref: groupRef },
      h(OrbitPath, { radius: R_IN }),
      h(OrbitPath, { radius: R_OUT }),
      h(EdgeLines, null),
      h(DataFlow, null),
      h(HubNode, null),
      ...PRODUCT_NODES.map((n) => h(ProductNode, { key: n.id, node: n }))
    )
  );
}

export default function NodeGraphCanvas({ mouse }) {
  const localMouse = useRef({ x: 0, y: 0 });
  const m = mouse || localMouse;
  return (
    <Canvas
      camera={{ position: [0, 2.5, 6.5], fov: 52 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        {h(Scene, { mouse: m })}
      </Suspense>
    </Canvas>
  );
}
