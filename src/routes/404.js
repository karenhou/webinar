import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>Page Not Found</div>
      <Link to="/">Back to home page</Link>
    </>
  );
};

export default NotFound;
