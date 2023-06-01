import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import joi from "joi";
import Input from "../../components/common/input";
import { resetCarDetails, updateCar } from "../../store/slices/carSlice";
import useGetCar from "./../../hooks/use-get-car";
import ButtonPrimary from "../../components/common/buttons/buttonPrimary";
import StatusIndicator from "./../../components/common/statusIndicator";

const CarUpdate = () => {
  const { carDetails, isLoading, error } = useGetCar();

  const [car, setCar] = useState({
    id: "",
    carnum: "",
    type: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (carDetails) {
      setCar((car) => ({
        id: carDetails.id,
        carnum: carDetails.carnum,
        type: carDetails.type,
      }));
    }
  }, [carDetails]);

  useEffect(() => {
    return () => dispatch(resetCarDetails());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const newCar = { ...car };
    newCar[event.target.name] = event.target.value;
    setCar(newCar);
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      id: joi.optional(),
      carnum: joi.number().min(3).required().label("Number"),
      type: joi.string().min(3).required().label("Type"),
    });

    return schema.validate(car, options);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { error } = validateFormSubmit();
    if (error) {
      const newErrors = {};
      for (let item of error.details) {
        newErrors[item.path[0]] = item.message;
      }
      setErrorsForm(newErrors);
    } else {
      setErrorsForm({});
      dispatch(updateCar(car))
        .unwrap()
        .then(() => navigate("/cars"));
      // .catch((error) =>
      //   window.alert(
      //     `${error} ,The server is down. please try later to reconnect.`
      //   )
      // );
    }
  };

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3">Update Car</h4>
        <form onSubmit={handleFormSubmit}>
          <Input
            label="Number"
            type="text"
            name="carnum"
            value={car.carnum}
            onChange={handleInputChange}
            error={errorsForm.carnum}
            focus={true}
          />
          <Input
            label="Type"
            type="text"
            name="type"
            value={car.type}
            onChange={handleInputChange}
            error={errorsForm.type}
          />
          <ButtonPrimary label="update car" type="submit" />
        </form>
      </div>
    </StatusIndicator>
  );
};

export default CarUpdate;
