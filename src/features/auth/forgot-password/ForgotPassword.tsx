import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./ForgotPassword.module.css";
import { TextField } from "@mui/material";
import { MyButton } from "components/button/MyButton";
import { useAppDispatch } from "app/hooks";
import { MouseEvent } from "react";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const forgotPasswordHandler = (buttonName: string) => {};

  const tryLogin = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
  };

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Forgot your password?</h3>
      <form className={s1.form}>
        <TextField
          type="email"
          variant="standard"
          label="Email"
          size="small"
          margin="normal"
          fullWidth
        />
        <div className={s.description}>
          Enter your email address and we will send you further instructions
        </div>
        <MyButton
          size="big"
          color="blue"
          name="Send Instructions"
          onClick={forgotPasswordHandler}
        />
      </form>
      <div className={s2.description}>Did you remember your password?</div>
      <div className={s2.link} onClick={tryLogin}>
        Sign Up
      </div>
    </div>
  );
};
