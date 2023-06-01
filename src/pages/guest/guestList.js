import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatusIndicator from "./../../components/common/statusIndicator";
import { deleteGuest, fetchGuests } from "../../store/slices/guestSlice";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/common/buttons/buttonPrimary";

const GuestList = () => {
  const { guests, isLoading, error } = useSelector((state) => state.guests);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  const handleDelete = useCallback(
    (item) => dispatch(deleteGuest(item)),
    [dispatch]
  );

  const handleDeleteConfirmation = (item) => {
    if (window.confirm("Are you sure you want to delete item?")) {
      handleDelete(item);
    }
  };

  // console.log(guests);

  const renderedTable = (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Index</th>
          <th>SSN</th>
          <th>Name</th>
          <th>Phone</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {guests.length > 0 &&
          guests.map((owner, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{owner.ssn}</td>
              <td>{owner.name}</td>
              <td>{owner.phone}</td>
              <td>
                <Link className=" btn text-primary" to={`/guests/${owner.ssn}`}>
                  Details
                </Link>
              </td>
              <td>
                <button
                  className=" btn text-primary"
                  onClick={() => navigate(`/guests/${owner.ssn}/update`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn text-danger"
                  onClick={() => handleDeleteConfirmation(owner)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="p-3  border rounded mt-3 bg-light">
        <h3>Guests</h3>
        {renderedTable}
        <ButtonPrimary
          label="Add Guest"
          type="button"
          onClick={() => navigate("/guests/add")}
        />
      </div>
    </StatusIndicator>
  );
};

export default GuestList;
