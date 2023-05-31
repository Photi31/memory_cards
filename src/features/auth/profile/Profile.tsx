import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./Profile.module.css";
import avatar from "images/ava.jpeg";
import photoIcon from "images/photoIcon.svg";
import pencil from "images/pencil.svg";
import React, { ChangeEvent, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  smallButtonForChangeNameSX,
  smallGrayButtonSX,
} from "common/styles/buttons";
import LogoutIcon from "@mui/icons-material/Logout";
import { authThunks } from "features/auth/auth.slice";

export const Profile = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState<string>("Svetlana");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    // TODO dispatch new name
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const setPhotoHandler = () => {};

  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };
  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div className={s2.authContainer}>
      <h3 className={s1.title_fz22}>Personal Information</h3>
      <div className={s.photoBlock}>
        <img className={s.photo} src={avatar} alt="avatar" />
        <div className={s.setPhoto} onClick={setPhotoHandler}>
          <img className={s.photoIcon} src={photoIcon} alt="photo icon" />
        </div>
      </div>
      {editMode ? (
        <FormControl variant="standard" size="small" margin="normal" fullWidth>
          <InputLabel htmlFor="change-name">Nickname</InputLabel>
          <Input
            id="change-name"
            type="text"
            value={title}
            onChange={changeTitle}
            autoFocus
            endAdornment={
              <Button
                size="small"
                variant="contained"
                sx={smallButtonForChangeNameSX}
                onClick={activateViewMode}
                type="submit"
              >
                SAVE
              </Button>
            }
          />
        </FormControl>
      ) : (
        <div className={s.nameBlock} onDoubleClick={activateEditMode}>
          <div>{title}</div>
          <img className={s.setNameIcon} src={pencil} alt="pencil" />
        </div>
      )}

      <div className={s.email}>j&johnson@gmail.com</div>
      <Button
        variant="contained"
        sx={smallGrayButtonSX}
        startIcon={<LogoutIcon />}
        onClick={logoutHandler}
      >
        Log out
      </Button>
    </div>
  );
};
