import React, { useState } from "react";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { signinData } from "../services/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signinData({
      email,
      password,
    });
    console.log("data", response);
    if (response && response?.data?.status == 200) {
      setAuth({
        ...auth,
        data: response.data.data,
        token: response.data.token,
      });
      toast.success(response?.data?.message);
      localStorage.setItem("auth", JSON.stringify(response.data));
      nav("/product");
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <>
      <Layout title={"Signin"}>
        <div
          className="container-sm"
          style={{
            marginTop: "50px",
            marginBottom: "50px",
            boxShadow: "0px 0px 30px rgba(0,0,0,0.3)",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Signin Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                className="form-control"
                aria-describedby="emailHelp"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-warning">
              Signin
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
