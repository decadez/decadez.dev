// Generated from 2026-06-09/tips-1.html; source digest: 172e52efb48bf816bf2f649664ab65a79f631935f9f4a9ec87819709a824ed67
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./walking-cat.styles";
export type WalkingCatAnimationProps = AnimationProps;
export const WalkingCatAnimation = createAnimation({
  name: "WalkingCatAnimation",
  id: "walking-cat",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"scene"}>
          <div className={"box"}>
            <svg className={"cat"} viewBox={"0 0 148 115"}>
              <g className={"cat__content"}>
                <g className={"cat__inner"}>
                  <path
                    className={"cat__tail"}
                    d={
                      "M114.085 101.509C126.144 106.365 136.457 103.51 142.414 96.7459"
                    }
                  />
                  <g className={"cat__ears"}>
                    <path
                      className={"cat__ear"}
                      d={
                        "M40.4319 6.09395C41.702 6.13103 43.8288 7.06505 46.7137 9.4725C49.4451 11.7519 52.2728 14.8543 54.8755 18.0786C57.1922 20.9487 59.2586 23.8248 60.8374 26.132L30.945 32.6769C31.4339 29.3893 32.1857 25.072 33.2486 20.7955C34.3353 16.4236 35.686 12.3521 37.2759 9.4793C39.0367 6.29792 40.2119 6.08756 40.4319 6.09395Z"
                      }
                    />
                    <path
                      className={"cat__ear"}
                      d={
                        "M98.6758 10.4927C99.8265 10.1389 100.473 10.1407 100.745 10.186C100.805 10.2161 101.09 10.3782 101.56 10.9946C102.189 11.8213 102.873 13.1132 103.559 14.896C104.924 18.4471 106.008 23.1915 106.839 28.0962C107.621 32.7162 108.149 37.3061 108.489 40.8638L76.0713 26.8882C78.2945 24.7999 81.1965 22.1764 84.3271 19.6128C87.7416 16.8168 91.3179 14.1834 94.5166 12.3823C96.1157 11.4819 97.5156 10.8494 98.6758 10.4927Z"
                      }
                    />
                  </g>
                  <path
                    className={"cat__body"}
                    d={
                      "M124.824 76.3795C124.824 108.128 96.8814 114.128 62.4121 114.128C27.9429 114.128 0 105.122 9.2011e-08 76.3795C9.2011e-08 47.6368 27.9429 24.3362 62.4121 24.3362C96.8814 24.3362 124.824 47.6368 124.824 76.3795Z"
                    }
                  />
                  <rect
                    className={"cat__eye"}
                    x={"35"}
                    y={"48.1279"}
                    width={"11"}
                    height={"19"}
                    rx={"5.5"}
                  />
                  <rect
                    className={"cat__eye"}
                    x={"67"}
                    y={"48.1279"}
                    width={"11"}
                    height={"19"}
                    rx={"5.5"}
                  />
                </g>
              </g>
            </svg>
            <div className={"line"} />
          </div>
        </div>
      </div>
    </>
  ),
});
