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

  const clickPackNameHandler = (e: MouseEvent<HTMLTableCellElement>) => {
    console.log(e.currentTarget.id);
  };

  return (
    <div className={s.tableBlock}>
      {packs && packs.length > 0 && (
        <table className={s.table}>
          <thead>
            <tr className={s.tableHeader}>
              <th>Name</th>
              <th>Cards</th>
              <th>Last Updated</th>
              <th>Created by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packs.map((p) => {
              const date = new Date(p.updated).toLocaleDateString("ru-RU");
              return (
                <tr key={p._id} className={s.tableRow}>
                  <td
                    id={p._id}
                    className={s.packsName}
                    onClick={clickPackNameHandler}
                  >
                    {p.name}
                  </td>
                  <td>{p.cardsCount}</td>
                  <td>{date}</td>
                  <td>{p.user_name}</td>
                  <td className={s.actions}>
                    {myID === p.user_id ? (
                      <>
                        <div id={p._id} onClick={studyPack}>
                          <img src={teacher} alt="teacher" />
                        </div>
                        <div id={p._id} onClick={renamePack}>
                          <img src={pencil} alt="pencil" />
                        </div>
                        <div id={p._id} onClick={deletePack}>
                          <img src={trash} alt="trash" />
                        </div>
                      </>
                    ) : (
                      <div id={p._id} onClick={studyPack}>
                        {" "}
                        <img src={teacher} alt="teacher" />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {packs && packs.length === 0 && (
        <div className={s.packsNotFound}>
          🧐 Колоды с введенным название или заданными параметрами не найдены.
          Измените параметры запроса.
        </div>
      )}
    </div>
  );
};
