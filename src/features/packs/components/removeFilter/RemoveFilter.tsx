import s from "features/packs/Packs.module.css";
import filterRemove from "images/filter-remove.svg";
import React from "react";

export const RemoveFilter = () => {
  const cleareFilter = () => {};
  return (
    <div className={s.filter} onClick={cleareFilter}>
      <img className={s.filterRemove} src={filterRemove} alt="filterRemove" />
    </div>
  );
};
