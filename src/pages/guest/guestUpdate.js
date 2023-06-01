import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import Input from "../../components/common/input";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import useGetGuest from "./../../hooks/use-get-guest";
import { resetGuestDetails, updateGuest } from "../../store/slices/guestSlice";

const GuestUpdate = () => {
  const { guestDetails, isLoading, error } = useGetGuest();

  const [guest, setGuest] = useState({
    ssn: "",
    name: "",
    phone: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (guestDetails) {
      setGuest((guest) => ({
        ssn: guestDetails.ssn,
        name: guestDetails.name,
        phone: guestDetails.phone,
      }));
    }
  }, [guestDetails]);

  useEffect(() => {
    return () => dispatch(resetGuestDetails());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const updatedItem = { ...guest };
    updatedItem[event.target.name] = event.target.value;
    setGuest(updatedItem);
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      ssn: joi.number().required().label("ssn"),
      name: joi.string().min(3).required().label("Name"),
      phone: joi.string().min(10).required().label("Phone"),
    });

    return schema.validate(guest, options);
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
      console.log(guest);
      setErrorsForm({});
      dispatch(updateGuest(guest))
        .unwrap()
        .then(() => navigate("/guests"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  return (
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3">Update Guest</h4>
        <form onSubmit={handleFormSubmit}>
          {/* <Input
            label="SSN"
            type="text"
            name="ssn"
            value={guest.ssn}
            onChange={handleInputChange}
            error={errorsForm.ssn}
            focus={true}
          /> */}
          <Input
            label="Name"
            type="text"
            name="name"
            value={guest.name}
            onChange={handleInputChange}
            error={errorsForm.name}
            focus={true}
          />
          <Input
            label="Phone"
            type="text"
            name="phone"
            value={guest.phone}
            onChange={handleInputChange}
            error={errorsForm.phone}
          />
          <ButtonPrimary label="Edit guest" type="submit" />
        </form>
      </div>
    </StatusIndicator>
  );
};

export default GuestUpdate;
