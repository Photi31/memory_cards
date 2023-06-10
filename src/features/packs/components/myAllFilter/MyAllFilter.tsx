import s from "features/packs/Packs.module.css";
import React, { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsAction } from "features/packs/packs.slice";

export const MyAllFilter = () => {
  const myID = useAppSelector((state) => state.auth.profile?._id);
  const [activeSpan, setActiveSpan] = useState<string>("all");
  const dispatch = useAppDispatch();
  const showPack = (e: MouseEvent<HTMLSpanElement>) => {
    setActiveSpan(e.currentTarget.id);
    const id = e.currentTarget.id === "my" ? myID : "";
    dispatch(
      packsAction.setUserId({
        user_id: id,
      })
    );
  };

  return (
    <div className={s.filter}>
      <span className={s.filterTitle}>Show packs cards</span>
      <div className={s.showPackTumbler}>
        <span
          id="my"
          className={s.show + (activeSpan === "my" ? " " + s.active : "")}
          onClick={showPack}
        >
          My
        </span>
        <span
          id="all"
          className={s.show + (activeSpan === "all" ? " " + s.active : "")}
          onClick={showPack}
        >
          All
        </span>
      </div>
    </div>
  );
};
