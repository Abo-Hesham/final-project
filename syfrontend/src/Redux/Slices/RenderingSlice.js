import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    loginBtn:false,
    gov:[],
    HisOfGov:null,
    govId:null,
    index:0,
    maxLength:0,
    commented:false,
    bottomNav:0,
    Rated:false,
    openFilter:false
}

const Rendering = createSlice({
    name:"Rendering", 
    initialState,
    reducers:
    {
        setUser: (state , action) =>{
            state.user = action.payload;
        },
        setLogin: (state, action) =>{
            state.loginBtn = action.payload
        },
        setGov: (state,action) =>{
            state.gov = action.payload
        },
        setHisOFGov: (state,action)=>{
            state.HisOfGov = action.payload;
        },
        setGovId: (state,action) =>{
            state.govId = action.payload
        },
        setIndex: (state,action) =>{
            state.index = action.payload
        },
        setMaxLength:(state, action) =>{
            state.maxLength = action.payload
        },
        setCommented : (state,action) =>{
            state.commented = action.payload
        },
        setBottomNav: (state,action)=>{
            state.bottomNav = action.payload
        },
        setRated: (state, action) =>{
            state.Rated = action.payload
        },
        setOpenFilter: (state , action)=>{
            state.openFilter = action.payload
        }
    }
})

export default Rendering.reducer;
export const renderAction = Rendering.actions;