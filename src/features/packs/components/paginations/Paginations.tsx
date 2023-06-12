import { MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import s from "features/packs/Packs.module.css";
import { ChangeEvent, ReactNode, useState } from "react";
import { packsAction } from "features/packs/packs.slice";

export const Paginations = () => {
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  );
  const pageCount = useAppSelector((state) => state.packs.pageCount);
  const page = useAppSelector((state) => state.packs.page);
  const dispatch = useAppDispatch();
  const paginationHandler = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(packsAction.setPage({ page }));
  };
  const selectHandel = (event: ChangeEvent<HTMLSelectElement>) => {
    // debugger;
    dispatch(packsAction.setPageCount({ pageCount: +event.target.value }));
  };
  const selectValue = pageCount?.toString() || "4";

  const paginationPage = page || 1;

  let allPage = 1;
  if (cardPacksTotalCount && pageCount)
    allPage = Math.ceil(cardPacksTotalCount / pageCount);

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
