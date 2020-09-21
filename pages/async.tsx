import { NextPage } from "next";
import dynamic from "next/dynamic";

const AsyncTest = dynamic(
  () => import("../components/AsyncTest").then((mod) => mod.AsyncTest),
  { ssr: false }
);

// import { createAsset } from "use-asset"

// const asset = createAsset(async (id) => {
//   const resp = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
//   return await resp.json()
// })

// asset.preload(9001)

// const { by, title, url, text, time } = asset.read(id)

const AsyncPage: NextPage = () => {
  return (
    <AsyncTest />
  );
};

export default AsyncPage;