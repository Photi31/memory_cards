import { createSlice } from "@reduxjs/toolkit";
import {
  ArgGetPacksType,
  GetPacksResponseType,
  packsApi,
} from "features/packs/packs.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { ArgSetNameType } from "features/auth/auth.api";

const getPacks = createAppAsyncThunk<
  { packs: GetPacksResponseType },
  ArgGetPacksType
>("packs/getPacks", async (payload: ArgGetPacksType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(payload);
    return { packs: res.data };
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    packs: null as ArgSetNameType[] | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      console.log(action.payload.packs);
      state.packs = action.payload.packs.cardPacks;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsThunks = {
  getPacks,
};
