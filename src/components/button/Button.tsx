import React, { MouseEvent } from "react";
import s from "./Button.module.css";

type ButtonPropsType = {
  size: string;
  color: string;
  name: string;
  onClick: (buttonName: string) => void;
};

export const Button = (props: ButtonPropsType) => {
  const { size, color, name, onClick } = props;
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
      {name}
    </button>
  );
};
