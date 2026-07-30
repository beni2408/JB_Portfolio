"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** How far the whole formation travels, in world units, over one full page
 * scroll. Larger = more dramatic parallax. */
const TRAVEL = 26;

type ShardDef = {
  geometry: "icosahedron" | "octahedron" | "dodecahedron" | "tetrahedron";
  radius: number;
  /** Horizontal placement as a fraction of half-viewport-width. ±1 = screen edge. */
  x: number;
  /** Where in the page this form is centred (0 = top, 1 = bottom). */
  anchor: number;
  /** Depth. More negative = further away = drifts slower (true parallax). */
  z: number;
  color: string;
  /** Champagne wireframe cage — the "royal" detail. */
  cage: boolean;
  spin: number;
};

// Placed mostly in the page gutters so the content column stays clean, with
// depth deliberately varied so near/far forms visibly move at different rates.
const SHARDS: ShardDef[] = [
  { geometry: "icosahedron", radius: 2.6, x: 1.06, anchor: 0.14, z: -2, color: "#4a2a6b", cage: true, spin: 0.22 },
  { geometry: "octahedron", radius: 1.9, x: -1.0, anchor: 0.27, z: -5.5, color: "#2c2768", cage: true, spin: -0.3 },
  { geometry: "dodecahedron", radius: 3.0, x: -1.1, anchor: 0.44, z: -1, color: "#4a2a6b", cage: true, spin: 0.18 },
  { geometry: "tetrahedron", radius: 1.8, x: 0.92, anchor: 0.56, z: -7, color: "#6b4a8f", cage: true, spin: 0.4 },
  { geometry: "icosahedron", radius: 3.4, x: 1.12, anchor: 0.72, z: -3, color: "#3a2359", cage: true, spin: -0.2 },
  { geometry: "octahedron", radius: 2.3, x: -0.98, anchor: 0.88, z: -4, color: "#4a2a6b", cage: true, spin: 0.26 },
];

function Shard({ def, scroll, pointer }: {
  def: ShardDef;
  scroll: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const r = def.radius;
    switch (def.geometry) {
      case "octahedron":
        return new THREE.OctahedronGeometry(r, 0);
      case "dodecahedron":
        return new THREE.DodecahedronGeometry(r, 0);
      case "tetrahedron":
        return new THREE.TetrahedronGeometry(r, 0);
      default:
        return new THREE.IcosahedronGeometry(r, 0);
    }
  }, [def.geometry, def.radius]);

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useEffect(() => () => {
    geometry.dispose();
    edges.dispose();
  }, [geometry, edges]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    // Anchor the form to its slice of the page, then slide the whole formation
    // upward as the page scrolls. Depth does the rest: because the camera is
    // perspective, a shard at z=-7 covers far less screen distance than one at
    // z=-1 for the same world delta. That difference *is* the parallax.
    const worldY = (def.anchor - scroll.current) * -TRAVEL;
    g.position.set((viewport.width / 2) * def.x, worldY, def.z);

    // Scroll actively drives rotation, so the forms feel reactive rather than
    // idly spinning; a small constant term keeps them alive when parked.
    g.rotation.y = scroll.current * Math.PI * 2 * def.spin + state.clock.elapsedTime * 0.05 * def.spin;
    g.rotation.x = scroll.current * Math.PI * def.spin * 0.6;

    // Whole-formation pointer tilt for a touch of premium responsiveness.
    const tilt = THREE.MathUtils.degToRad(4);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.current.x * tilt, 0.05);
  });

  return (
    <group ref={group}>
      {/* Faint glass body — deliberately low opacity so body copy stays
          readable where a form drifts behind the content column. The champagne
          edge cage, not the fill, is what makes these read. */}
      {/* meshLambert, not meshPhysical: at 12% opacity clearcoat/metalness are
          invisible but still cost a full PBR shader per fragment, across six
          meshes. Lambert keeps the flat-shaded facet reads for a fraction of
          the GPU work. */}
      <mesh geometry={geometry}>
        <meshLambertMaterial color={def.color} transparent opacity={0.12} flatShading />
      </mesh>
      {def.cage && (
        <lineSegments geometry={edges}>
          {/* Light gold: a cage edge can drift behind champagne body text, and
              a darker line drops that pairing under AA (measured 1.31:1). */}
          <lineBasicMaterial color="#d9bd7e" transparent opacity={0.5} toneMapped={false} />
        </lineSegments>
      )}
    </group>
  );
}

function Formation() {
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    }
    function onPointer(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <>
      {SHARDS.map((def, i) => (
        <Shard key={i} def={def} scroll={scroll} pointer={pointer} />
      ))}
    </>
  );
}

export function BackdropScene() {
  const [lit, setLit] = useState(false);
  // Fade in rather than pop, since this mounts on the visitor's first scroll.
  useEffect(() => {
    const id = requestAnimationFrame(() => setLit(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-1200 ease-out ${
        lit ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Soft background layer — it does not need retina sharpness, and capping
          dpr lower here is most of the fill-rate saving. Two lights, not four:
          each extra light multiplies the per-fragment cost across every mesh. */}
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[6, 8, 6]} intensity={2.4} color="#d4af6a" />
        <Formation />
      </Canvas>
    </div>
  );
}
