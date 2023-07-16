import { userServices } from "@/services/user";
import { IUser, LoginArgument, UserRequestQuery } from "@/models/user";
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
  isGetUserListLoading?: boolean;
  userList: IUser[];
  searchItemValue?: string;
  currentPage: number;
  size: number;
  total: number;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "user/";

const initialState: State = {
  checkAuthenticated: undefined,
  userInfo: undefined,
  isLoginLoading: false,
  isGetUserListLoading: false,
  userList: [],
  searchItemValue: undefined,
  currentPage: 0,
  size: 5,
  total: 1,
};

const setUserInfoCR: CR<{ user: IUser }> = (state, { payload }) => ({
  ...state,
  userInfo: payload.user!,
});

const onChangeUserPageCR: CR<{ selectedPage: number }> = (
  state,
  { payload }
) => ({
  ...state,
  currentPage: payload.selectedPage!,
});

const checkAuthenticationCR: CR<{ value: boolean }> = (state, { payload }) => ({
  ...state,
  checkAuthenticated: payload.value!,
});

const onSearchUserCR: CR<{ value: string }> = (state, { payload }) => ({
  ...state,
  searchItemValue: payload.value,
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

const getUserList = createAsyncThunk(
  `${ACTION_TYPE}getUserList`,
  async (params: UserRequestQuery, { dispatch }) => {
    try {
      const result = await userServices.getUserList(params);
      return result;
    } catch (error) {
      handleErrorHandler(dispatch, error);
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
    onSearchUser: onSearchUserCR,
    onChangeUserPage: onChangeUserPageCR,
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
    builder.addCase(getUserList.pending, (state) => ({
      ...state,
      isGetUserListLoading: true,
    }));
    builder.addCase(getUserList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetUserListLoading: false,
      userList: payload!.items,
    }));
    builder.addCase(getUserList.rejected, (state) => ({
      ...state,
      isGetUserListLoading: false,
    }));
  },
});

export { login, getUserList };

export const { setUserInfo, checkAuthentication, onChangeUserPage, logoutSlice, onSearchUser } = user.actions;

export default user.reducer;
