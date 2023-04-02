import axios from "axios";
import { server } from "../store";

export const getMyAllConversation = () => async (dipatch) => {

    try {

        dipatch({
            type: "getMyAllConversationRequest",
        });

      
        const { data } = await axios.get(`${server}/conversation/all`,{
          withCredentials: true,
        });

       

        dipatch({
            type: "getMyAllConversationSuccess",
            payload: data.conversations,
        });


    } catch (error) {
        dipatch({
            type: "getMyAllConversationFail",
            payload: error.response.data.message,
        });
    }
}

export const getAllMessageOfConverSation = (id) => async (dipatch) => {

    try {

        dipatch({
            type: "getAllMessageOfConverSationRequest",
        });

      
        const { data } = await axios.get(`${server}/message/all?conversationId=${id}`,{
          withCredentials: true,
        });

    
        dipatch({
            type: "getAllMessageOfConverSationSuccess",
            payload: data.messages,
        });


    } catch (error) {
        dipatch({
            type: "getAllMessageOfConverSationFail",
            payload: error.response.data.message,
        });
    }
}

export const sendMessage = (conversationId,textMessage,recieverId) => async (dipatch) => {

  

    try {

        dipatch({
            type: "sendMessageRequest",
        });

      
        const { data } = await axios.post(`${server}/message/new`,{conversationId,textMessage,recieverId},{
            headers: {
                "Content-Type": "application/json",
            },
          withCredentials: true,
        });

       

    
        dipatch({
            type: "sendMessageSuccess",
        });


    } catch (error) {
        dipatch({
            type: "sendMessageFail",
            payload: error.response.data.message,
        });
    }
}


export const sendImageMessage = (formData) => async (dipatch) => {




    try {

        dipatch({
            type: "sendImageMessageRequest",
        });

      
        const { data } = await axios.post(`${server}/imageMessage/new`,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },

          withCredentials: true,
        });

      
    
    
        dipatch({
            type: "sendImageMessageSuccess",
        });


    } catch (error) {
        dipatch({
            type: "sendImageMessageFail",
            payload: error.response.data.message,
        });
    }
}


export const getNewMessageIndication= () => async (dipatch) => {

    try {

        dipatch({
            type: "getNewMessageIndicationRequest",
        });

      
        const { data } = await axios.get(`${server}/toggle/newMessage`,{
          withCredentials: true,
        });

    
        dipatch({
            type: "getNewMessageIndicationSuccess",
            payload: data.userNewMessage,
        });


    } catch (error) {
        dipatch({
            type: "getNewMessageIndicationFail",
            payload: error.response.data.message,
        });
    }
}

export const toggleMessageInConversation= (conversationId) => async (dipatch) => {

    try {

        dipatch({
            type: "toggleMessageInConversationRequest",
        });

      
        const { data } = await axios.put(`${server}/toggle/conversation/messages/${conversationId}`,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
          withCredentials: true,
        });

    
        dipatch({
            type: "toggleMessageInConversationSuccess",
        });


    } catch (error) {
        dipatch({
            type: "toggleMessageInConversationFail",
            payload: error.response.data.message,
        });
    }
}

