// Generated from 2026-04-18/tips-1.html; source digest: 9836d58fbf47352231f2867437224f52b18942a44e447d668643e89e0207c30c
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./stacking-blocks.styles";
export type StackingBlocksAnimationProps = AnimationProps;
export const StackingBlocksAnimation = createAnimation({
  name: "StackingBlocksAnimation",
  id: "stacking-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"tsumiki"}>
          <div className={"tsumiki__large-ball"} />
          <div className={"tsumiki__bar"} />
          <div className={"tsumiki__small-ball"} />
        </div>
      </div>
    </>
  ),
});
