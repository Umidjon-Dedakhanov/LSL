import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

const Private = (props) => {
    const admin = useSelector(state => state.admin);

    const location = useLocation();
  return admin.isAuthenticated  ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          from: location.pathname,
        },
      }}
    />
  );
};

export default Private;
