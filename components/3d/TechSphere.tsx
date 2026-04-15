"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NodeNetwork() {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Build geometry imperatively — avoids JSX bufferAttribute issues in R3F v8
  const { pointsGeo, lineGeo } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.4 + Math.random() * 0.6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    const lineVerts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 0.9) {
          lineVerts.push(nodes[i].x, nodes[i].y, nodes[i].z);
          lineVerts.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineVerts), 3));

    return { pointsGeo, lineGeo };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.12;
    if (meshRef.current) {
      meshRef.current.rotation.y = t;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t;
      linesRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </lineSegments>
      <points ref={meshRef} geometry={pointsGeo}>
        <pointsMaterial
          color="#a5b4fc"
          size={0.04}
          sizeAttenuation
          depthWrite={false}
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.25}
        emissive="#6366f1"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const geo = useMemo(() => {
    const count = 300;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#8b5cf6"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.4}
      />
    </points>
  );
}

export function MouseInteractiveSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    targetRotation.current.x += (mouse.y * 0.3 - targetRotation.current.x) * 0.05;
    targetRotation.current.y += (mouse.x * 0.3 - targetRotation.current.y) * 0.05;
    if (groupRef.current) {
      groupRef.current.rotation.x = targetRotation.current.x;
      groupRef.current.rotation.y = targetRotation.current.y;
    }
  });

  return (
    <group ref={groupRef}>
      <CoreSphere />
      <NodeNetwork />
      <ParticleField />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-3, -3, -3]} intensity={0.8} color="#8b5cf6" />
    </group>
  );
}
