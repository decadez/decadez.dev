// Generated from 2026-06-08/tips-3.html; source digest: d0bb566cee380a8468e8ce86041e83a8197b849fb499914db5d69f90bd2aad70
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./bookmark-slide.styles";
export type BookmarkSlideAnimationProps = AnimationProps;
export const BookmarkSlideAnimation = createAnimation({
  name: "BookmarkSlideAnimation",
  id: "bookmark-slide",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"box"}>
          <div className={"scene"}>
            <div className={"bg"} />
            <div className={"marks marks--1"}>
              <div className={"mark mark--1"} />
            </div>
            <div className={"marks marks--2"}>
              <div className={"mark mark--2"} />
            </div>
            <div className={"marks marks--3"}>
              <div className={"mark mark--3"} />
            </div>
          </div>
        </div>
      </div>
    </>
  ),
});
