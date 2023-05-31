import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import s from "features/auth/forgot-password/ForgotPassword.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Navigate, useParams } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";
import { bigBlueButtonSX } from "common/styles/buttons";
import { useForm } from "react-hook-form";
import { passwordValidation } from "common/validations";

export const SetNewPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setPassword = useAppSelector((state) => state.auth.setNewPassword);
  const dispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("sen new password");
    if (token) {
      dispatch(
        authThunks.setNewPassword({
          password: data.password,
          resetPasswordToken: token,
        })
      );
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (setPassword) return <Navigate to="/login" />;

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Create new password</h3>
      <form className={s1.form} onSubmit={handleSubmit(onSubmit)}>
        <FormControl variant="standard" size="small" margin="normal" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            {...register("password", passwordValidation)}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  sx={{ color: "black" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {errors?.password?.type === "required" && (
          <p className={s2.error}>This field is required</p>
        )}
        {errors?.password?.type === "minLength" && (
          <p className={s2.error}>Minimum password 8 characters</p>
        )}
        {errors?.password?.type === "maxLength" && (
          <p className={s2.error}>Maximum password 18 characters</p>
        )}
        <div className={s.description}>
          Create new password and we will send you further instructions to email{" "}
        </div>
        <Button variant="contained" type="submit" sx={bigBlueButtonSX}>
          Create new password
        </Button>
      </form>
    </div>
  );
};
