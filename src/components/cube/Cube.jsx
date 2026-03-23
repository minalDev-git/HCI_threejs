import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef } from "react";

function RotatingCube() {
  //creating the reference to the cube.
  const mesh = useRef();

  //Animation on the cube
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.4;
    mesh.current.rotation.y += delta * 0.4;
    mesh.current.rotation.z += delta * 0.4;
  });

  // Images on each face of the cube
  const texture_1 = useLoader(TextureLoader, "./assets/fitts1.jpg");
  const texture_2 = useLoader(TextureLoader, "./assets/fitts2.jpg");
  const texture_3 = useLoader(TextureLoader, "./assets/formula.jpg");
  const texture_4 = useLoader(TextureLoader, "./assets/hci.jpg");
  const texture_5 = useLoader(TextureLoader, "./assets/name.png");
  const texture_6 = useLoader(TextureLoader, "./assets/image.jpeg");

  return (
    <mesh ref={mesh}>
      {/* width height depth */}
      <boxGeometry args={[2.5, 2.5, 2.5]} />

      <meshStandardMaterial map={texture_1} attach="material-0" />
      <meshStandardMaterial map={texture_2} attach="material-1" />
      <meshStandardMaterial map={texture_3} attach="material-2" />
      <meshStandardMaterial map={texture_4} attach="material-3" />
      <meshStandardMaterial map={texture_5} attach="material-4" />
      <meshStandardMaterial map={texture_6} attach="material-5" />
    </mesh>
  );
}

function Cube() {
  return (
    <div className="canvas">
      <Canvas camera={{ position: [0, 2, 5] }}>
        {/* 
          OrbitControls is used to easily add interactive
        camera controls to a React Three Fiber scene, allowing users to orbit
        (rotate), zoom, and pan around a 3D target using mouse or touch input.
         */}
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={2} />
        <directionalLight position={[2, 1, 1]} />
        <RotatingCube />
      </Canvas>
    </div>
  );
}

export default Cube;
