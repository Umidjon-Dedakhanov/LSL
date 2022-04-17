import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

const PrivateUser = (props) => {
  let token = localStorage.getItem("user-token-start");
    const location = useLocation();
  return token ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/user/login",
        state: {
          from: location.pathname,
        },
      }}
    />
  );
};

export default PrivateUser;