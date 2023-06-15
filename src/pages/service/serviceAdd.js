import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { addService } from "../../store/slices/serviceSlice";

const ServiceAdd = () => {
  const [service, setService] = useState({
    name: "",
    price: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const updatedItem = { ...service };
    updatedItem[event.target.name] = event.target.value;
    setService(updatedItem);
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      name: joi.string().min(5).required().label("Name"),
      price: joi.number().min(2).required().label("Price"),
    });

    return schema.validate(service, options);
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
      dispatch(addService(service))
        .unwrap()
        .then(() => navigate("/services"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  return (
    <div className="bg-light p-5 rounded center-div">
      <h4 className=" text-center fs-3">Add Service</h4>
      <form onSubmit={handleFormSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          value={service.name}
          onChange={handleInputChange}
          error={errorsForm.name}
          focus={true}
        />
        <Input
          label="price"
          type="number"
          name="price"
          value={service.price}
          onChange={handleInputChange}
          error={errorsForm.price}
        />
        <ButtonPrimary label="add service " type="submit" />
      </form>
    </div>
  );
};

export default ServiceAdd;
