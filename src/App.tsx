import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "@/pages/login/index";
import Home from "@/pages/home";
import AlertPopup from "@/components/AlertPopup";
import { useAuth, useSelector } from "@/hooks";
import NotFound from "@/pages/not-found";
import GeneralLayout from "@/components/Layout/General";
import AdminLayout from "@/components/Layout/Admin";
import PostManagement from "@/pages/post-management";
import { LocationPath } from "@/util/constants";
import Chat from "@/pages/chat";
import History from "@/pages/history";
import { useEffect } from "react";
import React from "react";
import Introduction from "@/pages/introduction";
import { helpers } from "@/util/helpers";
import AuthRoute from "@/components/AuthRoute";

function App() {
  const { checkAuthenticated } = useSelector((state) => state.user);
  const { authenticate } = useAuth();
  const location = useLocation();
  const { chat, history, postManagement, account, admin } = LocationPath.admin;
  const { home, login } = LocationPath.general;

  useEffect(() => {
    !checkAuthenticated && authenticate();
  }, [authenticate, checkAuthenticated]);

  // useEffect(() => {
  //   helpers.handleLocation(location.pathname);
  //   console.log(location.pathname);
  // }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path={login} element={<Login />} />
        <Route
          path={home}
          element={
            <AuthRoute>
              <GeneralLayout />
            </AuthRoute>
          }
        >
          <Route path="" element={<Home />} />
        </Route>
        <Route
          path={admin}
          element={
            <AuthRoute>
              <AdminLayout />
            </AuthRoute>
          }
        >
          <Route path={postManagement} element={<PostManagement />} />
          <Route path={chat} element={<Chat />} />
          <Route path={history} element={<History />} />
          {/* <Navigate to={postManagement}/> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AlertPopup
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={5000}
      />
    </>
  );
}

export default App;
