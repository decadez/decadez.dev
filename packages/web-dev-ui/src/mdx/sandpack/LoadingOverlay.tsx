import { useEffect, useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";

const fadeAnimationDuration = 200;

type LoadingOverlayState =
  "HIDDEN" | "LOADING" | "PRE_FADING" | "FADING" | "TIMEOUT";

export const LoadingOverlay = ({
  clientId,
  dependenciesLoading,
  forceLoading,
}: {
  clientId: string;
  dependenciesLoading: boolean;
  forceLoading: boolean;
}) => {
  const loadingOverlayState = useLoadingOverlayState(
    clientId,
    dependenciesLoading,
    forceLoading
  );

  if (loadingOverlayState === "HIDDEN") {
    return null;
  }

  if (loadingOverlayState === "TIMEOUT") {
    return (
      <div className="sp-overlay sp-error">
        <div className="sp-error-message">
          Unable to establish connection with the sandpack bundler.
        </div>
      </div>
    );
  }

  const stillLoading =
    loadingOverlayState === "LOADING" || loadingOverlayState === "PRE_FADING";

  return (
    <div
      className="sp-overlay sp-loading"
      style={{
        opacity: stillLoading ? 1 : 0,
        transition: `opacity ${fadeAnimationDuration}ms ease-out`,
      }}
    >
      <SandpackLoadingIndicator />
    </div>
  );
};

export function SandpackLoadingIndicator() {
  return (
    <div
      className="ui-sandpack-loading-state"
      role="status"
      aria-label="Loading sandbox"
    >
      <div className="sp-cube-wrapper" aria-hidden="true">
        <div className="sp-cube">
          <div className="sp-sides">
            <div className="top" />
            <div className="right" />
            <div className="bottom" />
            <div className="left" />
            <div className="front" />
            <div className="back" />
          </div>
        </div>
      </div>
      <span>Loading sandbox</span>
    </div>
  );
}

const useLoadingOverlayState = (
  clientId: string,
  dependenciesLoading: boolean,
  forceLoading: boolean
): LoadingOverlayState => {
  const { sandpack, listen } = useSandpack();
  const [state, setState] = useState<LoadingOverlayState>("HIDDEN");

  useEffect(() => {
    if (forceLoading) {
      setState("LOADING");
    }
  }, [forceLoading]);

  const sandpackIdle = sandpack.status === "idle";
  useEffect(() => {
    const unsubscribe = listen((message) => {
      if (message.type === "done") {
        setState((prev) => (prev === "LOADING" ? "PRE_FADING" : "HIDDEN"));
      }
    }, clientId);

    return unsubscribe;
  }, [listen, clientId, sandpackIdle]);

  useEffect(() => {
    let fadeTimeout: ReturnType<typeof setTimeout>;

    if (state === "PRE_FADING" && !dependenciesLoading) {
      setState("FADING");
    } else if (state === "FADING") {
      fadeTimeout = setTimeout(() => setState("HIDDEN"), fadeAnimationDuration);
    }

    return () => clearTimeout(fadeTimeout);
  }, [state, dependenciesLoading]);

  useEffect(() => {
    if (state === "LOADING") {
      const timeout = setTimeout(() => setState("TIMEOUT"), 30000);
      return () => clearTimeout(timeout);
    }
  }, [state]);

  return state;
};
