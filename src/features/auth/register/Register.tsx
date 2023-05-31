import { useAppDispatch } from "app/hooks";
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
import { bigBlueButtonSX } from "common/styles/buttons";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "common/validations";
import { NavLink } from "react-router-dom";

export const Register = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const arg = {
    email: "photi31@gmail.com",
    password: "12345677",
  };

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      authThunks.register({ email: data.email, password: data.password })
    );
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
          type="email"
          variant="standard"
          label="Email"
          size="small"
          margin="normal"
          fullWidth
        />
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
        <FormControl variant="standard" size="small" margin="normal" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Confirm password
          </InputLabel>
          <Input
            {...register("confirmPassword", passwordValidation)}
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
