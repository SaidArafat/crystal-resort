import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUnit } from "../store/slices/unitSlice";

const useGetUnit = () => {
  const { unitDetails, isLoading, error } = useSelector((state) => state.units);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnit(id));
  }, [dispatch, id]);

  return { unitDetails, isLoading, error };
};

export default useGetUnit;
