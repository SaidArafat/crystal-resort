import React from "react";
import useGetService from "../../hooks/use-get-service";

const ServiceDetails = () => {
  const { serviceDetails, isLoading, error } = useGetService();

  console.log(error);
  console.log(isLoading);
  console.log(serviceDetails);
  return <div>ServiceDetails</div>;
};

export default ServiceDetails;
