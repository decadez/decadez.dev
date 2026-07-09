import { useEffect, useState } from "react";

import { getApiHealth, hasApiBaseUrl } from "utils/apiClient";

type Status = "idle" | "ok" | "down";

const ApiStatus: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!hasApiBaseUrl) {
      return;
    }

    let isMounted = true;

    getApiHealth()
      .then((response) => {
        if (isMounted) {
          setStatus(response.data?.status === "ok" ? "ok" : "down");
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus("down");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!hasApiBaseUrl) {
    return null;
  }

  const isOk = status === "ok";
  const label = isOk ? "API connected" : "API unavailable";

  return (
    <span
      className="ml-2 hidden md:inline-flex items-center gap-1.5 text-xs text-bgdark/70 dark:text-bglight/75"
      title={label}
      aria-label={label}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isOk ? "bg-green-500" : "bg-gray-400"
        }`}
      />
    </span>
  );
};

export default ApiStatus;
