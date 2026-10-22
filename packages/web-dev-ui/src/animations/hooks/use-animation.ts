"use client";
import { useCallback, useState } from "react";
export function useAnimation(initialPaused = false) {
  const [paused, setPaused] = useState(initialPaused);
  const [replayKey, setReplayKey] = useState(0);
  const play = useCallback(() => setPaused(false), []);
  const pause = useCallback(() => setPaused(true), []);
  const toggle = useCallback(() => setPaused((value) => !value), []);
  const replay = useCallback(() => {
    setReplayKey((key) => key + 1);
    setPaused(false);
  }, []);
  return {
    paused,
    replayKey,
    play,
    pause,
    toggle,
    replay,
    animationProps: { paused, replayKey },
  };
}
