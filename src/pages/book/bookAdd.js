import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { fetchRooms } from "./../../store/slices/roomSlice";
import { fetchOwners } from "./../../store/slices/ownerSlice";
import SingleSelect from "./../../components/common/singleSelect";
import joi from "joi";
import { addBook } from "./../../store/slices/bookSlice";

const BookAdd = () => {
  const { rooms } = useSelector((state) => state.rooms);
  const { owners } = useSelector((state) => state.owners);

  const [book, setBook] = useState({
    dateofbooking: "",
    roomid: 0,
    ownerId: 0,
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchOwners());
  }, [dispatch]);

  // console.log(owners);
  // console.log(rooms);

  const handleInputChange = (event) => {
    const updatedItem = { ...book };
    updatedItem[event.target.name] = event.target.value;
    setBook(updatedItem);
  };

  const handleSelectChange = (fieldName, selectedOption) => {
    setBook({ ...book, [fieldName]: selectedOption.value });
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      dateofbooking: joi.string().min(3).required().label("Booking Date"),
      roomid: joi.optional(),
      ownerId: joi.optional(),
    });

    return schema.validate(book, options);
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
      dispatch(addBook(book))
        .unwrap()
        .then(() => navigate("/books"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  return (
    <div className="bg-light p-5 rounded center-div">
      <h4 className=" text-center fs-3">Book</h4>
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

        <SingleSelect
          label="Room"
          options={rooms.map((item) => ({
            value: item.id,
            label: item.code,
          }))}
          onChange={(selectedOption) =>
            handleSelectChange("roomid", selectedOption)
          }
          error={errorsForm.ownerId}
        />

        <Input
          label="Booking Data"
          type="datetime-local"
          name="dateofbooking"
          value={book.dateofbooking}
          onChange={handleInputChange}
          error={errorsForm.dateofbooking}
        />

        <ButtonPrimary label="Book" type="submit" />
      </form>
    </div>
  );
};

export default BookAdd;
