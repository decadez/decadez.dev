import { useEffect, useRef } from "react";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";

export function RscFileBridge() {
  const { sandpack, dispatch, listen } = useSandpack();
  const filesRef = useRef(sandpack.files);
  filesRef.current = sandpack.files;

  useEffect(() => {
    const unsubscribe = listen((msg) => {
      if (msg.type !== "done") {
        return;
      }

      const files: Record<string, string> = {};
      for (const [path, file] of Object.entries(filesRef.current)) {
        files[path] = file.code;
      }

      dispatch({ type: "rsc-file-update", files } as any);
    });

    return unsubscribe;
  }, [dispatch, listen]);

  return null;
}
