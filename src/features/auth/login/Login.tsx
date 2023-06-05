import { authThunks } from "features/auth/auth.slice";
import s from "./Login.module.css";
import s1 from "app/App.module.css";
import s2 from "features/auth/auth.module.css";
import {
  FormControl,
  Input,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { bigBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import { emailValidation, passwordValidation } from "common/validations";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(authThunks.login(data))
      .unwrap()
      .then(() => {
        navigate("/packs");
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Sing in</h3>
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
        <FormControlLabel
          {...register("rememberMe")}
          control={<Checkbox defaultChecked />}
          label="Remember me"
        />
        <NavLink to="/forgotPassword" className={s.forgotPassword}>
          Forgot Password?
        </NavLink>
        <Button variant="contained" type="submit" sx={bigBlueButtonSX}>
          Sing in
        </Button>
      </form>
      <div className={s2.description}>You don't have an account yet?</div>
      <NavLink className={s2.link} to="/register">
        Sign Up
      </NavLink>
    </div>
  );
};
