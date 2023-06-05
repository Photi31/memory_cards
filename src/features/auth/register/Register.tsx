import { authThunks } from "features/auth/auth.slice";
import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./Register.module.css";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { bigBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "common/validations";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(
      authThunks.register({ email: data.email, password: data.password })
    )
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Sing up</h3>
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
        <FormControl variant="standard" size="small" margin="normal" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Confirm password
          </InputLabel>
          <Input
            {...register("confirmPassword", passwordValidation)}
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
        {errors?.confirmPassword?.type === "required" && (
          <p className={s2.error}>This field is required</p>
        )}
        {errors?.confirmPassword?.type === "minLength" && (
          <p className={s2.error}>Minimum password 8 characters</p>
        )}
        {errors?.confirmPassword?.type === "maxLength" && (
          <p className={s2.error}>Maximum password 18 characters</p>
        )}
        <div className={s.indent}></div>
        <Button variant="contained" type="submit" sx={bigBlueButtonSX}>
          Sign Up
        </Button>
      </form>
      <div className={s2.description}>Already have an account?</div>
      <NavLink className={s2.link} to="/login">
        Sign In
      </NavLink>
    </div>
  );
};
