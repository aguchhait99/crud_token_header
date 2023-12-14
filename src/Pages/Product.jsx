import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import { listData, removeData } from "../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Product = () => {
  const [list, setList] = useState([]);
  const [auth] = useAuth();
  const nav = useNavigate();

  const getList = async () => {
    const response = await listData(
      {
        page: 1,
        perpage: 10,
      },
      {
        headers: {
          "x-access-token": auth.token,
        },
      }
    );
    console.log("data", response);
    setList(response?.data?.data);
  };

  const deteteData = async (id) => {
    const res = await removeData(
      { id },
      {
        headers: {
          "x-access-token": auth.token,
        },
      }
    );
    console.log("id", id);
    console.log("d_res", res);
    if (res && res?.data?.status == 200) {
      getList();
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message);
    }
  };

  useEffect(() => {
    getList();
  }, [auth?.token]);

  return (
    <>
      <Layout title={"Product"}>
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
                <th scope="col">Update/ Delete</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, key) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{key+1}</th>
                      <td><Link to={`/details/${item._id}`} style={{textDecoration: 'none', color: 'black'}}>{item?.title}</Link></td>
                      <td>{item?.description}</td>
                      <td><img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${item?.image}`} alt="" height={100} /></td>
                      <td><button
                        class="btn btn-danger"
                        onClick={() => {
                          deteteData(item._id);
                        }}
                      >
                        Delete
                      </button>
                      <button class="btn btn-info" onClick={()=>nav(`/update/${item._id}`)}>
                        Update
                      </button></td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Product;
