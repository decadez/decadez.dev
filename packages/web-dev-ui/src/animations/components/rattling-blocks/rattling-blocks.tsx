// Generated from 2026-04-25/tips-2.html; source digest: 5d259cf48ba7ff2372d1b5c5a700d1c379e2b82b5a04cf1a061c88e21a7dede5
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./rattling-blocks.styles";
export type RattlingBlocksAnimationProps = AnimationProps;
export const RattlingBlocksAnimation = createAnimation({
  name: "RattlingBlocksAnimation",
  id: "rattling-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"rengas"}>
          <div className={"rengas__renga"} />
          <div className={"rengas__renga"} />
          <div className={"rengas__renga"} />
          <div className={"rengas__renga"} />
          <div className={"rengas__renga"} />
        </div>
      </div>
    </>
  ),
});
