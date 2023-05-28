import React from "react";
import s from "./Header.module.css";
import logo from "images/incubatorLogo.svg";
import { MyButton } from "components/button/MyButton";

export const Header = () => {
  const onClickButton = (buttonName: string) => {
    console.log(buttonName);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img className={s.logo} src={logo} alt="logo" />
        <MyButton
          size="small"
          color="blue"
          name="Sing in"
          onClick={onClickButton}
        />
      </div>
    </header>
  );
};
