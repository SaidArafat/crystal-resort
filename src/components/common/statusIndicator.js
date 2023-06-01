import React from "react";

const StatusIndicator = ({ isLoading, error, children }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-secondary my-2 text-danger">
        Error: {error}
      </div>
    );
  }

  return <>{children}</>;
};

export default StatusIndicator;
