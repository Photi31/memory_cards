import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./Profile.module.css";
import avatar from "images/ava.jpeg";
import photoIcon from "images/photoIcon.svg";
import pencil from "images/pencil.svg";
import arrowBack from "images/arrowBack.svg";
import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  smallButtonForChangeNameSX,
  smallGrayButtonSX,
} from "common/variableForStylization/buttonsStyle";
import LogoutIcon from "@mui/icons-material/Logout";
import { authThunks } from "features/auth/auth.slice";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";

export const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let [editMode, setEditMode] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setEditMode(false);
    dispatch(authThunks.setName({ name: data.newName }));
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const setPhotoHandler = () => {};

  const logoutHandler = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div className={s.profile}>
      <NavLink to="/packs" className={s.back}>
        <img src={arrowBack} alt="arrowBack" />
        <span>Back to Packs List</span>
      </NavLink>
      <div className={s2.authContainer}>
        <h3 className={s1.title_fz22}>Personal Information</h3>
        <div className={s.photoBlock}>
          <img className={s.photo} src={avatar} alt="avatar" />
          <div className={s.setPhoto} onClick={setPhotoHandler}>
            <img className={s.photoIcon} src={photoIcon} alt="photo icon" />
          </div>
        </div>
        {editMode ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              variant="standard"
              size="small"
              margin="normal"
              fullWidth
            >
              <InputLabel htmlFor="change-name">Nickname</InputLabel>
              <Input
                {...register("newName")}
                id="change-name"
                type="text"
                autoFocus
                endAdornment={
                  <Button
                    size="small"
                    variant="contained"
                    sx={smallButtonForChangeNameSX}
                    type="submit"
                  >
                    SAVE
                  </Button>
                }
              />
            </FormControl>
          </form>
        ) : (
          <div className={s.nameBlock} onDoubleClick={activateEditMode}>
            <div>{profile?.name}</div>
            <img className={s.setNameIcon} src={pencil} alt="pencil" />
          </div>
        )}

        <div className={s.email}>{profile?.email}</div>
        <Button
          variant="contained"
          sx={smallGrayButtonSX}
          startIcon={<LogoutIcon />}
          onClick={logoutHandler}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};
