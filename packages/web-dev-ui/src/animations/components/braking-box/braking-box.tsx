// Generated from 2026-04-17/tips-4.html; source digest: 24d815f93c0d8e642659207c607d9f86e8dcadf50bccaa9172640baf9ec63e66
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./braking-box.styles";
export type BrakingBoxAnimationProps = AnimationProps;
export const BrakingBoxAnimation = createAnimation({
  name: "BrakingBoxAnimation",
  id: "braking-box",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"box"} />
      </div>
    </>
  ),
});
