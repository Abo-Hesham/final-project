import React, { useEffect, useState } from "react";
import Navbar from "../../components/navBar";
import { Box, Typography, Avatar, Button, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import Info from "./info";
import { baseUrlApi } from "../../API/config";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { updateUserPic } from "../../API/updateUserPic";
import { toast } from "react-toastify";
import { GetUserById } from "../../API/getUserById";
import { useDispatch, useSelector } from "react-redux";
import { renderAction } from "../../Redux/Slices/RenderingSlice";
import BottomNav from "../../components/bottomNavigation";

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

const Profile = () => {
  const dispatch = useDispatch();
  const [change, setChanged] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const userData = useSelector((state) => state.Rendering.user);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleChangeProfileImage = async () => {
    const fd = new FormData();
    fd.append('file', userImage);
    let updated = await updateUserPic(fd, userData._id);
    if (updated.status === 200) {
      toast.success("Profile Picture has been changed");
      setChanged(!change);
    } else {
      toast.error('Something went wrong. Please try again later, or fill all the fields.');
    }
  };

  useEffect(() => {
    async function handlegetuser() {
      const newData = await GetUserById(userData._id);
      newData && dispatch(renderAction.setUser(newData));
    }
    handlegetuser();
  }, [change, dispatch, userData._id]);

  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, width: '100%' , mb:"10px"}}>
        <Card sx={{ width: '100%', maxWidth: 1200 }}>
          <CardHeader 
          sx={{borderBottom:"1px solid  #0000001F"}}
          title={<Typography variant="h5" color={"primary"}> Profile </Typography>} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={baseUrlApi + '/' + userData.userImage}
              sx={{ width: 200, height: 200 }}
            />
          </CardContent>
          <CardActions sx={{ flexDirection: 'column', alignItems: 'center' , mb:'10px' }}>
            <Typography variant="h5">
              {userData.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userData.aboutMe}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Joined At:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(userData.createdAt)}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Updated At:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(userData.updatedAt)}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              Choose New Profile Picture
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => { setUserImage(e.target.files[0]) }}
              />
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={handleChangeProfileImage}
            >
              Submit Changes
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Info />
      <BottomNav/>
      <Box height={90} />
    </>
  );
};

export default Profile;
