// Generated from 2026-04-18/tips-3.html; source digest: e7b877d36a84a3241889713242043b43856e3d707f44bbd151d754de592f597e
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./clattering-panel.styles";
export type ClatteringPanelAnimationProps = AnimationProps;
export const ClatteringPanelAnimation = createAnimation({
  name: "ClatteringPanelAnimation",
  id: "clattering-panel",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"panel"}>
          <div className={"panel__inner"}>
            <div className={"panel__block"} />
          </div>
        </div>
      </div>
    </>
  ),
});
