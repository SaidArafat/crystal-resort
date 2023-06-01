import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar, fetchCars } from "./../../store/slices/carSlice";
import StatusIndicator from "./../../components/common/statusIndicator";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { Link, useNavigate } from "react-router-dom";

const CarList = () => {
  const { cars, isLoading, error } = useSelector((state) => state.cars);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDeleteCar = useCallback(
    (car) => dispatch(deleteCar(car)),
    [dispatch]
  );

  const handleDeleteConfirmation = (car) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      handleDeleteCar(car);
    }
  };

  const renderedTable = (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Index</th>
          <th>Type</th>
          <th>Number</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cars.length > 0 &&
          cars.map((car, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{car.type}</td>
              <td>{car.carnum}</td>
              <td>
                <Link className=" btn text-primary" to={`/cars/${car.id}`}>
                  Details
                </Link>
              </td>
              <td>
                <button
                  className=" btn text-primary"
                  onClick={() => navigate(`/cars/${car.id}/update`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn text-danger"
                  onClick={() => handleDeleteConfirmation(car)}
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
        <h3>Cars</h3>
        {renderedTable}
        <ButtonPrimary
          label="Add Car"
          type="button"
          onClick={() => navigate("/cars/add")}
        />
      </div>
    </StatusIndicator>
  );
};

export default CarList;
