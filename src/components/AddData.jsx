import React, { useState } from 'react'
import Layout from '../layout/Layout'
import toast from 'react-hot-toast';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { createData } from '../services/Api';

const AddData = () => {

  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [auth] = useAuth();
  const nav = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", product.title);
    formDataToSend.append("description", product.description);
    formDataToSend.append("image", product.image);

    const response = await createData(formDataToSend, {
      headers: {
        "x-access-token": auth.token,
      },
    });

    if (response.data && response.data.status == 200) {
      console.log("reg", response?.data);
      toast.success(response.data.message);
      nav('/Product')
    } else {
      console.log("Error");
      toast.error(response?.data?.message);
    }
  };

  return (
    <>
      <Layout title={"Add Data"}>
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
          <h2 style={{ textAlign: "center" }}>Add Data</h2>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Description</label>
              <input
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Product Image</label>
              <input
                class="form-control-file"
                id="exampleFormControlFile1"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" class="btn btn-warning">
              Add Data
            </button>
          </form>
        </div>
      </Layout>
    </>
  )
}

export default AddData
