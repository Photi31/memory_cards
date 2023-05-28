import s2 from "features/auth/auth.module.css";
import s1 from "app/App.module.css";
import s from "./Profile.module.css";
import avatar from "images/ava.jpeg";
import photoIcon from "images/photoIcon.svg";
import pencil from "images/pencil.svg";
import logout from "images/logout.svg";
import { ChangeEvent, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { MyButton } from "components/button/MyButton";

export const Profile = () => {
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

  const logoutHandler = (buttonName: string) => {};

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
                sx={{
                  bgcolor: "#366EFF",
                  marginBottom: "4px",
                  height: "24px",
                  fontSize: "12px",
                  lineHeight: "24px",
                  fontWeight: "400",
                }}
                onClick={activateViewMode}
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
      <div className={s.button}>
        <MyButton
          size="small"
          color="gray"
          name="Log out"
          onClick={logoutHandler}
          startIcon={logout}
        />
      </div>
    </div>
  );
};
