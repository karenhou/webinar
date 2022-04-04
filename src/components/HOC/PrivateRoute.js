import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, auth }) => {
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(PrivateRoute);
