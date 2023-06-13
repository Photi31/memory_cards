import { instance } from "common/api";

export const cardsApi = {
  getCards: (payload: ArgGetCard) => {
    return instance.get<any>("/cards/card", { params: { ...payload } });
  },
  createNewCard: (newCard: any) => {
    return instance.post<{ newCard: any }>("/cards/card", {
      card: { ...newCard },
    });
  },
  deleteCard: (cardId: string) => {
    return instance.delete<{ deletedCard: any }>("/cards/card", {
      params: { cardId },
    });
  },
  changeCard: (changedCard: any) => {
    return instance.put<{ updatedCard: any }>("/cards/card", {
      card: { ...changedCard },
    });
  },
  changeGradeCard: (gradeCard: ArgChangeGradeType) => {
    return instance.put<{ updatedGrade: ResponseChangeGradeType }>(
      "/cards/card",
      {
        ...gradeCard,
      }
    );
  },
};

export type ArgGetCard = {
  cardsPack_id: string;
  cardAnswer?: string;
  cardQuestion?: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

type Grade = 1 | 2 | 3 | 4 | 5;

export type ArgChangeGradeType = {
  grade: Grade;
  card_id: string;
};

export type ResponseChangeGradeType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: Grade;
  shots: number;
};
