// Generated from 2026-05-14/tips-4.html; source digest: c640c68ac093846d5c050356c0977cf0047616942ea7becddbc7231c4bf5d733
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./headphones.styles";
export type HeadphonesAnimationProps = AnimationProps;
export const HeadphonesAnimation = createAnimation({
  name: "HeadphonesAnimation",
  id: "headphones",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"box"}>
            <div className={"headphone"} />
          </div>
        </div>
      </div>
    </>
  ),
});
