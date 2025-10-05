import { Metadata } from "next";

import { defaultMeta } from "@src/shared/meta";
import Home from "./Home";

export const metadata: Metadata = {
  ...defaultMeta,
};

export default function Page() {
  return <Home />;
}
