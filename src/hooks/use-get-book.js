import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBook } from "../store/slices/bookSlice";

const useGetBook = () => {
  const { bookDetails, isLoading, error } = useSelector((state) => state.books);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);

  return { bookDetails, isLoading, error };
};

export default useGetBook;
