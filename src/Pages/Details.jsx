import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useParams } from "react-router-dom";
import { detailsData } from "../services/Api";
import Layout from "../layout/Layout";

const Details = () => {
  const [product, setProduct] = useState([]);
  const [auth] = useAuth();
  const { id } = useParams();
  console.log("id_details", id);

  const getData = async () => {
    const response = await detailsData(id, {
      headers: {
        "x-access-token": auth.token,
      },
    });
    setProduct(response?.data?.data);
    console.log("data", response?.data?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Layout title={"Product Details"}>
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
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{product._id}</th>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>
                  <img
                    src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${product?.image}`}
                    alt=""
                    height={100}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Details;
