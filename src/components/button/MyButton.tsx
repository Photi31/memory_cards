import React, { MouseEvent } from "react";
import s from "./Button.module.css";

type ButtonPropsType = {
  size: string;
  color: string;
  name: string;
  onClick: (buttonName: string) => void;
  startIcon?: any;
};

export const MyButton = (props: ButtonPropsType) => {
  const { size, color, name, onClick, startIcon } = props;
  const buttonClassName =
    s.button +
    (size === "small" ? " " + s.small : " " + s.big) +
    (color === "blue" ? " " + s.blue : " " + s.gray);

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(e.currentTarget.innerHTML);
  };

  return (
    <button className={buttonClassName} onClick={onClickHandler}>
      {startIcon && <img className={s.startIcon} src={startIcon} alt="icon" />}
      {name}
    </button>
  );
};
