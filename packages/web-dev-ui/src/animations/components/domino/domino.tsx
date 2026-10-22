// Generated from 2026-04-18/tips-2.html; source digest: 2a9cb56232f66dc0ee41960574c9f7fd0791c777e43985618ce24eee8beea072
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./domino.styles";
export type DominoAnimationProps = AnimationProps;
export const DominoAnimation = createAnimation({
  name: "DominoAnimation",
  id: "domino",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"domino"}>
          <div className={"domino__block"} />
          <div className={"domino__block"} />
          <div className={"domino__block"} />
          <div className={"domino__block"} />
        </div>
      </div>
    </>
  ),
});
