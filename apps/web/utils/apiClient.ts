const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T | null;
};

export type ApiHealth = {
  status: string;
  service: string;
};

export const hasApiBaseUrl = API_BASE_URL.length > 0;

export async function apiGet<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse<T>;

  if (payload.code !== 0) {
    throw new Error(payload.message || "API request failed");
  }

  return payload;
}

export async function getApiHealth() {
  return apiGet<ApiHealth>("/v1/health");
}
