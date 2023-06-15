import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatusIndicator from "./../../components/common/statusIndicator";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { useNavigate } from "react-router-dom";
import Table from "./../../components/Table";
import { deleteRoom, fetchRooms } from "./../../store/slices/roomSlice";

const RoomList = () => {
  const { rooms, isLoading, error } = useSelector((state) => state.rooms);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleDeleteRoom = useCallback(
    (item) => dispatch(deleteRoom(item)),
    [dispatch]
  );

  const handleDeleteConfirmation = (item) => {
    if (window.confirm("Are you sure you want to delete item?")) {
      handleDeleteRoom(item);
    }
  };

  const handleViewDetails = (item) => {
    navigate(`/rooms/${item.id}`);
  };

  const handleEdit = (item) => {
    navigate(`/rooms/${item.id}/update`);
  };

  // console.log(rooms);

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="p-3  border rounded mt-3 bg-light">
        <h3>Rooms</h3>
        <Table
          data={rooms}
          columns={["Code", "Price", "Type"]}
          onDelete={handleDeleteConfirmation}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
        />
        <ButtonPrimary
          label="Add Room"
          type="button"
          onClick={() => navigate("/rooms/add")}
        />
      </div>
    </StatusIndicator>
  );
};

export default RoomList;
