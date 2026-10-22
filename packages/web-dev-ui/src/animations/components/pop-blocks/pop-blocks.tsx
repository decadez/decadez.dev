// Generated from 2026-04-18/tips-4.html; source digest: 7c3484355e844b63b689a3b26191a0c45acf2ce8b95f757525714920d3b9b0ba
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./pop-blocks.styles";
export type PopBlocksAnimationProps = AnimationProps;
export const PopBlocksAnimation = createAnimation({
  name: "PopBlocksAnimation",
  id: "pop-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"box"}>
          <div className={"box__block"} />
          <div className={"box__block"} />
        </div>
      </div>
    </>
  ),
});
