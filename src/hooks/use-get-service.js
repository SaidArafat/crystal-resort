import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchService } from "./../store/slices/serviceSlice";

const useGetService = () => {
  const { serviceDetails, isLoading, error } = useSelector(
    (state) => state.services
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchService(id));
  }, [dispatch, id]);

  return { serviceDetails, isLoading, error };
};

export default useGetService;
