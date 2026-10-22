// Generated from 2026-06-07/tips-1.html; source digest: d5d3c416b199d4db18a85692231d76aaf99ccd1faaa3052b91348fa2072ab301
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./like-burst.styles";
export type LikeBurstAnimationProps = AnimationProps;
export const LikeBurstAnimation = createAnimation({
  name: "LikeBurstAnimation",
  id: "like-burst",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"heart"}>
            <div className={"circle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"particle"} />
            <div className={"fill"} />
          </div>
        </div>
      </div>
    </>
  ),
});
