import React, { useState } from "react";
import s from "components/header/Header.module.css";
import logo from "images/incubatorLogo.svg";
import { smallBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import { Button } from "@mui/material";
import avatar from "images/ava.jpeg";
import user from "images/user.svg";
import logout from "images/logout.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";

export const Header = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuHandler = () => {
    setOpenMenu(!openMenu);
  };

  const logoutHandler = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img className={s.logo} src={logo} alt="logo" />
        {profile ? (
          <div className={s.userBlock}>
            <div className={s.user}>
              <span className={s.userName} onClick={menuHandler}>
                Name
              </span>
              <img className={s.userAvatar} src={avatar} alt="avatar" />
            </div>
            {openMenu && (
              <ul className={s.userMenu}>
                <NavLink to="/profile" className={s.menuItem}>
                  <img src={user} alt="user" />
                  <span>Profile</span>
                </NavLink>
                <li className={s.menuItem} onClick={logoutHandler}>
                  <img src={logout} alt="logout" />
                  <span>Log out</span>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <Button variant="contained" sx={smallBlueButtonSX}>
              Sing in
            </Button>
          </NavLink>
        )}
      </div>
    </header>
  );
};
