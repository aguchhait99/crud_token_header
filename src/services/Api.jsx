import { axiosInstance } from "./AxiosInstance";

// register 

export const registerData = async(data)=>{
    try{
        return await axiosInstance.post(`api/user/signup`, data)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// Signin

export const signinData = async(data)=>{
    try{
        return await axiosInstance.post(`api/user/signin`, data)
    }catch(error){
        console.log('Error while fetching the signin api data.');
    }
}

// Profile

export const profileData = async (headers)=>{
    try{
        return await axiosInstance.get(`api/user/profile-details`, headers)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// Create Data

export const createData = async (data, headers)=>{
    try{
        return await axiosInstance.post(`api/product/create`, data, headers)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// List Data

export const listData = async (data, headers)=>{
    try{
        return await axiosInstance.post(`api/product/list`, data, headers)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// Remove data

export const removeData = async(id, headers)=>{
    try{
        return await axiosInstance.post(`api/product/remove`, id, headers)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// Details Data 

export const detailsData = async(id, headers)=>{
    try{
        return await axiosInstance.get(`api/product/detail/${id}`, headers)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

// Update

export const updateData = async (data, headers)=>{
    try{
        return await axiosInstance.post (`api/product/update`, data, headers)
    }catch(error){
        console.log('Error while fetching the api data.');
    }
}

