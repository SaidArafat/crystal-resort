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

const App = () => {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "/services", element: <ServiceList /> },
        { path: "/services/add", element: <ServiceAdd /> },
        { path: "/services/:id", element: <ServiceDetails /> },
        { path: "/services/:id/edit", element: <ServiceEdit /> },
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
