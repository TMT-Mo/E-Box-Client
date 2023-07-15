import { LocationPath } from "@/util/constants";
import { helpers } from "@/util/helpers";
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
const AuthRoute = ({ children }: Props) => {
  const token = helpers.getToken();

  if (token) return children;
  return <Navigate to={LocationPath.general.login} />;
};

export default AuthRoute;
