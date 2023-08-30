import { createSlice } from "@reduxjs/toolkit";
import { signUp,signIn, logOut} from "./operations";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userUID: null,
        userEmail: null,
        userLogin: null,
        userAvatar: null,
        isLoggedIn : false,
        isError: false,     
    },
    extraReducers:  
        (builder) => {
            builder.addCase(signUp.fulfilled, (state,action) => {
                state.userUID = action.payload.userUID;
                state.userEmail = action.payload.userEmail;
                state.userLogin = action.payload.userLogin;
                state.userAvatar = action.payload.userAvatar;
                state.isLoggedIn = true;
            }),
            builder.addCase(signUp.rejected, (state, action) => {
                state.isError = true;
            }),
            builder.addCase(signIn.fulfilled, (state,action) => {
                console.log(action.payload);
                state.userUID = action.payload.uid;
                state.userEmail = action.payload.email;
                state.userLogin = action.payload.displayName;
                state.userAvatar = action.payload.photoURL;
                state.isLoggedIn = true;
            }),
            builder.addCase(signIn.rejected, (state, action) => {
                state.isError = true;
            })
            builder.addCase(logOut.fulfilled, (state,action) => {
               
                state.userUID = null;
                state.userEmail = null;
                state.userLogin = null;
                state.userAvatar = null;
                state.isLoggedIn = false;
            })

        },
        
 
});

export const authReducer = authSlice.reducer;