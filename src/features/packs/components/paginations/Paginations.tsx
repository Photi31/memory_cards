import { MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import s from "features/packs/Packs.module.css";
import { ChangeEvent, ReactNode, useState } from "react";
import { packsAction } from "features/packs/packs.slice";
import { cardsActions } from "features/cards/cards.slice";

type PaginationsProps = {
  name: string;
  totalCount: number;
  pageCount: number;
  page: number;
};

export const Paginations = ({
  name,
  totalCount,
  pageCount,
  page,
}: PaginationsProps) => {
  const dispatch = useAppDispatch();
  const paginationHandler = (event: ChangeEvent<unknown>, page: number) => {
    if (name === "pack") {
      dispatch(packsAction.setPage({ page }));
    } else if (name === "cards") {
      dispatch(cardsActions.setPage({ page }));
    } else {
      throw new Error("Ошибка пагинации.");
    }
  };
  const selectHandel = (event: ChangeEvent<HTMLSelectElement>) => {
    // debugger;
    if (name === "pack") {
      dispatch(packsAction.setPageCount({ pageCount: +event.target.value }));
    } else if (name === "cards") {
      dispatch(cardsActions.setPageCount({ pageCount: +event.target.value }));
    } else {
      throw new Error("Ошибка пагинации.");
    }
  };
  const selectValue = pageCount.toString() || "4";

  const paginationPage = page || 1;

  let allPage = Math.ceil(totalCount / pageCount);

  return (
    <div className={s.pagination}>
      <Pagination
        count={allPage}
        shape="rounded"
        size="small"
        onChange={paginationHandler}
        color="primary"
        page={paginationPage}
        sx={{
          button: {
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "15px",
            "&.Mui-selected": { bgcolor: "#366EFF" },
          },
        }}
      />
      <div className={s.selectBlock}>
        <span>Show</span>
        <select
          className={s.select}
          onChange={selectHandel}
          value={selectValue}
        >
          <option value="4">4</option>
          <option value="7">7</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>Cards per Page</span>
      </div>
    </div>
  );
};
