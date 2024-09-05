import { Box ,Typography ,TextField, Button} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../API/updateUserPic";
import { GetUserById } from "../../API/getUserById";
import { renderAction } from "../../Redux/Slices/RenderingSlice";
import * as Yup from "yup"



const UpdateData = ()=>{
const UserData = useSelector((state)=>state.Rendering.user)
const [change , setChange] = useState(false);


const dataValidation = Yup.object({
    username:Yup.string().min(4).max(20),
    location:Yup.string().min(5),
    aboutme:Yup.string().min(1).max(40)
})

const initialvalues = {
  username: UserData.username,
  location: UserData.Location,
  aboutme: UserData.aboutme,
  brith: UserData.dateOfBrith,
}
  const dispatch = useDispatch();
  // Data Validation
  const {values , handleBlur, handleChange ,errors} = useFormik({
      initialValues: initialvalues,
      validationSchema: dataValidation,
  })

  const handleUpdateInformation = async ()=>{
    console.log(UserData._id)
    console.log(UserData)
    const res = await updateUserInfo(values, UserData._id)
    if(res.status===200){
      toast.success(res.result.message);
      setChange(!change)
    }else if(res.status !==200){
        console.log(res)
      toast.error('something went wrong , please try again later')
    }
  }


  useEffect(() => {
    async function handlegetuser() {
      const newData = await GetUserById(UserData._id);
      dispatch(renderAction.setUser(newData));
      console.log("rendered")
    }
    handlegetuser();
  }, [change, dispatch]);


  return(
    <>
		  <Box sx={{width:"100%",display:"block" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
          <Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
            <Typography variant="h5" width={"50%"} >Name:</Typography>
            <TextField className='comText' name="name" value={values.username} variant="standard" fullWidth placeholder="Enter The New Name" onChange={handleChange}/>
          </Box>
          {errors.username && <small style={{color:"#ed4337" ,display:'block'}} >{errors.username}</small>}
          <Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
            <Typography variant="h5" width={"50%"}>Location:</Typography>
            <TextField name="address" value={values.location} variant="standard" fullWidth placeholder="Location...." onChange={handleChange} />
          </Box>
          {errors.location && <small style={{color:"#ed4337" ,display:'block'}} >{errors.loction}</small>}
          <Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
            <Typography variant="h5" width={"50%"}>Brith Date:</Typography>
            <TextField name="brith" value={values.brith} variant="standard" fullWidth type="date" onChange={handleChange} />
          </Box>
          <Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
            <Typography variant="h5" width={"50%"}>Something About U:</Typography>
            <TextField name="aboutU" value={values.aboutme} variant="standard" fullWidth placeholder="About You..." onChange={handleChange} onBlur={handleBlur}/>
          </Box>
          {errors.aboutme && <small style={{color:"#ed4337" ,display:'block'}} >{errors.aboutme}</small>}
          <Button
          sx={{width:"200px" , height:"50px" , marginTop:"35px"  , mb:'100px' }}
          variant='outlined'
          endIcon={<SendIcon/>}
          onClick={handleUpdateInformation}
          >
            Submit Changes
          </Button>
      </Box>
    </>
  )
}
export default UpdateData