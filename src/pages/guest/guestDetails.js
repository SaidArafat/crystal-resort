import React from "react";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonLink from "./../../components/common/buttons/buttonLink";
import useGetGuest from "./../../hooks/use-get-guest";

const GuestDetails = () => {
  const { guestDetails, isLoading, error } = useGetGuest();

  // console.log(guestDetails);

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3 mb-4">Guest Details</h4>
        {guestDetails && (
          <ul className="list-group">
            <li className="list-group-item">
              SSN:
              <span className=" opacity-75 d-block ms-2">
                {guestDetails.ssn}
              </span>
            </li>
            <li className="list-group-item">
              Name:
              <span className=" opacity-75 d-block ms-2">
                {guestDetails.name}
              </span>
            </li>
            <li className="list-group-item">
              Phone:
              <span className=" opacity-75 d-block ms-2">
                {guestDetails.phone}
              </span>
            </li>
          </ul>
        )}
        <ButtonLink label="Back" path="/guests" />
      </div>
    </StatusIndicator>
  );
};

export default GuestDetails;
