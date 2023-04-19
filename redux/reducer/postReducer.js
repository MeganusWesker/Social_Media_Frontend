import { createReducer } from "@reduxjs/toolkit";

export const postReducer = createReducer({
    posts: [],
    post: {},
}, (builder) => {

    // addPost function

    builder.addCase("addPostRequest", (state) => {
        state.addPostLoading = true;
    });

    builder.addCase("addPostSuccess", (state, action) => {
        state.addPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("addPostFail", (state, action) => {
        state.addPostLoading = false;
        state.error = action.payload;
    });

    // addVideoPost function

    builder.addCase("addVideoPostRequest", (state) => {
        state.addPostLoading = true;
    });

    builder.addCase("addVideoPostSuccess", (state, action) => {
        state.addPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("addVideoPostFail", (state, action) => {
        state.addPostLoading = false;
        state.error = action.payload;
    });


    // getPostOfFollowing function

    builder.addCase("getPostOfFollowingRequest", (state) => {
        state.loading = true;
    });

    builder.addCase("getPostOfFollowingSuccess", (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    });

    builder.addCase("getPostOfFollowingFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });

    // likeUnlikePost function

    builder.addCase("likeUnlikePostRequest", (state) => {
        state.likeUnlikePostLoading = true;
    });

    builder.addCase("likeUnlikePostSuccess", (state, action) => {
        state.likeUnlikePostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("likeUnlikePostFail", (state, action) => {
        state.likeUnlikePostLoading = false;
        state.error = action.payload;
    });

    // saveOrUnSavePost function

    builder.addCase("saveOrUnSavePostRequest", (state) => {
        state.likeUnlikePostLoading = true;
    });

    builder.addCase("saveOrUnSavePostSuccess", (state, action) => {
        state.likeUnlikePostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("saveOrUnSavePostPostFail", (state, action) => {
        state.likeUnlikePostLoading = false;
        state.error = action.payload;
    });


    // getSinglePost function

    builder.addCase("getSinglePostRequest", (state) => {
        state.getSinglePostLoading = true;
        state.getPostDone = false;
    });

    builder.addCase("getSinglePostSuccess", (state, action) => {
        state.getSinglePostLoading = false;
        state.getPostDone = true;
        state.post = action.payload;
    });

    builder.addCase("getSinglePostPostFail", (state, action) => {
        state.getSinglePostLoading = false;
        state.error = action.payload;
    });

    // updatePost function

    builder.addCase("updatePostRequest", (state) => {
        state.addPostLoading = true;
    });

    builder.addCase("updatePostSuccess", (state, action) => {
        state.addPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("updatePostFail", (state, action) => {
        state.addPostLoading = false;
        state.error = action.payload;
    });

    // deletePost function

    builder.addCase("deletePostRequest", (state) => {
        state.addPostLoading = true;
    });

    builder.addCase("deletePostSuccess", (state, action) => {
        state.addPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("deletePostFail", (state, action) => {
        state.addPostLoading = false;
        state.error = action.payload;
    });

    //  commentOnPostfunction

    builder.addCase("commentOnPostRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("commentOnPostSuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("commentOnPostFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });

    //  likeCommentfunction

    builder.addCase("likeCommentRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("likeCommentSuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload.message;
        state.isLiked = action.payload.likedComment;
    });

    builder.addCase("likeCommentFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });

    //  editCommentfunction

    builder.addCase("editCommentRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("editCommentSuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("editCommentFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });

    //  deleteCommentfunction

    builder.addCase("deleteCommentRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("deleteCommentSuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("deleteCommentFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });


    //  replyToCommentfunction

    builder.addCase("replyToCommentRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("replyToCommentSuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("replyToCommentFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });

    //  likeReplyfunction

    builder.addCase("likeReplyRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("likeReplySuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload.message;
        state.isLiked = action.payload.likedReply
    });

    builder.addCase("likeReplyFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });

    //  deleteReplyfunction

    builder.addCase("deleteReplyRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("deleteReplySuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("deleteReplyFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });

    //  sendReplyToReplyfunction

    builder.addCase("sendReplyToReplyRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("sendReplyToReplySuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("sendReplyToReplyFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });

    //  editReplyfunction

    builder.addCase("editReplyRequest", (state) => {
        state.commentOnPostLoading = true;
    });

    builder.addCase("editReplySuccess", (state, action) => {
        state.commentOnPostLoading = false;
        state.message = action.payload;
    });

    builder.addCase("editReplyFail", (state, action) => {
        state.commentOnPostLoading = false;
        state.error = action.payload;
    });

    //  toggleNotificationfunction

    builder.addCase("toggleNotificationRequest", (state) => {
        state.toggleNotificationLoading = true;
    });

    builder.addCase("toggleNotificationSuccess", (state, action) => {
        state.toggleNotificationLoading = false;
    });

    builder.addCase("toggleNotificationFail", (state, action) => {
        state.toggleNotificationLoading = false;
        state.error = action.payload;
    });
    //clearing functions

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });

    builder.addCase("clearError", (state) => {
        state.error = null;
    });

    builder.addCase("CleanState", (state) => {
        state.posts = [];
    });

});   