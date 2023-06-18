import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import joi from "joi";
import StatusIndicator from "./../../components/common/statusIndicator";
import { register } from "../../store/slices/authSlice";

const Register = () => {
  const { isLoading, error } = useSelector((state) => state.auth);
  const [account, setAccount] = useState({
    id: "",
    name: "",
    position: "",
    address: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const updatedAccount = { ...account };
    updatedAccount[event.target.name] = event.target.value;
    setAccount(updatedAccount);
  };

  const handleInputReset = () => {
    setAccount({
      id: "",
      name: "",
      position: "",
      address: "",
      userName: "",
      password: "",
      email: "",
      phoneNumber: "",
      role: "",
    });
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };
    const schema = joi.object({
      id: joi.string().min(5).required().label("ID"),
      name: joi.string().min(5).required().label("Name"),
      position: joi.string().min(5).required().label("Position"),
      address: joi.string().min(5).required().label("Address"),
      userName: joi.string().min(5).required().label("Username"),
      phoneNumber: joi.string().min(10).required().label("Phone"),
      email: joi
        .string()
        .min(10)
        .email({ tlds: { allow: false } })
        .regex(/@gmail\.com$/, { name: "@gmail.com" })
        .required()
        .label("Email"),
      password: joi.string().min(5).required().label("Password"),
      role: joi.string().min(3).required().label("Role"),
    });

    return schema.validate(account, options);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { error } = validateFormSubmit();
    if (error) {
      const newErrors = {};
      for (let item of error.details) {
        newErrors[item.path[0]] = item.message;
      }
      // console.log(newErrors);
      setErrorsForm(newErrors);
    } else {
      setErrorsForm({});
      dispatch(register(account))
        .unwrap()
        .then(() => navigate("/"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        )
        .then(() => handleInputReset());
    }
  };

  return (
    <div className="bg-light p-4 mt-4 px-5 rounded center-div">
      <StatusIndicator isLoading={isLoading} error={error}></StatusIndicator>
      <h4 className=" text-center fs-3">Register</h4>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-6">
            <Input
              label="ID"
              type="text"
              name="id"
              value={account.id}
              onChange={handleInputChange}
              error={errorsForm.id}
              focus={true}
            />
          </div>
          <div className="col-6">
            <Input
              label="name"
              type="text"
              name="name"
              value={account.name}
              onChange={handleInputChange}
              error={errorsForm.name}
            />
          </div>

          <div className="col-6">
            <Input
              label="position"
              type="text"
              name="position"
              value={account.position}
              onChange={handleInputChange}
              error={errorsForm.position}
            />
          </div>

          <div className="col-6">
            <Input
              label="phone Number"
              type="text"
              name="phoneNumber"
              value={account.phoneNumber}
              onChange={handleInputChange}
              error={errorsForm.phoneNumber}
            />
          </div>
          <div className="col-">
            <Input
              label="address"
              type="text"
              name="address"
              value={account.address}
              onChange={handleInputChange}
              error={errorsForm.address}
            />
          </div>

          <div className="col-6">
            <Input
              label="user Name"
              type="text"
              name="userName"
              value={account.userName}
              onChange={handleInputChange}
              error={errorsForm.userName}
            />
          </div>
          <div className="col-6">
            <Input
              label="Email"
              type="email"
              name="email"
              value={account.email}
              onChange={handleInputChange}
              error={errorsForm.email}
            />
          </div>
          <div className="col-6">
            <Input
              label="Password"
              type="password"
              name="password"
              value={account.password}
              onChange={handleInputChange}
              error={errorsForm.password}
            />
          </div>
          <div className="col-6">
            <Input
              label="role"
              type="text"
              name="role"
              value={account.role}
              onChange={handleInputChange}
              error={errorsForm.role}
            />
          </div>
        </div>
        <ButtonPrimary label="register" type="submit" />
      </form>
    </div>
  );
};

export default Register;
