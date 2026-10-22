// Generated from 2025-03-11/loading-4.svg; source digest: 1a70d42fbb00f1617c53d000bf8346355845c6b19f6c0b0529a8f61815554964
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./loading-squares.styles";
export type LoadingSquaresAnimationProps = AnimationProps;
export const LoadingSquaresAnimation = createAnimation({
  name: "LoadingSquaresAnimation",
  id: "loading-squares",
  width: 132,
  height: 132,
  css: styles,
  render: (instanceId) => (
    <>
      <div className="container">
        <div className="loader">
          <svg
            width={"24"}
            height={"24"}
            viewBox={"0 0 24 24"}
            xmlns={"http://www.w3.org/2000/svg"}
          >
            <defs>
              <mask id={`${instanceId}-loading-squares-mask1`}>
                <path
                  className={"mask-path"}
                  d={
                    "M6.16174 16.1526L11.9824 12.1111L17.9304 16.1526L17.2949 20.855H6.74632L6.16174 16.1526Z"
                  }
                />
              </mask>
              <mask id={`${instanceId}-loading-squares-mask2`}>
                <path
                  className={"mask-path"}
                  d={
                    "M17.9303 8.06956L12.1096 12.1111L6.16169 8.06956L6.79715 3.36718L17.3457 3.36719L17.9303 8.06956Z"
                  }
                />
              </mask>
            </defs>
            <g className={"wrapper"}>
              <g
                className={"mask1"}
                mask={`url(#${instanceId}-loading-squares-mask1)`}
              >
                <rect
                  className={"mask1__bg"}
                  x={"6.16174"}
                  y={"12.1111"}
                  width={"11.7686"}
                  height={"8.74388"}
                />
              </g>
              <g
                className={"mask2"}
                mask={`url(#${instanceId}-loading-squares-mask2)`}
              >
                <g className={"mask2__bg"}>
                  <rect
                    x={"17.9303"}
                    y={"12.1111"}
                    width={"11.7686"}
                    height={"8.74388"}
                    transform={"rotate(-180 17.9303 12.1111)"}
                  />
                </g>
                <g className={"mask2__line"}>
                  <rect
                    x={"12.842"}
                    y={"12.1111"}
                    width={"1.5"}
                    height={"8.74388"}
                    transform={"rotate(-180 12.842 12.1111)"}
                    fill={"#FF0000"}
                  />
                </g>
              </g>
              <path
                className={"frame"}
                fillRule={"evenodd"}
                clipRule={"evenodd"}
                d={
                  "M19 5.38028V6.50704C19 7.7277 18.475 8.76056 17.5125 9.32394L13.6632 11.9526L14.0877 12.232L14.0825 12.2398L17.5125 14.5822C18.475 15.2394 19 16.2723 19 17.493V18.6197C19 20.4977 17.6 22 15.85 22H8.15C6.4 22 5 20.4977 5 18.6197V17.493C5 16.2723 5.525 15.1455 6.4875 14.5822L10.3403 12.016L9.39854 11.396C9.3312 11.3708 9.26465 11.3374 9.2 11.2958L6.4875 9.41784C5.525 8.76056 5 7.7277 5 6.50704V5.38028C5 3.50235 6.4 2 8.15 2H15.85C17.6 2 19 3.50235 19 5.38028ZM10.3606 9.77859C10.3054 9.71327 10.2393 9.65511 10.1625 9.60563L7.45 7.7277C7.0125 7.53991 6.75 7.07042 6.75 6.50704V5.38028C6.75 4.53521 7.3625 3.87793 8.15 3.87793H15.85C16.6375 3.87793 17.25 4.53521 17.25 5.38028V6.50704C17.25 7.07042 16.9875 7.53991 16.55 7.8216L12.0356 10.8812L10.3606 9.77859ZM11.9786 13.0944L7.45 16.1784C7.0125 16.4601 6.75 16.9296 6.75 17.493V18.6197C6.75 19.4648 7.3625 20.1221 8.15 20.1221H15.85C16.6375 20.1221 17.25 19.4648 17.25 18.6197V17.493C17.25 16.9296 16.9875 16.4601 16.55 16.1784L13.0561 13.799L13.054 13.8023L11.9786 13.0944Z"
                }
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  ),
});
