import s from "features/packs/Packs.module.css";
import teacher from "images/teacher.svg";
import pencil from "images/pencil.svg";
import trash from "images/trash.svg";
import React, { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { useNavigate } from "react-router-dom";

export const MyTable = () => {
  const myID = useAppSelector((state) => state.auth.profile?._id);
  const packs = useAppSelector((state) => state.packs.packs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const studyPack = (e: MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
  };
  const renamePack = (e: MouseEvent<HTMLDivElement>) => {
    const newName = {
      _id: e.currentTarget.id,
      name: " 🦁 new name pack 111!!!",
    };
    dispatch(packsThunks.changePack(newName));
  };
  const deletePack = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(packsThunks.deletePack(e.currentTarget.id));
  };

  return (
    <div className={s.tableBlock}>
      <div className={s.packHeader}>
        <div>Name</div>
        <div>Cards</div>
        <div>Last Updated</div>
        <div>Created by</div>
        <div>Actions</div>
      </div>
      {packs &&
        packs.map((pack) => (
          <div key={pack._id} className={s.packRow}>
            <div>{pack.name}</div>
            <div>{pack.cardsCount}</div>
            <div>{pack.updated}</div>
            <div>{pack.user_name}</div>
            <div className={s.actions}>
              {myID === pack.user_id ? (
                <>
                  <div id={pack._id} onClick={studyPack}>
                    <img src={teacher} alt="teacher" />
                  </div>
                  <div id={pack._id} onClick={renamePack}>
                    <img src={pencil} alt="pencil" />
                  </div>
                  <div id={pack._id} onClick={deletePack}>
                    <img src={trash} alt="trash" />
                  </div>
                </>
              ) : (
                <div id={pack._id} onClick={studyPack}>
                  {" "}
                  <img src={teacher} alt="teacher" />
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
