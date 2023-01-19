import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Navbar/Navbar.css";
import imglogonavbar from "../../img/logonavbar.png";

const Navbar = () => {
  const name = localStorage.getItem("name");
  const renderLoginLogout = () => {
    if (localStorage.getItem("token") || localStorage.getItem("Email")) {
      const handleLogout = () => {
        axios({
          method: "get",
          url: `${BASE_URL}/api/v1/logout`,
          headers: {
            apiKey: `${API_KEY}`,
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        })
          .then((response) => {
            console.log(response);
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            window.location.href = "/";
          })
          .catch((error) => {
            console.error(error);
          });
      };
      return (
        <>
          <div className="box-nav d-flex justify-content-end">
            <div className="d-flex">
            <li className="nav-item ">
                <Link
                  to=""
                  className="nav-link "
                  style={{ color: "#fff" }}
                >
                  Gallery
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  to="/my-favorite"
                  className="nav-link "
                  style={{ color: "#fff" }}
                >
                  My Favorite
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  to=""
                  className="nav-link "
                  style={{ color: "#fff" }}
                >
                  Contact Us
                </Link>
              </li>
              {localStorage.getItem("role") === "admin" ? (
                <li className="nav-item ">
                  <Link to="/foods" className="nav-link" style={{ color: "#fff" }}>
                    Foods
                  </Link>
                </li>
              ) : null}
            </div>

            <div
              className="btn-group"
            >
              <button
                type="button"
                className="btn dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {name}
              </button>
              <ul className="dropdown-menu ">
                <li>
                  <Link
                    to="/profile-user"
                    className="nav-link btn-profile"
                    style={{ color: "#000" }}
                  >
                    My Profile
                  </Link>
                </li>
                {localStorage.getItem("role") === "admin" ? (
                  <li>
                    <Link
                      to="/all-users"
                      className="nav-link btn-profile"
                      style={{ color: "#000" }}
                    >
                      All Users
                    </Link>
                  </li>
                ) : null}
                <li className="nav-item">
                  <Link
                    className="nav-link btn-profile"
                    href="/"
                    onClick={handleLogout}
                    style={{ color: "#000", paddingLeft: "10px" }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      );
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/Form" style={{ color: "#fff" }}>
          Login
        </a>
      </li>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-container">
        <div className="container-fluid">
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

          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <img className="img-fluid" src={imglogonavbar} alt="logonavbar" />
              <li className="nav-item ">
              
                <Link to="/home" className="nav-link" style={{ color: "#fff" }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">{renderLoginLogout()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
