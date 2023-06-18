import React from "react";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonLink from "./../../components/common/buttons/buttonLink";
import useGetService from "../../hooks/use-get-service";

const ServiceDetails = () => {
  const { serviceDetails, isLoading, error } = useGetService();

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3 mb-4">Service Details</h4>
        {serviceDetails && (
          <ul className="list-group">
            <li className="list-group-item">
              Name:
              <span className=" opacity-75 d-block ms-2">
                {serviceDetails.name}
              </span>
            </li>
            <li className="list-group-item">
              Price:
              <span className=" opacity-75 d-block ms-2">
                {serviceDetails.price}
              </span>
            </li>
            <li className="list-group-item">
              <img src={serviceDetails.imageUrl} alt={serviceDetails.name} />
            </li>
          </ul>
        )}
        <ButtonLink label="Back" path="/services" />
      </div>
    </StatusIndicator>
  );
};

export default ServiceDetails;
