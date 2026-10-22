import {
  Children,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import type {
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackSetup,
} from "@codesandbox/sandpack-react/unstyled";
import { cx } from "@/utils/classnames";
import { SandpackClient, createFileMap } from "./sandpack";
import { getPreviewStyles } from "@/utils/preview-styles";

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
  const [styles, setStyles] = useState<string | null>(null);
  useEffect(() => setStyles(getPreviewStyles()), []);
  if (styles === null) return <p role="status">Loading editor…</p>;
  const preparedFiles: SandpackFiles = {};
  let needsStyles = false;
  for (const [name, file] of Object.entries(
    files ?? createFileMap(Children.toArray(children))
  )) {
    const code = typeof file === "string" ? file : file.code;
    let preparedCode = code.replace(
      /(["'])@decadez\/web-dev-ui\/styles\.css\1/g,
      '"/src/ui-styles.js"'
    );
    if (preparedCode !== code) needsStyles = true;
    if (files?.["/src/animation-package/index.ts"]) {
      preparedCode = preparedCode.replace(
        /(["'])@decadez\/web-dev-ui\/animations(?:\/([a-z-]+))?\1/g,
        (_, _quote: string, entry?: string) => {
          const suffix = !entry
            ? "index.ts"
            : entry === "hooks" || entry === "theme"
              ? `${entry}/index.ts`
              : `components/${entry}/index.ts`;
          return JSON.stringify(`/src/animation-package/${suffix}`);
        }
      );
    }
    preparedFiles[name] = name.startsWith("/src/animation-package/")
      ? { code: preparedCode, hidden: true }
      : typeof file === "string"
        ? preparedCode
        : { ...file, code: preparedCode };
  }
  // Inject compiled CSS with JS so Sandpack's older PostCSS never parses the
  // package's Tailwind directives. The browser still handles modern CSS.
  if (needsStyles)
    preparedFiles["/src/ui-styles.js"] = {
      hidden: true,
      code: `const style = document.createElement("style");\nstyle.textContent = ${JSON.stringify(styles)};\ndocument.head.appendChild(style);`,
    };
  return (
    <div className={cx("ui-mdx-sandbox-wrapper", className)} {...props}>
      <SandpackClient
        files={preparedFiles}
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
