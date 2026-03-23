import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef, useState } from "react";

function Cube({ open }) {
  const mesh = useRef();
  const hinge = useRef();
  const text = useRef();

  //   delta (the time since the last frame)
  useFrame((state, delta) => {
    // 1. Rotation before opening (Box and Lid together)
    if (!open && mesh.current) {
      mesh.current.rotation.y += delta * 0.4;
    }

    // 2. Lid opening animation (Rotate around the hinge)
    if (open && hinge.current.rotation.x > -Math.PI / 2) {
      hinge.current.rotation.x -= delta * 1.5;
    }

    // 3. Text rising animation
    if (open && text.current && text.current.position.y < 2.5) {
      text.current.position.y += delta * 1.5;
    }
  });

  const texture_1 = useLoader(TextureLoader, "./assets/fitts1.jpg");
  const texture_2 = useLoader(TextureLoader, "./assets/fitts2.jpg");
  //   const texture_3 = useLoader(TextureLoader, "./assets/formula.jpg");
  const texture_4 = useLoader(TextureLoader, "./assets/hci.jpg");
  const texture_5 = useLoader(TextureLoader, "./assets/name.png");
  const texture_6 = useLoader(TextureLoader, "./assets/image.jpeg");

  return (
    <group ref={mesh}>
      <mesh>
        <boxGeometry args={[2.5, 2, 2.5]} />
        {/* <meshStandardMaterial color={"blue"} /> */}

        <meshStandardMaterial map={texture_1} attach="material-0" />
        <meshStandardMaterial map={texture_2} attach="material-1" />
        {/* <meshStandardMaterial map={texture_3} attach="material-2" /> */}
        <meshStandardMaterial map={texture_4} attach="material-3" />
        <meshStandardMaterial map={texture_5} attach="material-4" />
        <meshStandardMaterial map={texture_6} attach="material-5" />
      </mesh>
      {/* HINGE: Placed at the back-top edge (Y=1, Z=-1.25) */}
      <group ref={hinge} position={[0, 1, -1.25]}>
        {/* THE LID (Offset so it aligns with the box body) */}
        <mesh position={[0, 0.1, 1.25]}>
          <boxGeometry args={[2.5, 0.2, 2.5]} />
          <meshStandardMaterial color={"blue"} />
        </mesh>
      </group>

      {open && (
        <Text
          ref={text}
          position={[0, 1, 0]}
          fontSize={0.4}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Advance Eid mubarak
        </Text>
      )}
    </group>
  );
}

function OpeningCube() {
  const [open, setOpen] = useState(false);
  return (
    <div className="canvas">
      <div className="controls">
        <button onClick={() => setOpen(true)} className="btn">
          Open the box
        </button>
      </div>
      <Canvas camera={{ position: [0, 2, 6] }}>
        <OrbitControls />
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 3, 2]} />

        <Cube open={open} />
      </Canvas>
    </div>
  );
}

export default OpeningCube;
