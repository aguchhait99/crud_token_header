import React, { useEffect, useState } from 'react'
import { listData } from '../services/Api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import Layout from '../layout/Layout';

const SearchPage = () => {
    const { encodedItem } = useParams();
  const searchItem = decodeURIComponent(encodedItem);
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

  useEffect(() => {
    if (searchItem) {
        getList();
    }
  }, [auth.token]);

  const result = list?.filter((lists) => {
    const searchItemLower = searchItem?.toLowerCase();
    const titleLower = lists.title?.toLowerCase();
    const textLower = lists.description?.toLowerCase();

    return (
      titleLower?.includes(searchItemLower) ||
      textLower?.includes(searchItemLower)
    );
  });


  return (
    <>
      <Layout title={'Search Page'}>
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
              {result?.map((item, key) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{item._id}</th>
                      <td><Link to={`/details/${item._id}`} style={{textDecoration: 'none', color: 'black'}}>{item?.title}</Link></td>
                      <td>{item?.description}</td>
                      <td><img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${item?.image}`} alt="" height={100} /></td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  )
}

export default SearchPage
