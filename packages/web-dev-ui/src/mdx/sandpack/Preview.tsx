import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  SandpackStack,
  useSandpack,
} from "@codesandbox/sandpack-react/unstyled";
import { cx } from "../../utils";
import { ErrorMessage } from "./ErrorMessage";
import { SandpackConsole } from "./Console";
import type { LintDiagnostic } from "./useSandpackLint";
import { LoadingOverlay } from "./LoadingOverlay";

type CustomPreviewProps = {
  className?: string;
  isExpanded: boolean;
  lintErrors: LintDiagnostic;
  preview?: ReactNode;
};

function useDebounced<T>(value: T): T {
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saved, setSaved] = useState(value);

  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      setSaved(value);
    }, 300);
  }, [value]);

  return saved;
}

export function Preview({
  isExpanded,
  className,
  lintErrors,
  preview,
}: CustomPreviewProps) {
  if (preview) {
    return <StaticPreview className={className}>{preview}</StaticPreview>;
  }

  return (
    <LivePreview
      className={className}
      isExpanded={isExpanded}
      lintErrors={lintErrors}
    />
  );
}

function StaticPreview({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <SandpackStack className={className}>
      <div className="ui-sandpack-preview-panel ui-sandpack-static-preview">
        {children}
      </div>
    </SandpackStack>
  );
}

function LivePreview({
  isExpanded,
  className,
  lintErrors,
}: Omit<CustomPreviewProps, "preview">) {
  const { sandpack, listen } = useSandpack();
  const [bundlerIsReady, setBundlerIsReady] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [iframeComputedHeight, setComputedAutoHeight] = useState<number | null>(
    null
  );
  let { error: rawError, registerBundler, unregisterBundler } = sandpack;
  const bundlerMethodsRef = useRef({ registerBundler, unregisterBundler });
  bundlerMethodsRef.current = { registerBundler, unregisterBundler };

  if (
    rawError &&
    rawError.message === "_csbRefreshUtils.prelude is not a function"
  ) {
    rawError = null;
  }

  if (rawError && rawError.message.includes("Example Error:")) {
    rawError = null;
  }

  const firstLintError = useMemo(() => {
    if (lintErrors.length === 0) {
      return null;
    }
    const { line, column, message } = lintErrors[0];
    return {
      title: "Lint Error",
      message: `${line}:${column} - ${message}`,
    };
  }, [lintErrors]);

  if (rawError == null || rawError.title === "Runtime Exception") {
    if (firstLintError !== null) {
      rawError = firstLintError;
    }
  }

  if (rawError != null && rawError.title === "Runtime Exception") {
    rawError.title = "Runtime Error";
  }

  const error = useDebounced(rawError);
  const clientId = useId();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const sandpackIdle = sandpack.status === "idle";

  useEffect(
    function createBundler() {
      const iframeElement = iframeRef.current;
      if (!iframeElement) {
        return;
      }
      bundlerMethodsRef.current.registerBundler(iframeElement, clientId);

      return () => {
        const { unregisterBundler: unregister } = bundlerMethodsRef.current;
        window.setTimeout(() => {
          unregister(clientId);
        }, 0);
      };
    },
    [clientId]
  );

  useEffect(
    function bundlerListener() {
      let timeout: ReturnType<typeof setTimeout>;
      const unsubscribe = listen((message) => {
        if (message.type === "resize") {
          setComputedAutoHeight(message.height);
        } else if (message.type === "start") {
          if (message.firstLoad) {
            setBundlerIsReady(false);
          }
          timeout = setTimeout(() => {
            setShowLoading(true);
          }, 500);
        } else if (message.type === "done") {
          setBundlerIsReady(true);
          setShowLoading(false);
          clearTimeout(timeout);
        }
      });

      return () => {
        clearTimeout(timeout);
        unsubscribe();
      };
    },
    [listen, clientId, sandpackIdle]
  );

  const hideContent = error || !iframeComputedHeight || !bundlerIsReady;

  const iframeWrapperPosition = (): CSSProperties => {
    if (hideContent) {
      return { position: "relative" };
    }

    if (isExpanded) {
      return { position: "sticky", top: "calc(2em + 64px)" };
    }

    return {};
  };

  return (
    <>
      <SandpackStack className={className}>
        <div
          className={cx(
            "ui-sandpack-preview-panel",
            !isExpanded &&
              (error || bundlerIsReady) &&
              "ui-sandpack-preview-scroll"
          )}
        >
          <div style={iframeWrapperPosition()}>
            <iframe
              ref={iframeRef}
              className={cx(
                "ui-sandpack-preview-frame",
                hideContent && "is-hidden"
              )}
              title="Sandbox Preview"
              style={{
                height: iframeComputedHeight || "15px",
                zIndex: hideContent ? -1 : "initial",
              }}
            />
          </div>

          {error && (
            <div
              className={cx(
                "ui-sandpack-error-wrap",
                isExpanded && "is-sticky"
              )}
            >
              <ErrorMessage error={error} />
            </div>
          )}
          <LoadingOverlay
            clientId={clientId}
            dependenciesLoading={
              !bundlerIsReady && iframeComputedHeight === null
            }
            forceLoading={
              showLoading || (!bundlerIsReady && iframeComputedHeight === null)
            }
          />
        </div>
      </SandpackStack>
      <SandpackConsole visible={!error} />
    </>
  );
}
