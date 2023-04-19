import { server } from "../store";
import axios from "axios";

export const login = (email, password) => async (dipatch) => {



    try {

        dipatch({
            type: "loginRequest",
        });


        const { data } = await axios.post(`${server}/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });


       

        dipatch({
            type: "loginSuccess",
            payload: data,
        });



    } catch (error) {
   
        dipatch({
            type: "loginFail",
            payload: error.response.data.message,
        });
    }
}

export const loadUser = () => async (dipatch) => {

    try {

        dipatch({
            type: "loadUserRequest",
        });

        


        const { data } = await axios.get(`${server}/me`, {
          withCredentials: true,
        });

       

        dipatch({
            type: "loadUserSuccess",
            payload: data,
        });

    
    } catch (error) {
        dipatch({
            type: "loadUserFail",
            payload: error.response.data.message,
        });
    }
}

export const logOutUser = () => async (dipatch) => {

    try {

        dipatch({
            type: "logoutUserRequest",
        });


        const { data } = await axios.get(`${server}/logout`, {
          withCredentials: true,
        });

        dipatch({
            type: "logoutUserSuccess",
            payload: data.message,
        });



    } catch (error) {
        dipatch({
            type: "logoutUserFail",
            payload: error.response.data.message,
        });
    }
}

export const register = (formData) => async (dipatch) => {

    try {

        dipatch({
            type: "registerUserRequest",
        });

      



        const { data } = await axios.post(`${server}/register`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
          withCredentials: true,
        });

        console.log(data);

       

        dipatch({
            type: "registerUserSuccess",
            payload: data.message,
        });

       


    } catch (error) {
        dipatch({
            type: "registerUserFail",
            payload: error.response.data.message,
        });
    }
}


export const forgotPassword = (email) => async (dipatch) => {

    try {

        dipatch({
            type: "forgotPasswordRequest",
        });

      
        const { data } = await axios.post(`${server}/forgot/password`, {email},{
            headers: {
                "Content-Type": "application/json",
            },
          withCredentials: true,
        });

       

        dipatch({
            type: "forgotPasswordSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "registerUserFail",
            payload: error.response.data.message,
        });
    }
}

export const resetPassword = (otp,password,confirmPassword) => async (dipatch) => {

    try {

        dipatch({
            type: "resetPasswordRequest",
        });

      
        const { data } = await axios.put(`${server}/reset/password`, {otp,password,confirmPassword},{
            headers: {
                "Content-Type": "application/json",
            },
          withCredentials: true,
        });

       

        dipatch({
            type: "resetPasswordSuccess",
            payload: data.message,
        });

    
    } catch (error) {
        dipatch({
            type: "resetPasswordFail",
            payload: error.response.data.message,
        });
    }
}


export const changePassword = (oldPassword,newPassword,confirmPassword) => async (dipatch) => {

    try {

        dipatch({
            type: "changePasswordRequest",
        });

      
        const { data } = await axios.put(`${server}/update/password`, {oldPassword,newPassword,confirmPassword},{
            headers: {
                "Content-Type": "application/json",
            },
          withCredentials: true,
        });

       
        dipatch({
            type: "changePasswordSuccess",
            payload: data.message,
        });

    
    } catch (error) {
        dipatch({
            type: "changePasswordFail",
            payload: error.response.data.message,
        });
    }
}

export const updateProfile = (formData) => async (dipatch) => {

    console.log(formData);

    try {

        dipatch({
            type: "updateProfileRequest",
        });

        
        const { data } = await axios.put(`${server}/update/profile`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
          withCredentials: true,
        });

        console.log(data);

        dipatch({
            type: "updateProfileSuccess",
            payload: data.message,
        });

    
    } catch (error) {
        dipatch({
            type: "updateProfileFail",
            payload: error.response.data.message,
        });
    }
}

export const verifyUser = (otp,email) => async (dipatch) => {

    try {

        dipatch({
            type: "verifyUserRequest",
        });

                
        const { data } = await axios.post(`${server}/verify/email`, {otp,email},{
            headers: {
                "Content-Type": "application/json",
            },
          withCredentials: true,
        });

       

        dipatch({
            type: "verifyUserSuccess",
            message: data.message,
            user:data.user,
        });

    
    } catch (error) {
        dipatch({
            type: "verifyUserFail",
            payload: error.response.data.message,
        });
    }
}


export const getAllSearchedUsers = (keyword) => async (dipatch) => {

    try {

        keyword=keyword || "";



        dipatch({
            type: "getAllSearchedUsersRequest",
        });


        const { data } = await axios.get(`${server}/users/?keyword=${keyword}`, {
          withCredentials: true,
        });

 

        dipatch({
            type: "getAllSearchedUsersSuccess",
            payload: data.users,
        });

    } catch (error) {
        dipatch({
            type: "getAllSearchedUsersFail",
            payload: error.response.data.message,
        });
    }
}


export const getUserProfile = (id) => async (dipatch) => {



    try {

        dipatch({
            type: "getUserProfileRequest",
        });


        const { data } = await axios.get(`${server}/profile/users/${id}`, {
          withCredentials: true,
        });

 

        dipatch({
            type: "getUserProfileSuccess",
            payload: data,
        });

    } catch (error) {
        dipatch({
            type: "getUserProfileFail",
            payload: error.response.data.message,
        });
    }
}

export const followUnfollowUser = (id) => async (dipatch) => {

    try {

        dipatch({
            type: "followUnfollowUserRequest",
        });


        const { data } = await axios.get(`${server}/user/${id}`, {
          withCredentials: true,
        });

 
        dipatch({
            type: "followUnfollowUserSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "followUnfollowUserFail",
            payload: error.response.data.message,
        });
    }
}

export const getMyAllNotifications = () => async (dipatch) => {

    try {

        dipatch({
            type: "getMyAllNotificationsRequest",
        });


        const { data } = await axios.get(`${server}/my/notifications`, {
          withCredentials: true,
        });

        dipatch({
            type: "getMyAllNotificationsSuccess",
            payload: data.myNotifications,
        });



    } catch (error) {
        dipatch({
            type: "getMyAllNotificationsFail",
            payload: error.response.data.message,
        });
    }
}

