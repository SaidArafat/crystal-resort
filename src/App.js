import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./components/notFound";
import RootLayout from "./layouts/rootLayout";
import ServiceList from "./pages/service/serviceList";
import ServiceAdd from "./pages/service/serviceAdd";
import ServiceEdit from "./pages/service/serviceEdit";
import ServiceDetails from "./pages/service/serviceDetails";
import CarList from "./pages/car/carList";
import CarAdd from "./pages/car/carAdd";
import CarDetails from "./pages/car/carDetails";
import CarUpdate from "./pages/car/carUpdate";
import OwnerList from "./pages/owner/ownerList";
import OwnerAdd from "./pages/owner/ownerAdd";
import OwnerDetails from "./pages/owner/ownerDetails";
import OwnerUpdate from "./pages/owner/ownerUpdate";
import GuestList from "./pages/guest/guestList";
import GuestAdd from "./pages/guest/guestAdd";
import GuestUpdate from "./pages/guest/guestUpdate";
import GuestDetails from "./pages/guest/guestDetails";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import RoomList from "./pages/room/roomList";
import RoomAdd from "./pages/room/roomAdd";
import RoomDetails from "./pages/room/roomDetails";
import RoomUpdate from "./pages/room/roomUpdate";
import BookDetails from "./pages/book/bookDetails";
import BookUpdate from "./pages/book/bookUpdate";
import BookList from "./pages/book/bookList";
import BookAdd from "./pages/book/bookAdd";
import UnitList from "./pages/unit/unitList";
import UnitAdd from "./pages/unit/unitAdd";
import UnitDetails from "./pages/unit/unitDetails";
import UnitUpdate from "./pages/unit/unitUpdate";

const App = () => {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/units", element: <UnitList /> },
        { path: "/units/add", element: <UnitAdd /> },
        { path: "/units/:id", element: <UnitDetails /> },
        { path: "/units/:id/update", element: <UnitUpdate /> },
        { path: "/books", element: <BookList /> },
        { path: "/books/add", element: <BookAdd /> },
        { path: "/books/:id", element: <BookDetails /> },
        { path: "/books/:id/update", element: <BookUpdate /> },
        { path: "/rooms", element: <RoomList /> },
        { path: "/rooms/add", element: <RoomAdd /> },
        { path: "/rooms/:id", element: <RoomDetails /> },
        { path: "/rooms/:id/update", element: <RoomUpdate /> },
        { path: "/services", element: <ServiceList /> },
        { path: "/services/add", element: <ServiceAdd /> },
        { path: "/services/:id", element: <ServiceDetails /> },
        { path: "/services/:id/update", element: <ServiceEdit /> },
        { path: "/cars", element: <CarList /> },
        { path: "/cars/add", element: <CarAdd /> },
        { path: "/cars/:id", element: <CarDetails /> },
        { path: "/cars/:id/update", element: <CarUpdate /> },
        { path: "/owners", element: <OwnerList /> },
        { path: "/owners/add", element: <OwnerAdd /> },
        { path: "/owners/:id", element: <OwnerDetails /> },
        { path: "/owners/:id/update", element: <OwnerUpdate /> },
        { path: "/guests", element: <GuestList /> },
        { path: "/guests/add", element: <GuestAdd /> },
        { path: "/guests/:id", element: <GuestDetails /> },
        { path: "/guests/:id/update", element: <GuestUpdate /> },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
};

export default App;
