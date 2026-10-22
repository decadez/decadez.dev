import type { AnimationDefaults } from "../styled-system/types";
export const defaultAnimationTheme = {
  reducedMotion: "system",
  paused: false,
} satisfies AnimationDefaults;
export const animationSizes = { sm: 160, md: 240, lg: 320 } as const;
