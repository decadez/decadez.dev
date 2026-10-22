import { Children, Suspense, lazy, memo, type ReactNode } from "react";
import type {
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackSetup,
} from "@codesandbox/sandpack-react/unstyled";
import { AppJSPath, createFileMap } from "./createFileMap";
import { SandpackLoadingIndicator } from "./LoadingOverlay";

const SandpackRoot = lazy(() => import("./SandpackRoot"));
const SandpackRSCRoot = lazy(() => import("./SandpackRSCRoot"));

const SandpackGlimmer = ({ code }: { code: string }) => (
  <div className="sandpack sandpack--playground ui-mdx-sandbox">
    <div className="sp-wrapper">
      <div className="ui-sandpack-shell">
        <div className="ui-sandpack-navigation">
          <div className="ui-sandpack-tabs" />
          <div className="ui-sandpack-actions" />
        </div>
        <div className="sp-layout ui-sandpack-layout">
          <div className="sp-stack sp-editor">
            <pre className="sp-pre-placeholder">{code}</pre>
          </div>
          <div className="sp-stack ui-sandpack-preview-panel">
            <SandpackLoadingIndicator />
          </div>
          {code.split("\n").length > 16 && <div className="sandpack-expand" />}
        </div>
      </div>
    </div>
  </div>
);

export type SandpackClientProps = {
  children?: ReactNode;
  files?: SandpackFiles;
  preview?: ReactNode;
  autorun?: boolean;
  activeFile?: string;
  dependencies?: SandpackSetup["dependencies"];
  showOpenInCodeSandbox?: boolean;
  template?: SandpackPredefinedTemplate;
};

function getCode(file: string | { code?: string }): string {
  return typeof file === "string" ? file : (file.code ?? "");
}

function getActiveCode(
  codeSnippet: Record<
    string,
    string | { code?: string; active?: boolean; hidden?: boolean }
  >
) {
  const activeCodeSnippet = Object.keys(codeSnippet).filter(
    (fileName) =>
      typeof codeSnippet[fileName] !== "string" &&
      codeSnippet[fileName]?.active === true &&
      codeSnippet[fileName]?.hidden === false
  );

  if (!activeCodeSnippet.length) {
    const appFile = codeSnippet[AppJSPath];
    return appFile ? getCode(appFile) : "";
  }

  return getCode(codeSnippet[activeCodeSnippet[0]]);
}

export const SandpackClient = memo(function SandpackWrapper(
  props: SandpackClientProps
) {
  const codeSnippet =
    props.files ?? createFileMap(Children.toArray(props.children));
  const activeCode = getActiveCode(
    codeSnippet as Record<
      string,
      string | { code?: string; active?: boolean; hidden?: boolean }
    >
  );

  return (
    <Suspense fallback={<SandpackGlimmer code={activeCode} />}>
      <SandpackRoot {...props} />
    </Suspense>
  );
});

export const SandpackRSC = memo(function SandpackRSCWrapper(props: {
  children?: ReactNode;
  files?: SandpackFiles;
}) {
  const codeSnippet =
    props.files ?? createFileMap(Children.toArray(props.children));
  const activeCode = getActiveCode(
    codeSnippet as Record<
      string,
      string | { code?: string; active?: boolean; hidden?: boolean }
    >
  );

  return (
    <Suspense fallback={<SandpackGlimmer code={activeCode} />}>
      <SandpackRSCRoot {...props} />
    </Suspense>
  );
});

export { ClearButton } from "./ClearButton";
export { SandpackConsole } from "./Console";
export { CustomPreset } from "./CustomPreset";
export { DownloadButton } from "./DownloadButton";
export { ErrorMessage } from "./ErrorMessage";
export { LoadingOverlay } from "./LoadingOverlay";
export { NavigationBar } from "./NavigationBar";
export { OpenInCodeSandboxButton } from "./OpenInCodeSandboxButton";
export { OpenInTypeScriptPlaygroundButton } from "./OpenInTypeScriptPlayground";
export { Preview } from "./Preview";
export { ReloadButton } from "./ReloadButton";
export { default as SandpackRoot } from "./SandpackRoot";
export { default as SandpackRSCRoot } from "./SandpackRSCRoot";
export { default as SandpackWithHTMLOutput } from "./SandpackWithHTMLOutput";
export { CustomTheme } from "./Themes";
export {
  AppJSPath,
  StylesCSSPath,
  SUPPORTED_FILES,
  createFileMap,
} from "./createFileMap";
export { runESLint } from "./runESLint";
export { template } from "./template";
export { templateRSC } from "./templateRSC";
export { useSandpackLint } from "./useSandpackLint";
export { RscFileBridge } from "./sandpack-rsc/RscFileBridge";
