import React, { useState } from "react";
import Layout from "../layout/Layout";
import { registerData } from "../services/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const nav = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_pic: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profile_pic", formData.profile_pic);

    const response = await registerData(formDataToSend);

    if (response.data && response.data.status == 200) {
      console.log("reg", response?.data);
      toast.success(response.data.message);
      const token = response?.data?.token;
      console.log("token", token);
      nav("/");
    } else {
      console.log("Error");
      toast.error(response?.data?.message);
    }
  };

  return (
    <>
      <Layout title={"SignUp"}>
        <div
          class="container-sm"
          style={{
            marginTop: "50px",
            marginBottom: "50px",
            boxShadow: "0px 0px 30px rgba(0,0,0,0.3)",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Signup Form</h2>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">First Name</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Last Name</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Profile Picture</label>
              <input
                type="file"
                class="form-control-file"
                name="profile_pic"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" class="btn btn-warning">
              Signup
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
