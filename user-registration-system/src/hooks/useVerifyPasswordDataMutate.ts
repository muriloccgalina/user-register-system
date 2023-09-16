import axios, { AxiosPromise } from "axios";
import { VerifyPasswordData } from "../interface/VerifyPasswordData";
import { useState } from "react";
import { EditData } from "../interface/EditData";
import * as functions from "../models/functions.tsx";

const API_URL = 'http://localhost:8080';

export function useVerifyPasswordDataMutate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = async (data: VerifyPasswordData): AxiosPromise<EditData> => {
    debugger
    try {
      setIsLoading(true);
      const response = await axios.post(API_URL + "/user/login", data);
      response.data.birthdate = functions.ZoneDateToDate(response.data.birthdate);
      setIsSuccess(true);
      return response.data;
    } catch (e: any) {
      setIsSuccess(false)
      throw new Error("Error while verifying password data: " + e.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return { mutate, isLoading, isSuccess }; 
}