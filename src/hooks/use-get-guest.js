import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGuest } from "../store/slices/guestSlice";

const useGetGuest = () => {
  const { guestDetails, isLoading, error } = useSelector(
    (state) => state.guests
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuest(id));
  }, [dispatch, id]);

  return { guestDetails, isLoading, error };
};

export default useGetGuest;
