import axios from "axios";
import { server } from "../store";

export const addPost = (formData) => async (dipatch) => {



    try {

        dipatch({
            type: "addPostRequest",
        });


        const { data } = await axios.post(`${server}/post/upload`, formData, {
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


        const { data } = await axios.post(`${server}/video/new`, formData, {
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

export const saveOrUnSavePost = (id) => async (dipatch) => {


    try {

        dipatch({
            type: "saveOrUnSavePostRequest",
        });


        const { data } = await axios.get(`${server}/post/save/${id}`, {
            withCredentials: true,
        });


        dipatch({
            type: "saveOrUnSavePostSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "saveOrUnSavePostPostFail",
            payload: error.response.data.message,
        });
    }
}

export const getSinglePost = (id) => async (dipatch) => {


    try {

        dipatch({
            type: "getSinglePostRequest",
        });


        const { data } = await axios.get(`${server}/get/post/${id}`, {
            withCredentials: true,
        });


        dipatch({
            type: "getSinglePostSuccess",
            payload: data.post,
        });

    } catch (error) {
        dipatch({
            type: "getSinglePostPostFail",
            payload: error.response.data.message,
        });
    }
}

export const updatePost = (id, caption) => async (dipatch) => {


    try {

        dipatch({
            type: "updatePostRequest",
        });


        const { data } = await axios.put(`${server}/post/${id}`, { caption }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });


        dipatch({
            type: "updatePostSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "updatePostFail",
            payload: error.response.data.message,
        });
    }
}

export const deletePost = (id) => async (dipatch) => {


    try {

        dipatch({
            type: "deletePostRequest",
        });


        const { data } = await axios.delete(`${server}/post/${id}`, {
            withCredentials: true,
        });


        dipatch({
            type: "deletePostSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "deletePostFail",
            payload: error.response.data.message,
        });
    }
}

export const commentOnPost = (postId, comment) => async (dipatch) => {


    try {

        dipatch({
            type: "commentOnPostRequest",
        });


        const { data } = await axios.post(`${server}/post/comment/${postId}`, { comment }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });


        dipatch({
            type: "commentOnPostSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "commentOnPostFail",
            payload: error.response.data.message,
        });
    }
}

export const likeComment = (postId, commentId) => async (dipatch) => {


    try {

        dipatch({
            type: "likeCommentRequest",
        });


        const { data } = await axios.get(`${server}/post/comment/${postId}/${commentId}`, {

            withCredentials: true,
        });


        dipatch({
            type: "likeCommentSuccess",
            payload: data,
        });

    } catch (error) {
        dipatch({
            type: "likeCommentFail",
            payload: error.response.data.message,
        });
    }
}


export const editComment = (postId, commentId, comment) => async (dipatch) => {


    try {

        dipatch({
            type: "editCommentRequest",
        });


        const { data } = await axios.put(`${server}/post/comment/${postId}/${commentId}`, { comment }, {

            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });


        dipatch({
            type: "editCommentSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "editCommentFail",
            payload: error.response.data.message,
        });
    }
}

export const deleteComment = (postId, commentId) => async (dipatch) => {


    try {

        dipatch({
            type: "deleteCommentRequest",
        });


        const { data } = await axios.delete(`${server}/post/comment/${postId}/${commentId}`, {


            withCredentials: true,
        });


        dipatch({
            type: "deleteCommentSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "deleteCommentFail",
            payload: error.response.data.message,
        });
    }
}

export const replyToComment = (postId, commentId, comment) => async (dipatch) => {


    try {

        dipatch({
            type: "replyToCommentRequest",
        });


        const { data } = await axios.post(`${server}/post/comment/${postId}/${commentId}`, { comment }, {

            headers: {
                "Content-Type": "application/json",
            },

            withCredentials: true,
        });


        dipatch({
            type: "replyToCommentSuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "replyToCommentFail",
            payload: error.response.data.message,
        });
    }
}

export const likeReply = (postId, commentId, replyId) => async (dipatch) => {


    try {

        dipatch({
            type: "likeReplyRequest",
        });


        const { data } = await axios.get(`${server}/post/comment/${postId}/${commentId}/${replyId}`, {

            withCredentials: true,
        });


        dipatch({
            type: "likeReplySuccess",
            payload: data,
        });

    } catch (error) {
        dipatch({
            type: "likeReplyFail",
            payload: error.response.data.message,
        });
    }
}

export const  editReply= (postId, commentId, replyId, comment) => async (dipatch) => {


    try {

        dipatch({
            type: "editReplyRequest",
        });


        const { data } = await axios.put(`${server}/post/comment/${postId}/${commentId}/${replyId}`, { comment }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });


        dipatch({
            type: "editReplySuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "editReplyFail",
            payload: error.response.data.message,
        });
    }
}

export const deleteReply = (postId, commentId, replyId) => async (dipatch) => {


    try {

        dipatch({
            type: "deleteReplyRequest",
        });


        const { data } = await axios.delete(`${server}/post/comment/${postId}/${commentId}/${replyId}`, {

            withCredentials: true,
        });


        dipatch({
            type: "deleteReplySuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "deleteReplyFail",
            payload: error.response.data.message,
        });
    }
}

export const sendReplyToReply = (postId, commentId, replyId, comment) => async (dipatch) => {


    try {

        dipatch({
            type: "sendReplyToReplyRequest",
        });


        const { data } = await axios.post(`${server}/post/comment/${postId}/${commentId}/${replyId}`, { comment }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });


        dipatch({
            type: "sendReplyToReplySuccess",
            payload: data.message,
        });

    } catch (error) {
        dipatch({
            type: "sendReplyToReplyFail",
            payload: error.response.data.message,
        });
    }
}


export const toggleNotification = () => async (dipatch) => {

    try {

        dipatch({
            type: "toggleNotificationRequest",
        });


         await axios.get(`${server}/notifications`, {
            withCredentials: true,
        });


        dipatch({
            type: "toggleNotificationSuccess",
        });

    } catch (error) {
        dipatch({
            type: "toggleNotificationFail",
            payload: error.response.data.message,
        });
    }
}