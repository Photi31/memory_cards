import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./CheckEmail.module.css";
import checkEmail from "images/sendEmail.svg";
import { bigBlueButtonSX } from "components/button/buttons";
import { Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "app/hooks";

export const CheckEmail = () => {
  const email = useAppSelector((state) => state.auth.checkedEmail);

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Check Email</h3>
      <img className={s.checkEmailImg} src={checkEmail} alt="check email" />
      <div className={s.description}>
        We’ve sent an Email with instructions to {email}
      </div>
      <Button href="/login" variant="contained" sx={bigBlueButtonSX}>
        Back to login
      </Button>
    </div>
  );
};
