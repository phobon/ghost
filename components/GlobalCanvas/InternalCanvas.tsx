import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { useAtom } from "jotai";

import { sceneTreeAtom } from "@/atoms/sceneTree";

const canvasStyles: any = {
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

const InternalCanvas: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children, ...props }) => {
  const [sceneTree, setSceneTree] = useAtom<any>(sceneTreeAtom);
  
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 500] }}
      colorManagement
      gl={{ alpha: true, antialias: true }}
      style={canvasStyles}
      {...props}>
      <Suspense fallback={null}>
        {sceneTree}
      </Suspense>
    </Canvas>
  );
};

export default InternalCanvas;