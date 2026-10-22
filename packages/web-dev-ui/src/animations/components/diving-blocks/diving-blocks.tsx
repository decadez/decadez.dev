// Generated from 2026-05-02/tips-2.html; source digest: 20d504c3f511b7bb88d3d0ba23e5acfbe1966a22576fcfcb242b54ee55790adc
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./diving-blocks.styles";
export type DivingBlocksAnimationProps = AnimationProps;
export const DivingBlocksAnimation = createAnimation({
  name: "DivingBlocksAnimation",
  id: "diving-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"ball"} />
          <div className={"bar"} />
        </div>
      </div>
    </>
  ),
});
