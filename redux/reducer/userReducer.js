import {createReducer} from "@reduxjs/toolkit";

export const userReducer=createReducer({
    searchedUsers:[],
    myNotifications:[],
    searchedUser:{},
    user:{},
    isAuthenticated:false,
},(builder)=>{

    // login function

    builder.addCase("loginRequest",(state)=>{
        state.loading=true;
        state.isAuthenticated=false;
    });

    builder.addCase("loginSuccess",(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.message=action.payload.message;
        state.user=action.payload.user;
    });

    builder.addCase("loginFail",(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error=action.payload;
    });

  
   // loadUser function
        builder.addCase("loadUserRequest",(state)=>{
            state.loading=true;
            state.isAuthenticated=false;
        });
    
        builder.addCase("loadUserSuccess",(state,action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.totalLikes=action.payload.totalLikes;
        });
    
        builder.addCase("loadUserFail",(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.error=action.payload;
        });



     // logoutUser function

     builder.addCase("logoutUserRequest",(state)=>{
        state.loading=true;
    });

    builder.addCase("logoutUserSuccess",(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.message=action.payload;
    });

    builder.addCase("logoutUserFail",(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    });

      // register function

    builder.addCase("registerUserRequest",(state)=>{
        state.registerLoading=true;
        state.isAuthenticated=false;
    });

    builder.addCase("registerUserSuccess",(state,action)=>{
        state.registerLoading=false;
        state.isAuthenticated=false;
        state.message=action.payload;
    });

    builder.addCase("registerUserFail",(state,action)=>{
        state.registerLoading=false;
        state.error=action.payload;
    });

    // verifyUser


    builder.addCase("verifyUserRequest",(state)=>{
        state.loading=true;
        state.isAuthenticated=false;
    });

    builder.addCase("verifyUserSuccess",(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.message=action.message;
        state.user=action.user;
    });

    builder.addCase("verifyUserFail",(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error=action.payload;
    });

         // forgotPassword function

         builder.addCase("forgotPasswordRequest",(state)=>{
            state.loading=true;
            state.isAuthenticated=false;
        });
    
        builder.addCase("forgotPasswordSuccess",(state,action)=>{
            state.loading=false;
            state.message=action.payload;
        });
    
        builder.addCase("forgotPasswordFail",(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

          // resetPassword function

        builder.addCase("resetPasswordRequest",(state)=>{
            state.loading=true;
            state.isAuthenticated=false;
        });
    
        builder.addCase("resetPasswordSuccess",(state,action)=>{
            state.loading=false;
            state.message=action.payload;
        });
    
        builder.addCase("resetPasswordFail",(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

         // changePassword function

         builder.addCase("changePasswordRequest",(state)=>{
            state.changePasswordLoading=true;
        });
    
        builder.addCase("changePasswordSuccess",(state,action)=>{
            state.changePasswordLoading=false;
            state.message=action.payload;
        });
    
        builder.addCase("changePasswordFail",(state,action)=>{
            state.changePasswordLoading=false;
            state.error=action.payload;
        });

         // updateProfile function

        builder.addCase("updateProfileRequest",(state)=>{
            state.updateProfileLoading=true;
        });
    
        builder.addCase("updateProfileSuccess",(state,action)=>{
            state.updateProfileLoading=false;
            state.message=action.payload;
        });
    
        builder.addCase("updateProfileFail",(state,action)=>{
            state.updateProfileLoading=false;
            state.error=action.payload;
        });

        //getAllSearchedUsers

        builder.addCase("getAllSearchedUsersRequest",(state)=>{
            state.searchUserLoading=true;
        });
    
        builder.addCase("getAllSearchedUsersSuccess",(state,action)=>{
            state.searchUserLoading=false;
            state.searchedUsers=action.payload;
        });
    
        builder.addCase("getAllSearchedUsersFail",(state,action)=>{
            state.searchUserLoading=false;
            state.error=action.payload;
        });

              //getAllSearchedUsers

            builder.addCase("getUserProfileRequest",(state)=>{
                state.getUserProfileLoading=true;
            });
        
            builder.addCase("getUserProfileSuccess",(state,action)=>{
                state.getUserProfileLoading=false;
                state.searchedUser=action.payload.user;
                state.isFollowed=action.payload.isFollowed;
                state.searchedUserTotalLikes=action.payload.searchedUserTotalLikes;
            });
        
            builder.addCase("getUserProfileFail",(state,action)=>{
                state.getUserProfileLoading=false;
                state.error=action.payload;
            });

             //followUnfollowUser

            builder.addCase("followUnfollowUserRequest",(state)=>{
                state.getUserProfileLoading=true;
            });
        
            builder.addCase("followUnfollowUserSuccess",(state,action)=>{
                state.getUserProfileLoading=false;
                state.message=action.payload;
            });
        
            builder.addCase("followUnfollowUserFail",(state,action)=>{
                state.getUserProfileLoading=false;
                state.error=action.payload;
            });


              // getMyAllNotifications function

              builder.addCase("getMyAllNotificationsRequest",(state)=>{
                state.getMyAllNotificationsLoading=true;
            });
        
            builder.addCase("getMyAllNotificationsSuccess",(state,action)=>{
                state.getMyAllNotificationsLoading=false;
                state.myNotifications=action.payload;
            });
        
            builder.addCase("getMyAllNotificationsFail",(state,action)=>{
                state.getMyAllNotificationsLoading=false;
                state.error=action.payload;
            });       

    //clearing functions

    builder.addCase("clearMessage",(state)=>{
        state.message=null;
    });

    builder.addCase("clearError",(state)=>{
        state.error=null;
    });

    builder.addCase("cleanState",(state)=>{
        state.user={};
        state.isAuthenticated=false;
        state.searchedUser={};
        state.searchedUsers=[];
    });
});