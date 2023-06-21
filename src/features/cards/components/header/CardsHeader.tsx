import s from "features/cards/cards.module.css";
import { Button } from "@mui/material";
import { smallBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import React from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { cardsThunks } from "features/cards/cards.slice";

export const CardsHeader = () => {
  const cards = useAppSelector((state) => state.cards.cards);
  const cardsPack_name = useAppSelector((state) => state.cards.cardsPack_name);
  const cardsPack_id = useAppSelector((state) => state.cards.cardsPack_id);
  const packUserId = useAppSelector((state) => state.cards.packUserId);
  const myID = useAppSelector((state) => state.auth.profile?._id);
  const dispatch = useAppDispatch();
  const newCard = {
    cardsPack_id,
    question: "Сколько позвонков в шее у жирафа?",
    answer: "7",
    grade: 0,
  };
  const addNewCard = () => {
    dispatch(cardsThunks.addCard(newCard));
  };

  const learnPack = () => {};

  return (
    <div>
      {cards?.length === 0 && packUserId === myID ? (
        <div className={s.cardsBlockWithoutCards}>
          <h1 className={s.cardsTitle}>{cardsPack_name}</h1>
          <div className={s.information}>
            <span className={s.cardsDescription}>
              This pack is empty. Click add new card to fill this pack
            </span>
            <Button
              variant="contained"
              sx={smallBlueButtonSX}
              onClick={addNewCard}
            >
              Add new card
            </Button>
          </div>
        </div>
      ) : (
        <header className={s.cardsBlockWithCards}>
          <h1 className={s.cardsTitle}>{cardsPack_name}</h1>
          {packUserId === myID ? (
            <Button
              variant="contained"
              sx={smallBlueButtonSX}
              onClick={addNewCard}
            >
              Add new card
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={smallBlueButtonSX}
              onClick={learnPack}
            >
              Learn to pack
            </Button>
          )}
        </header>
      )}
    </div>
  );
};
