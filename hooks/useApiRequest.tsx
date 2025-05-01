import { AxiosRequestConfig } from "axios";
import { httpClient, RequestParam } from "../utils/api-client";
import { useState } from "react";

interface APIRequestResponse {
    response: unknown;
    error: Error | null;
    isLoading: boolean;
    isFailed: boolean;
    isSuccessful: boolean;
}

const initialState = {
    response: null,
    error: null,
    isLoading: false,
    isFailed: false,
    isSuccessful: false,
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
}

export interface ApiRequest {
    method: HttpMethod;
    path: string;
    params?: RequestParam;
    options?: AxiosRequestConfig
}

export const useApiRequest = () => {
    const [state, setState] = useState<APIRequestResponse>(initialState);
    
    const sendRequest = async <T,>(requests: ApiRequest[]) => {
        setState({ ...initialState, isLoading: true});
        try {
            const results = await Promise.all(
                requests.map(({method, path, params, options}) => {
                    switch(method){
                        case HttpMethod.GET:
                            return httpClient.get<T>(path, params, options);
                        case HttpMethod.POST:
                            return httpClient.post<T, object | undefined>(
                                path, params, options
                            );
                        case HttpMethod.PUT:
                            return httpClient.put<T,  object | undefined>(path, params);
                        case HttpMethod.DELETE:
                            return httpClient.delete(path, options);
                        default:
                            throw new Error('This api request is not supported for now');
                    }
                })
            );
            setState({ ...initialState, response: results, isSuccessful: true});
        } catch (err) {
            setState({
                ...initialState,
                error: err as Error,
                isFailed: true,
            })
        }
    }

    return { ...state, sendRequest}
  
}

