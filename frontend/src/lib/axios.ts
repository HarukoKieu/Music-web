import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
});

/**
 * Attach a request interceptor to dynamically inject the latest auth token.
 * This avoids stale tokens and removes the need for global mutable headers.
 */
export const attachTokenInterceptor = (
  getToken: () => Promise<string | null>,
) => {
  api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  /**
   * Handle global response errors (e.g., expired token)
   */
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized request - token may be expired");
        // Optionally trigger logout or token refresh here
      }

      return Promise.reject(error);
    },
  );
};
