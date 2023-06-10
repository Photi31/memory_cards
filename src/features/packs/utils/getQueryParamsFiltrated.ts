import { ArgGetPacksType } from "features/packs/packs.api";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "app/store";

export const getQueryParamsFiltrated = (queryParams: ArgGetPacksType) => {
  const res: Array<ResType> = [];
  Object.entries(queryParams).map(([key, value]) => {
    if (!!value) res.push([key, value]);
  });
  return Object.fromEntries(res);
};

type ResType = [string, string | number | boolean];
type ThunkApiType = BaseThunkAPI<RootState, any, AppDispatch, unknown>;
