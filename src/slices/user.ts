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
  // token: string | null;
  userInfo?: UserInfo | undefined;
  isLoginLoading: boolean;
  checkAuthenticated?: boolean;
  isGetSignatureLoading: boolean;
  signature?: string;
  isChangePasswordLoading: boolean;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "auth/";

const initialState: State = {
  checkAuthenticated: undefined,
  userInfo: undefined,
  isLoginLoading: false,
  isGetSignatureLoading: false,
  signature: undefined,
  isChangePasswordLoading: false,
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
      // Cookie.set('refreshToken', result.token)
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
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: setUserInfoCR,
    checkAuthentication: checkAuthenticationCR,
    logout: logoutCR,
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

// export const { setUserInfo, checkAuthentication, logout } = auth.actions;

export default user.reducer;
