import { configureStore } from "@reduxjs/toolkit";
import Rendering from "./Slices/RenderingSlice";



export const store = configureStore({
    reducer:{
        Rendering: Rendering,
        
    }
})