import s from "features/packs/Packs.module.css";
import React, { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useNavigate } from "react-router-dom";

export const CardsTable = () => {
  const myID = useAppSelector((state) => state.auth.profile?._id);
  const cards = useAppSelector((state) => state.cards.cards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const studyPack = (e: MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
  };

  const deletePack = (e: MouseEvent<HTMLDivElement>) => {
    // dispatch(packsThunks.deletePack(e.currentTarget.id));
  };

  const clickPackNameHandler = (e: MouseEvent<HTMLTableCellElement>) => {
    // console.log(e.currentTarget.id, e.currentTarget.innerHTML);
    // dispatch(
    //   cardsActions.setCardsPackIdAndName({
    //     cardsPack_id: e.currentTarget.id,
    //     cardsPack_name: e.currentTarget.innerHTML,
    //   })
    // );
    // setTimeout(() => {
    //   navigate("/cards");
    // }, 50);
  };

  return (
    <div className={s.tableBlock}>
      {cards && cards.length > 0 && (
        <table className={s.table}>
          <thead>
            <tr className={s.tableHeader}>
              <th>Question</th>
              <th>Answer</th>
              <th>Last Updated</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((c) => {
              const date = new Date(c.updated).toLocaleDateString("ru-RU");
              return (
                <tr key={c._id} className={s.tableRow}>
                  <td
                    id={c._id}
                    className={s.packsName}
                    onClick={clickPackNameHandler}
                  >
                    {c.question}
                  </td>
                  <td>{c.answer}</td>
                  <td>{date}</td>
                  <td>{c.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {cards && cards.length === 0 && (
        <div className={s.packsNotFound}>
          🧐 Карты с введенным название или заданными параметрами не найдены.
          Измените параметры запроса.
        </div>
      )}
    </div>
  );
};
