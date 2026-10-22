// Generated from 2026-04-17/tips-1.html; source digest: cf83385bf5ff42d8077c7deeb59423f0d34770be12b99f3860777ff6fb3790cf
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./pop-ball.styles";
export type PopBallAnimationProps = AnimationProps;
export const PopBallAnimation = createAnimation({
  name: "PopBallAnimation",
  id: "pop-ball",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"ball"} />
      </div>
    </>
  ),
});
