import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { detailsData, updateData } from '../services/Api';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import Layout from '../layout/Layout';

const initialState = {
    id: {},
    title: "",
    description: "",
    image: null,
  }

const Update = () => {

    const {id} = useParams()        
    const [product, setProduct] = useState(initialState);
      
      const [auth] = useAuth();
      const nav = useNavigate()
    console.log('id', product.id);
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

      const getData = async ()=>{
        const response = await detailsData(id, {
            headers: {
                "x-access-token": auth.token,
            }
        })
        setProduct(response?.data?.data)
        console.log('data', response?.data?.data);
    }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("id", id);
        formDataToSend.append("title", product.title);
        formDataToSend.append("description", product.description);
        formDataToSend.append("image", product.image);
    
        const response = await updateData( formDataToSend, {
          headers: {
            "x-access-token": auth.token,
          },
        });
    
        if (response.data && response.data.status == 200) {
          console.log("reg", response?.data);
          toast.success(response.data.message);
          nav('/product')
        } else {
          console.log("Error");
          toast.error(response?.data?.message);
        }
      };

      useEffect(()=>{
      getData()
      },[auth.token])

  return (
    <>
      <Layout title={'Update Data'}>
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
          <h2 style={{ textAlign: "center" }}>Update Data</h2>
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
              Update Data
            </button>
          </form>
        </div>
      </Layout>
    </>
  )
}

export default Update
