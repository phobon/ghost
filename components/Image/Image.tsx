import React, { lazy, useEffect, useRef } from "react";
import { Image as SignalImage } from "@phobon/base";

import { useCanvas } from "@/hooks/useCanvas";

import { WebGLImage } from "./WebGLImage";
// const WebGLImage = lazy(() => import("./WebGLImage"));

export const Image = ({ src, width, height, ...props }) => {
  const ref = useRef();

  useCanvas(<WebGLImage width={width} height={height} src={src} image={ref} />);

  return (
    <SignalImage width={width} height={height} {...props} src={src} ref={ref} />
  );
};