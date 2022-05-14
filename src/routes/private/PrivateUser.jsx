import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

const PrivateUser = (props) => {
    const user = useSelector(state => state.user);
    const location = useLocation();
  return user.userId ? (
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