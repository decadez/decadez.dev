import { useEffect, useRef, useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";
import { cx } from "../../utils";
import { IconChevron } from "./icons";

type ConsoleData = Array<{
  data: Array<string | Record<string, string>>;
  id: string;
  method: string;
}>;

const maxMessageCount = 100;

function formatStr(...inputArgs: unknown[]): unknown[] {
  const maybeMessage = inputArgs[0];
  if (typeof maybeMessage !== "string") {
    return inputArgs;
  }

  const args = inputArgs.slice(1);
  let formatted = String(maybeMessage);
  if (args.length) {
    formatted = formatted.replace(
      /(%?)(%([jds]))/g,
      (match, escaped, _pattern, flag) => {
        let arg = args.shift();
        switch (flag) {
          case "s":
            arg = `${arg}`;
            break;
          case "d":
          case "i":
            arg = parseInt(String(arg), 10).toString();
            break;
          case "f":
            arg = parseFloat(String(arg)).toString();
            break;
        }
        if (!escaped) {
          return String(arg);
        }
        args.unshift(arg);
        return match;
      }
    );
  }

  if (args.length) {
    formatted += ` ${args.map(String).join(" ")}`;
  }

  return [formatted.replace(/%{2,2}/g, "%")];
}

function getType(method: string): "info" | "warning" | "error" {
  if (method === "warn") {
    return "warning";
  }

  if (method === "error") {
    return "error";
  }

  return "info";
}

export const SandpackConsole = ({ visible }: { visible: boolean }) => {
  const { listen } = useSandpack();
  const [logs, setLogs] = useState<ConsoleData>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    let isActive = true;
    const unsubscribe = listen((message) => {
      if (!isActive) {
        return;
      }

      if (
        (message.type === "start" && message.firstLoad) ||
        message.type === "refresh"
      ) {
        setLogs([]);
      }

      if (message.type === "console" && message.codesandbox) {
        setLogs((prev) => {
          const newLogs = message.log
            .filter((consoleData) => consoleData.method && consoleData.data)
            .map((consoleData) => ({
              ...consoleData,
              data: formatStr(...consoleData.data) as Array<
                string | Record<string, string>
              >,
            }));
          const messages = [...prev, ...newLogs];
          while (messages.length > maxMessageCount) {
            messages.shift();
          }
          return messages;
        });
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [listen]);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [logs]);

  if (!visible || logs.length === 0) {
    return null;
  }

  return (
    <div className="ui-sandpack-console">
      <div className="ui-sandpack-console-header">
        <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
          <IconChevron displayDirection={isExpanded ? "down" : "right"} />
          <span>Console ({logs.length})</span>
        </button>
        <button type="button" onClick={() => setLogs([])}>
          Clear
        </button>
      </div>
      {isExpanded && (
        <div className="ui-sandpack-console-lines" ref={wrapperRef}>
          {logs.map(({ data, id, method }) => (
            <div
              key={id}
              className={cx(
                "ui-sandpack-console-line",
                `ui-sandpack-console-line--${getType(method)}`
              )}
            >
              {data.map((msg, index) => (
                <span key={index}>
                  {typeof msg === "string" ? msg : JSON.stringify(msg, null, 2)}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
