import {
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { CreatePostArguments, IPost, IPostCategory, PostRequestQuery } from "./../models/post";
import { postServices } from "@/services/post";
import { ValidationErrors } from "@/models/alert";
import { handleError, handleSuccess } from "@/slices/alert";
import { AxiosError } from "axios";
import jwtDecode from "jwt-decode";

interface State {
  isGetPostListLoading: boolean;
  isGetPostCategoryListLoading: boolean;
  isCreatePostLoading: boolean;
  postList: IPost[];
  categoryList: IPostCategory[];
  currentPage: number;
  size: number,
  total: number
}

const initialState: State = {
  isGetPostListLoading: false,
  isGetPostCategoryListLoading: false,
  isCreatePostLoading: false,
  categoryList: [],
  postList: [],
  currentPage: 1,
  size: 5,
  total: 1
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "post/";

const onChangePostPageCR: CR<{ selectedPage: number }> = (
  state,
  { payload }
) => ({
  ...state,
  currentPage: payload.selectedPage!,
});

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
const createPost = createAsyncThunk(
  `${ACTION_TYPE}createPost`,
  async (args: CreatePostArguments, { dispatch }) => {
    try {
      const result = await postServices.createPost(args);
      dispatch(handleSuccess({ message: result.message }));
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

const getPostCategoryList = createAsyncThunk(
  `${ACTION_TYPE}getPostCategoryList`,
  async (_, { dispatch }) => {
    try {
      const result = await postServices.getPostCategoryList();
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
  reducers: {
    onChangePostPage: onChangePostPageCR
  },
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
    builder.addCase(createPost.pending, (state) => ({
      ...state,
      isCreatePostLoading: true,
    }));
    builder.addCase(createPost.fulfilled, (state, { payload }) => ({
      ...state,
      isCreatePostLoading: false
    }));
    builder.addCase(createPost.rejected, (state) => ({
      ...state,
      isCreatePostLoading: false,
    }));
    builder.addCase(getPostCategoryList.pending, (state) => ({
      ...state,
      isGetPostCategoryListLoading: true,
    }));
    builder.addCase(getPostCategoryList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetPostCategoryListLoading: false,
      categoryList: payload.items,
    }));
    builder.addCase(getPostCategoryList.rejected, (state) => ({
      ...state,
      isGetPostCategoryListLoading: false,
    }));
  },
});

export { getPostList, getPostCategoryList, createPost };

export const {onChangePostPage} = postSlice.actions

export default postSlice.reducer
