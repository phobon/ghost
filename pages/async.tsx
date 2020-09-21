import { NextPage } from "next";
import dynamic from "next/dynamic";

const AsyncTest = dynamic(
  () => import("../components/AsyncTest").then((mod) => mod.AsyncTest),
  { ssr: false }
);

const AsyncPage: NextPage = () => {
  return (
    <AsyncTest />
  )
};

export default AsyncPage;