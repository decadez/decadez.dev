// Generated from 2026-05-02/tips-3.html; source digest: 4b3f190aed437d0f29880ef2b4a7afc5aee4508eb4a0848489b0d9b9cd0f4976
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./download-bars.styles";
export type DownloadBarsAnimationProps = AnimationProps;
export const DownloadBarsAnimation = createAnimation({
  name: "DownloadBarsAnimation",
  id: "download-bars",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"box"}>
            <div className={"download"}>
              <div className={"download__arrow"} />
              <div className={"download__bottom"} />
            </div>
          </div>
          <div className={"box"}>
            <div className={"chart"}>
              <div className={"chart__line"} />
              <div className={"chart__line"} />
              <div className={"chart__line"} />
            </div>
          </div>
        </div>
      </div>
    </>
  ),
});
