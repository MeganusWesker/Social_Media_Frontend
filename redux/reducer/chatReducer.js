import { createReducer } from "@reduxjs/toolkit";

export const chatReducer = createReducer({
    conversations: [],
    messages: [],
    newMessage: false,
}, (builder) => {

    // getMyAllConversation function

    builder.addCase("getMyAllConversationRequest", (state) => {
        state.getMyAllConversationLoading = true;
    });

    builder.addCase("getMyAllConversationSuccess", (state, action) => {
        state.getMyAllConversationLoading = false;
        state.conversations = action.payload;
    });

    builder.addCase("getMyAllConversationFail", (state, action) => {
        state.getMyAllConversationLoading = false;
        state.error = action.payload;
    });


    // getAllMessageOfConverSation single function

    builder.addCase("getAllMessageOfConverSationRequest", (state) => {
        state.getMyAllConversationLoading = true;
        state.iSMessageDone = false;
    });

    builder.addCase("getAllMessageOfConverSationSuccess", (state, action) => {
        state.getMyAllConversationLoading = false;
        state.iSMessageDone = true;
        state.messages = action.payload;
    });

    builder.addCase("getAllMessageOfConverSationFail", (state, action) => {
        state.getMyAllConversationLoading = false;
        state.iSMessageDone = false;
        state.error = action.payload;
    });

    // sendMessage single function

    builder.addCase("sendMessageRequest", (state) => {
        state.sendMessageLoading = true;
    });

    builder.addCase("sendMessageSuccess", (state, action) => {
        state.sendMessageLoading = false;
    });

    builder.addCase("sendMessageFail", (state, action) => {
        state.sendMessageLoading = false;
        state.error = action.payload;
    });

    // sendImageMessage single function

    builder.addCase("sendImageMessageRequest", (state) => {
        state.sendMessageLoading = true;
    });

    builder.addCase("sendImageMessageSuccess", (state, action) => {
        state.sendMessageLoading = false;
    });

    builder.addCase("sendImageMessageFail", (state, action) => {
        state.sendMessageLoading = false;
        state.error = action.payload;
    });

    // getNewMessageIndication single function

    builder.addCase("getNewMessageIndicationRequest", (state) => {
        state.getNewMessageIndication = true;
    });

    builder.addCase("getNewMessageIndicationSuccess", (state, action) => {
        state.getNewMessageIndication = false;
        state.newMessage = action.payload;
        state.newMessageToggled = true;
    });

    builder.addCase("getNewMessageIndicationFail", (state, action) => {
        state.getNewMessageIndication = false;
        state.error = action.payload;
    });

    // toggleMessageInConversation function

    builder.addCase("toggleMessageInConversationRequest", (state) => {
        state.getMyAllConversationLoading = true;
    });

    builder.addCase("toggleMessageInConversationSuccess", (state, action) => {
        state.getMyAllConversationLoading = false;

    });

    builder.addCase("toggleMessageInConversationFail", (state, action) => {
        state.getMyAllConversationLoading = false;
        state.error = action.payload;
    });


    // createConverSation function

    builder.addCase("createConverSationRequest", (state) => {
        state.createConverSationLoading = true;
    });

    builder.addCase("createConverSationSuccess", (state, action) => {
        state.createConverSationLoading = false;
        state.message=action.payload
    });

    builder.addCase("createConverSationFail", (state, action) => {
        state.createConverSationLoading = false;
        state.error = action.payload;
    });

    //clearing functions

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });

    builder.addCase("clearError", (state) => {
        state.error = null;
    });


});