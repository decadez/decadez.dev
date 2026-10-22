// Generated from 2026-05-02/tips-1.html; source digest: 33c4eb50403460ecbde45b36d082555efc735b6da233f67cefa2bfb04eb849a0
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./scale-blocks.styles";
export type ScaleBlocksAnimationProps = AnimationProps;
export const ScaleBlocksAnimation = createAnimation({
  name: "ScaleBlocksAnimation",
  id: "scale-blocks",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"wrapper"}>
          <div className={"box"}>
            <div className={"box__arrow-wrapper"}>
              <div className={"arrow arrow--expand"}>
                <div className={"arrow__sharp arrow__sharp--top"} />
                <div className={"arrow__sharp arrow__sharp--bottom"} />
              </div>
            </div>
          </div>
          <div className={"box"}>
            <div className={"box__arrow-wrapper"}>
              <div className={"arrow arrow--compress"}>
                <div className={"arrow__bar arrow__bar--top"} />
                <div className={"arrow__bar arrow__bar--bottom"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ),
});
