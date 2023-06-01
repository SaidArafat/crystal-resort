import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import { addCar } from "./../../store/slices/carSlice";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";

const CarAdd = () => {
  // const { cars, isLoading, error } = useSelector((state) => state.cars);
  const [car, setCar] = useState({
    carnum: "",
    type: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const newCar = { ...car };
    newCar[event.target.name] = event.target.value;
    setCar(newCar);
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
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
      console.log(newErrors);
      setErrorsForm(newErrors);
    } else {
      setErrorsForm({});
      dispatch(addCar(car))
        .unwrap()
        .then(() => navigate("/cars"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  return (
    <div className="bg-light p-5 rounded center-div">
      <h4 className=" text-center fs-3">Add Car</h4>
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
        <ButtonPrimary label="Add car" type="submit" />
      </form>
    </div>
  );
};

export default CarAdd;
