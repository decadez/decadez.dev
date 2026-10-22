// Generated from 2026-05-02/tips-4.html; source digest: 35b86488dd84bf6dd9fdcd52f551385a71499b761640838fd266a9ece950a788
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./rotating-blocks.styles";
export type RotatingBlocksAnimationProps = AnimationProps;
export const RotatingBlocksAnimation = createAnimation({
  name: "RotatingBlocksAnimation",
  id: "rotating-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"box"}>
            <div className={"box__big"} />
            <div className={"box__small"} />
            <div className={"box__orbit"}>
              <div className={"box__large"} />
            </div>
          </div>
        </div>
      </div>
    </>
  ),
});
