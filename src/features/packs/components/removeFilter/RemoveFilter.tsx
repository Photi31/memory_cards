import s from "features/packs/Packs.module.css";
import filterRemove from "images/filter-remove.svg";
import React from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsAction } from "features/packs/packs.slice";

export const RemoveFilter = () => {
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount);
  const dispatch = useAppDispatch();
  const cleareFilter = () => {
    const queryParams = {
      packName: "",
      min: minCardsCount,
      max: maxCardsCount,
      sortPacks: "",
      page: 1,
      pageCount: 0,
      user_id: "",
      block: false,
    };
    dispatch(packsAction.cleareQueryParams({ queryParams }));
  };
  return (
    <div className={s.filter} onClick={cleareFilter}>
      <img className={s.filterRemove} src={filterRemove} alt="filterRemove" />
    </div>
  );
};
