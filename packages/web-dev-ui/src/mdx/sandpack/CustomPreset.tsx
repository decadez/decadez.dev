import { memo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import {
  SandpackCodeEditor,
  SandpackLayout,
  useActiveCode,
  useSandpack,
} from "@codesandbox/sandpack-react/unstyled";
import { cx } from "../../utils";
import { IconChevron } from "./icons";
import { NavigationBar } from "./NavigationBar";
import { Preview } from "./Preview";
import { useSandpackLint } from "./useSandpackLint";

export const CustomPreset = memo(function CustomPreset({
  providedFiles,
  preview,
  showOpenInCodeSandbox = true,
}: {
  providedFiles: Array<string>;
  preview?: ReactNode;
  showOpenInCodeSandbox?: boolean;
}) {
  const { lintErrors, lintExtensions } = useSandpackLint();
  const { sandpack } = useSandpack();
  const { code } = useActiveCode();
  const { activeFile } = sandpack;
  const lineCountRef = useRef<{ [key: string]: number }>({});
  if (!lineCountRef.current[activeFile]) {
    lineCountRef.current[activeFile] = code.split("\n").length;
  }
  const lineCount = lineCountRef.current[activeFile];
  const isExpandable = lineCount > 16;

  return (
    <SandboxShell
      providedFiles={providedFiles}
      lintErrors={lintErrors}
      lintExtensions={lintExtensions}
      preview={preview}
      isExpandable={isExpandable}
      showOpenInCodeSandbox={showOpenInCodeSandbox}
    />
  );
});

const SandboxShell = memo(function SandboxShell({
  providedFiles,
  lintErrors,
  lintExtensions,
  preview,
  isExpandable,
  showOpenInCodeSandbox,
}: {
  providedFiles: Array<string>;
  lintErrors: Array<any>;
  lintExtensions: Array<any>;
  preview?: ReactNode;
  isExpandable: boolean;
  showOpenInCodeSandbox: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="ui-sandpack-shell" ref={containerRef}>
      <NavigationBar
        providedFiles={providedFiles}
        showOpenInCodeSandbox={showOpenInCodeSandbox}
      />
      <SandpackLayout
        className={cx(
          "ui-sandpack-layout",
          !(isExpandable || isExpanded) && "is-compact",
          isExpanded && "sp-layout-expanded"
        )}
      >
        <Editor lintExtensions={lintExtensions} />
        <Preview
          className="ui-sandpack-preview-stack"
          isExpanded={isExpanded}
          lintErrors={lintErrors}
          preview={preview}
        />
        {(isExpandable || isExpanded) && (
          <button
            translate="yes"
            className="sandpack-expand"
            onClick={() => {
              const nextIsExpanded = !isExpanded;
              flushSync(() => {
                setIsExpanded(nextIsExpanded);
              });
              if (!nextIsExpanded && containerRef.current !== null) {
                containerRef.current.scrollIntoView({
                  block: "nearest",
                  inline: "nearest",
                });
              }
            }}
            type="button"
          >
            <span>
              <IconChevron
                className="ui-sandpack-expand-icon"
                displayDirection={isExpanded ? "up" : "down"}
              />
              {isExpanded ? "Show less" : "Show more"}
            </span>
          </button>
        )}
      </SandpackLayout>
    </div>
  );
});

const Editor = memo(function Editor({
  lintExtensions,
}: {
  lintExtensions: Array<any>;
}) {
  return (
    <SandpackCodeEditor
      showLineNumbers
      showInlineErrors
      showTabs={false}
      showRunButton={false}
      extensions={lintExtensions}
    />
  );
});
