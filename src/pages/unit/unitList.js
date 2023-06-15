import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StatusIndicator from "./../../components/common/statusIndicator";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { deleteUnit, fetchUnits } from "./../../store/slices/unitSlice";

const UnitList = () => {
  const { units, isLoading, error } = useSelector((state) => state.units);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnits());
  }, [dispatch]);

  const handleDeleteUnit = useCallback(
    (item) => dispatch(deleteUnit(item)),
    [dispatch]
  );

  const handleDeleteConfirmation = (item) => {
    if (window.confirm("Are you sure you want to delete item?")) {
      handleDeleteUnit(item);
    }
  };

  const renderedTable = (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Index</th>
          <th>Code</th>
          <th>Name</th>
          <th>Type</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {units.length > 0 &&
          units.map((unit, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{unit.code}</td>
              <td>{unit.name}</td>
              <td>{unit.type}</td>
              <td>
                <Link
                  className=" btn text-warning"
                  to={`/owners/${unit.ownerId}`}
                >
                  Owner
                </Link>
              </td>
              <td>
                <Link className=" btn text-primary" to={`/units/${unit.id}`}>
                  Details
                </Link>
              </td>
              <td>
                <button
                  className=" btn text-primary"
                  onClick={() => navigate(`/units/${unit.id}/update`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn text-danger"
                  onClick={() => handleDeleteConfirmation(unit)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  // console.log(units);

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="p-3  border rounded mt-3 bg-light">
        <h3>Units</h3>
        {renderedTable}
        <ButtonPrimary
          label="Add Unit"
          type="button"
          onClick={() => navigate("/units/add")}
        />
      </div>
    </StatusIndicator>
  );
};

export default UnitList;
