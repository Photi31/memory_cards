import s from "features/packs/Packs.module.css";
import React, { MouseEvent } from "react";

export const MyAllFilter = () => {
  const showPack = (e: MouseEvent<HTMLSpanElement>) => {
    // console.log(e.currentTarget.innerHTML);
  };
  return (
    <div className={s.filter}>
      <span className={s.filterTitle}>Show packs cards</span>
      <div className={s.showPackTumbler}>
        <span className={s.show} onClick={showPack}>
          My
        </span>
        <span className={s.show + " " + s.active} onClick={showPack}>
          All
        </span>
      </div>
    </div>
  );
};
