"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface OrbProps {
  position: [number, number, number];
  color: string;
  label: string;
  level: number;
  index: number;
}

function SkillOrb({ position, color, label, level, index }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + index * 0.8;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.12;

    const scale = hovered ? 1.3 : 1;
    targetScale.current += (scale - targetScale.current) * 0.1;
    meshRef.current.scale.setScalar(targetScale.current);
  });

  const radius = 0.18 + (level / 100) * 0.1;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <sphereGeometry args={[radius, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.6 : 0.2}
            transparent
            opacity={hovered ? 0.95 : 0.75}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>

        {/* Glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius + 0.04, 0.008, 8, 32]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.2} />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -(radius + 0.18), 0]}
          fontSize={0.1}
          color={hovered ? "#ffffff" : "#9ca3af"}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Medium.woff"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

interface SkillOrbsSceneProps {
  skills: Array<{ name: string; color: string; level: number; category: string }>;
  activeCategory: string;
}

export function SkillOrbsScene({ skills, activeCategory }: SkillOrbsSceneProps) {
  const filtered = activeCategory === "all" ? skills : skills.filter((s) => s.category === activeCategory);

  const positions = filtered.map((_, i) => {
    const cols = Math.min(filtered.length, 4);
    const row = Math.floor(i / cols);
    const col = i % cols;
    const totalCols = Math.min(filtered.length, cols);
    const x = (col - (totalCols - 1) / 2) * 1.1;
    const y = -row * 1.0 + 0.5;
    return [x, y, 0] as [number, number, number];
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 3, 3]} intensity={1.5} color="#6366f1" />
      <pointLight position={[0, -3, 3]} intensity={0.8} color="#8b5cf6" />

      {filtered.map((skill, i) => (
        <SkillOrb
          key={skill.name}
          position={positions[i]}
          color={skill.color}
          label={skill.name}
          level={skill.level}
          index={i}
        />
      ))}
    </group>
  );
}
