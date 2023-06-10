import { AppDispatch, RootState } from "app/store";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

type Options = { showGlobalError?: boolean };

export const thunkTryCatch = async <T>(
  thunkAPI: ThunkApiType,
  promise: () => Promise<T>,
  options?: Options
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { showGlobalError } = options || {};
  const { rejectWithValue } = thunkAPI;
  try {
    return await promise();
  } catch (e) {
    return rejectWithValue({ error: e, showGlobalError });
  }
};

export type ThunkApiType = BaseThunkAPI<RootState, any, AppDispatch, unknown>;
