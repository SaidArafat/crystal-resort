import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../../components/common/list";
import { fetchRoom } from "../../store/slices/roomSlice";
import StatusIndicator from "../../components/common/statusIndicator";

const RoomAction = ({ id }) => {
  const { roomDetails, isLoading, error } = useSelector((state) => state.rooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoom(id));
  }, [dispatch, id]);

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      {roomDetails && <List items={roomDetails} itemsTitle="Room" />}
    </StatusIndicator>
  );
};

export default RoomAction;
