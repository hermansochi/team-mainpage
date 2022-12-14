import React, { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, CameraShake } from "@react-three/drei";
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import styles from './CommitsGraph.module.css';

const Iso8601toString = (date) => {
  const options = {
    //weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
	let isoDateTime = new Date(date);
	return isoDateTime.toLocaleDateString('en', options);
};

const weekNumber = (date) => {
  let tempDate = new Date(date);
  let startDate = new Date(tempDate.getFullYear(), 0, 1);
  return Math.ceil((Math.floor((tempDate - startDate) / (24 * 60 * 60 * 1000))) / 7);
};


const LessMore = () => {
  return (
      <Html rotation={[0, 0, 0]} position={[21, -21, 0]} transform>
        <div className="less_more_container">
          LESS
          <div className="less_more_box" style={{backgroundColor: 'rgba(22, 27, 34, 0.9)'}}></div>
          <div className="less_more_box" style={{backgroundColor: 'rgba(14, 68, 41, 0.9)'}}></div>
          <div className="less_more_box" style={{backgroundColor: 'rgba(0, 109, 50, 0.9)'}}></div>
          <div className="less_more_box" style={{backgroundColor: 'rgba(38, 166, 65, 0.9)'}}></div>
          <div className="less_more_box" style={{backgroundColor: 'rgba(57, 211, 83, 0.9)'}}></div>
          MORE
        </div>
      </Html>
  );
};

const ElementTitle = ({title }) => {

  return (
      <Html rotation={[0, 0, 0]} position={[-9, 16, 0]} transform>
        <div className={styles.title}>
          { title }
        </div>
      </Html>
  );
};


const Element = ({date, commits, authors }) => {
  let currentDate = new Date();
  let currentWeek = weekNumber(currentDate);
  let posY = 11 - (new Date(date)).getDay() * 4.5;
  let posX = 28 - (currentWeek - weekNumber(date)) * 3.6;

  let bgColor = '';
  if (commits === 0) {
    bgColor = 'rgba(22, 27, 34, 0.9)';
  } else if (commits <= 3) {
    bgColor = 'rgba(14, 68, 41, 0.9)';
  } else if (commits <= 5) {
    bgColor = 'rgba(0, 109, 50, 0.9)';
  } else if (commits <= 10) {
    bgColor = 'rgba(38, 166, 65, 0.9)';
  } else {
    bgColor = 'rgba(57, 211, 83, 0.9)';
  }

  let authorsNames = authors.slice(0, 3).map((item) => <div key={date + item}>{item}</div>);

  return (
      <Html rotation={[0, 0, 0]} position={[posX, posY, 0]} transform>
        <div className={styles.element}
          style={{backgroundColor: bgColor}}>
          <div className={styles.date}>{(commits === 0) ? null : Iso8601toString(date)}</div>
          <div className={styles.commits}>{(commits === 0) ? null : commits}</div>
          <div className={styles.authors}>{(commits === 0) ? null : authorsNames}</div>
        </div>
      </Html>
  );
};

const MakeScene = ({commitsStats}) => {
  const group = useRef();
  return (
    <group ref={group}>
      {
        (commitsStats.length > 0) ?
            commitsStats.map((item) => <Element key={item.date}
              date={item.date}
              commits={item.commits}
              authors={item.authors}
            />)
        :
          null
      } 
      <ElementTitle title="COMMITS FOR THE LAST 120 DAYS" />
      <LessMore />
    </group>
  );
};


export default function CommitsGraph() {
  const { commitsStats } = useSelector((state) => state.github);
   return (
    <Canvas camera={{ position: [0, 0, 45], fov: 55 }}>
      {/*<fog attach="fog" args={['lightpink', 60, 100]} />*/}
      <Suspense fallback={null}>
        <pointLight position={[0, 0, 5]} />
        <MakeScene commitsStats={commitsStats} />
      </Suspense>
      {/*<Stats />*/}
      <OrbitControls makeDefault />
    </Canvas>
  );
}