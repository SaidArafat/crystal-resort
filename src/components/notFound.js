import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import ButtonPrimary from "./common/buttons/buttonPrimary";

const NotFound = () => {
  const navigate = useNavigate();
  const routeError = useRouteError();

  return (
    <div className="flex-column d-flex justify-content-center align-items-center vh-100">
      <h1>Oops!</h1>
      <p className="my-4">Sorry, an unexpected error has occurred.</p>
      <div className="alert alert-link">
        {routeError.statusText || routeError.data}
      </div>

      <ButtonPrimary
        label="Back To Home"
        onClick={() => navigate("/", { replace: true })}
      />
    </div>
  );
};

export default NotFound;
