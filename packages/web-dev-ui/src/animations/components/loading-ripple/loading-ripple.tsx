// Generated from 2025-03-11/loading-2.svg; source digest: f6c2ba0c47a0aad3cc23f88c4bd9eff0bd6218d255972fb0bff4b8e2b261afc7
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./loading-ripple.styles";
export type LoadingRippleAnimationProps = AnimationProps;
export const LoadingRippleAnimation = createAnimation({
  name: "LoadingRippleAnimation",
  id: "loading-ripple",
  width: 132,
  height: 132,
  css: styles,
  render: (instanceId) => (
    <>
      <div className="container">
        <div className="loader">
          <svg
            width={"35"}
            height={"35"}
            viewBox={"0 0 35 35"}
            xmlns={"http://www.w3.org/2000/svg"}
          >
            <defs>
              <symbol id={`${instanceId}-loading-ripple-circle`}>
                <circle cx={"17.5"} cy={"17.5"} r={"17.5"} />
              </symbol>
            </defs>
            <g>
              <use
                className={"circle"}
                href={`#${instanceId}-loading-ripple-circle`}
              />
              <use
                className={"circle"}
                href={`#${instanceId}-loading-ripple-circle`}
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  ),
});
