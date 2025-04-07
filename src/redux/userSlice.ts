import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedUser:null
}

export const userSlice = createSlice({
    name:"favouser_admin",
    initialState,
    reducers:{
        login : (state, action)=>{
            state.loggedUser = action.payload
        }
    }
})

export const {login} = userSlice.actions;
export default userSlice.reducer;