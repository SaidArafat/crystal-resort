import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatusIndicator from "./../../components/common/statusIndicator";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { useNavigate } from "react-router-dom";
import { deleteService, fetchServices } from "../../store/slices/serviceSlice";
import Table from "./../../components/Table";

const ServiceList = () => {
  const { services, isLoading, error } = useSelector((state) => state.services);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleDeleteService = useCallback(
    (item) => dispatch(deleteService(item)),
    [dispatch]
  );

  const handleDeleteConfirmation = (item) => {
    if (window.confirm("Are you sure you want to delete item?")) {
      handleDeleteService(item);
    }
  };

  const handleViewDetails = (item) => {
    navigate(`/services/${item.id}`);
  };

  const handleEdit = (item) => {
    navigate(`/services/${item.id}/update`);
  };

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="p-3  border rounded mt-3 bg-light">
        <h3>Services</h3>
        <Table
          data={services}
          columns={["Name", "Price"]}
          onDelete={handleDeleteConfirmation}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
        />
        <ButtonPrimary
          label="Add Service"
          type="button"
          onClick={() => navigate("/services/add")}
        />
      </div>
    </StatusIndicator>
  );
};

export default ServiceList;
