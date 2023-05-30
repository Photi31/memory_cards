import { useAppDispatch } from "app/hooks";
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
import { MouseEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { bigBlueButtonSX } from "common/styles/buttons";
import { emailValidation, passwordValidation } from "common/validations";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(authThunks.login(data));
  };

  const arg = {
    email: "photi31@gmail.com",
    password: "12345677",
    rememberMe: true,
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const forgotPassword = () => {
    console.log("forgot password");
    return <Navigate to="forgotPassword" />; //todo
  };
  const singUp = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
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
        {errors?.email?.type === "required" && <p>This field is required</p>}
        {errors?.email?.type === "pattern" && (
          <p>Email address must contain the "@" symbol</p>
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
        {errors?.password?.type === "required" && <p>This field is required</p>}
        {errors?.password?.type === "minLength" && (
          <p>Minimum password 8 characters</p>
        )}
        {errors?.password?.type === "maxLength" && (
          <p>Maximum password 18 characters</p>
        )}
        <FormControlLabel
          {...register("rememberMe")}
          control={<Checkbox defaultChecked />}
          label="Remember me"
        />
        <div className={s.forgotPassword} onClick={forgotPassword}>
          Forgot Password?
        </div>
        <Button variant="contained" type="submit" sx={bigBlueButtonSX}>
          Sing in
        </Button>
      </form>
      <div className={s2.description}>You don't have an account yet?</div>
      <div className={s2.link} onClick={singUp}>
        Sign Up
      </div>
    </div>
  );
};
