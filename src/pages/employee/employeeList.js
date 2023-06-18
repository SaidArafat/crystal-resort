import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StatusIndicator from "./../../components/common/statusIndicator";
// import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { fetchEmployees } from "../../store/slices/employeeSlice";

const EmployeeList = () => {
  const { employees, isLoading, error } = useSelector(
    (state) => state.employees
  );

  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  //   const handleDeleteEmployee = useCallback(
  //     (item) => dispatch(deleteEmployee(item)),
  //     [dispatch]
  //   );

  //   const handleDeleteConfirmation = (item) => {
  //     if (window.confirm("Are you sure you want to delete item?")) {
  //       handleDeleteEmployee(item);
  //     }
  //   };

  //   console.log(employees);

  const renderedTable = (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Email</th>
          <th></th>
          {/* <th></th> */}
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 &&
          employees.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.registrationData.name}</td>
              <td>{item.registrationData.email}</td>
              <td>
                <Link
                  className=" btn text-primary"
                  to={`/employees/${item.registrationData.id}`}
                >
                  Details
                </Link>
              </td>
              {/* <td>
                <button
                  className=" btn text-primary"
                  onClick={() =>
                    navigate(`/employees/${item.registrationData.id}/update`)
                  }
                >
                  Edit
                </button>
              </td> */}
              {/* <td>
                <button
                  className="btn text-danger"
                  onClick={() => handleDeleteConfirmation(item)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
      </tbody>
    </table>
  );

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="p-3  border rounded mt-3 bg-light">
        <h3>Employees</h3>
        {renderedTable}
        {/* <ButtonPrimary
          label="Add E"
          type="button"
          onClick={() => navigate("/books/add")}
        /> */}
      </div>
    </StatusIndicator>
  );
};

export default EmployeeList;
