import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, Stats, TrackballControls } from "@react-three/drei";
import { CommitElement } from '../components/CommitElement';
import { useSelector, useDispatch } from 'react-redux';

const Table  = (props) => {
  const { commitsByDay } = useSelector((state) => state.github);
  const groupRef = useRef();
  useFrame(() => {
    //groupRef.current.rotation.z -= 0.005;
    //groupRef.current.rotation.y += 0.01;
    groupRef.current.position.y += 0.0001;
    groupRef.current.position.z -= 0.0001;
    console.log(groupRef.current.position.y)
    console.log(groupRef.current.position.z)
  });

  return (
    <group ref={groupRef} dispose={null}>
      <mesh {...props}>
        <Html transform occlude>
          <div>
					{
						(commitsByDay.length > 0) ?
              commitsByDay.map((item) => <CommitElement key={item.id} {...item} />)
						:
							null
					}
          </div>
        </Html>
      </mesh>
    </group>
  );
};

export default function Commits() {
  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 55 }}>
        <pointLight position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <group rotation={[-0.8, 0, 0]} position={[0, -510, 30]}>
            <Table />
          </group>
          <Environment preset="city" />
        </Suspense>
        {/*<Stats />*/}
      <TrackballControls />
    </Canvas>
  );
}