import { Children, type ReactNode } from "react";
import {
  SandpackProvider,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
  type SandpackSetup,
} from "@codesandbox/sandpack-react/unstyled";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";
import { CustomPreset } from "./CustomPreset";
import { createFileMap } from "./createFileMap";
import { CustomTheme } from "./Themes";
import { template as baseTemplate } from "./template";

type SandpackRootProps = {
  children?: ReactNode;
  files?: SandpackFiles;
  preview?: ReactNode;
  autorun?: boolean;
  activeFile?: string;
  dependencies?: SandpackSetup["dependencies"];
  showOpenInCodeSandbox?: boolean;
  template?: SandpackPredefinedTemplate;
};

const sandboxStyle = `
* {
  box-sizing: border-box;
}

body {
  font-family: Jost, Inter, ui-sans-serif, system-ui, sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

button,
input,
textarea,
select {
  font: inherit;
}
`.trim();

function getFileCode(
  files: SandpackFiles,
  filePath: string,
  fallback = ""
): string {
  const file = files[filePath];
  if (typeof file === "string") {
    return file;
  }
  return file?.code ?? fallback;
}

function getFilesKey(files: SandpackFiles) {
  return Object.keys(files)
    .sort()
    .map((filePath) => `${filePath}:${getFileCode(files, filePath)}`)
    .join("\n---\n");
}

export default function SandpackRoot(props: SandpackRootProps) {
  const {
    children,
    files: filesProp,
    preview,
    autorun = true,
    activeFile,
    dependencies,
    showOpenInCodeSandbox = true,
    template: templateName,
  } = props;
  const codeSnippets = Children.toArray(children);
  const files: SandpackFiles = {
    ...(filesProp ?? createFileMap(codeSnippets)),
  };

  if ("/index.html" in files) {
    throw new Error(
      "You cannot use `index.html` file in sandboxes. Only `public/index.html` is respected by Sandpack and CodeSandbox."
    );
  }

  files["/src/styles.css"] = {
    code: [sandboxStyle, getFileCode(files, "/src/styles.css")]
      .filter(Boolean)
      .join("\n\n"),
    hidden:
      typeof files["/src/styles.css"] === "string"
        ? true
        : !(files["/src/styles.css"] as { visible?: boolean }).visible,
  };
  const filesKey = getFilesKey(files);

  return (
    <div className="sandpack sandpack--playground ui-mdx-sandbox" dir="ltr">
      <SandpackProvider
        key={filesKey}
        files={{ ...baseTemplate, ...files }}
        template={templateName}
        theme={CustomTheme}
        customSetup={{
          environment: "create-react-app",
          dependencies,
        }}
        options={{
          autorun,
          activeFile,
          initMode: "user-visible",
          initModeObserverOptions: { rootMargin: "1400px 0px" },
          logLevel: SandpackLogLevel.None,
        }}
      >
        <CustomPreset
          providedFiles={Object.keys(files)}
          preview={preview}
          showOpenInCodeSandbox={showOpenInCodeSandbox}
        />
      </SandpackProvider>
    </div>
  );
}
