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
import { getQueryParamsFromThunkApi } from "features/packs/utils/getQueryParamsFromThunkApi";

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
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.addPack(arg);
      dispatch(getPacks(getQueryParamsFromThunkApi(thunkAPI)));
    });
  }
);

const deletePack = createAppAsyncThunk<void, string>(
  "packs/deletePack",
  async (arg: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.deletePack(arg);
      dispatch(getPacks(getQueryParamsFromThunkApi(thunkAPI)));
    });
  }
);

const changePack = createAppAsyncThunk<void, ArgChangePackType>(
  "packs/changePack",
  async (arg: ArgChangePackType, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.changePack(arg);
      dispatch(getPacks(getQueryParamsFromThunkApi(thunkAPI)));
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
    queryParams: {
      packName: "",
      min: 0,
      max: 0,
      sortPacks: "",
      page: 1,
      pageCount: 0,
      user_id: "",
      block: false,
    },
  },
  reducers: {
    cleareQueryParams: (state, action) => {
      state.queryParams = action.payload.queryParams;
    },
    setUserId: (state, action) => {
      state.queryParams.user_id = action.payload.user_id;
    },
    setMinMax: (state, action) => {
      state.queryParams.min = action.payload.min;
      state.queryParams.max = action.payload.max;
    },
    setSearchPackName: (state, action) => {
      state.queryParams.packName = action.payload.searchPackName;
    },
    setPage: (state, action) => {
      state.queryParams.page = action.payload.page;
    },
    setPageCount: (state, action) => {
      state.queryParams.pageCount = action.payload.pageCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      console.log(action.payload.response);
      const packs = action.payload.response;
      state.packs = packs.cardPacks;
      state.page = packs.page;
      state.cardPacksTotalCount = packs.cardPacksTotalCount;
      state.maxCardsCount = packs.maxCardsCount;
      state.minCardsCount = packs.minCardsCount;
      state.pageCount = packs.pageCount;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsAction = slice.actions;
export const packsThunks = {
  getPacks,
  addPack,
  deletePack,
  changePack,
};
