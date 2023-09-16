import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditData } from "../interface/EditData";

const API_URL = 'http://localhost:8080'

const putData = async (data: EditData): AxiosPromise<any> => {
    const response = axios.put(API_URL + "/update", data);
    return response;
}

export function useEditDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            queryClient.invalidateQueries(['user-data'])
        }
    })

    return mutate;
}