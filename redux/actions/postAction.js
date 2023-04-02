import axios from "axios";
import { server } from "../store";

export const addPost = (formData) => async (dipatch) => {

   

    try {

        dipatch({
            type: "addPostRequest",
        });

      
        const { data } = await axios.post(`${server}/post/upload`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
          withCredentials: true,
        });

       

        dipatch({
            type: "addPostSuccess",
            payload: data.message,
        });

       


    } catch (error) {
        dipatch({
            type: "addPostFail",
            payload: error.response.data.message,
        });
    }
}


export const addVideoPost = (formData) => async (dipatch) => {

   

    try {

        dipatch({
            type: "addVideoPostRequest",
        });

      
        const { data } = await axios.post(`${server}/video/new`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
          withCredentials: true,
        });

       
        dipatch({
            type: "addVideoPostSuccess",
            payload: data.message,
        });

       


    } catch (error) {
        dipatch({
            type: "addVideoPostFail",
            payload: error.response.data.message,
        });
    }
}

export const getPostsOfFollowing = () => async (dipatch) => {

    

    try {

        dipatch({
            type: "getPostOfFollowingRequest",
        });


        const { data } = await axios.get(`${server}/posts`, {
          withCredentials: true,
        });

       

 
        dipatch({
            type: "getPostOfFollowingSuccess",
            payload: data.posts,
        });

    } catch (error) {
        dipatch({
            type: "getPostOfFollowingFail",
            payload: error.response.data.message,
        });
    }
}

export const likeAndUnlikePost = (id) => async (dipatch) => {

    
    try {

        dipatch({
            type: "likeUnlikePostRequest",
        });


        const { data } = await axios.get(`${server}/post/${id}`, {
          withCredentials: true,
        });

       
        dipatch({
            type: "likeUnlikePostSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "likeUnlikePostFail",
            payload: error.response.data.message,
        });
    }
}