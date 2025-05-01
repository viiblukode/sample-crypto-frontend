import { CurrencyInfo } from "../types/dataTypes";
import { ApiRequest, HttpMethod, useApiRequest } from "./useApiRequest"

export const useGetCurrencyData = () => {
    const { sendRequest, response, isFailed, isSuccessful, error, isLoading } = useApiRequest();

    const getCurrencyList = (type?: string) => {
        const url = `/coin/list?type=${type}`;
        const request: ApiRequest = {
            method: HttpMethod.GET,
            path: url,
        };

        sendRequest([request]);
    }

    const dataArray = response as any[];
    const dataResult = dataArray?.[0].data as CurrencyInfo[];

    return {
        getCurrencyList,
        dataResult,
        isGetCurrencyDataSuccessful: isSuccessful,
        isGetCurrencyDataFailed: isFailed,
        getCurrencyDataError: error,
        getCurrencyDataLoading: isLoading
    };
}