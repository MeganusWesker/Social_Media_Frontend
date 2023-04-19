import { createReducer } from "@reduxjs/toolkit";

export const webrtcReducer=createReducer({

    peerConnection:null,
    localMediaStream:null,


},(builder)=>{

    // getPeerConncetionAndLocalMedia function

    builder.addCase("getPeerConncetionAndLocalMediaRequest",(state)=>{
        state.getPeerConncetionAndLocalMediaLoading=true;
    });

    builder.addCase("getPeerConncetionAndLocalMediaSuccess",(state,action)=>{
        state.getPeerConncetionAndLocalMediaLoading=false;
        state.localMediaStream=action.payload.localMediaStream;
        state.peerConnection=action.payload.peerConnection;
    });

    builder.addCase("getPeerConncetionAndLocalMediaFail",(state,action)=>{
        state.getPeerConncetionAndLocalMediaLoading=false;
        state.error=action.payload;
    });


     
    

         //clearing functions

         builder.addCase("clearMessage",(state)=>{
            state.message=null;
        });
    
        builder.addCase("clearError",(state)=>{
            state.error=null;
        });


});