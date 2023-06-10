import s from "features/packs/Packs.module.css";
import filterRemove from "images/filter-remove.svg";
import React from "react";
import { useAppDispatch } from "common/hooks";
import { packsAction } from "features/packs/packs.slice";

export const RemoveFilter = () => {
  const dispatch = useAppDispatch();
  const cleareFilter = () => {
    const queryParams = {
      packName: "",
      min: 0,
      max: 0,
      sortPacks: "",
      page: 1,
      pageCount: 7,
      user_id: "",
      block: false,
    };
    dispatch(packsAction.cleareQueryParams(queryParams));
  };
  return (
    <div className={s.filter} onClick={cleareFilter}>
      <img className={s.filterRemove} src={filterRemove} alt="filterRemove" />
    </div>
  );
};
