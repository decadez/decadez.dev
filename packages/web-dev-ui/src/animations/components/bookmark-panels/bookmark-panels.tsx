// Generated from 2026-06-08/tips-2.html; source digest: c33c005baf4b1b9c6a2a7ba8115fd5aa5059e591aaadb2cbe9aaec0df7bf23ec
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./bookmark-panels.styles";
export type BookmarkPanelsAnimationProps = AnimationProps;
export const BookmarkPanelsAnimation = createAnimation({
  name: "BookmarkPanelsAnimation",
  id: "bookmark-panels",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"box"}>
          <div className={"scene"}>
            <div className={"bookmark"}>
              <div className={"bookmark__shape bookmark__shape--base"} />
            </div>
            <div className={"panel panel--pink"} />
            <div className={"panel panel--white"} />
            <div className={"panel panel--blush"}>
              <div className={"bookmark"}>
                <div className={"bookmark__shape bookmark__shape--main"} />
              </div>
            </div>
            <div className={"shine"} />
          </div>
        </div>
      </div>
    </>
  ),
});
