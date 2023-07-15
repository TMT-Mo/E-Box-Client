import { ValidationErrors } from "@/models/alert";
import { handleError } from "@/slices/alert";
import { KEY } from "@/util/constants";
import { AnyAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ThunkDispatch } from "redux-thunk";

const saveToken = (token: string) => {
  sessionStorage.setItem(KEY.ACCESS_TOKEN, token);
};

const handleErrorHandler = (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  error: AxiosError
) => {
  dispatch(
    handleError({
      errorMessage: (error.response?.data as ValidationErrors).errorMessage,
    })
  );
  throw error;
};

const clearToken = () => {
  sessionStorage.removeItem(KEY.ACCESS_TOKEN);
};

const getToken = (): string => {
  const token = sessionStorage
    .getItem(KEY.ACCESS_TOKEN)
    ?.replace(/(['"])/g, "") as string;
  return token;
};

const handleLocation = (location: string) => {
  sessionStorage.setItem(KEY.LOCATION, location)
};
export const helpers = {
  saveToken,
  clearToken,
  getToken,
  handleErrorHandler,
  handleLocation
};
