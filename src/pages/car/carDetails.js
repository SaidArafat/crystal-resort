import React from "react";
import useGetCar from "../../hooks/use-get-car";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonLink from "../../components/common/buttons/buttonLink";

const CarDetails = () => {
  const { carDetails, isLoading, error } = useGetCar();

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3 mb-4">Car Details</h4>
        {carDetails && (
          <ul className="list-group">
            <li className="list-group-item">
              Car Number:
              <span className=" opacity-75 d-block ms-2">
                {carDetails.carnum}
              </span>
            </li>
            <li className="list-group-item">
              Car Type:
              <span className=" opacity-75 d-block ms-2">
                {carDetails.type}
              </span>
            </li>
          </ul>
        )}
        <ButtonLink label="Back" path="/cars" />
      </div>
    </StatusIndicator>
  );
};

export default CarDetails;
