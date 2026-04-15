"use client";

import { Canvas } from "@react-three/fiber";
import { MouseInteractiveSphere } from "./TechSphere";
import { Suspense, useEffect, useState } from "react";

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function HeroCanvas() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(isWebGLSupported());
  }, []);

  // Not yet checked — render nothing (avoids SSR mismatch)
  if (supported === null) return null;

  // No WebGL — static gradient fallback
  if (!supported) {
    return (
      <div
        className="w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.15) 0%, transparent 70%)"
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false
      }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <MouseInteractiveSphere />
      </Suspense>
    </Canvas>
  );
}
