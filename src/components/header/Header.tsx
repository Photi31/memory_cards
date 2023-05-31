import React, { useState } from "react";
import s from "./Header.module.css";
import logo from "images/incubatorLogo.svg";
import { smallBlueButtonSX } from "common/styles/buttons";
import { Button } from "@mui/material";
import { useAppSelector } from "app/hooks";
import avatar from "images/ava.jpeg";
import user from "images/user.svg";
import logout from "images/logout.svg";

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const menuHandler = () => {
    setOpenMenu(!openMenu);
  };

  const logoutHandler = () => {
    //TODO logout
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img className={s.logo} src={logo} alt="logo" />
        {isAuth ? (
          <div className={s.userBlock}>
            <div className={s.user}>
              <span className={s.userName} onClick={menuHandler}>
                Name
              </span>
              <img className={s.userAvatar} src={avatar} alt="avatar" />
            </div>
            {openMenu && (
              <ul className={s.userMenu}>
                <li className={s.menuItem}>
                  {/*<a href="/profile">*/}
                  <img src={user} alt="user" />
                  <span>Profile</span>
                  {/*</a>*/}
                </li>
                <li className={s.menuItem} onClick={logoutHandler}>
                  <img src={logout} alt="logout" />
                  <span>Log out</span>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Button href="/login" variant="contained" sx={smallBlueButtonSX}>
            Sing in
          </Button>
        )}
      </div>
    </header>
  );
};
