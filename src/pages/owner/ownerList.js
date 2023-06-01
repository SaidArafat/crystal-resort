import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatusIndicator from "./../../components/common/statusIndicator";
import { deleteOwner, fetchOwners } from "./../../store/slices/ownerSlice";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/common/buttons/buttonPrimary";

const OwnerList = () => {
  const { owners, isLoading, error } = useSelector((state) => state.owners);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOwners());
  }, [dispatch]);

  const handleDeleteOwner = useCallback(
    (owner) => dispatch(deleteOwner(owner)),
    [dispatch]
  );

  const handleDeleteConfirmation = (owner) => {
    if (window.confirm("Are you sure you want to delete owner?")) {
      handleDeleteOwner(owner);
    }
  };

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
        {owners.length > 0 &&
          owners.map((owner, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{owner.ssn}</td>
              <td>{owner.name}</td>
              <td>{owner.phone}</td>
              <td>
                <Link className=" btn text-primary" to={`/owners/${owner.ssn}`}>
                  Details
                </Link>
              </td>
              <td>
                <button
                  className=" btn text-primary"
                  onClick={() => navigate(`/owners/${owner.ssn}/update`)}
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
        <h3>Owners</h3>
        {renderedTable}
        <ButtonPrimary
          label="Add Owner"
          type="button"
          onClick={() => navigate("/owners/add")}
        />
      </div>
    </StatusIndicator>
  );
};

export default OwnerList;
