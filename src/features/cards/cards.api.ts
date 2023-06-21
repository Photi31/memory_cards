import { instance } from "common/api";

export const cardsApi = {
  getCards: (payload: ArgGetCard) => {
    return instance.get<ResponseGetCards>("/cards/card", {
      params: { ...payload },
    });
  },
  createNewCard: (newCard: ArgCreateNewCard) => {
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

export type ResponseGetCards = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
};

export type ArgCreateNewCard = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

// type Grade = 0 | 1 | 2 | 3 | 4 | 5;

export type ArgChangeGradeType = {
  grade: number;
  card_id: string;
};

export type ResponseChangeGradeType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: number;
  shots: number;
};
