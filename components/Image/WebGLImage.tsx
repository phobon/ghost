import { useRef, useState, useLayoutEffect } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame, useUpdate } from "react-three-fiber";
import { useEffect } from "react";
import lerp from "lerp";

import { NoisePatchMaterial } from "@/materials/NoisePatchMaterial";
// import { NoiseWaveMaterial } from "@/materials/NoiseWaveMaterial";

export const WebGLImage = ({ src, image, width, height, ...props }) => {
  // This component is responsible for:
  // - Hiding the underlying image
  // - Determining the dimensions for the mesh
  // - Loading the resource
  // - Returning details to add to the scene
  // const meshRef = useRef<any>();
  const [attributes, setAttributes] = useState(() => null);
  const [hovered, setHovered] = useState(() => false);
  const [angle, setAngle] = useState(() => Math.random());

  // Load the texture and create a basic mesh
  const texture = useLoader(TextureLoader, src);

  // Hide the original image
  useLayoutEffect(() => {
    if (!image) {
      return;
    }

    const { x, y, width, height } = image.current.getBoundingClientRect();
    console.log(image.current.getBoundingClientRect());
    image.current.style.opacity = 0;

    setAttributes({ x, y, width, height });
  }, [image]);

  useEffect(() => {
    image.current.addEventListener("pointerover", () => setHovered(true));
    image.current.addEventListener("pointerout", () => setHovered(false));
    () => {
      image.current.removeEventListener("pointerover");
      image.current.removeEventListener("pointerout");
    };
  }, []);

  const meshRef = useUpdate(
    (m: any) => {
      // The x position shouldn't need to change much at all
      // The y position is affected by scroll position
      const { x, y, width, height } = attributes;
      const offsetX = x - width / 2 - 8;
      const offsetY = y + (window.innerHeight - height) / 2;
      m.position.x = offsetX;
      m.position.y = offsetY;
    },
    [attributes]
  );

  const geomRef = useRef();

  useFrame(() => {
    // geomRef.current.scale.x = lerp(geomRef.current.scale.x, 1.0, 0.1);
    // geomRef.current.scale.y = lerp(geomRef.current.scale.y, 1.0, 0.1);

    meshRef.current.scale.x = lerp(meshRef.current.scale.x, 1.0, 0.2);
    meshRef.current.scale.y = lerp(meshRef.current.scale.y, 1.0, 0.2);
  });

  return (
    attributes && (
      <group ref={geomRef} scale={[1, 1, 1]}>
        <mesh
          {...props}
          key={`WebGLImage__${src}`}
          scale={[3, 3, 1]}
          ref={meshRef}
          position={[0, 0, 1]}
        >
          <planeBufferGeometry
            attach="geometry"
            args={[attributes.width, attributes.height, 32, 32]}
          />
          <NoisePatchMaterial
            color={"white"}
            map={texture}
            hovered={hovered}
            angle={angle}
          />
        </mesh>
      </group>
    )
  );
};
