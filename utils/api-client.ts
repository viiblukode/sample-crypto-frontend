import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios"
import config from "./config";

export interface ApiResponse<T> {
    data?: T;
    error?: Error;
}

export type RequestParam = {
    [key: string]: unknown;
}

type APIRequestError = {
    code?: string;
    message?: string;
    response?: { data: Error }
}

export type ApiService<P, R> = (payload?: P) => Promise<ApiResponse<R>>;

export class HttpClient {
    protected axiosInstance: AxiosInstance

    constructor() {
        const { baseUrl } = config;
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: 20000
        });  
    }

    public get axios(): AxiosInstance {
        return this.axios;
    }

    private static handleResponse<T>(response: AxiosResponse): ApiResponse<T> {
        return {
            data: response.data as T
        };
    }

    public async get<T>(
        path: string,
        params?: RequestParam,
        options?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const result = await this.axiosInstance.get<T>(path, {
                params,
                ...options,
            });
            return HttpClient.handleResponse(result)
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
    }

    public async post<T, P>(
        path: string,
        payload: P,
        options?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const result = await this.axiosInstance.post<P>(path, payload, options);
            return HttpClient.handleResponse(result)
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
    }

    public async delete(
        path: string,
        options?: AxiosRequestConfig
    ): Promise<void> {
        try {
            await this.axiosInstance.delete<void>(path, options);
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
    }

    public async put<T, P>(
        path: string,
        payload: P,
        options?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const result = await this.axiosInstance.put<P>(path, payload, options);
            return HttpClient.handleResponse(result)
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
    }

}

export const httpClient = new HttpClient();