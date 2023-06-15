import React from "react";
import useGetBook from "../../hooks/use-get-book";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonLink from "../../components/common/buttons/buttonLink";
import List from "./../../components/common/list";
import OwnerAction from "../owner/ownerAction";
import RoomAction from "../room/roomAction";

const BookDetails = () => {
  const { bookDetails, isLoading, error } = useGetBook();

  // console.log(bookDetails);

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3 mb-4">Book Details</h4>
        {bookDetails && (
          <>
            <List items={bookDetails} />
            <div className="row">
              <div className="col-6">
                <OwnerAction id={bookDetails.ownerId} />
              </div>
              <div className="col-6">
                <RoomAction id={bookDetails.roomid} />
              </div>
            </div>
          </>
        )}
        <ButtonLink label="Back" path="/books" />
      </div>
    </StatusIndicator>
  );
};

export default BookDetails;
