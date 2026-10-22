// Generated from 2026-06-09/tips-2.html; source digest: 04e250267b404b962ae2b83c2ffe53d71c6ad6e7b4cb1fa35d56b77b0a19da38
// Adapted from css-animations/packages/react; maintain the scoped styles here.
"use client";
import { createAnimation, type AnimationProps } from "../../styled-system";
import { styles } from "./flower-cat.styles";
export type FlowerCatAnimationProps = AnimationProps;
export const FlowerCatAnimation = createAnimation({
  name: "FlowerCatAnimation",
  id: "flower-cat",
  width: 320,
  height: 320,
  css: styles,
  render: (instanceId) => (
    <>
      <div className={"container"}>
        <div className={"scene"}>
          <div className={"box"}>
            <div className={"flower"}>
              <div className={"flower__stem"} />
              <img
                className={"flower__leaf flower__leaf--1"}
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAAB+CAYAAAA3HbOAAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAgfSURBVHgB7Z1bUttIFIaPZMOzdzCaFQw7GGcFMVWBJE9DVkBYQWAFISvAeSImVBlWgFkBzgqiWUE8b0mIYM4xLUc2MpZkXfryf1WKjAET3D/n1qe7vbOzs2+e542JaHx3d3fNj8Pd3V35GIBS8Fhk9ynPT5LC29zcHG9vb4cEQAGWiSyNkK8xi+9a7js7OyMCIAN5RPb4mz1vxDexeJftdlus3YQAWGAtkaUglm6kXOwIogNC2SKbf/GEpYN7dZdKRfbohz2I7vL+/n6EDNYdRGTf+N6h+glJWbmNjY0Rsld7EZF95XtAzTOOLR1cq13oJLIkoe/7oyiKLpFAmI+uIptDLBzHcR/hVs3E+/z58w0P4BYZQuxSuS53AcGZgYjsikXWJTMZx1YO2aq+eOfn50MunvbIfEIW3AVbuA+wcHrhDQaDPg/OP2QXYuE+wqXqga0im4GkoXl8eiiKWouKN09ub2+/ciY95GuPQK20yS0k9uyx0N5JHU4sHAq/1eOpv+wTcpeQryO40+rwCQSk3Cln2idc0ukSKBWpk3XZbVwRSBISrFtpeKenp0Gr1fpKIBWO3fqI3dbDGw6HHXYV3wisIqQH63aBCft8ePJPnY2LFjDtEGHrfwRXmo1YZNp3YugIXGk2ptklV8Vh/gvAc757kjRJkwGKvMuZiozfrC8EChPPKohHgNgeE7vLY77tEyiLkFACmRG7y5BAmQT0UOAVV/qOM/iAHGYqMjb3iMmqIeD39tB1sU3dJf/yW/xG3BCoGmms7Lfb7Y8uudGpJfv+/TssWT3MWTZyBC9+0OAiX5cJ+Tra3d3tk8XMujAQ/DdCQA6UPiAyPQjot9iMWZ6YlZnIuCD7L4GmCfi6kb42mzLRZNMi1i1qgkxXSbb/6dOnt2QBs8AfZQxtCXnm4JnJJY+kJQsJ6EggreEmlzy85AcoY+iNrCHlQu4b06za3EISta060BTp9pBC7mAwMGpbiTmR8S+Blh/9CdgYDE1yn4tL4mDJDEGmp2RFvKzRIM2ZExlnMRCZWfSkIqB7TW3RkoUETEOyzyudZwrmRCZLvRD8G0lADzMFWu7O9GibAvT7mwuPXV/HhOCRyHzfhyUzGEkIdBPaI5FxsW9EwGh0E5qX9iQq/3bA8fXhzs7OETVM6tZRCP7tQBeLlioyVP7tQQehpYpMNhQhYA1NCy1VZK1Wa0TAKkRoTdXRUkWGoqydqDpal2pm6Z6xrPxrAtbB4zqse65zqcgQl1mL7Kx5VafQlooMcZnVyKR6bW1CS0Wm4rIRAVvZiqLoPdXAk/v4c6CIuMxiZOldHcvunhQZ4jL74TF+X3XG6a36AsxjOkGlaztXHnvDKe8lAdsJfv36Vdn5WitFJtuIE7AeWW7HbrOSRGClyNrttlT+sUmeA7DQ3lYRn60UGaaY3IKFdlJ2/SzTUYRy6gYBV5D4bEglkklkcmgVwWU6g8RnZdbPMokMLtM9OOErbUv4PCf3Nt4rDmqlU1ZZI7PIkGW6R1luM7PI1EGiSAAcowy3meuge47LLgi4xtpuM5fI5PBQtP+4h7jNdTbeyyUyBeYyHYSNS+EibW6RcQLQJyQALiJus9CyutwiQwLgLjK3WWQftCLuEgmAw/DY5+7UKCQyJADuUiQJKCQyBWYAHEWsWZ4koLDIYM2cJvj582fmmYB1LJko+gMBJ+Gx389qzdYS2YsXLyQBCAm4SCerNVtLZArEZo7C1izTvObaIlPnZ4cEnCSKopUF2jIsmSj6DQEnkVXoq6xZKSJDpuk2q7o0ShGZArGZo6g1m91lny9NZGLN+IbpJkdhoe0v+1yZlkyCwANCh4ar9JbFZqWK7PXr1yErGgVaR1mWaa7c1acI7J9vWGzaHo0HKmOysbHxp2oHm1GqJUtwQMBFUmcBKhGZSgLgNh0kbU6zKksmWxscEmYCXKTz48ePveQTlYlM+eVtAs7h+/5cOaMykQk8rzlm84n4zD2CZHG2UpEJHJ8dY8rJSWbljMpFJrTbbXGbIQFnkKmmOAGoRWSJ+AyzAQ4RlzNqEZkg8RmhfuYUUs6Y3qlmBoPBoXRUEnACHutntVmymJcvXx6yv0ZbkCPwWPdqF5kgQmOFY6sDB2CR3TciMoFLG3sQmt3c3d0dsEE5qD0mW4SLdn0WeyNnY4PKCGXdh5rDpsYsWYxYNMJkujVI4T2KomexwKbPkSYg6zQfcY+vXr06XnxeG5EJEJqxzLnHRbQSmXB+ft7jvwjZAysgYAIfpK1rsRs2iXYiE05PT4NWq3VFEJrOTDtsllmvJFqKLObs7Ez8+z4BnZiwpzlKi72WobXIBBbaHj20jQQEmqbPrvHgKdeYhvYiE8R9+r4vSQHqaQ2g+gGPsrjG1O8ng1A7L8tZjAGByllXXLPXIQOBC62WssQ1ez0yGIitXMoW1+x1yQIgtrW5kP1/yxZXjBUii1GFXEkOCh825RAT2bdkc3PzOG+2mBerRBajirldaf/FnhzzVOUSn/yZZDkqI93j6zk56k6VsC7l8LWqrVbqzyeHEMHxG97lh89lyRbZy4R/T1m405iwkjglsiTiUrl6vRVFUY8H5G8y38qFfF1y0XrEocKoaWElcVZki8RxnFg4Hqi/dI/lxFLx//GaH475j0VEFZKmQGRPoPZz2OLBDHhQY+EVOr12DSZKUF/4LjtZjlhUoU6WahUQWU5k6f3t7a3MpQYiPi6ZdNgC/iGP1Zd0+LEIMb7SmKhLLJKUEkJ+Pelu+E8JST43Nk1My/gf08DwL9cWVxQAAAAASUVORK5CYII="
                }
                alt={""}
                data-asset={"2026-06-09-leaf1-png"}
              />
              <img
                className={"flower__leaf flower__leaf--2"}
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACBCAYAAADT2RhMAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAe6SURBVHgB7Z3dUeNIEMdbwvBMBqeNYH0RrDYC4GGheMJEsHsRABHsEsFyTxQfVYYIzhfBmQhORHC+V2zgurkZajCSLcn6GM38f1VG/hDLYv/obvWMRgEBUCHD4TCaTqdxEAQf+WH/+fm5HxAAJWGhNh8eHuIwDD+REoq3m/P7QTKQGx2lRKqnp6eYn4ryfB8kA5lcXl72Oe3FHKEkUsWUEqXyAMnAK1VJNQ8k8xhJf7PZbFuKdE5/21SRVPNAMo8wC3WOViJVRA0AyRzn6uoq5s1L+mOxYmoBSOYYEq04BUorYYulGlBNKbAASY9A51FiDfjuFrcYUntVbQLJOooq2g/4biy9K7IYSNYhdH0laZDFiqgbTCCZ5Zhi8S2ijsHtEUhmI10Xax5IZglGjbWtBpqdgH+XfyFZi8wdFcbkJv9AshZQ6fDIYbFMEMmaQom1peosq/pYdcK/Kwr/OjHTYVtDOm0DyWpCRy1OhwOyrPveNDwYD8mqAlErHe6TYexyVdREvwNErWwwC6Mk+ggRUWsxj4+PHyBZAVRK/Kqm0EQElrK7uxsgXeZAy8Up8RshJRZhIl8g2QIkJRr1FihOIl8gWQpmvcU3AuWQGRiyhWQGKOarhd/HRLaQjCBXXfD7eS9bryWDXPUiQ0qy9VIyyNUMa2trY9l6JRnkahavIhnkaof19fVEtk5LJlOaeVjj6OnpaUCgaSY7OzvuRjJ06NuHe2Rjfd85ya6vr0WuY4JcrSInkOj7zkim6y61AiBoGZbMnUimUqMU9d8I2IQbkkn04tT4kzDtxjpk2vXrfeooLNh3jl5/EASzkl6v191IplZgHrp0lrWDvLYvhE5FsouLi20W7C++C8EsxmxfCJ2RjNPjEf/nh4TWhPVwlrkzH1ufLuXoUYp7tZAu6AZvIpnVkqn6C8V9x5BzLd88JkuBYN1FzlAyH1tZk8kJs6rAjwh0jfH8E9ZJxmOPshCcRDAU+N3kfv4Jq2oyEYzHHs8IdBb+/Ebzz1kTySCYG+gp1yZWSAbB3MEcTtK0LhkEc4qxOZykaVUyGSaCYE4xTnuytcJf2hS8+UnAGXhU5jbt+VYimTRaZUNoUzgFZ6XUSNZ4xx+dfGdJuNP/Ie2FRiOZGuyGYG5yl/VCo5JhqrTT3GS90JhkMh+MN5iu4y7jrBcaqcn4SHJAOJJ0mcx6TKg9kqkjye8EXGa06MVaJTMKfbQqHCarP6apVbLHx0eJYBEBp9nY2Bgter02yWRNCqym4z5BEIzSxitNapFM6jAW7AcB5+Fsdbtsn8olM+ow4AFhGI6W7kMVI4ufEOowX5DWxXjZTpVKJv0wrK7jFUtTpVCZZKofdkTAG7jov8mzX2WSydqshDTpE8mXL19GeXasRDJJk2hXeMco744rS4Y06S2neXdcWTKkSS/JdVSpWUkyWU4TadI/+DPPHcWElSTjdgWm73gIf+65jio1pSVTkxAjAl4hY5X7+/tJke8pJZkU+2zzMQHv4M/9dypIKclUsQ/8Qwr+MypIYcmur6+3Uex7y4hKUFgyFgxTqT2FM9gJlaCQZOqEkIiAj5wVLfg1uSVDZ99v+KiycMGvyS3ZbDaTZTYjAt4hbYu8g+Fp5JIMLQu/KdO2MMklGVoWXlOqbWGyVDJ1UsiAgK+UOqI0WSoZopjXrBzFhIWSIYp5z8pRTFgoGaKY11QSxYRMyRDF/IaPKH+jisiUDFHMa8729vYKzRlbRKpkiGJ+U3aMMosw44cgivnLadkxyizeSaaiWEzARxIOMJUvlPNOsul0GhPGKH3lpOooJqSlS6RKPzmrqmUxzxvJMF/MW5Kqi32TN5IFQXBAwEdqSZOa1yXW1eVo/ibgG5ImD6lGXiMZ2hZeUmua1LxKhraFf7Bgn+tMk5oXyVDw+wePTZ40IZjwIhkKfu845bHJY2qIAAW/d4y50P+VGiRUHX7gB1Lo71DDhJwqvxLwgaSpQn+ecDabidkJAZeRy9LstCGYEMoPFsPlBE4CLiKCfS6y/GbVvLmo6sXFxTHLhqasO7QumPDuyr2qZ4ZVFLuPFYIJqZeHPj8/j3q93pAbdn0CXaS1Ij+NhdcgR/rsJFYJJiy90L1EtbW1Nbm0YETAdm7W19cPl13ktGmWSqZBVLMbGYtscqioCLklEySqhWF4jLFOq0j48zhcZf2wuikkmQZHoNZgZXqcp5RkGsjWGhNOj4dVnuVdJytJJqgUOkC91hinHL2ObY9eJitLpkG9Vi8y7CeLoNjQXC1KZZJpDNk+EdLoyqgx5RObC/tlVC6ZRvXXYkLNVgoX5NLUJpmJHCBIGuVwHxNYhBT0pxsbGz+6VHMtoxHJNEilqUz4/ZA6y4molUajkpnoq/7yG7zFDzfJM1Q6vO31emcuRa00WpPMRK48x4O6245HOBFpxLdbbkHcuC6WiRWSmagIF3Na/dT1Gk7SIP8Of/L2hiPW2CexTKyTzGQ4HG7OZrM+f1AS5T6q+W22ptaJkuqO/0BGfGQ98lWqeayWLA0+Uu3zh/iyGqQSL6LmU2zCNynW72XL6U+ESgik0jnJ0pCIN51OI5ZOolyfBdzkSPKLEpD0lv6PglmRcKJukuYS/p4JyzzhWvFeHst9/jdFrAkiVDH+AzYNDsx3ugFZAAAAAElFTkSuQmCC"
                }
                alt={""}
                data-asset={"2026-06-09-leaf2-png"}
              />
              <img
                className={"flower__bloom"}
                src={
                  "data:image/png;base64,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"
                }
                alt={""}
                data-asset={"2026-06-09-hana-png"}
              />
              <div className={"flower__seed"} />
            </div>
            <svg className={"cat"} viewBox={"0 0 148 115"}>
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
            </svg>
          </div>
        </div>
      </div>
    </>
  ),
});
