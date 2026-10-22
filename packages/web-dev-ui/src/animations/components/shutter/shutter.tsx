// Generated from 2026-04-22/tips-1.html; source digest: be1086c5dd7c9e2ff50c2fc0a8e016072cba53ec46b08c1ad867c18977bcdcfd
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./shutter.styles";
export type ShutterAnimationProps = AnimationProps;
export const ShutterAnimation = createAnimation({
  name: "ShutterAnimation",
  id: "shutter",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"shutter"}>
          <div className={"shutter__block"} />
          <div className={"shutter__block"} />
          <div className={"shutter__block"} />
          <div className={"shutter__block"} />
          <div className={"shutter__handle"} />
        </div>
      </div>
    </>
  ),
});
