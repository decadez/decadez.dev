// Generated from 2026-04-29/tips-1.html; source digest: 31b861fbcff86ab2474ccb589a3aa86f87cf3527c3b47f26892dba128c29ffc1
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./scribble.styles";
export type ScribbleAnimationProps = AnimationProps;
export const ScribbleAnimation = createAnimation({
  name: "ScribbleAnimation",
  id: "scribble",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <svg className={"line"} viewBox={"0 0 48.87 48.78"}>
            <polyline
              points={
                "6.01 15.13 24.92 5.5 5.5 29.59 42.73 10.02 7.42 41.24 43.37 23.89 22.39 43.28 42.99 37.97"
              }
            />
          </svg>
        </div>
      </div>
    </>
  ),
});
