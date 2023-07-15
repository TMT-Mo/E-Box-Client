import { apis } from "@/util/api";
import { KEY } from "@/util/constants";
import axios, {
  AxiosError,
  AxiosHeaderValue,
  AxiosResponse,
  Method,
} from "axios";

interface Options {
  url: string;
  params?: object;
  contentType?: "application/json";
  responseType?: "json";
  data?: object | string;
  token?: string;
}

interface FullOptions extends Options {
  method: Method;
}

const axiosConfig = axios.create();
let isRefreshing = false;

axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !isRefreshing) {
      isRefreshing = true;
      const refreshToken = sessionStorage.getItem(KEY.ACCESS_TOKEN);
      if (!refreshToken) {
        return Promise.reject(error);
      }
      try {
        const response = await axios.get(apis.user.refreshToken, {
          withCredentials: true,
        });
        const { accessToken } = response.data;
        sessionStorage.setItem(KEY.ACCESS_TOKEN, accessToken);

        if (accessToken) {
          isRefreshing = false;
        }

        return axiosConfig({
          ...originalRequest,
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const request = (args: FullOptions): Promise<AxiosResponse> => {
  const { method, url, contentType, data, params, responseType } = args;

  const token = sessionStorage.getItem(KEY.ACCESS_TOKEN);
  return axiosConfig.request({
    url,
    method,
    params,
    data,
    responseType,
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const httpClient = {
  get: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "GET" });
  },
  put: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "PUT" });
  },
  post: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "POST" });
  },
  patch: (args: Options): Promise<AxiosResponse> => {
    return request({ ...args, method: "PATCH" });
  },
};
