// Generated from 2026-05-14/tips-3.html; source digest: ad99e469f19b0a3132a5568e57b25f24094d0167feb94ef40146710f75839551
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./flip-blocks.styles";
export type FlipBlocksAnimationProps = AnimationProps;
export const FlipBlocksAnimation = createAnimation({
  name: "FlipBlocksAnimation",
  id: "flip-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"box"}>
            <div className={"left-block"} />
            <div className={"main-block"} />
          </div>
        </div>
      </div>
    </>
  ),
});
