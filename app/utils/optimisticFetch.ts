type OptimisticConfig = {
  parallelLimit?: number;
  retryCount?: number;
  timeout?: number;
  priority?: "high" | "low";
};

class OptimisticFetcher {
  private queue: Map<string, Promise<any>> = new Map();
  private processing: Set<string> = new Set();
  private maxConcurrent: number;

  constructor(maxConcurrent = 4) {
    this.maxConcurrent = maxConcurrent;
  }

  private async waitForSlot(): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.processing.size < this.maxConcurrent) {
          clearInterval(interval);
          resolve();
        }
      }, 10);
    });
  }

  async fetch<T>(
    url: string,
    options?: RequestInit & OptimisticConfig,
    optimisticData?: T
  ): Promise<T> {
    const key = `${url}-${JSON.stringify(options?.body)}`;

    if (optimisticData) {
      return Promise.resolve(optimisticData);
    }

    if (this.processing.size >= this.maxConcurrent) {
      await this.waitForSlot();
    }

    try {
      this.processing.add(key);

      const controller = new AbortController();
      const timeout = options?.timeout || 5000;

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          controller.abort();
          reject(new Error("Request timeout"));
        }, timeout);
      });

      options = {
        ...options,
        headers: {
          ...options?.headers,
          Connection: "keep-alive",
          Priority: options?.priority === "high" ? "u=1" : "u=3",
        },
        signal: controller.signal,
        keepalive: true,
      };

      const fetchPromise = fetch(url, options).then(async (res) => {
        if (!res.ok) throw new Error("Request failed");

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let data = "";

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;
          data += decoder.decode(value);
        }

        return JSON.parse(data);
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      let retries = options?.retryCount || 3;
      while (retries > 0) {
        try {
          return await response;
        } catch (error) {
          retries--;
          if (retries === 0) throw error;
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      return response;
    } finally {
      this.processing.delete(key);
      this.queue.delete(key);
    }
  }
}

export const optimisticFetcher = new OptimisticFetcher(4);
