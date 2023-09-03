import { createAsyncThunk } from "@reduxjs/toolkit";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";



export const signUp = createAsyncThunk(
    'auth/signup',
    async ({email,password,login, avatar}, thunkApi) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, {displayName: login, photoURL: avatar} )
            }
            
            return {
                userUID: user.uid,
                userEmail: user.email,
                userLogin: user.displayName,
                userAvatar: user.photoURL,
            };
        } catch (error) {
            return thunkApi.rejectWithValue(error.value);
        }
    }
)

export const signIn = createAsyncThunk(
    'auth/signin',
    async ({email,password}, thunkApi) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            return res.user;
        } catch (error) {
            return thunkApi.rejectWithValue(error.value);
        }
    }
)

export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, thunkApi) => {
        try {
            await signOut(auth);
        } catch (error) {
            return thunkApi.rejectWithValue(error.value);
        }
    }
)

export const authStateChange = createAsyncThunk(
    'auth/statechange', 
    async (user, thunkApi) => {
        try {
            return {
                userUID: user.uid,
                userEmail: user.email,
                userLogin: user.displayName,
                userAvatar: user.photoURL,
            };
        } catch (error) {
            return thunkApi.rejectWithValue(error.value);
        }
    }
)

