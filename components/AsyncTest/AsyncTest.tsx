import React, { Suspense } from "react";
import { useAtom } from "jotai";
import { Text } from "@phobon/base";

import { fetchCountAtom } from "@/atoms";

const Controls = ({ url }) => {
  const [count, compute] = useAtom(fetchCountAtom);
  return (
    <>
      {count}
      <button onClick={() => compute(url)}>compute</button>
    </>
  );
};

export const AsyncTest = ({ url = "api/count" }) => {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <Controls url={url} />
    </Suspense>
  )
};