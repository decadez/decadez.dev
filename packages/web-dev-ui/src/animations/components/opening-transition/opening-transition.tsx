// Generated from 2025-02-25/index.html; source digest: 3a92f90015494ff8b2d2d70434870307670066260f54b1f25871b0fceacef4df
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./opening-transition.styles";
export type OpeningTransitionAnimationProps = AnimationProps;
export const OpeningTransitionAnimation = createAnimation({
  name: "OpeningTransitionAnimation",
  id: "opening-transition",
  width: 500,
  height: 500,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"transition-1"} />
        <div className={"transition-2"} />
        <div className={"transition-3"} />
        <div className={"transition-4"}>
          <div className={"transition-4__block"} />
          <div className={"transition-4__block"} />
          <div className={"transition-4__block"} />
          <div className={"transition-4__block"} />
          <div className={"transition-4__block"} />
        </div>
        <div className={"title"}>
          <span>{"自分がよく使う"}</span>
          <span>{"CSSアニメーション"}</span>
        </div>
      </div>
    </>
  ),
});
