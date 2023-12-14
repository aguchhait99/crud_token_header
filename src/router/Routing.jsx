import React, { Profiler } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../authentication/Register";
import Login from "../authentication/Login";
import AddData from "../components/AddData";
import Product from "../Pages/Product";
import Update from "../Pages/Update";
import Details from "../Pages/Details";
import Profile from "../Pages/Profile";
import SearchPage from "../Pages/SearchPage";

const Routing = () => {
  function ProtectedRoute({ children }) {
    const token =
      localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/" />
    );
  }

  // Public Route

  const PublicRoute = [
    {
      path: "/",
      component: <Login />,
    },
    {
      path: "/register",
      component: <Register />,
    },
    
  ];

  // Private Route

  const PrivateRoute = [
    {
      path: "/Profile",
      component: <Profile />,
    },
    {
      path: "/adddata",
      component: <AddData />,
    },
    {
      path: "/product",
      component: <Product />,
    },
    {
      path: "/product",
      component: <Product />,
    },
    {
      path: "/update/:id",
      component: <Update />,
    },
    {
      path: "/details/:id",
      component: <Details />,
    },
    {
      path: "/searchpage/:encodedItem",
      component: <SearchPage />,
    },
  ];
  return (
    <>
      <Routes>
        {PublicRoute?.map((route, key) => {
          return (
            <>
              <Route
                key={key + 1}
                path={route.path}
                element={route.component}
              />
            </>
          );
        })}
        {PrivateRoute?.map((route, key) => {
          return (
            <>
                <Route
                  key={key + 1}
                  path={route.path}
                  element={<ProtectedRoute>{route.component}</ProtectedRoute>}
                />
            </>
          );
        })}
      </Routes>
    </>
  );
};

export default Routing;
