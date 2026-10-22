// Generated from 2026-06-08/tips-1.html; source digest: c4a7e270cb4381093249c050d62cee006d2fc6737ea00451af15f5d7de6f2d58
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./bookmark-fold.styles";
export type BookmarkFoldAnimationProps = AnimationProps;
export const BookmarkFoldAnimation = createAnimation({
  name: "BookmarkFoldAnimation",
  id: "bookmark-fold",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"box"}>
          <div className={"scene"}>
            <div className={"scene__bg"} />
            <div className={"scene__bg scene__bg--alt"} />
            <div className={"marks"}>
              <div className={"marks__inner"}>
                <div className={"mark mark--1"} />
                <div className={"marks__main"}>
                  <div className={"mark mark--2"} />
                  <div className={"mark mark--3"} />
                  <div className={"mark mark--4"} />
                </div>
              </div>
            </div>
            <div className={"kira kira--1"} />
            <div className={"kira kira--2"} />
            <div className={"kira kira--3"} />
            <div className={"kira kira--4"} />
          </div>
        </div>
      </div>
    </>
  ),
});
