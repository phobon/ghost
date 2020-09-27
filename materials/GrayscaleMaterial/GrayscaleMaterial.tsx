import React, { useRef } from "react";
import { ShaderMaterial, Color } from "three";
import { extend, useFrame } from "react-three-fiber";
import mergeRefs from "react-merge-refs";
import lerp from "lerp";

import fragmentShader from "./grayscale.glsl"

type GrayscaleMaterialType = JSX.IntrinsicElements["meshStandardMaterial"] & {
  factor: number;
  time: number;
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

// const fragmentShader = /* glsl */`
//   // #pragma glslify: noise = require(glsl-noise/simplex/2d);

//   uniform sampler2D tex;
//   uniform float time;
//   uniform float hasTexture;
//   uniform vec3 color;
//   uniform float factor;

//   varying vec2 vUv;

//   void main() {
//     // vec4 cga = texture2D(tex, vUv);

//     // float n = noise(vUv.xy);
//     // float d = 1.0 - distance(n, vec2(0.5));
//     // cga *= step(0.5, d);

//     gl_FragColor = vec4(vec3(1.0, factor, 1.0), 1.0);

//     // if (hasTexture == 1.0) {
//     //   gl_FragColor = cga;
//     // }
//     // else gl_FragColor = vec4(color, 1.0);
//   }
// `;

class GrayscaleMaterialImpl extends ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        tex: { value: null },
        hasTexture: { value: 0 },
        color: { value: new Color("#888888") },
        time: { value: 0.0 },
        factor: { value: 0.0 },
        angle: { value: 0.0 },
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

  get factor() {
    return this.uniforms.factor.value;
  }

  set factor(value) {
    this.uniforms.factor.value = value;
  }

  get time() {
    return this.uniforms.time.value;
  }

  set time(value) {
    this.uniforms.time.value = value;
  }

  get angle() {
    return this.uniforms.angle.value;
  }

  set angle(value) {
    this.uniforms.angle.value = value;
  }
}

extend({ GrayscaleMaterialImpl });

export const GrayscaleMaterial = React.forwardRef(
  ({ hovered, ...props }: any, ref) => {
    const materialRef = useRef<GrayscaleMaterialType>();
    useFrame(() => {
      materialRef.current.factor = lerp(materialRef.current.factor, hovered ? 1.0 : 0.0, 0.1);
      materialRef.current.time++;
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
