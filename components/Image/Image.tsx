import React, { useEffect, useRef } from "react";
import { Image as SignalImage } from "@phobon/base";

import { useCanvas } from "@/hooks/useCanvas";

import { WebGLImage } from "./WebGLImage";

export const Image = ({ src, ...props }) => {
  const ref = useRef();

  useCanvas(<WebGLImage src={src} image={ref} />);

  return (
    <SignalImage {...props} src={src} ref={ref} />
  );
};