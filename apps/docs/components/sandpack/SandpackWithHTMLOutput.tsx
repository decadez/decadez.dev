import type { ComponentProps } from "react";
import SandpackRoot from "./SandpackRoot";

export default function SandpackWithHTMLOutput(
  props: ComponentProps<typeof SandpackRoot>
) {
  return <SandpackRoot {...props} />;
}
