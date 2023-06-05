import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./ForgotPassword.module.css";
import { Button, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { bigBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import React from "react";
import { useForm } from "react-hook-form";
import { emailValidation } from "common/validations";
import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const message = `<div style={"box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1);\\n" +
    "border-radius: 2px; background-color: lime; padding: 15px; width: 300px;"}>
password recovery link: 
<a href='http://localhost:3000/forgotPassword/setNewPassword/$token$'>
link</a>
</div>`;

  const onSubmit = (data: any) => {
    dispatch(authThunks.forgotPassword({ email: data.email, message }))
      .unwrap()
      .then(() => {
        navigate("/forgotPassword/checkEmail");
      });
  };

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Forgot your password?</h3>
      <form className={s1.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email", emailValidation)}
          variant="standard"
          label="Email"
          size="small"
          margin="normal"
          fullWidth
        />
        {errors?.email?.type === "required" && (
          <p className={s2.error}>This field is required</p>
        )}
        {errors?.email?.type === "pattern" && (
          <p className={s2.error}>Email address must contain the "@" symbol</p>
        )}
        <div className={s.description}>
          Enter your email address and we will send you further instructions
        </div>
        <Button variant="contained" type="submit" sx={bigBlueButtonSX}>
          Send Instructions
        </Button>
      </form>
      <div className={s2.description}>Did you remember your password?</div>
      <NavLink to="/register" className={s2.link}>
        Sign Up
      </NavLink>
    </div>
  );
};
