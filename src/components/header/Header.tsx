import React from "react";
import s from "./Header.module.css";
import logo from "images/incubatorLogo.svg";
import { smallBlueButtonSX } from "common/styles/buttons";
import { Button } from "@mui/material";
import { useAppSelector } from "app/hooks";

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img className={s.logo} src={logo} alt="logo" />
        {isAuth ? (
          <>isAuth</>
        ) : (
          <Button variant="contained" sx={smallBlueButtonSX}>
            Sing in
          </Button>
        )}
      </div>
    </header>
  );
};
