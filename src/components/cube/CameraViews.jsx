import React from "react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  OrthographicCamera,
  Text,
} from "@react-three/drei";

const CameraViews = () => {
  /* We would now be specific about what kind of camera we'll be using & 
  what's going to be the zoom value on the objects.
  We should also be able to control the angle of the camera, is it going to be wider or closer to the objects. 
  */

  const [cameraType, setCameraType] = useState("perspective");
  const [zoom, setZoom] = useState(50);
  const [fov, setFOV] = useState(50);
  return (
    <div className="scene-layout">
      <div className="canvas">
        <div className="controls">
          <button
            onClick={() => {
              setCameraType((prev) =>
                prev === "perspective" ? "orthographic" : "perspective",
              );
            }}
            className="btn"
          >
            {cameraType}
          </button>
          {cameraType === "perspective" ? (
            <div>
              <label>FOV</label>
              <input
                type="range"
                min="20"
                max="120"
                value={fov}
                onChange={(e) => setFOV(Number(e.target.value))}
              ></input>
            </div>
          ) : (
            <div>
              <label>Zoom</label>
              <input
                type="range"
                min="20"
                max="120"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              ></input>
            </div>
          )}
        </div>
        <Canvas>
          {/* 
        Attach the color to the background of this Canvas,
        Specify the color of the background of the Cavas in the args 
        */}
          <color attach="background" args={["#2F3441"]}></color>

          {/* 
            To create the objects inside the canvas we use the mesh component.
            the origin is at the center of canvas 
        */}
          {cameraType === "perspective" ? (
            <PerspectiveCamera position={[3, 4, 4]} makeDefault fov={fov} />
          ) : (
            <OrthographicCamera position={[3, 4, 4]} makeDefault zoom={zoom} />
          )}
          <gridHelper args={[20, 20]} />

          <axesHelper args={[5]} />
          <Text position={[5.2, 0, 0]} fontSize={0.4} color="white">
            X
          </Text>

          <Text position={[0, 5.2, 0]} fontSize={0.4} color="white">
            Y
          </Text>

          <Text position={[0, 0, 5.2]} fontSize={0.4} color="white">
            Z
          </Text>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 64, 64]}></sphereGeometry>
            <meshStandardMaterial
              color="royalBlue"
              roughness={0.3}
              metalness={0.3}
            ></meshStandardMaterial>
          </mesh>
          {/* cubes on the x-axis */}
          <mesh position={[3, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial
              color="green"
              roughness={0.3}
              metalness={0.3}
            ></meshStandardMaterial>
          </mesh>
          <mesh position={[-3, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial
              color="orange"
              roughness={0.3}
              metalness={0.3}
            ></meshStandardMaterial>
          </mesh>
          {/* cubes on the y-axis */}
          <mesh position={[0, 3, 0]}>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial
              color="red"
              roughness={0.3}
              metalness={0.3}
            ></meshStandardMaterial>
          </mesh>
          <mesh position={[0, -3, 0]}>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial
              color="purple"
              roughness={0.3}
              metalness={0.3}
            ></meshStandardMaterial>
          </mesh>
          {/* cubes on the z-axis */}
          <mesh position={[0, 0, 3]}>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial
              color="yellow"
              roughness={0.3}
              metalness={0.3}
            ></meshStandardMaterial>
          </mesh>
          <mesh position={[0, 0, -3]}>
            <boxGeometry args={[1, 1, 1]}></boxGeometry>
            <meshStandardMaterial
              color="pink"
              roughness={0.3}
              metalness={0.3}
            ></meshStandardMaterial>
          </mesh>
          <OrbitControls />
          <directionalLight></directionalLight>
          <ambientLight></ambientLight>
          <pointLight></pointLight>
        </Canvas>
      </div>
      {cameraType === "perspective" ? (
        <div className="camera-description">
          <h2>Perspective Camera</h2>
          <p>
            A perspective camera mimics how the human eye sees the world.
            Objects that are farther away appear smaller, while closer objects
            appear larger. This creates a realistic depth effect; Here, If I
            cahnge the
            <b> Field of View (FOV)</b>, this actually changing how wide the
            camera is going to capture the view. if we widen the camera angle,
            it's similar to taking the camera far away from the objects. So the
            objects start looking smaller. In Perspective Camera, when objects
            go farther away, parallel lines appear to meet at a point. This is
            called a vanishing point. They are actually parallel, but they look
            like they meet in the distance. This happens because a Perspective
            Camera simulates real-world vision.
            <br />
            There are 4 parameters that can be controlled:
          </p>
          <ul>
            <li>The FOV (in vertical degrees)</li>
            <li>The Aspect Ratio, which is image width / image height</li>
            <li>The distance from the camera the object starts to appear</li>
            <li>The distance from the camera the object stops appearing</li>
          </ul>
          <p>
            Perspective Camera distorts the dimensions of the objects based on
            the FOV.
          </p>
        </div>
      ) : (
        <div className="camera-description">
          <h2>Orthographic Camera</h2>
          <p>
            An Orthographic Camera displays objects without perspective
            distortion. This means that objects remain the same size regardless
            of their distance from the camera. Unlike a perspective camera,
            parallel lines remain parallel and do not converge. Distance does
            not affect scale and parallel lines stay parallel. An Orthographic
            Camera uses parallel projection which means Rays from the camera are
            parallel and no vanishing point.
            <br />
            The camera position is fixed but the <b>Zoom</b> is changed when I
            change the value of zoom. We can zoom in or zoom out. all the boxes
            are looking similar in size, doesn't matter what the zoom is. So
            it's not actually distorting the size of the objects relative to
            each other.
          </p>
          <ul></ul>
        </div>
      )}
    </div>
  );
};

export default CameraViews;
