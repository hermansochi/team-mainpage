import React, { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useSelector } from 'react-redux';

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
        <div className="element_title">
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
  return (
      <Html rotation={[0, 0, 0]} position={[posX, posY, 0]} transform>
        <div className="element"
          style={{backgroundColor: bgColor}}>
          <div className="date">{(commits === 0) ? null : Iso8601toString(date)}</div>
          <div className="commits">{(commits === 0) ? null : commits}</div>
          <div className="authors">{(commits === 0) ? null : authors}</div>
        </div>
      </Html>
  );
};

const MakeScene = ({commitsStats}) => {
  return (
    <group>
      <ElementTitle title="COMMITS FOR THE LAST 120 DAYS" />
      <LessMore />
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
    </group>
  );
};

export default function CommitsGraph() {
  //const orbitRef = useRef();
  /*
  const config = {
    maxYaw: 0.1, // Max amount camera can yaw in either direction
    maxPitch: 0.1, // Max amount camera can pitch in either direction
    maxRoll: 0.1, // Max amount camera can roll in either direction
    yawFrequency: 0.1, // Frequency of the the yaw rotation
    pitchFrequency: 0.1, // Frequency of the pitch rotation
    rollFrequency: 0.1, // Frequency of the roll rotation
    intensity: 1, // initial intensity of the shake
    decay: false, // should the intensity decay over time
    decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
  };
  */
  const { commitsStats } = useSelector((state) => state.github);

  /*
  useEffect(() => {
    config.controls = orbitRef;
  }, [orbitRef]);

  */
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