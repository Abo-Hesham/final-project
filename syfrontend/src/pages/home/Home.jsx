import React, { useEffect } from "react";
import Navbar from "../../components/navBar";
import { Box } from "@mui/material";
import FixedBottomNavigation from "../../components/bottomNavigation"
import HomeContainer from "./homeContainer";
import Register from "../../components/Register/registerContainer";
import { useSelector , useDispatch} from "react-redux";
import GetAllGov from "../../API/GetAllGov";
import { renderAction } from "../../Redux/Slices/RenderingSlice";

const Home = () => {
  const logBtn = useSelector((state) => state.Rendering.loginBtn);
  const dispatch = useDispatch();
  const data = useSelector((state)=> state.Rendering.gov)
  useEffect(()=>{
    async function eg(){
      const res=  await GetAllGov();
      dispatch(renderAction.setGov(res));
      dispatch(renderAction.setHisOFGov(res[0].HisSite))
      console.log(res)
    }
    eg()
  },[])
  return (
    <>
      {logBtn ? <Register /> : null}
      <Navbar />
      <Box height={70} />
      <Box sx={{ width: "100%" }}>
        <HomeContainer />
        <FixedBottomNavigation />
      </Box>
      <Box height={70} />
    </>
  )
}

export default Home;
