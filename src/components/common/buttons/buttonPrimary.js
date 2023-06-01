import React from "react";

const ButtonPrimary = ({ label, type = "button", onClick }) => {
  return (
    <button
      className="btn btn-outline-secondary px-3 text-capitalize "
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;
