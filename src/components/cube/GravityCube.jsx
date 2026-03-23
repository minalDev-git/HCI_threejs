import React, { Suspense, useRef } from "react";
import { Box, OrbitControls, Sphere, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";

const GravityCube = () => {
  // We want to make the cube jump when we click on it
  const cube = useRef();
  //To move an object in a physics engine, we apply forces to change its position
  const jump = () => {
    cube.current.applyImpulse({ x: 0, y: 7, z: 0 }, true); //we use y=7 to make the cube jump
  };
  return (
    <Canvas shadows camera={{ position: [6, 6, 6], fov: 50 }}>
      <color attach="background" args={["#ececec"]} />
      <Suspense>
        {/* Default gravity setting is Earth */}
        <Physics debug gravity={[0, -9.81, 0]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[-10, 10, 0]} />
          <OrbitControls />
          {/*RigidBody is an Object in the physics engine that behaves like a object in real world. 
          With properties like mass and friction,it determines how it moves and interact with other objects*/}
          <RigidBody position={[0, 1, 0]} ref={cube}>
            <Box
              // we would need a refernce to our cube
              onClick={jump}
            >
              <meshStandardMaterial color={"royalblue"} />
            </Box>
          </RigidBody>
          {/* Floor */}
          <RigidBody type="fixed" restitution={1.5}>
            <Box position={[0, 0, 0]} args={[10, 1, 10]}>
              <meshStandardMaterial color="springgreen" />
            </Box>
          </RigidBody>

          {/* Back Wall */}
          <RigidBody type="fixed">
            <Box position={[0, 1, -5]} args={[10, 1, 1]}>
              <meshStandardMaterial color="lightgray" />
            </Box>
          </RigidBody>

          {/* Front Wall */}
          <RigidBody type="fixed">
            <Box position={[0, 1, 5]} args={[10, 1, 1]}>
              <meshStandardMaterial color="lightgray" />
            </Box>
          </RigidBody>

          {/* Left Wall */}
          <RigidBody type="fixed">
            <Box position={[-5, 1, 0]} args={[1, 1, 10]}>
              <meshStandardMaterial color="lightgray" />
            </Box>
          </RigidBody>

          {/* Right Wall */}
          <RigidBody type="fixed">
            <Box position={[5, 1, 0]} args={[1, 1, 10]}>
              <meshStandardMaterial color="lightgray" />
            </Box>
          </RigidBody>
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default GravityCube;
