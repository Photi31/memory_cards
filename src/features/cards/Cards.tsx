import { useAppDispatch, useAppSelector } from "common/hooks";
import React, { useEffect } from "react";
import { cardsThunks } from "features/cards/cards.slice";
import s2 from "features/auth/profile/Profile.module.css";
import s from "features/cards/cards.module.css";
import arrowBack from "images/arrowBack.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { CardsHeader } from "features/cards/components/header/CardsHeader";
import { packsAction, packsThunks } from "features/packs/packs.slice";
import { CardsSearch } from "features/cards/components/search/CardsSearch";
import { CardsTable } from "features/cards/components/table/CardsTable";
import { Paginations } from "features/packs/components/paginations/Paginations";

export const Cards = () => {
  const cardsTotalCount = useAppSelector(
    (state) => state.cards.cardsTotalCount
  );
  const pageCount = useAppSelector((state) => state.cards.pageCount);
  const page = useAppSelector((state) => state.cards.page);
  const cardsPack_id = useAppSelector((state) => state.cards.cardsPack_id);
  const cardQuestion = useAppSelector((state) => state.cards.cardQuestion);
  const cards = useAppSelector((state) => state.cards.cards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      cardsThunks.getCards({ cardsPack_id, pageCount, page, cardQuestion })
    );
  }, [dispatch, pageCount, page, cardQuestion]);

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
      <CardsSearch />
      {cards && <CardsTable />}
      <Paginations
        name="cards"
        totalCount={cardsTotalCount}
        pageCount={pageCount}
        page={page}
      />
    </div>
  );
};
