import React, { useEffect, useState } from "react";
import useGetRoom from "../../hooks/use-get-room";
import StatusIndicator from "../../components/common/statusIndicator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import Input from "../../components/common/input";
import ButtonPrimary from "./../../components/common/buttons/buttonPrimary";
import { resetRoom, updateRoom } from "../../store/slices/roomSlice";

const RoomUpdate = () => {
  const { roomDetails, isLoading, error } = useGetRoom();

  const [room, setRoom] = useState({
    id: "",
    code: "",
    price: "",
    type: "",
  });

  const [errorsForm, setErrorsForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (roomDetails) {
      setRoom((room) => ({
        id: roomDetails.id,
        type: roomDetails.type,
        code: roomDetails.code,
        price: roomDetails.price,
      }));
    }
  }, [roomDetails]);

  useEffect(() => {
    return () => dispatch(resetRoom());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const updatedItem = { ...room };
    updatedItem[event.target.name] = event.target.value;
    setRoom(updatedItem);
  };

  const validateFormSubmit = () => {
    const options = { abortEarly: false };

    const schema = joi.object({
      id: joi.optional(),
      code: joi.string().min(2).required().label("Code"),
      price: joi.number().min(2).required().label("Price"),
      type: joi.string().min(3).required().label("Type"),
    });

    return schema.validate(room, options);
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
      dispatch(updateRoom(room))
        .unwrap()
        .then(() => navigate("/rooms"))
        .catch((error) =>
          window.alert(
            `${error} ,The server is down. please try later to reconnect.`
          )
        );
    }
  };

  // console.log(roomDetails);
  return (
    <div className="bg-light p-5 rounded center-div">
      <StatusIndicator error={error} isLoading={isLoading}></StatusIndicator>
      <h4 className=" text-center fs-3">Add Service</h4>
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
        <ButtonPrimary label="update room " type="submit" />
      </form>
    </div>
  );
};

export default RoomUpdate;
