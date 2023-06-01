import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCar } from "./../store/slices/carSlice";

const useGetCar = () => {
  const { carDetails, isLoading, error } = useSelector((state) => state.cars);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCar(id));
  }, [dispatch, id]);

  return { carDetails, isLoading, error };
};

export default useGetCar;
