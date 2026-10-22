// Generated from 2026-04-25/tips-4.html; source digest: 451ef20fbd69373ce77011822293fc721528fddbcd69848fbf17df5deadcfcec
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./ripple.styles";
export type RippleAnimationProps = AnimationProps;
export const RippleAnimation = createAnimation({
  name: "RippleAnimation",
  id: "ripple",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"ripple"} />
      </div>
    </>
  ),
});
