import React from 'react';
import { useRef, Fragment, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

/*
import { Canvas as CanvasCSS3D, useFrame as useFrameCSS3D, useThree as useThreeCSS3D } from 'react-three-fiber/css3d'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { Canvas as CanvasWebGL, useFrame as useFrameWebGL, useThree as useThreeWebGL } from 'react-three-fiber'
import './styles.css'
*/

export default function App1() {
  return (
    <World />
  );
}

function DOMObject({ dom }) {
  const { scene } = useThree();
  const ref = useRef(null);
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
  useEffect(() => {
    ref.current = new CSS3DObject(dom.current);
    scene.add(ref.current);
    return () => scene.remove(ref.current);
  }, [dom, scene]);
  return null;
}

function Portal({ children }) {
  const root = useMemo(() => document.createElement('div'), []);
  return ReactDOM.createPortal(<Fragment>{children}</Fragment>, root);
}

function World() {
  const ref = useRef(null);
  return (
    <Fragment>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <DOMObject dom={ref} />
      </Canvas>
      <Portal>
        <div ref={ref}>hergftreg regello</div>
      </Portal>
    </Fragment>
  );
}
