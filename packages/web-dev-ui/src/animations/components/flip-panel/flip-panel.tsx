// Generated from 2026-04-29/tips-2.html; source digest: c8afa4c267f3c039f7fde65f872377b986fbd9f2d511da14d28fab22858dcb92
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./flip-panel.styles";
export type FlipPanelAnimationProps = AnimationProps;
export const FlipPanelAnimation = createAnimation({
  name: "FlipPanelAnimation",
  id: "flip-panel",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"box"}>
            <div className={"box__line"}>
              <div className={"box__line-inner"} />
            </div>
            <div className={"box__rect"}>
              <div className={"box__rect-inner"}>
                <div className={"box__rect-base box__rect-base--light"} />
                <div className={"box__rect-base box__rect-base--dark"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ),
});
