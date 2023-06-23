import s from "features/packs/Packs.module.css";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useDebounce } from "common/hooks";
import { packsAction } from "features/packs/packs.slice";

export const PacksSearch = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(inputValue, 800);
  const dispatch = useAppDispatch();
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(packsAction.setSearchPackName({ searchPackName: inputValue }));
  }, [debouncedValue]);

  return (
    <div className={s.filter}>
      <span className={s.filterTitle}>Search</span>
      <Paper
        sx={{
          width: "413px",
          height: "36px,",
          bgcolor: "#FFFFFF",
          border: "1px solid #D9D9D9",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          boxShadow: "none",
        }}
      >
        <SearchIcon
          sx={{
            width: "17px",
            height: "17px",
            margin: "10px 14px",
            opacity: "0.5",
          }}
        />
        <InputBase
          sx={{
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "24px",
            width: "360px",
          }}
          placeholder="Provide your text"
          inputProps={{ "aria-label": "search" }}
          onChange={searchHandler}
        />
      </Paper>
    </div>
  );
};
