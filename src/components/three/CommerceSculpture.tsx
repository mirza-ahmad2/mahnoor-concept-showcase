import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";

function Sculpture({ paused }: { paused: boolean }) {
  const group = useRef<Group>(null);
  const ribbon = useRef<Mesh>(null);
  const pointer = useThree((s) => s.pointer);

  useFrame((state, delta) => {
    if (paused || !group.current) return;
    const targetY = pointer.x * 0.5;
    const targetX = -pointer.y * 0.25;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 2);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 2);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    if (ribbon.current) ribbon.current.rotation.z += delta * 0.18;
  });

  return (
    <group ref={group} scale={1.05}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh castShadow position={[0, 0.35, 0]}>
          <icosahedronGeometry args={[0.95, 4]} />
          <meshPhysicalMaterial
            color="#C79AA8"
            roughness={0.22}
            metalness={0.35}
            clearcoat={0.8}
            clearcoatRoughness={0.25}
          />
        </mesh>
      </Float>

      <mesh ref={ribbon} position={[0, 0.35, 0]} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.55, 0.035, 16, 128]} />
        <meshStandardMaterial color="#D6B777" roughness={0.25} metalness={0.85} />
      </mesh>

      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.85, 1.0, 0.34, 64]} />
        <meshPhysicalMaterial color="#4B1D3F" roughness={0.35} metalness={0.2} clearcoat={0.4} />
      </mesh>

      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial color="#0B0B10" roughness={1} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function DprGuard() {
  const setDpr = useThree((s) => s.setDpr);
  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    setDpr(Math.min(window.devicePixelRatio, small ? 1 : 1.6));
  }, [setDpr]);
  return null;
}

export default function CommerceSculpture({ paused }: { paused: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.2], fov: 38 }}
      dpr={1}
      frameloop={paused ? "never" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <DprGuard />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1.6} color="#F6F1E9" />
      <pointLight position={[-3, -1, 2]} intensity={12} color="#C79AA8" distance={12} />
      <Sculpture paused={paused} />
      <spotLight position={[0, 6, 3]} angle={0.5} penumbra={1} intensity={18} color="#D6B777" />
    </Canvas>
  );
}
