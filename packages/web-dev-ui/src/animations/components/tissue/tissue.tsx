// Generated from 2026-05-14/tips-1.html; source digest: c002d10b03ff7e83f59c2bf2f14a51679a8c8a4cd55ff60746769040a3bdba50
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./tissue.styles";
export type TissueAnimationProps = AnimationProps;
export const TissueAnimation = createAnimation({
  name: "TissueAnimation",
  id: "tissue",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"tissue"}>
            <div className={"paper2"} />
            <div className={"paper1"} />
          </div>
        </div>
      </div>
    </>
  ),
});
