import { useSyncExternalStore } from "react";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";
import { AppJSPath, StylesCSSPath, SUPPORTED_FILES } from "./createFileMap";
import { IconDownload } from "./icons";

let supportsImportMap = false;

function subscribe(callback: () => void) {
  const timeout = setTimeout(() => {
    supportsImportMap =
      typeof HTMLScriptElement !== "undefined" &&
      "supports" in HTMLScriptElement &&
      (
        HTMLScriptElement as unknown as { supports: (type: string) => boolean }
      ).supports("importmap");
    callback();
  }, 0);

  return () => clearTimeout(timeout);
}

function useSupportsImportMap() {
  return useSyncExternalStore(
    subscribe,
    () => supportsImportMap,
    () => false
  );
}

export function DownloadButton({
  providedFiles,
}: {
  providedFiles: Array<string>;
}) {
  const { sandpack } = useSandpack();
  const supported = useSupportsImportMap();

  if (
    !supported ||
    providedFiles.some((file) => !SUPPORTED_FILES.includes(file))
  ) {
    return null;
  }

  const downloadHTML = () => {
    const css = sandpack.files[StylesCSSPath]?.code ?? "";
    const code = sandpack.files[AppJSPath]?.code ?? "";
    const blob = new Blob([
      `<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
</body>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.0/dist/es-module-shims.js"></script>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react?dev",
    "react-dom/client": "https://esm.sh/react-dom/client?dev"
  }
}
</script>
<script type="text/babel" data-type="module">
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

${code.replace("export default ", "let App = ")}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
</script>
<style>
${css}
</style>
</html>`,
    ]);
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.href = url;
    anchor.download = "sandbox.html";
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      className="ui-sandpack-action"
      onClick={downloadHTML}
      title="Download sandbox"
      type="button"
    >
      <IconDownload className="ui-sandpack-action-icon" />
      <span>Download</span>
    </button>
  );
}
