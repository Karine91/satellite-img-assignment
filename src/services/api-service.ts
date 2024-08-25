import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { API_URL } from "@/config/constants";

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
    });
  }

  get<T>(url: string, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.get<T>(url, config);
  }

  delete<T>(url: string, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.delete<T>(url, config);
  }

  post<T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.post<T>(url, body, config);
  }
  patch<T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.patch<T>(url, body, config);
  }
  put<T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
    return this.axiosInstance.put<T>(url, body, config);
  }
}
