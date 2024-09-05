import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/Home";
import Profile from "../pages/profile/profile";


export const router = createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/profile",
        element:<Profile/>
    }
])