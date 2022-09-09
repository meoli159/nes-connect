import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        login:{
            currentUser:null,
            isFetching:false,
            error:false
        },
        register:{
            isFetching:false,
            success:false,
            error:false,
        },
        logout:{
            isFetching:false,
            error:false
        }
    },
    reducers:{
        loginStart:(state)=>{
            state.login.isFetching = true;
        },
        loginSuccess:(state,action)=>{
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed:(state)=>{
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart:(state)=>{
            state.register.isFetching = true;
        },
        registerSuccess:(state)=>{
            state.register.isFetching = false;
            state.register.success =true;
            state.register.error = false;
        },
        registerFailed:(state)=>{
            state.login.isFetching = false;
            state.register.success = false;
            state.register.error = true;
        },
        logOutSuccess:(state)=>{
            state.login.currentUser = null;
        },

    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutSuccess,
} = authSlice.actions;

export default authSlice.reducer;