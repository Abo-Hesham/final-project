import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Card, CardHeader , Box, CardActions ,Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { GetHisComments } from "../../../API/getCommentsByHisId";
import CommentButton from "./commentButton";
import { baseUrlApi } from "../../../API/config";
// Styled TableContainer to hide the scrollbar
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 300,
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar for Chrome, Safari and Opera
  },
  '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
  'scrollbar-width': 'none', // Hide scrollbar for Firefox
}));

const CommentsTable = () => {
  const index = useSelector((state) => state.Rendering.index);
  const HisSite = useSelector((state) => state.Rendering.HisOfGov);
  const commented = useSelector((state)=>state.Rendering.commented)
  const [comments, setComments] = useState(HisSite && HisSite[0] && HisSite[0].comments? HisSite[0].comments : []);
  const [commentsCount, setCommentsCount] = useState(HisSite && HisSite[0] && HisSite[0].comments ? HisSite[0].comments.length : 0);

  async function handleGetComments(id){
    const com = await GetHisComments(id);
    setComments(com);
    setCommentsCount(com.length);
  }
  useEffect(() => {
    if (HisSite && HisSite[index] && HisSite[index].comments) {
      handleGetComments(HisSite[index]._id);
    } else {
      setComments([]);
      setCommentsCount(0);
    }
  }, [HisSite, index , commented]);

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" component="div">
              Comments:
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              {commentsCount} comment{commentsCount !== 1 ? 's' : ''}
            </Typography>
          }
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        />
        <Box sx={{width:'100%'}}>
          <StyledTableContainer component={Paper}>
            <Table>
              <TableBody sx={{width:'100%'}}>
                {comments.length > 0 ? comments.map((co, idx) => (
                  <TableRow key={idx}>
                    <TableCell width={30}>
                      <Avatar sx={{width:"50px" ,height:"50px"}}  src={baseUrlApi + '/' +co.User.userImage } />
                    </TableCell>
                    <TableCell width={80}>
                      <Typography>{co.User.username}</Typography>
                    </TableCell>
                    <TableCell>{co.Content}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell width={30}></TableCell>
                    <TableCell width={200}><Typography></Typography></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
        <CardActions sx={{mt:"5px"}}>
          <CommentButton/>
        </CardActions>
      </Card>
    </>
  );
};

export default CommentsTable;
