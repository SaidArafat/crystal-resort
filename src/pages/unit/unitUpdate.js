import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { resetUnit, updateUnit } from "../../store/slices/unitSlice";
import { fetchOwners } from "./../../store/slices/ownerSlice";
import SingleSelect from "./../../components/common/singleSelect";
import joi from "joi";
import useGetUnit from "./../../hooks/use-get-unit";
import StatusIndicator from "./../../components/common/statusIndicator";

const UnitUpdate = () => {
  const { unitDetails } = useGetUnit();
  const { owners } = useSelector((state) => state.owners);
  const { isLoading, error } = useSelector((state) => state.units);

  const [unit, setUnit] = useState({
    id: "",
    code: "",
    name: "",
    type: "",
    ownerId: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOwners());
    if (unitDetails) {
      setUnit((book) => ({
        id: unitDetails.id,
        code: unitDetails.code,
        name: unitDetails.name,
        type: unitDetails.type,
        ownerId: "",
      }));
    }
  }, [dispatch, unitDetails]);

  useEffect(() => {
    return () => dispatch(resetUnit());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const updatedItem = { ...unit };
    updatedItem[event.target.name] = event.target.value;
    setUnit(updatedItem);
  };

  const handleSelectChange = (fieldName, selectedOption) => {
    setUnit({ ...unit, [fieldName]: selectedOption.value });
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      id: joi.optional(),
      code: joi.required().label("Code"),
      name: joi.string().min(3).required().label("Name"),
      type: joi.string().min(3).required().label("Type"),
      ownerId: joi.optional(),
    });

    return schema.validate(unit, options);
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
      // console.log(unit);
      dispatch(updateUnit(unit))
        .unwrap()
        .then(() => navigate("/units"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  return (
    <div className="bg-light p-5 rounded center-div">
      <h4 className=" text-center fs-3">Update Unit</h4>
      <StatusIndicator isLoading={isLoading} error={error}></StatusIndicator>
      <form onSubmit={handleFormSubmit}>
        <SingleSelect
          label="Owner"
          options={owners.map((item) => ({
            value: item.ssn,
            label: item.name,
          }))}
          onChange={(selectedOption) =>
            handleSelectChange("ownerId", selectedOption)
          }
          error={errorsForm.ownerId}
        />

        <Input
          label="name"
          type="text"
          name="name"
          value={unit.name}
          onChange={handleInputChange}
          error={errorsForm.name}
        />

        <Input
          label="code"
          type="text"
          name="code"
          value={unit.code}
          onChange={handleInputChange}
          error={errorsForm.code}
        />

        <Input
          label="type"
          type="text"
          name="type"
          value={unit.type}
          onChange={handleInputChange}
          error={errorsForm.type}
        />

        <ButtonPrimary label="Update Unit" type="submit" />
      </form>
    </div>
  );
};

export default UnitUpdate;
