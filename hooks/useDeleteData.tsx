import { useApiRequest, ApiRequest, HttpMethod } from "./useApiRequest";


export const useDeleteData = () => {
    const { sendRequest, isFailed, isSuccessful, error, isLoading } = useApiRequest();

    const deleteData = () => {
        const url = '/coin/discard';
        const request: ApiRequest = {
            method: HttpMethod.DELETE,
            path: url
        };

        sendRequest([request]);
    }

    return {
        deleteData,
        isDeleteSuccessful: isSuccessful,
        isDeleteFailed: isFailed,
        deleteError: error,
        isDeleteLoading: isLoading
    }
}