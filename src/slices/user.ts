import { ValidationErrors } from "@/models/alert";
import { userServices } from "@/services/user";
import {
  UserInfo,
  LoginArgument,
} from "@/models/user";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { AxiosError } from "axios";
import { handleError, handleSuccess } from "./alert";
import { helpers } from "@/util/helpers";
import Cookie from 'js-cookie'

interface State {
  userInfo?: UserInfo;
  isLoginLoading: boolean;
  checkAuthenticated?: boolean;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "user/";

const initialState: State = {
  checkAuthenticated: undefined,
  userInfo: undefined,
  isLoginLoading: false,
};



const setUserInfoCR: CR<{ user: UserInfo }> = (state, { payload }) => ({
  ...state,
  userInfo: payload.user!,
});

const checkAuthenticationCR: CR<{ value: boolean }> = (state, { payload }) => ({
  ...state,
  checkAuthenticated: payload.value!,
});

const logoutCR: CR<void> = () => ({
  ...initialState,
});

const login = createAsyncThunk(
  `${ACTION_TYPE}login`,
  async (args: LoginArgument, { dispatch }) => {
    try {
      const result = await userServices.login(args as LoginArgument);
      helpers.saveToken(result.accessToken as string)
      return result;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.data) {
        dispatch(
          handleError({
            errorMessage: (err.response?.data as ValidationErrors).errorMessage,
          })
        );
      } else {
        dispatch(handleError({ errorMessage: err.message }));
      }
      throw err;
    }
  }
);

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: setUserInfoCR,
    checkAuthentication: checkAuthenticationCR,
    logoutSlice: logoutCR,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => ({
      ...state,
      isLoginLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload?.accessToken) {
        return {
          ...state,
          isLoginLoading: false,
          userInfo: jwtDecode(payload.accessToken),
        };
      }
      return {
        ...state,
        isLoginLoading: false,
        userInfo: undefined,
      };
    });
    builder.addCase(login.rejected, (state) => ({
      ...state,
      isLoginLoading: false,
    }));
    
  },
});

export { login };

export const { setUserInfo, checkAuthentication, logoutSlice } = user.actions;

export default user.reducer;
