import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { helpers } from "@/util/helpers";
import { GetActivityListQuery, IActivity } from "@/models/activity";
import { activityServices } from "@/services/activity";

const { handleErrorHandler } = helpers;
interface State {
  isGetActivityListLoading: boolean;
  activityList: IActivity[];
  size: number;
  total: number;
}

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const ACTION_TYPE = "activity/";

const initialState: State = {
  isGetActivityListLoading: false,
  activityList: [],
  size: 5,
  total: 0,
};

const loadMoreActivityCR: CR<void> = (state: State) => ({
  ...state,
  size: (state.size + 5),
});

const clearActivityCR: CR<void> = () => ({
    ...initialState
})

const getActivityList = createAsyncThunk(
  `${ACTION_TYPE}getActivityList`,
  async (params: GetActivityListQuery, { dispatch }) => {
    try {
      const result = await activityServices.getActivityList(params);
      return result;
    } catch (error) {
      handleErrorHandler(dispatch, error);
    }
  }
);

const activity = createSlice({
  name: "activity",
  initialState,
  reducers: {
    loadMoreActivity: loadMoreActivityCR,
    clearActivity: clearActivityCR
  },
  extraReducers: (builder) => {
    builder.addCase(getActivityList.pending, (state) => ({
      ...state,
      isGetActivityListLoading: true,
    }));
    builder.addCase(getActivityList.fulfilled, (state, { payload }) => ({
      ...state,
      isGetActivityListLoading: false,
      activityList: payload!.items,
      total: payload!.total,
    }));
    builder.addCase(getActivityList.rejected, (state) => ({
      ...state,
      isGetActivityListLoading: false,
    }));
  },
});

export { getActivityList };

export const {loadMoreActivity, clearActivity} = activity.actions;

export default activity.reducer;
