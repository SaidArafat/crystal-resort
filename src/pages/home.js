import React from "react";
import CarList from "./car/carList";
import GuestList from "./guest/guestList";
import OwnerList from "./owner/ownerList";
import UnitList from "./unit/unitList";
import RoomList from "./room/roomList";

const Home = () => {
  return (
    <div>
      <RoomList />
      <GuestList />
      <UnitList />
      <OwnerList />
      <CarList />
    </div>
  );
};

export default Home;
