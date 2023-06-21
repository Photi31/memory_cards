import { useAppDispatch, useAppSelector } from "common/hooks";
import React, { useEffect } from "react";
import { cardsThunks } from "features/cards/cards.slice";
import s2 from "features/auth/profile/Profile.module.css";
import s from "features/cards/cards.module.css";
import arrowBack from "images/arrowBack.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { CardsHeader } from "features/cards/components/header/CardsHeader";
import { packsAction, packsThunks } from "features/packs/packs.slice";

export const Cards = () => {
  const cardsPack_id = useAppSelector((state) => state.cards.cardsPack_id);
  const cards = useAppSelector((state) => state.cards.cards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cardsThunks.getCards({ cardsPack_id }));
  }, []);

  const backToPacks = () => {
    dispatch(packsAction.setUserId(""));
    dispatch(packsThunks.getPacks({}))
      .unwrap()
      .then(() => {
        navigate("/packs");
      });
  };

  if (!cards) return <h1>Loading...</h1>;

  return (
    <div className={s.cardsBlock}>
      <div className={s2.back} onClick={backToPacks}>
        <img src={arrowBack} alt="arrowBack" />
        <span>Back to Packs List</span>
      </div>
      <CardsHeader />
      {cardsPack_id && <div>{cardsPack_id}</div>}
      {cards &&
        cards.map((c) => {
          return (
            <div key={c._id}>
              {c._id} || {c.question} || {c.answer} || {c.updated} || {c.grade}
            </div>
          );
        })}
    </div>
  );
};
