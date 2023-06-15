import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StatusIndicator from "./../../components/common/statusIndicator";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { deleteBook, fetchBooks } from "../../store/slices/bookSlice";

const BookList = () => {
  const { books, isLoading, error } = useSelector((state) => state.books);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDeleteBook = useCallback(
    (item) => dispatch(deleteBook(item)),
    [dispatch]
  );

  const handleDeleteConfirmation = (item) => {
    if (window.confirm("Are you sure you want to delete item?")) {
      handleDeleteBook(item);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  const renderedTable = (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Index</th>
          <th>Date</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.length > 0 &&
          books.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatDate(item.dateofbooking)}</td>
              <td>
                <Link className=" btn text-primary" to={`/books/${item.id}`}>
                  Details
                </Link>
              </td>
              <td>
                <button
                  className=" btn text-primary"
                  onClick={() => navigate(`/books/${item.id}/update`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn text-danger"
                  onClick={() => handleDeleteConfirmation(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  // console.log(books);
  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="p-3  border rounded mt-3 bg-light">
        <h3>Books</h3>
        {renderedTable}
        <ButtonPrimary
          label="Add Book"
          type="button"
          onClick={() => navigate("/books/add")}
        />
      </div>
    </StatusIndicator>
  );
};

export default BookList;
