import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import s from "./Login.module.css";
import s1 from "app/App.module.css";
import s2 from "features/auth/auth.module.css";
import { Button } from "components/button/Button";
import {
  FormControl,
  Input,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const arg = {
    email: "photi31@gmail.com",
    password: "12345677",
    rememberMe: true,
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const forgotPassword = () => <Navigate to="forgotPassword" />;
  const singUp = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
  };

  const loginHandler = (buttonName: string) => {
    dispatch(authThunks.login(arg));
  };

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Sing in</h3>
      <form className={s1.form}>
        <TextField
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
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  sx={{ color: "black" }}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
        />
        <div className={s.forgotPassword} onClick={forgotPassword}>
          Forgot Password?
        </div>
        <Button size="big" color="blue" name="Sing in" onClick={loginHandler} />
      </form>
      <div className={s2.description}>You don't have an account yet?</div>
      <div className={s2.link} onClick={singUp}>
        Sign Up
      </div>
    </div>
  );
};
