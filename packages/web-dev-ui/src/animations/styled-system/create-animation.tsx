"use client";
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useAnimationDefaults } from "./provider";
import type { AnimationDefinition, AnimationProps } from "./types";

/** Shared native wrapper; each generated component supplies only geometry and scoped CSS. */
export function createAnimation(definition: AnimationDefinition) {
  const Component = forwardRef<HTMLDivElement, AnimationProps>(
    function Animation(props, forwardedRef) {
      const defaults = useAnimationDefaults();
      const {
        size = defaults.size ?? definition.width,
        paused = defaults.paused ?? false,
        reducedMotion = defaults.reducedMotion ?? "system",
        background = defaults.background,
        replayKey = 0,
        style,
        nonce,
        ...rest
      } = props;
      const rootRef = useRef<HTMLDivElement | null>(null);
      const instanceId = `ca-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
      const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);
      useEffect(() => {
        const element = rootRef.current;
        if (!element) return;
        const measure = () => {
          const computed = window.getComputedStyle(element);
          // CSS width is untransformed; DOMRect includes ancestor/root transforms.
          let width = computed.width.endsWith("px")
            ? Number.parseFloat(computed.width)
            : element.clientWidth;
          if (computed.boxSizing === "border-box") {
            for (const property of [
              "paddingLeft",
              "paddingRight",
              "borderLeftWidth",
              "borderRightWidth",
            ] as const)
              width -= Number.parseFloat(computed[property]) || 0;
          }
          if (width > 0) setMeasuredWidth(width);
        };
        measure();
        if (typeof ResizeObserver !== "undefined") {
          const observer = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width;
            if (width && width > 0) setMeasuredWidth(width);
          });
          observer.observe(element);
          return () => observer.disconnect();
        }
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
      }, []);
      const scale =
        (measuredWidth ??
          (typeof size === "number" ? size : definition.width)) /
        definition.width;
      const labeled = Boolean(rest["aria-label"] || rest["aria-labelledby"]);
      const rootStyle = {
        display: "inline-block",
        position: "relative",
        verticalAlign: "middle",
        overflow: "hidden",
        isolation: "isolate",
        width: size,
        maxWidth: "100%",
        aspectRatio: `${definition.width} / ${definition.height}`,
        ...(background ? { "--animation-background": background } : {}),
        ...style,
      } as CSSProperties;
      return (
        <div
          role={labeled ? "img" : undefined}
          aria-hidden={labeled ? undefined : true}
          {...rest}
          ref={(node) => {
            rootRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          data-animation={definition.id}
          data-paused={String(paused)}
          data-reduced-motion={reducedMotion}
          style={rootStyle}
        >
          <style nonce={nonce}>{definition.css}</style>
          <div
            key={replayKey}
            data-part="stage"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: definition.width,
              height: definition.height,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {definition.render(instanceId)}
          </div>
        </div>
      );
    }
  );
  Component.displayName = definition.name;
  return Component;
}
