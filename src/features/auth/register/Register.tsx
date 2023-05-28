import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./Register.module.css";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "components/button/Button";
import { MouseEvent, useState } from "react";

export const Register = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const arg = {
    email: "photi31@gmail.com",
    password: "12345677",
  };

  const registerHandler = () => {
    dispatch(authThunks.register(arg));
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const singIn = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
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
        <FormControl variant="standard" size="small" margin="normal" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Confirm password
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
        <div className={s.indent}></div>
        <Button
          size="big"
          color="blue"
          name="Sign Up"
          onClick={registerHandler}
        />
      </form>
      <div className={s2.description}>Already have an account?</div>
      <div className={s2.link} onClick={singIn}>
        Sign In
      </div>
    </div>
  );
};
