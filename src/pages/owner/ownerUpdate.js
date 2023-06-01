import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import Input from "../../components/common/input";
import { resetOwnerDetails, updateOwner } from "../../store/slices/ownerSlice";
import useGetOwner from "../../hooks/use-get-owner";
import StatusIndicator from "../../components/common/statusIndicator";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";

const OwnerUpdate = () => {
  const { ownerDetails, isLoading, error } = useGetOwner();

  // console.log(ownerDetails);

  const [owner, setOwner] = useState({
    ssn: "",
    name: "",
    phone: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (ownerDetails) {
      setOwner((owner) => ({
        ssn: ownerDetails.ssn,
        name: ownerDetails.name,
        phone: ownerDetails.phone,
      }));
    }
  }, [ownerDetails]);

  useEffect(() => {
    return () => dispatch(resetOwnerDetails());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const updateOwner = { ...owner };
    updateOwner[event.target.name] = event.target.value;
    setOwner(updateOwner);
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      ssn: joi.number().required().label("ssn"),
      name: joi.string().min(3).required().label("Name"),
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
      console.log(owner);
      setErrorsForm({});
      dispatch(updateOwner(owner))
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
    <StatusIndicator isLoading={isLoading} error={error}>
      <div className="bg-light p-5 rounded center-div">
        <h4 className=" text-center fs-3">Update Owner</h4>
        <form onSubmit={handleFormSubmit}>
          {/* <Input
            label="SSN"
            type="text"
            name="ssn"
            value={owner.ssn}
            onChange={handleInputChange}
            error={errorsForm.ssn}
            focus={true}
          /> */}
          <Input
            label="Name"
            type="text"
            name="name"
            value={owner.name}
            onChange={handleInputChange}
            error={errorsForm.name}
            focus={true}
          />
          <Input
            label="Phone"
            type="text"
            name="phone"
            value={owner.phone}
            onChange={handleInputChange}
            error={errorsForm.phone}
          />
          <ButtonPrimary label="Edit Owner" type="submit" />
        </form>
      </div>
    </StatusIndicator>
  );
};

export default OwnerUpdate;
