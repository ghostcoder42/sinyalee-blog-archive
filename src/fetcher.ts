import { withRetry } from "./utils/retry.ts";

export type FetchOptions = {
  userAgent: string;
  timeoutMs: number;
  maxRetries: number;
};

export async function fetchWithRetry(url: string, options: FetchOptions): Promise<Response> {
  return withRetry(
    () =>
      fetch(url, {
        headers: {
          "User-Agent": options.userAgent,
          Accept: "text/html,application/xhtml+xml",
        },
        signal: AbortSignal.timeout(options.timeoutMs),
      }),
    options.maxRetries,
    (error) => {
      if (error instanceof Response) {
        return error.status === 429 || error.status === 503;
      }
      return error instanceof TypeError || error instanceof DOMException;
    },
  );
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
