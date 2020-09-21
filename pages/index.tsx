import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { Box, Text } from "@phobon/base";

import { countAtom } from "@/atoms";

const IndexPage: NextPage = () => {
  const [data, setData] = useState([]);

  const [count, setCount] = useAtom(countAtom);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/users");
      const newData = await res.json();
      setData(newData);
    }

    getData();
  }, []);

  return (
    <>
      <Box width={50} height={50} bg="purples.7" />
      <Text>{count}</Text>
      <button onClick={() => setCount(c => c + 1)}>one up</button>
    </>
  );
};

export default IndexPage;
