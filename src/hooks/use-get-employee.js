import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchEmployee } from "../store/slices/employeeSlice";

const useGetEmployee = () => {
  const { employeeDetails, isLoading, error } = useSelector(
    (state) => state.employees
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee(id));
  }, [dispatch, id]);

  return { employeeDetails, isLoading, error };
};

export default useGetEmployee;
