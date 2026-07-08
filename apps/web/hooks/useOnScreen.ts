import { useEffect, useState, useRef, RefObject } from "react";

export default function useOnScreen<T extends HTMLElement>(
  ref: RefObject<T | null>
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    observerRef.current!.observe(element);

    return () => {
      observerRef.current!.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}
