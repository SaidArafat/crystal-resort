import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRoom } from "../store/slices/roomSlice";

const useGetRoom = () => {
  const { roomDetails, isLoading, error } = useSelector((state) => state.rooms);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoom(id));
  }, [dispatch, id]);

  return { roomDetails, isLoading, error };
};

export default useGetRoom;
