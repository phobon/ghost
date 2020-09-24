import React, { useRef } from "react";
import { ShaderMaterial, Color } from "three";
import { extend, useFrame } from "react-three-fiber";
import mergeRefs from "react-merge-refs";

type GrayscaleMaterialType = JSX.IntrinsicElements["meshStandardMaterial"] & {
};

declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface IntrinsicElements {
      grayscaleMaterialImpl: GrayscaleMaterialType;
    }
  }
}

const vertexShader = /* glsl */`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  } 
`;

const fragmentShader = /* glsl */`
  uniform sampler2D tex;
  uniform float hasTexture;
  uniform vec3 color;

  varying vec2 vUv;

  void main() {
    // Create 3 texture buffers, each at a different offset (essentially the normal and 2 copies)
    vec4 cga = texture2D(tex, vUv);

    if (hasTexture == 1.0) {
      gl_FragColor = cga;
    }
    else gl_FragColor = vec4(color, 1.0);
  }
`;

class GrayscaleMaterialImpl extends ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        tex: { value: null },
        hasTexture: { value: 0 },
        color: { value: new Color("#888888") },
      },
    });
  }

  set map(value) {
    this.uniforms.hasTexture.value = !!value;
    this.uniforms.tex.value = value;
  }

  get map() {
    return this.uniforms.tex.value;
  }

  get color() {
    return this.uniforms.color.value;
  }
}

extend({ GrayscaleMaterialImpl });

export const GrayscaleMaterial = React.forwardRef(
  ({ ...props }: any, ref) => {
    const materialRef = useRef<GrayscaleMaterialType>();

    useFrame(() => {
    });

    return (
      <grayscaleMaterialImpl
        ref={mergeRefs([ref, materialRef])}
        attach="material"
        {...props}
      />
    );
  }
);
