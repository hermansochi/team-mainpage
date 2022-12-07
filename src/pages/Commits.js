import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, Stats, TrackballControls, PresentationControls } from "@react-three/drei";
import { useSelector, useDispatch } from 'react-redux';

const Iso8601toString = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
	let isoDateTime = new Date(date);
	return isoDateTime.toLocaleDateString('en', options);
};

const CommitElement = ({idx, authorDate, authorName, message }) => {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current.myKey = authorDate + message;
    elementRef.current.visibility = true;
  },[]);
  useFrame(() => {
    //elementRef.current.rotation.z -= 0.005;
    //elementRef.current.rotation.y += 0.01;
    
    elementRef.current.position.y += 0.05;
    elementRef.current.position.z -= 0.05;
    
    //console.log(elementRef.current);
    if (elementRef.current.myKey === '2022-12-06T05:10:22.000000ZHerman: .DS_Store banished!') {
      //console.log('Y-' + elementRef.current.position.y);
      console.log('Z-' + elementRef.current.position.z);
    }

    if (elementRef.current.position.z > -5) {
      //elementRef.current.visibility = true;
    }
    
  });
  return (
    <group ref={elementRef} dispose={null}>
      <Html  rotation={[-Math.PI / 4, 0, 0]} position={[0, -8 + (-idx * 4), idx * 4]} transform occlude>
        <div className="commit__element">
          <div className="date">{Iso8601toString(authorDate)}</div>
          <div className="details">{message}</div>
        </div>
      </Html>
    </group>
    );
  };
  
export default function Commits() {
  const { commitsByDay } = useSelector((state) => state.github);
  useEffect(() => {

  }, [commitsByDay]);
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 55 }}>
    <pointLight position={[0, 0, 5]} />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        <Suspense fallback={null}>

          {
            (commitsByDay.length > 0) ?
                commitsByDay.map((item, idx) => <CommitElement key={item.id}
                  idx={idx}
                  authorDate={item.author_date}
                  authorName={item.author_name}
                  message={item.message}
                />)
            :
              null
          }   
        </Suspense>
        {/*<Stats />*/}
      </PresentationControls>
    </Canvas>
  );
}