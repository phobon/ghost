import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { useAtom } from "jotai";

import { sceneTreeAtom } from "@/atoms/sceneTree";

const canvasStyles: any = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
};

// const SceneTree: React.FunctionComponent<any> = () => {
//   const [sceneTree, setSceneTree] = useAtom<any>(sceneTreeAtom);
//   return sceneTree.map((MeshComponent, i) => <MeshComponent key={`meshComponent__${i}`} />);
// };

export const GlobalCanvas: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children, ...props }) => {
  const [sceneTree, setSceneTree] = useAtom<any>(sceneTreeAtom);
  return (
    <>
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 500] }}
        colorManagement
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl, scene, events }) => {
          gl.toneMappingExposure = 2.5;
        }}
        style={canvasStyles}
        {...props}>
        <Suspense fallback={null}>
          {sceneTree}
        </Suspense>
        {/* <SceneTree /> */}
        {/* {sceneTree.map((Mesh, i) => {
          console.log(Mesh);
          return (
            <Mesh key={`meshComponent__${i}`} />
          );
        })} */}
      </Canvas>
      {children}
    </>
  );
};