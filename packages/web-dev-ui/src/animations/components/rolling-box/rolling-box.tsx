// Generated from 2026-04-17/tips-3.html; source digest: a4ec215ab88d5045efa5a9f99b585fd82abe271f912f0f6705995d9b84f02962
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./rolling-box.styles";
export type RollingBoxAnimationProps = AnimationProps;
export const RollingBoxAnimation = createAnimation({
  name: "RollingBoxAnimation",
  id: "rolling-box",
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
