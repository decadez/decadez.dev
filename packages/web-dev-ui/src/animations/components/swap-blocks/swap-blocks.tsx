// Generated from 2026-04-25/tips-3.html; source digest: 40d541ddf6230154375eabefb753498b3da5ee6549c8d18278453f203a6e1d00
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./swap-blocks.styles";
export type SwapBlocksAnimationProps = AnimationProps;
export const SwapBlocksAnimation = createAnimation({
  name: "SwapBlocksAnimation",
  id: "swap-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"box"}>
          <div className={"plus"} />
          <div className={"minus"} />
        </div>
      </div>
    </>
  ),
});
