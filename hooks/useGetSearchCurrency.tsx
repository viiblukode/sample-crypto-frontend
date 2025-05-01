import { CurrencyInfo } from "../types/dataTypes";
import { ApiRequest, HttpMethod, useApiRequest } from "./useApiRequest"

export const useGetSearchCurrency = () => {
    const { sendRequest, response, isFailed, isSuccessful, error, isLoading } = useApiRequest();

    const searchCoinList = (searchVal?: string) => {
        const url = `/coin/find?search=${searchVal}`;
        const request: ApiRequest = {
            method: HttpMethod.GET,
            path: url,
        };

        sendRequest([request]);
    }

    const dataArray = response as any[];
    const searchResult = dataArray?.[0].data as CurrencyInfo[];

    return {
        searchCoinList,
        searchResult,
        isSearchCoinSuccessful: isSuccessful,
        isSearchCoinFailed: isFailed,
        getSearchCoinError: error,
        getSearchCoinLoading: isLoading
    };
}