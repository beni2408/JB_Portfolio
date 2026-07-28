"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type CenterpieceProps = {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
};

const OFFSET_X_RATIO = 0.32;
const CORE_RADIUS = 0.62;

export function Centerpiece({ pointer, scrollProgress }: CenterpieceProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x += delta * 0.05;
      const pulse = 1 + Math.sin(t * 0.9) * 0.035;
      core.current.scale.setScalar(pulse);
    }

    if (ringA.current) ringA.current.rotation.z += delta * 0.08;
    if (ringB.current) ringB.current.rotation.x += delta * -0.06;

    if (group.current) {
      const maxTilt = THREE.MathUtils.degToRad(8);
      const targetY = pointer.current.x * maxTilt;
      const targetX = -pointer.current.y * maxTilt;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.04);

      const targetPosX = Math.min(viewport.width * OFFSET_X_RATIO, 2.6);
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetPosX, 0.08);

      const drift = scrollProgress.current;
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        -drift * 0.6,
        0.06
      );
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[CORE_RADIUS * 0.4, 1]} />
        <meshBasicMaterial color="#d4af6a" toneMapped={false} />
      </mesh>

      <mesh ref={core}>
        <icosahedronGeometry args={[CORE_RADIUS, 0]} />
        <meshPhysicalMaterial
          color="#4b2f7a"
          transmission={0.85}
          thickness={1.1}
          roughness={0.15}
          ior={1.4}
          attenuationColor="#8a63c9"
          attenuationDistance={0.7}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          flatShading
        />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[CORE_RADIUS * 1.7, 0.007, 16, 120]} />
        <meshBasicMaterial color="#d4af6a" transparent opacity={0.65} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3.2, Math.PI / 6, 0]}>
        <torusGeometry args={[CORE_RADIUS * 2, 0.005, 16, 120]} />
        <meshBasicMaterial color="#f4f1e9" transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}
