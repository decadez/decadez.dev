// Generated from 2026-04-29/tips-3.html; source digest: 9ad5882adc325e761d64e558192e1a3041c8a0b42ab9fd51ec77af4528aa1c6a
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./folding-panel.styles";
export type FoldingPanelAnimationProps = AnimationProps;
export const FoldingPanelAnimation = createAnimation({
  name: "FoldingPanelAnimation",
  id: "folding-panel",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"box"}>
            <div className={"box__line-right"}>
              <div className={"box__line-top"}>
                <div className={"box__line-left"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ),
});
