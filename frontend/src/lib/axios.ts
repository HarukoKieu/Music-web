import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
});

// ✅ FIX: Track interceptor ID để eject trước khi add mới
let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

export const attachTokenInterceptor = (
  getToken: () => Promise<string | null>,
) => {
  // Eject interceptors cũ nếu đã tồn tại, tránh tích lũy
  if (requestInterceptorId !== null) {
    api.interceptors.request.eject(requestInterceptorId);
  }
  if (responseInterceptorId !== null) {
    api.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  responseInterceptorId = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized request - token may be expired");
      }
      return Promise.reject(error);
    },
  );
};
