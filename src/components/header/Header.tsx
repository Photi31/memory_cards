import React from "react";
import s from "./Header.module.css";
import logo from "images/incubatorLogo.svg";
import { smallBlueButtonSX } from "common/styles/buttons";
import { Button } from "@mui/material";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <img className={s.logo} src={logo} alt="logo" />
        <Button variant="contained" sx={smallBlueButtonSX}>
          Sing in
        </Button>
      </div>
    </header>
  );
};
