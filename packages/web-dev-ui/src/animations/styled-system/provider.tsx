"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { AnimationDefaults } from "./types";

const AnimationContext = createContext<AnimationDefaults>({
  reducedMotion: "system",
  paused: false,
});
export interface AnimationProviderProps {
  value: AnimationDefaults;
  children: ReactNode;
}
export function AnimationProvider({ value, children }: AnimationProviderProps) {
  const parent = useContext(AnimationContext);
  return (
    <AnimationContext.Provider value={{ ...parent, ...value }}>
      {children}
    </AnimationContext.Provider>
  );
}
export const useAnimationDefaults = () => useContext(AnimationContext);
