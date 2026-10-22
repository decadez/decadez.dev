// Generated from 2026-04-22/tips-2.html; source digest: beb78b4987c67c5bc4cc6db4b34f56926084c55f381009818ba27f02e80c631b
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./stage-curtain.styles";
export type StageCurtainAnimationProps = AnimationProps;
export const StageCurtainAnimation = createAnimation({
  name: "StageCurtainAnimation",
  id: "stage-curtain",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"curtain"}>
          <div className={"curtain__left"} />
          <div className={"curtain__right"} />
        </div>
      </div>
    </>
  ),
});
