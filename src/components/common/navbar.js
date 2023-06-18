import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  // const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const { isLoggedIn } = useSelector((state) => state.auth);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const links = [
    { label: "register", path: "/register" },
    { label: "units", path: "/units" },
    { label: "rooms", path: "/rooms" },
    { label: "services", path: "/services" },
    { label: "books", path: "/books" },
    { label: "cars", path: "/cars" },
  ];

  // const nestedLinks = [
  //   { label: "owners", path: "/owners" },
  //   { label: "guests", path: "/guests" },
  //   { label: "employees", path: "/employees" },
  // ];

  // const renderedNestedLinks = nestedLinks.map((link, index) => (
  //   <li className="nav-item text-capitalize" key={index}>
  //     <NavLink className="nav-link" to={link.path}>
  //       {link.label}
  //     </NavLink>
  //   </li>
  // ));

  const renderLinks = links.map((link, index) => (
    <li className="nav-item text-capitalize" key={index}>
      <NavLink className="nav-link" to={link.path}>
        {link.label}
      </NavLink>
    </li>
  ));

  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Crystal Resort
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    to="users"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Users
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/employees">
                        Employees
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/owners">
                        Owners
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/guests">
                        Guests
                      </NavLink>
                    </li>
                  </ul>
                </li>
                {renderLinks}
                <li className="nav-item text-capitalize">
                  <button
                    className="nav-link text-danger"
                    onClick={() => dispatch(logout())}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              ""
              // <li className="nav-item text-capitalize">
              //   <button
              //     className="nav-link text-danger"
              //     onClick={() => navigate("login")}
              //   >
              //     Log In
              //   </button>
              // </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
