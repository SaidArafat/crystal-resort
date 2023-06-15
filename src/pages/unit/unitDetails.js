import React from "react";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonLink from "../../components/common/buttons/buttonLink";
import List from "./../../components/common/list";
import OwnerAction from "../owner/ownerAction";
import useGetUnit from "./../../hooks/use-get-unit";

const UnitDetails = () => {
  const { unitDetails, isLoading, error } = useGetUnit();

  console.log(unitDetails);

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3 mb-4">Uint Details</h4>
        {unitDetails && (
          <>
            <div className="row">
              <div className="col-6">
                <List items={unitDetails} itemsTitle="Uint" />
              </div>
              <div className="col-6">
                <OwnerAction id={unitDetails.ownerId} />
              </div>
            </div>
          </>
        )}
        <ButtonLink label="Back" path="/units" />
      </div>
    </StatusIndicator>
  );
};

export default UnitDetails;
