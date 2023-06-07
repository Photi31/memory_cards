import { instance } from "common/api";

export const packsApi = {
  getPacks: (payload: ArgGetPacksType) => {
    return instance.get<GetPacksResponseType>("/cards/pack", {
      params: { payload },
    });
  },
  addPack: (arg: ArgAddCardsPackType) => {
    return instance.post<{ newCardsPack: CardPacksType }>("/cards/pack", {
      cardsPack: arg,
    });
  },
  deletePack: (id: string) => {
    return instance.delete<{ deletedCardsPack: CardPacksType }>("/cards/pack", {
      params: { id },
    });
  },
  changePack: (arg: ArgChangePackType) => {
    return instance.put<{ updatedCardsPack: CardPacksType }>("/cards/pack", {
      cardsPack: arg,
    });
  },
};

export type ArgGetPacksType = {
  packName?: string; // не обязательно
  min?: number; // не обязательно
  max?: number; // не обязательно
  sortPacks?: string; // не обязательно TODO
  page?: number; // не обязательно
  pageCount?: number; // не обязательно
  user_id?: string; // чьи колоды не обязательно, или придут все
  block?: boolean;
};
export type GetPacksResponseType = {
  cardPacks: CardPacksType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};
export type CardPacksType = {
  _id: string;
  user_id: string;
  user_name: string;
  name: string;
  private: boolean;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  deckCover: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};
export type ArgAddCardsPackType = {
  name: string;
  deckCover?: string;
  private: boolean;
};
export type ArgChangePackType = {
  _id: string;
  name?: string;
};
