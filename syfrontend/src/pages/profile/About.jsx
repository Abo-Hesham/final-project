import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const About = ()=>{

    const UserData = useSelector((state)=>state.Rendering.user);


	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" }
		return new Date(dateString).toLocaleDateString(undefined, options)
	  }

      useEffect(()=>{

      },[UserData])

	return(
		<>
			<Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
				<Typography variant="h5" width={"50%"}>User Id:</Typography>
				<Typography variant="h5" color={'primary'} width={"50%"}>{UserData._id}</Typography>
			</Box>

			<Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
				<Typography variant="h5" width={"50%"}>Name:</Typography>
				<Typography variant="h5" color={'primary'} width={"50%"}>{UserData.username}</Typography>
			</Box>

			<Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
				<Typography variant="h5" width={"50%"}>Email:</Typography>
				<Typography variant="h5" color={'primary'} width={"50%"}>{UserData.email}</Typography>
			</Box>

			<Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
				<Typography variant="h5" width={"50%"}>Address:</Typography>
				<Typography variant="h5" color={'primary'} width={"50%"}>{UserData.Location}</Typography>
			</Box>

			<Box sx={{width:"100%",display:"flex" ,justifyContent:'space-between' ,height:"50px" , alignItems:"center"}}>
				<Typography variant="h5" width={"50%"}>Date Of Brith:</Typography>
				<Typography variant="h5" color={'primary'} width={"50%"}>{formatDate(UserData.dateOfBrith)}</Typography>
			</Box>
		</>
	)
}
export default About;