import {
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { IPost, PostRequestQuery } from "./../models/post";
import { postServices } from "@/services/post";
import { ValidationErrors } from "@/models/alert";
import { handleError } from "@/slices/alert";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";

interface State {
  isGetPostListLoading: boolean;
  postList: IPost[];
  currentPage: number;
  size: number
}

const initialState: State = {
  isGetPostListLoading: false,
  postList: [],
  currentPage: 1,
  size: 10
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "auth/";

const getPostList = createAsyncThunk(
  `${ACTION_TYPE}getPostList`,
  async (params: PostRequestQuery, { dispatch }) => {
    try {
      const result = await postServices.getPostList(params);
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

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostList.pending, (state) => ({
      ...state,
      isGetPostListLoading: true,
    }));
    builder.addCase(getPostList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetPostListLoading: false,
      postList: payload.items,
    }));
    builder.addCase(getPostList.rejected, (state) => ({
      ...state,
      isGetPostListLoading: false,
    }));
  },
});

export { getPostList };

export default postSlice.reducer
