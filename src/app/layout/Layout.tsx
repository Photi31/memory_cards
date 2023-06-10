import { LinearProgress } from "@mui/material";
import { Header } from "app/header/Header";
import s from "app/App.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useAppDispatch } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import { appActions } from "app/app.slice";

export const Layout = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const isAppInitialized = useAppSelector(
    (state) => state.app.isAppInitialized
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authThunks.me({}))
      .unwrap()
      .then(() => {
        navigate("/packs");
      })
      .catch(() => {
        navigate("/login");
      })
      .finally(() => {
        dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
      });
  }, []);

  return (
    <div>
      <Header />
      {isLoading && <LinearProgress />}
      <div className={s.container}>
        {isAppInitialized ? <Outlet /> : <h1>Loading...</h1>}
      </div>
    </div>
  );
};
