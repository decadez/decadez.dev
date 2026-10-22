// Generated from 2026-04-29/tips-4.html; source digest: 1dbfc3dda6b68e2de7f6e48a6afedfaa8a2e4fc241c4576bbd5b13931f28c314
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./bouncing-blocks.styles";
export type BouncingBlocksAnimationProps = AnimationProps;
export const BouncingBlocksAnimation = createAnimation({
  name: "BouncingBlocksAnimation",
  id: "bouncing-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"dots"}>
          <div className={"dots__dot"}>
            <div className={"dots__dot-inner"} />
          </div>
          <div className={"dots__dot"}>
            <div className={"dots__dot-inner"} />
          </div>
          <div className={"dots__dot"}>
            <div className={"dots__dot-inner"} />
          </div>
        </div>
      </div>
    </>
  ),
});
