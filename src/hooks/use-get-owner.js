import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOwner } from "../store/slices/ownerSlice";

const useGetOwner = () => {
  const { ownerDetails, isLoading, error } = useSelector(
    (state) => state.owners
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwner(id));
  }, [dispatch, id]);

  return { ownerDetails, isLoading, error };
};

export default useGetOwner;
