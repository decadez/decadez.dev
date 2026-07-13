import { Children, type ReactNode } from "react";
import {
  SandpackProvider,
  type SandpackFiles,
} from "@codesandbox/sandpack-react/unstyled";
import { SandpackLogLevel } from "@codesandbox/sandpack-client";
import { CustomPreset } from "./CustomPreset";
import { createFileMap } from "./createFileMap";
import { CustomTheme } from "./Themes";
import { templateRSC } from "./templateRSC";
import { RscFileBridge } from "./sandpack-rsc/RscFileBridge";

type SandpackRSCRootProps = {
  children?: ReactNode;
  files?: SandpackFiles;
  preview?: ReactNode;
  autorun?: boolean;
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

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}
`.trim();

function getFileCode(files: SandpackFiles, filePath: string): string {
  const file = files[filePath];
  if (typeof file === "string") {
    return file;
  }
  return file?.code ?? "";
}

export default function SandpackRSCRoot({
  children,
  files: filesProp,
  preview,
  autorun = true,
}: SandpackRSCRootProps) {
  const files: SandpackFiles = {
    ...(filesProp ?? createFileMap(Children.toArray(children))),
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

  return (
    <div className="sandpack sandpack--playground ui-mdx-sandbox" dir="ltr">
      <SandpackProvider
        files={{ ...templateRSC, ...files }}
        theme={CustomTheme}
        customSetup={{
          dependencies: {},
        }}
        options={{
          autorun,
          initMode: "user-visible",
          initModeObserverOptions: { rootMargin: "1400px 0px" },
          logLevel: SandpackLogLevel.None,
        }}
      >
        <RscFileBridge />
        <CustomPreset
          providedFiles={Object.keys(files)}
          preview={preview}
          showOpenInCodeSandbox={false}
        />
      </SandpackProvider>
    </div>
  );
}
