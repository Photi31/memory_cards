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
  { packs: GetPacksResponseType },
  ArgGetPacksType
>("packs/getPacks", async (payload: ArgGetPacksType, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(payload);
    return { packs: res.data };
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
    packs: null as ArgSetNameType[] | null,
    searchPackQueryParams: {
      packName: null as string | null,
      min: null as number | null,
      max: null as number | null,
      sortPacks: null as string | null,
      page: null as number | null,
      pageCount: null as number | null,
      user_id: null as string | null,
      block: null as boolean | null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPacks.fulfilled, (state, action) => {
        console.log(action.payload.packs);
        state.packs = action.payload.packs.cardPacks;
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
