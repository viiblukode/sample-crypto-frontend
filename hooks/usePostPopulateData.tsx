import { ApiRequest, HttpMethod, useApiRequest } from "./useApiRequest"

export const usePostPopulateData = () => {
    const { sendRequest, response, isFailed, isSuccessful, error } = useApiRequest();

    const postPopulateData = () => {
        const url = '/coin/populate';
        const request: ApiRequest = {
            method: HttpMethod.POST,
            path: url
        };

        sendRequest([request]);
    }

    const dataArray = response as any[];
    const dataResult = dataArray?.[0].data;

    return {
        postPopulateData,
        dataResult,
        isPostPopulateDataSuccessful: isSuccessful,
        isPostPopulateDataFailed: isFailed,
        postError: error
    }
}