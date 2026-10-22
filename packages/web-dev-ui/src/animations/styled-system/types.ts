import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type MotionPreference = "system" | "always" | "never";
export interface AnimationDefaults {
  size?: CSSProperties["width"];
  paused?: boolean;
  background?: CSSProperties["backgroundColor"];
  reducedMotion?: MotionPreference;
}
export interface AnimationProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">, AnimationDefaults {
  /** Changing this key restarts the scene while preserving the outer element. */
  replayKey?: string | number;
  /** CSP nonce for the component's scoped style element. */
  nonce?: string;
}
export interface AnimationDefinition {
  name: string;
  id: string;
  width: number;
  height: number;
  css: string;
  render: (instanceId: string) => ReactNode;
}
