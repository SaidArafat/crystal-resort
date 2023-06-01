import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ label, path }) => {
  return (
    <Link
      className="btn btn-outline-secondary px-3 text-capitalize mt-3"
      to={path}
    >
      {label}
    </Link>
  );
};

export default ButtonLink;
