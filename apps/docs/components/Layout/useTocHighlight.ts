import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/content/routes";

const topOffset = 96;

function getTocElements(headings: TocItem[]) {
  return headings
    .map((heading) => document.getElementById(heading.url.replace(/^#/, "")))
    .filter((element): element is HTMLElement => Boolean(element));
}

export function useTocHighlight(headings: TocItem[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    function updateActiveLink() {
      const elements = getTocElements(headings);

      if (elements.length === 0) {
        setCurrentIndex(0);
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      if (pageHeight - scrollPosition <= 4) {
        setCurrentIndex(elements.length - 1);
        return;
      }

      let index = -1;

      while (index < elements.length - 1) {
        const element = elements[index + 1];
        const { top } = element.getBoundingClientRect();

        if (top >= topOffset) {
          break;
        }

        index += 1;
      }

      setCurrentIndex(Math.max(index, 0));
    }

    function throttledUpdateActiveLink() {
      if (timeoutRef.current === null) {
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = null;
          updateActiveLink();
        }, 100);
      }
    }

    document.addEventListener("scroll", throttledUpdateActiveLink);
    window.addEventListener("resize", throttledUpdateActiveLink);
    updateActiveLink();

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      document.removeEventListener("scroll", throttledUpdateActiveLink);
      window.removeEventListener("resize", throttledUpdateActiveLink);
    };
  }, [headings]);

  return currentIndex;
}
