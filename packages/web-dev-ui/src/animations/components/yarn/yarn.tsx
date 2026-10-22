// Generated from 2026-04-22/tips-4.html; source digest: 0e0964d3fca20038871dfb45055b47dfb5f47a8fb678f3f78c9983bbfec9e70f
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./yarn.styles";
export type YarnAnimationProps = AnimationProps;
export const YarnAnimation = createAnimation({
  name: "YarnAnimation",
  id: "yarn",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"yarns"}>
          <div className={"yarns__inner"}>
            <div className={"yarns__yarn"} />
            <div className={"yarns__yarn"} />
            <div className={"yarns__yarn"} />
            <div className={"yarns__yarn"} />
            <div className={"yarns__yarn"} />
          </div>
        </div>
        <div className={"yarns__inner"}>
          <div className={"yarns__yarn"} />
          <div className={"yarns__yarn"} />
          <div className={"yarns__yarn"} />
          <div className={"yarns__yarn"} />
          <div className={"yarns__yarn"} />
        </div>
      </div>
    </>
  ),
});
