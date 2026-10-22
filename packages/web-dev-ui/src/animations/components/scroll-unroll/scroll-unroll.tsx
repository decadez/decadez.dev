// Generated from 2026-04-25/tips-1.html; source digest: 567ebf6233db776c5d270c4d52471a0a961260f1359626c74ca27e186e6bf3c8
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./scroll-unroll.styles";
export type ScrollUnrollAnimationProps = AnimationProps;
export const ScrollUnrollAnimation = createAnimation({
  name: "ScrollUnrollAnimation",
  id: "scroll-unroll",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"makimono"}>
          <div className={"makimono__title"}>
            <span>{"タ"}</span>
            <span>{"イ"}</span>
            <span>{"ト"}</span>
            <span>{"ル"}</span>
          </div>
          <div className={"makimono__line"} />
          <div className={"makimono__roll"} />
        </div>
      </div>
    </>
  ),
});
