import { createSlice } from "@reduxjs/toolkit";
import {
  ArgAddCardsPackType,
  ArgChangePackType,
  ArgGetPacksType,
  CardPacksType,
  GetPacksResponseType,
  packsApi,
} from "features/packs/packs.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { ArgSetNameType } from "features/auth/auth.api";

const getPacks = createAppAsyncThunk<
  { response: GetPacksResponseType },
  ArgGetPacksType
>("packs/getPacks", async (payload: ArgGetPacksType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(payload);
    console.log(res);
    return { response: res.data };
  });
});

const addPack = createAppAsyncThunk<void, ArgAddCardsPackType>(
  "packs/addPack",
  async (arg: ArgAddCardsPackType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.addPack(arg);
      return;
    });
  }
);

const deletePack = createAppAsyncThunk<void, string>(
  "packs/deletePack",
  async (arg: string, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.deletePack(arg);
      return;
    });
  }
);

const changePack = createAppAsyncThunk<void, ArgChangePackType>(
  "packs/changePack",
  async (arg: ArgChangePackType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.changePack(arg);
      return;
    });
  }
);

const slice = createSlice({
  name: "packs",
  initialState: {
    packs: null as CardPacksType[] | null,
    page: null as number | null,
    pageCount: null as number | null,
    cardPacksTotalCount: null as number | null,
    minCardsCount: 0,
    maxCardsCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPacks.fulfilled, (state, action) => {
        console.log(action.payload.response);
        state.packs = action.payload.response.cardPacks;
        state.page = action.payload.response.page;
        state.cardPacksTotalCount = action.payload.response.cardPacksTotalCount;
        state.maxCardsCount = action.payload.response.maxCardsCount;
        state.minCardsCount = action.payload.response.minCardsCount;
        state.pageCount = action.payload.response.pageCount;
      })
      .addCase(addPack.fulfilled, (state, action) => {
        packsThunks.getPacks({});
      })
      .addCase(deletePack.fulfilled, (state, action) => {
        packsThunks.getPacks({});
      })
      .addCase(changePack.fulfilled, (state, action) => {
        packsThunks.getPacks({});
      });
  },
});

export const packsReducer = slice.reducer;
export const packsThunks = {
  getPacks,
  addPack,
  deletePack,
  changePack,
};
