import {
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  ApprovePostArgs,
  CreatePostArguments,
  IPost,
  IPostCategory,
  PostRequestQuery,
} from "./../models/post";
import { postServices } from "@/services/post";
import { handleSuccess } from "@/slices/alert";
import { helpers } from "@/util/helpers";

interface State {
  isGetPostListLoading: boolean;
  isGetPostCategoryListLoading: boolean;
  isApprovePostLoading: boolean;
  searchItemValue?: string;
  isCreatePostLoading: boolean;
  postList: IPost[];
  categoryList: IPostCategory[];
  currentPage: number;
  size: number;
  total: number;
  postDetail?: IPost;
}

const initialState: State = {
  searchItemValue: undefined,
  isApprovePostLoading: false,
  isGetPostListLoading: false,
  isGetPostCategoryListLoading: false,
  isCreatePostLoading: false,
  categoryList: [],
  postList: [],
  currentPage: 0,
  size: 5,
  total: 1,
  postDetail: undefined,
};

const { handleErrorHandler } = helpers;

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "post/";

const onChangePostPageCR: CR<{ selectedPage: number }> = (
  state,
  { payload }
) => ({
  ...state,
  currentPage: payload.selectedPage!,
});

const getPostDetailCR: CR<{ post: IPost }> = (state, { payload }) => ({
  ...state,
  postDetail: payload.post!,
});

const onSearchPostCR: CR<{ value: string }> = (state, { payload }) => ({
  ...state,
  searchItemValue: payload.value,
});

const clearPostCR: CR<void> = () => ({
  ...initialState,
});

const getPostList = createAsyncThunk(
  `${ACTION_TYPE}getPostList`,
  async (params: PostRequestQuery, { dispatch }) => {
    try {
      const result = await postServices.getPostList(params);
      return result;
    } catch (error) {
      handleErrorHandler(dispatch, error);
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
      handleErrorHandler(dispatch, error);
    }
  }
);
const approvePost = createAsyncThunk(
  `${ACTION_TYPE}approvePost`,
  async (args: ApprovePostArgs, { dispatch }) => {
    try {
      const result = await postServices.approvePost(args);
      dispatch(handleSuccess({ message: result.message }));
      return result;
    } catch (error) {
      handleErrorHandler(dispatch, error);
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
      handleErrorHandler(dispatch, error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    onChangePostPage: onChangePostPageCR,
    onSearchPost: onSearchPostCR,
    clearPost: clearPostCR,
    getPostDetail: getPostDetailCR,
  },
  extraReducers: (builder) => {
    builder.addCase(getPostList.pending, (state) => ({
      ...state,
      isGetPostListLoading: true,
    }));
    builder.addCase(getPostList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetPostListLoading: false,
      postList: payload!.items,
      total: payload!.total,
    }));
    builder.addCase(getPostList.rejected, (state) => ({
      ...state,
      isGetPostListLoading: false,
    }));
    builder.addCase(createPost.pending, (state) => ({
      ...state,
      isCreatePostLoading: true,
    }));
    builder.addCase(createPost.fulfilled, (state) => ({
      ...state,
      isCreatePostLoading: false,
    }));
    builder.addCase(createPost.rejected, (state) => ({
      ...state,
      isCreatePostLoading: false,
    }));
    builder.addCase(approvePost.pending, (state) => ({
      ...state,
      isApprovePostLoading: true,
    }));
    builder.addCase(approvePost.fulfilled, (state) => ({
      ...state,
      isApprovePostLoading: false,
    }));
    builder.addCase(approvePost.rejected, (state) => ({
      ...state,
      isApprovePostLoading: false,
    }));
    builder.addCase(getPostCategoryList.pending, (state) => ({
      ...state,
      isGetPostCategoryListLoading: true,
    }));
    builder.addCase(getPostCategoryList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetPostCategoryListLoading: false,
      categoryList: payload!.items,
    }));
    builder.addCase(getPostCategoryList.rejected, (state) => ({
      ...state,
      isGetPostCategoryListLoading: false,
    }));
  },
});

export { getPostList, getPostCategoryList, createPost, approvePost };

export const { onChangePostPage, onSearchPost, clearPost, getPostDetail } =
  postSlice.actions;

export default postSlice.reducer;
