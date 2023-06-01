import React from "react";
import CarList from "./car/carList";
import GuestList from "./guest/guestList";
import OwnerList from "./owner/ownerList";

const Home = () => {
  return (
    <div>
      <CarList />
      <GuestList />
      <OwnerList />
    </div>
  );
};

export default Home;
