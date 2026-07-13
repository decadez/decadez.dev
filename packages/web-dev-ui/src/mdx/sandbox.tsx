import type { HTMLAttributes, ReactNode } from "react";
import type {
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackSetup,
} from "@codesandbox/sandpack-react/unstyled";
import { cx } from "../utils";
import { SandpackClient } from "./sandpack";

export type MDXSandboxProps = HTMLAttributes<HTMLDivElement> & {
  files?: SandpackFiles;
  children?: ReactNode;
  preview?: ReactNode;
  template?: SandpackPredefinedTemplate;
  autorun?: boolean;
  activeFile?: string;
  dependencies?: SandpackSetup["dependencies"];
  showOpenInCodeSandbox?: boolean;
};

export function MDXSandbox({
  files,
  children,
  preview,
  autorun = true,
  activeFile,
  dependencies,
  template,
  className,
  showOpenInCodeSandbox,
  ...props
}: MDXSandboxProps) {
  return (
    <div className={cx("ui-mdx-sandbox-wrapper", className)} {...props}>
      <SandpackClient
        files={files}
        autorun={autorun}
        activeFile={activeFile}
        dependencies={dependencies}
        template={template}
        preview={preview}
        showOpenInCodeSandbox={showOpenInCodeSandbox}
      >
        {children}
      </SandpackClient>
    </div>
  );
}

export * from "./sandpack";
