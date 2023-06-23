import { createSlice } from "@reduxjs/toolkit";
import {
  ArgCreateNewCard,
  ArgGetCard,
  cardsApi,
  CardType,
  ResponseGetCards,
} from "features/cards/cards.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";

const getCards = createAppAsyncThunk<
  { response: ResponseGetCards },
  ArgGetCard
>("cards/getCards", async (payload: ArgGetCard, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.getCards(payload);
    console.log(res.data);
    return { response: res.data };
  });
});

const addCard = createAppAsyncThunk<void, ArgCreateNewCard>(
  "cards/addCard",
  async (newCard: ArgCreateNewCard, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const cardsPack_id = thunkAPI.getState().cards.cardsPack_id;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsApi.createNewCard(newCard);
      dispatch(cardsThunks.getCards({ cardsPack_id }));
    });
  }
);
const deleteCard = createAppAsyncThunk<void, string>(
  "cards/deleteCard",
  async (cardId: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const cardsPack_id = thunkAPI.getState().cards.cardsPack_id;
    return thunkTryCatch(thunkAPI, async () => {
      await cardsApi.deleteCard(cardId);
      dispatch(cardsThunks.getCards({ cardsPack_id }));
    });
  }
);

const slice = createSlice({
  name: "cards",
  initialState: {
    cardsPack_id: "",
    cardsPack_name: "",
    cards: null as CardType[] | null,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    cardQuestion: "",
    sortCards: "",
    packUserId: null as string | null,
  },
  //   cardAnswer=english // не обязательно
  //   &cardQuestion=english // не обязательно
  //   &cardsPack_id=5eb6a2f72f849402d46c6ac7
  // &min=1 // не обязательно
  // &max=4 // не обязательно
  // &sortCards=0grade // не обязательно
  // &page=1 // не обязательно
  // &pageCount=7
  reducers: {
    setCardsPackIdAndName: (state, action) => {
      state.cardsPack_id = action.payload.cardsPack_id;
      state.cardsPack_name = action.payload.cardsPack_name;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload.pageCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      const res = action.payload.response;
      state.cards = res.cards;
      state.cardsTotalCount = res.cardsTotalCount;
      state.maxGrade = res.maxGrade;
      state.minGrade = res.minGrade;
      state.page = res.page;
      state.pageCount = res.pageCount;
      state.packUserId = res.packUserId;
    });
  },
});

export const cardsReducer = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = {
  getCards,
  addCard,
  deleteCard,
};
