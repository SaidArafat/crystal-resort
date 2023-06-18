import React from "react";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonLink from "./../../components/common/buttons/buttonLink";
import List from "./../../components/common/list";
import useGetEmployee from "../../hooks/use-get-employee";

const EmployeeDetails = () => {
  const { employeeDetails, isLoading, error } = useGetEmployee();

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-4 px-5 mt-2 rounded col-md-8 mx-auto">
        <h4 className=" text-center fs-3">Owner Details</h4>
        {employeeDetails && (
          // <ul className="list-group">
          //   <li className="list-group-item">
          //     SSN:
          //     <span className=" opacity-75 d-block ms-2">
          //       {employeeDetails.ssn}
          //     </span>
          //   </li>
          //   <li className="list-group-item">
          //     Name:
          //     <span className=" opacity-75 d-block ms-2">
          //       {employeeDetails.name}
          //     </span>
          //   </li>
          //   <li className="list-group-item">
          //     Phone:
          //     <span className=" opacity-75 d-block ms-2">
          //       {employeeDetails.phone}
          //     </span>
          //   </li>
          // </ul>
          <List items={employeeDetails.registrationData} />
        )}
        <ButtonLink label="Back" path="/employees" />
      </div>
    </StatusIndicator>
  );
};

export default EmployeeDetails;
