import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  console.log('auth', auth);

  const nav = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      data: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    nav("/");
  };

  // Search
  const [searchItem, setSearchItem] = useState("");

  const handleSearch = () => {
    const encodedItem = encodeURIComponent(searchItem);
    nav(`/searchpage/${encodedItem}`);
    setSearchItem("");
  };


  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-warning">
        <a class="navbar-brand" href="#" style={{ flexGrow: 1 }}>
          CRUD
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            {auth?.data ? (
              <>
              <li class="nav-item active">
              <Link class="nav-link" to="/product">
                Product <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/adddata">
                Add Product
              </Link>
            </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Welcome {auth?.data?.first_name}
                  </a>
                  <div class="dropdown-menu">
                  <Link class="dropdown-item" to="/profile">
                      Profile
                    </Link>
                    <Link onClick={handleLogout} class="dropdown-item" href="#">
                      Logout
                    </Link>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/">
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          {auth?.data ? (
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                placeholder="Search"
                aria-label="Search"
                name="search"
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                margin="0"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button class="btn btn-success my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default Header;
