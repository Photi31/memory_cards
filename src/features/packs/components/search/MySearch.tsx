import s from "features/packs/Packs.module.css";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent, useState } from "react";
import { useDebounce } from "common/hooks";

export const MySearch = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(inputValue, 800);
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

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
          sx={{ fontWeight: "400", fontSize: "14px", lineHeight: "24px" }}
          placeholder="Provide your text"
          inputProps={{ "aria-label": "search" }}
          onChange={searchHandler}
        />
      </Paper>
    </div>
  );
};
