import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { fetchOwners } from "./../../store/slices/ownerSlice";
import SingleSelect from "./../../components/common/singleSelect";
import joi from "joi";
import { addUnit } from "./../../store/slices/unitSlice";

const UnitAdd = () => {
  const { owners } = useSelector((state) => state.owners);

  const [unit, setUnit] = useState({
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
      code: joi.string().min(3).required().label("Code"),
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
      dispatch(addUnit(unit))
        .unwrap()
        .then(() => navigate("/units"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  // console.log(owners);

  return (
    <div className="bg-light p-5 rounded center-div">
      <h4 className=" text-center fs-3">Add Unit</h4>
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

        <ButtonPrimary label="Add Unit" type="submit" />
      </form>
    </div>
  );
};

export default UnitAdd;
