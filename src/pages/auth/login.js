import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import joi from "joi";
import StatusIndicator from "./../../components/common/statusIndicator";
import { login } from "../../store/slices/authSlice";

const Login = () => {
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);
  const [account, setAccount] = useState({
    email: "",
    password: "",
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
      email: "",
      password: "",
    });
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };
    const schema = joi.object({
      email: joi
        .string()
        .min(10)
        .email({ tlds: { allow: false } })
        .regex(/@gmail\.com$/, { name: "@gmail.com" })
        .required()
        .label("Email"),
      password: joi.string().min(5).required().label("Password"),
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
      console.log(newErrors);
      setErrorsForm(newErrors);
    } else {
      setErrorsForm({});
      dispatch(login(account))
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

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-light p-5 rounded center-div">
      <StatusIndicator isLoading={isLoading} error={error}></StatusIndicator>
      <h4 className=" text-center fs-3">Login</h4>
      <form onSubmit={handleFormSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={account.email}
          onChange={handleInputChange}
          error={errorsForm.email}
          focus={true}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={account.password}
          onChange={handleInputChange}
          error={errorsForm.password}
        />
        <ButtonPrimary label="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
