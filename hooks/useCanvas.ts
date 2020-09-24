// import { useThree } from "react-three-fiber";
// import { useEffect } from "react";
import { useAtom } from "jotai";

import { sceneTreeAtom } from "@/atoms/sceneTree";
import { useEffect } from "react";

export const useCanvas = (element) => {
  const [scene, setScene] = useAtom(sceneTreeAtom);
  // const { scene, ...rest } = useThree();
  // useThree can be a fallback here potentially, but this will very
  // likely not work because the CanvasContext is not available

  useEffect(() => {
    setScene(s => [...s, element]);
  }, []);

  // useEffect(() => {
  //   if (!scene.add) {
  //     return;
  //   }

  //   scene.add(element);

  //   return () => {
  //     scene.remove(element);
  //   };
  // }, [scene]);
};