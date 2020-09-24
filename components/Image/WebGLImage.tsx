import { useRef, useState, useLayoutEffect } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "react-three-fiber";
import { useEffect } from "react";
import { useAtom } from "jotai";

import { countAtom } from "@/atoms/count";

import { GrayscaleMaterial } from "@/materials/GrayscaleMaterial";

export const WebGLImage = ({ src, image, ...props }) => {
  // This component is responsible for:
  // - Hiding the underlying image
  // - Determining the dimensions for the mesh
  // - Loading the resource
  // - Returning details to add to the scene
  const mesh = useRef();
  const [attributes, setAttributes] = useState(() => null);

  // Load the texture and create a basic mesh
  const texture = useLoader(TextureLoader, src);

  // Hide the original image
  useEffect(() => {
    if (!image) {
      return;
    }
  
    const { x, y, width, height } = image.current.getBoundingClientRect();
    image.current.style.opacity = 0;

    setAttributes({ x, y, width, height });
  }, [image]);

  useFrame(() => {
    // The x position shouldn't need to change much at all
    // The y position is affected by scroll position
    const { x, y, width, height } = attributes;
    const offsetX = ((window.innerWidth - x) / 2) - (width / 2);
    const offsetY = ((window.innerHeight - y) / 2) - (height / 2);
    mesh.current.position.x = -offsetX;
    mesh.current.position.y = offsetY;
  });

  return attributes && (
    <mesh
      {...props}
      key={`WebGLImage__${src}`}
      scale={[1, 1, 1]}
      ref={mesh}
      frustumCulled={false}
      position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[attributes.width, attributes.height, 32, 32]} />
      <GrayscaleMaterial
        color={"white"}
        map={texture}
      />
    </mesh>
  );
};