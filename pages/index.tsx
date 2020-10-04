import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { Box, Text, Grid, Card } from "@phobon/base";

import { Image } from "@/components/Image";

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
      {/* <Grid fullWidth gridTemplateColumns="repeat(2, 1fr)" gridTemplateRows="auto" gridGap={3}>
        <Image src="static/testimage.jpeg" width="100%" height={400} />
        <Image src="static/testimage.jpeg" width="100%" height={400} />
      </Grid> */}
      <Box width={50} height={50} bg="purples.7" />
      <Text>{count}</Text>
      <button onClick={() => setCount((c) => c + 1)}>one up</button>
    </>
  );
};

export default IndexPage;
