import React from 'react';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export default function Main() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars />
    </Canvas>
  );
}

function Stars(props) {
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const [sphere] = useState(() => random.inSphere(new Float32Array(1000), { radius: 1.5 }));
  const [sphere1] = useState(() => random.inSphere(new Float32Array(1000), { radius: 1.5 }));
  const [sphere2] = useState(() => random.inSphere(new Float32Array(1000), { radius: 1.5 }));
  const [sphere3] = useState(() => random.inSphere(new Float32Array(1000), { radius: 1.5 }));
  const [sphere4] = useState(() => random.inSphere(new Float32Array(1000), { radius: 1.5 }));
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    ref1.current.rotation.x -= delta / 10;
    ref1.current.rotation.y -= delta / 15;
    ref2.current.rotation.x -= delta / 10;
    ref2.current.rotation.y -= delta / 15;
    ref3.current.rotation.x -= delta / 10;
    ref3.current.rotation.y -= delta / 15;
    ref4.current.rotation.x -= delta / 10;
    ref4.current.rotation.y -= delta / 15;
  });
  return (
    <>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color='#afc9ff' size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref1} positions={sphere1} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color='#c7d8ff' size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref2} positions={sphere2} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color='#ffa0e0' size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref3} positions={sphere3} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color='#fff4f3' size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref4} positions={sphere4} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color='#ffa651' size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    </>
  );
}
