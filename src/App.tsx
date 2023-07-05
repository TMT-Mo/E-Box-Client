import { useState } from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "@/pages/login/index";
import Home from "@/pages/home";
import AlertPopup from "@/components/AlertPopup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <AlertPopup
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={5000}
      />
    </>
  );
}

export default App;
