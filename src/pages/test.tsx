import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Avatar from "src/components/3d/avatar1";
const Test: NextPage = ({}) => {
  return (
    <div>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 43 }}>
        <color attach="background" args={["#ececec"]} />
        <OrbitControls />
        <Avatar position={[0, -3, 5]} scale={2} />
        <Environment preset="apartment" />
        <Scean />
      </Canvas>
    </div>
  );
};

export default Test;

const Scean = () => {
  const viewport = useThree((state) => state.viewport);
  const texture = useTexture("/assets/textures/background1.jpg");
  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
