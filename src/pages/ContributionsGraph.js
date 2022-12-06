import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stats, TrackballControls } from "@react-three/drei";
import { Element } from '../components/Element';


const Table  = (props) => {
  const groupRef = useRef();
  useFrame(() => {
    //groupRef.current.rotation.x += 0.01;
    //groupRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh {...props}>
        <Html transform>
          <div>
            <Element key='111' />
            <Element key='222' />
            <Element key='333' />
          </div>
        </Html>
      </mesh>
    </group>
  );
};

export default function ContributionsGraph() {
  return (
    <Canvas>
        <pointLight position={[5, 5, 5]} />
        <Table  position={[2, 0, 0]} />
        <Stats />
      <TrackballControls />
    </Canvas>
  );
}