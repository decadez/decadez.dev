// Generated from 2026-04-22/tips-3.html; source digest: 0ad2c0dd1b43d78c57086cf2a0153394a0864b1f8f01898ecb6758613e634034
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./paint-lines.styles";
export type PaintLinesAnimationProps = AnimationProps;
export const PaintLinesAnimation = createAnimation({
  name: "PaintLinesAnimation",
  id: "paint-lines",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"lines"}>
          <div className={"lines__line"} />
          <div className={"lines__line"} />
          <div className={"lines__line"} />
          <div className={"lines__line"} />
        </div>
      </div>
    </>
  ),
});
