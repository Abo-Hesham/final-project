import React, { useEffect, useState } from "react";
import Navbar from "../../components/navBar";
import { Box ,Typography ,Avatar, Button } from "@mui/material";
import Info from "./info";
import { baseUrlApi } from "../../API/config";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { updateUserPic } from "../../API/updateUserPic";
import { toast } from "react-toastify";
import { GetUserById } from "../../API/getUserById";
import { useDispatch, useSelector } from "react-redux";
import { renderAction } from "../../Redux/Slices/RenderingSlice";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



const Profile = ()=>{
  const dispatch = useDispatch();

  const [change, setChanged]= useState(false);
  const [userImage , setUserImage] = useState(null);
  const userData = useSelector((state)=> state.Rendering.user)
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" ,hour: '2-digit', minute: '2-digit'}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  const handleChangeProfileImgae = async ()=>{
    const fd = new FormData();
    fd.append('file' , userImage);
   let updated = await updateUserPic(fd , userData._id);
    if(updated.status ===200){
      toast.success("Profile Picture has been changed")
      setChanged(!change)
    }else if(updated.status !==200){
      toast.error('something went wrong please Try again later , or fill all the fields')
    }
  }




  useEffect(()=>{
   async function handlegetuser(){
    const newData = await GetUserById(userData._id);
    newData && dispatch(renderAction.setUser(newData));
    }
    handlegetuser()
  },[change])



  return(
    <>
    <Navbar/>
      <Box height={70}/>
      <Box sx={{width:"100%",height:'400px' ,display:"flex"}}>
        <Box sx={{width:"400px" ,display:"flex",placeItems:"center" ,placeContent:"center"}}>
        <Avatar
          src={baseUrlApi+'/'+userData.userImage}
          sx={{ width: 200, height: 200 }}
        />
        </Box>
        <Box sx={{display:'block' , padding:"60px"}}>
          <Typography variant="h3" >
            {userData.username}
          </Typography>
          <Typography variant="i" color={'primary'} sx={{marginTop:'10px'}}>
            {userData.aboutMe}
          </Typography>
          <Typography variant="h6" sx={{marginTop:'5px'}}>
            Joined At: 
          </Typography>
          <Typography variant="i" color={'primary'} sx={{marginTop:'5px'}}>
            {formatDate(userData.createdAt)}
          </Typography>
          <Typography variant="h6"  sx={{marginTop:'5px'}}>
            Updated At: 
          </Typography>
          <Typography variant="i" color={'primary'} sx={{marginTop:'5px' ,display:"block"}}>
            {formatDate(userData.updatedAt)}
          </Typography>
          <Button
          variant="outlined" 
          sx={{ marginTop:"20px"}}
          component="label"
          role={undefined}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          >
            Choose New profile picture ?
            <VisuallyHiddenInput
            type="file"
            onChange={(e)=>{setUserImage(e.target.files[0])}}
            />
          </Button>
          <Button 
          sx={{display:"block" , marginTop:"10px" , marginLeft:"40px"}}
          variant="outlined"
          onClick={()=>{handleChangeProfileImgae()}}
          >
            Submit Changes
          </Button>
        </Box>
        </Box>
        <Info/>
    </>
  )
}
export default Profile;