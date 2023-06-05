import { LinearProgress } from "@mui/material";
import { Header } from "components/header/Header";
import s from "app/App.module.css";
import { Outlet } from "react-router-dom";
import React from "react";
import { useAppSelector } from "common/hooks/useAppSelector";

export const Layout = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return (
    <div>
      <Header />
      {isLoading && <LinearProgress />}
      <div className={s.container}>
        <Outlet />
      </div>
    </div>
  );
};
