import React, { useEffect } from "react";
import "app/App.module.css";
import s from "./App.module.css";
import { Register } from "features/auth/register/Register";
import { Login } from "features/auth/login/Login";
import { Profile } from "features/auth/profile/Profile";
import { ForgotPassword } from "features/auth/forgot-password/ForgotPassword";
import { SetNewPassword } from "features/auth/set-new-password/SetNewPassword";
import { CheckEmail } from "features/auth/check-email/CheckEmail";
import { Cards } from "features/cards/Cards";
import { Learn } from "features/learn/Learn";
import { Packs } from "features/packs/Packs";
import { Error404 } from "features/errors/error404/Error404";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";
import { Layout } from "app/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const query =
  "?packName=val&min=val1&max=val2&sortPacks=val3&page=val4&pageCount=val5&user_id=val6";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "/",
      //   element: <Navigate to="profile" />,
      // },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "forgotPassword/setNewPassword/:token",
        element: <SetNewPassword />,
      },
      {
        path: "forgotPassword/checkEmail",
        element: <CheckEmail />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "learn",
        element: <Learn />,
      },
      {
        path: "packs",
        element: <Packs />,
      },
      {
        path: "404",
        element: <Error404 />,
      },
      {
        path: "*",
        element: <Navigate to="404" />,
      },
    ],
  },
]);

function App() {
  return (
    <div className={s.App}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
