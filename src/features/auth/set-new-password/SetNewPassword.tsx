import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import s from "features/auth/forgot-password/ForgotPassword.module.css";
import { MyButton } from "components/button/MyButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { useAppDispatch } from "app/hooks";
import { Navigate } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";

export const SetNewPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const createNewPasswordHandler = (buttonName: string) => {};

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz26}>Create new password</h3>
      <form className={s1.form}>
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
        <div className={s.description}>
          Create new password and we will send you further instructions to email{" "}
        </div>
        <MyButton
          size="big"
          color="blue"
          name="Send Instructions"
          onClick={createNewPasswordHandler}
        />
      </form>
    </div>
  );
};
