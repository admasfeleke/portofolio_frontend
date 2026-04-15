"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SkillOrbsScene } from "./SkillOrbs";
import { Suspense } from "react";
import type { Skill } from "@/types";

interface Props {
  skills: Skill[];
  activeCategory: string;
}

export default function SkillsCanvas({ skills, activeCategory }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <SkillOrbsScene skills={skills} activeCategory={activeCategory} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
