import React from "react";
import useGetRoom from "../../hooks/use-get-room";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonLink from "../../components/common/buttons/buttonLink";
import List from "./../../components/common/list";

const RoomDetails = () => {
  const { roomDetails, isLoading, error } = useGetRoom();

  // console.log(roomDetails);
  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3 mb-4">Room Details</h4>
        {roomDetails && <List items={roomDetails} />}
        <ButtonLink label="Back" path="/rooms" />
      </div>
    </StatusIndicator>
  );
};

export default RoomDetails;
