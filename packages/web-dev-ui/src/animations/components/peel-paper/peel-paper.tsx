// Generated from 2026-04-17/tips-2.html; source digest: 842ce962b4c3b3608cd9c2656eba33355249dc5fb9e8e54acca73b43dc2644f3
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./peel-paper.styles";
export type PeelPaperAnimationProps = AnimationProps;
export const PeelPaperAnimation = createAnimation({
  name: "PeelPaperAnimation",
  id: "peel-paper",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"box"}>
          <div className={"box__paper"}>
            <div className={"box__text"}>{"A"}</div>
          </div>
        </div>
      </div>
    </>
  ),
});
