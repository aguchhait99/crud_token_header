import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { profileData } from "../services/Api";
import Layout from "../layout/Layout";

const Profile = () => {
  const [auth] = useAuth();
  const [user, setUser] = useState([]);

  const getData = async () => {
    const response = await profileData({
      headers: {
        "x-access-token": auth.token,
      },
    });
    setUser(response?.data?.data);
    console.log("res", response?.data?.data);
  };

  useEffect(() => {
    getData();
  }, [auth.token]);

  return <>
    <Layout title={'User Profile'}>
    <div style={{ textAlign: "center" }}>
        <p>First Name: {user?.first_name}</p>
        <p>Last Name: {user?.last_name}</p>
        <p>Email: {user?.email}</p>
        <div>
          <img src={`https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${user?.profile_pic}`} alt="" height={200} style={{borderRadius: '50%'}}/>
        </div>
      </div>
    </Layout>
  </>;
};

export default Profile;
