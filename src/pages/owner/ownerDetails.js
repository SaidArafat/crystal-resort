import React from "react";
import useGetOwner from "../../hooks/use-get-owner";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonLink from "./../../components/common/buttons/buttonLink";
import List from "./../../components/common/list";

const OwnerDetails = () => {
  const { ownerDetails, isLoading, error } = useGetOwner();
  // console.log(ownerDetails);

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3 mb-4">Owner Details</h4>
        {ownerDetails && (
          // <ul className="list-group">
          //   <li className="list-group-item">
          //     SSN:
          //     <span className=" opacity-75 d-block ms-2">
          //       {ownerDetails.ssn}
          //     </span>
          //   </li>
          //   <li className="list-group-item">
          //     Name:
          //     <span className=" opacity-75 d-block ms-2">
          //       {ownerDetails.name}
          //     </span>
          //   </li>
          //   <li className="list-group-item">
          //     Phone:
          //     <span className=" opacity-75 d-block ms-2">
          //       {ownerDetails.phone}
          //     </span>
          //   </li>
          // </ul>
          <List items={ownerDetails} />
        )}
        <ButtonLink label="Back" path="/owners" />
      </div>
    </StatusIndicator>
  );
};

export default OwnerDetails;
