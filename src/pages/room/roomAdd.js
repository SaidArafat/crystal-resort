import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { addRoom } from "../../store/slices/roomSlice";

const RoomAdd = () => {
  const [room, setRoom] = useState({
    code: "",
    price: "",
    type: "",
    imageform: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const updatedItem = { ...room };
    updatedItem[event.target.name] = event.target.value;
    setRoom(updatedItem);
  };

  const handleImageChange = (event) => {
    const newRoom = { ...room };
    newRoom[event.target.name] = event.target.files[0];
    setRoom(newRoom);
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      code: joi.string().min(2).required().label("Code"),
      price: joi.number().min(2).required().label("Price"),
      type: joi.string().min(3).required().label("Type"),
      imageform: joi.any().required().label("Image"),
    });

    return schema.validate(room, options);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    Object.keys(room).forEach((key) => {
      formData.append(key, room[key]);
    });

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
      dispatch(addRoom(formData))
        .unwrap()
        .then(() => navigate("/rooms"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  return (
    <div className="bg-light p-5 rounded center-div">
      <h4 className=" text-center fs-3">Add Room</h4>
      <form onSubmit={handleFormSubmit}>
        <Input
          label="code"
          type="text"
          name="code"
          value={room.code}
          onChange={handleInputChange}
          error={errorsForm.code}
          focus={true}
        />
        <Input
          label="price"
          type="number"
          name="price"
          value={room.price}
          onChange={handleInputChange}
          error={errorsForm.price}
        />
        <Input
          label="type"
          type="text"
          name="type"
          value={room.type}
          onChange={handleInputChange}
          error={errorsForm.type}
        />
        <Input
          label="imageform"
          type="file"
          name="imageform"
          // value={service.imageform}
          onChange={handleImageChange}
          error={errorsForm.imageform}
        />
        <ButtonPrimary label="add room " type="submit" />
      </form>
    </div>
  );
};

export default RoomAdd;
