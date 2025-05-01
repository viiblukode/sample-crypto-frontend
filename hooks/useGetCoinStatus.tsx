import { ApiRequest, HttpMethod, useApiRequest } from "./useApiRequest"

export const useGetCoinStatus = () => {
    const { sendRequest, response, isFailed, isSuccessful, error, isLoading } = useApiRequest();

    const getCoinStatus = (coinId: string) => {
        const url = `/coin/status/${coinId}`;
        const request: ApiRequest = {
            method: HttpMethod.GET,
            path: url,
        };

        sendRequest([request]);
    }

    const dataArray = response as any[];
    const coinData = dataArray?.[0].data;

    return {
        getCoinStatus,
        coinData,
        isGetCoinStatusSuccessful: isSuccessful,
        isGetCoinStatusFailed: isFailed,
        getCoinStatusError: error,
        getCoinStatusLoading: isLoading
    };
}