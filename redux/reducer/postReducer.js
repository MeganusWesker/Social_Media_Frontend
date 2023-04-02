import { createReducer } from "@reduxjs/toolkit";

export const postReducer=createReducer({
    posts:[],
},(builder)=>{

    // addPost function

    builder.addCase("addPostRequest",(state)=>{
        state.addPostLoading=true;
    });

    builder.addCase("addPostSuccess",(state,action)=>{
        state.addPostLoading=false;
        state.message=action.payload;
    });

    builder.addCase("addPostFail",(state,action)=>{
        state.addPostLoading=false;
        state.error=action.payload;
    });

     // addVideoPost function

     builder.addCase("addVideoPostRequest",(state)=>{
        state.addPostLoading=true;
    });

    builder.addCase("addVideoPostSuccess",(state,action)=>{
        state.addPostLoading=false;
        state.message=action.payload;
    });

    builder.addCase("addVideoPostFail",(state,action)=>{
        state.addPostLoading=false;
        state.error=action.payload;
    });


        // getPostOfFollowing function

        builder.addCase("getPostOfFollowingRequest",(state)=>{
            state.loading=true;
        });
    
        builder.addCase("getPostOfFollowingSuccess",(state,action)=>{
            state.loading=false;
            state.posts=action.payload;
        });
    
        builder.addCase("getPostOfFollowingFail",(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

           // likeUnlikePost function

        builder.addCase("likeUnlikePostRequest",(state)=>{
            state.likeUnlikePostLoading=true;
        });
    
        builder.addCase("likeUnlikePostSuccess",(state,action)=>{
            state.likeUnlikePostLoading=false;
            state.message=action.payload;
        });
    
        builder.addCase("likeUnlikePostFail",(state,action)=>{
            state.likeUnlikePostLoading=false;
            state.error=action.payload;
        });

       //clearing functions

       builder.addCase("clearMessage",(state)=>{
        state.message=null;
    });

    builder.addCase("clearError",(state)=>{
        state.error=null;
    });

    builder.addCase("CleanState",(state)=>{
        state.posts=[];
    });

});   