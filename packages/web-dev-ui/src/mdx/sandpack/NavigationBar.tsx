import { useEffect, useRef, useState } from "react";
import {
  FileTabs,
  useSandpack,
  useSandpackNavigation,
} from "@codesandbox/sandpack-react/unstyled";
import { ClearButton } from "./ClearButton";
import { DownloadButton } from "./DownloadButton";
import { OpenInCodeSandboxButton } from "./OpenInCodeSandboxButton";
import { OpenInTypeScriptPlaygroundButton } from "./OpenInTypeScriptPlayground";
import { ReloadButton } from "./ReloadButton";

const getFileName = (filePath: string): string => {
  const lastIndexOfSlash = filePath.lastIndexOf("/");
  return filePath.slice(lastIndexOfSlash + 1);
};

export function NavigationBar({
  providedFiles,
  showOpenInCodeSandbox = true,
}: {
  providedFiles: Array<string>;
  showOpenInCodeSandbox?: boolean;
}) {
  const { sandpack } = useSandpack();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(true);
  const { activeFile, setActiveFile, visibleFiles, clients } = sandpack;
  const clientId = Object.keys(clients)[0];
  const { refresh } = useSandpackNavigation(clientId);
  const isMultiFile = visibleFiles.length > 1;

  useEffect(() => {
    if (!isMultiFile || !containerRef.current || !tabsRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || !tabsRef.current) {
        return;
      }
      const containerWidth = entry.contentRect.width;
      const tabsWidth = tabsRef.current.getBoundingClientRect().width;
      setShowDropdown(tabsWidth >= containerWidth);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [isMultiFile]);

  const handleClear = () => {
    if (sandpack.editorState === "dirty" && !confirm("Clear all your edits?")) {
      return;
    }
    sandpack.resetAllFiles();
    refresh();
  };

  return (
    <div className="ui-sandpack-navigation">
      <div ref={containerRef} className="ui-sandpack-tabs">
        <div ref={tabsRef} className={showDropdown ? "is-measured" : ""}>
          <FileTabs />
        </div>
        {isMultiFile && showDropdown && (
          <select
            aria-label="Active sandbox file"
            value={activeFile}
            onChange={(event) => setActiveFile(event.target.value)}
          >
            {visibleFiles.map((filePath) => (
              <option key={filePath} value={filePath}>
                {getFileName(filePath)}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="ui-sandpack-actions" translate="yes">
        <DownloadButton providedFiles={providedFiles} />
        <ReloadButton onReload={refresh} />
        <ClearButton onClear={handleClear} />
        {showOpenInCodeSandbox && <OpenInCodeSandboxButton />}
        {activeFile.endsWith(".tsx") && (
          <OpenInTypeScriptPlaygroundButton
            content={sandpack.files[activeFile]?.code || ""}
          />
        )}
      </div>
    </div>
  );
}
