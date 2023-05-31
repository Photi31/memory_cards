import React, { useEffect } from "react";
import "app/App.module.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "./App.module.css";
import { Header } from "components/header/Header";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="profile" />,
  },
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
]);

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.me());
  }, []);

  return (
    <div className={s.App}>
      <Header />
      <div className={s.container}>
        {/*<h1>{isLoading ? "Loading..." : "App"}</h1>*/}
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;

// const StartCounter = () => {
//   return (
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <Counter />
//       <p>
//         Edit <code>src/App.tsx</code> and save to reload.
//       </p>
//       <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//     </header>
//   )
// }
