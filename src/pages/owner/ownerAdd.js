import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import Input from "../../components/common/input";
import { addOwner } from "../../store/slices/ownerSlice";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";

const OwnerAdd = () => {
  const [owner, setOwner] = useState({
    ssn: "",
    name: "",
    phone: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const updateOwner = { ...owner };
    updateOwner[event.target.name] = event.target.value;
    setOwner(updateOwner);
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      ssn: joi.number().min(3).required().label("SSN"),
      name: joi.string().min(5).required().label("Name"),
      phone: joi.string().min(10).required().label("Phone"),
    });

    return schema.validate(owner, options);
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
      dispatch(addOwner(owner))
        .unwrap()
        .then(() => navigate("/owners"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  return (
    <div className="bg-light p-5 rounded center-div">
      <h4 className=" text-center fs-3">Add Owner</h4>
      <form onSubmit={handleFormSubmit}>
        <Input
          label="SSN"
          type="text"
          name="ssn"
          value={owner.ssn}
          onChange={handleInputChange}
          error={errorsForm.ssn}
          focus={true}
        />
        <Input
          label="Name"
          type="text"
          name="name"
          value={owner.name}
          onChange={handleInputChange}
          error={errorsForm.name}
        />
        <Input
          label="Phone"
          type="text"
          name="phone"
          value={owner.phone}
          onChange={handleInputChange}
          error={errorsForm.phone}
        />
        <ButtonPrimary label="add Owner " type="submit" />
      </form>
    </div>
  );
};

export default OwnerAdd;
