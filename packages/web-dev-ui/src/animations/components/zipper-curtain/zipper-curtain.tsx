// Generated from 2026-05-14/tips-2.html; source digest: ebd209f160b79e8dfcaa8a8cd7f25f1467e76834ea54bee95036aadd28785f48
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./zipper-curtain.styles";
export type ZipperCurtainAnimationProps = AnimationProps;
export const ZipperCurtainAnimation = createAnimation({
  name: "ZipperCurtainAnimation",
  id: "zipper-curtain",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"clothes"}>
            <div className={"line"} />
            <div className={"cloth cloth--left"} />
            <div className={"cloth cloth--right"} />
            <div className={"zipper-wrapper"}>
              <div className={"zipper"} />
            </div>
          </div>
        </div>
      </div>
    </>
  ),
});
