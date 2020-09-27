import React, { lazy, Suspense, useEffect, useState } from "react";

const InternalCanvas = lazy(() => import("./InternalCanvas"));

export const GlobalCanvas: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children, ...props }) => {
  const [hasMounted, setHasMounted] = useState(() => false);
  useEffect(() => setHasMounted(true), []);
  return (
    <>
      {hasMounted && (
        <Suspense fallback={null}>
          <InternalCanvas {...props} />
        </Suspense>
      )}
      {children}
    </>
  );
};