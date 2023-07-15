import { userServices } from "@/services/user";
import { IUser, LoginArgument } from "@/models/user";
import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { helpers } from "@/util/helpers";

const {handleErrorHandler, saveToken} = helpers
interface State {
  userInfo?: IUser;
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

const setUserInfoCR: CR<{ user: IUser }> = (state, { payload }) => ({
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
      saveToken(result.accessToken as string);
      return result;
    } catch (error) {
      handleErrorHandler(dispatch, error)
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
