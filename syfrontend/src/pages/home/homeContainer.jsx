import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import HistoricalCard from "./Historical_Card";
import CommentsTable from "./comments/CommentsTable";
import CommentButton from "./comments/commentButton";
import RatingStars from "./RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { renderAction } from "../../Redux/Slices/RenderingSlice";
const HomeContainer = () => {
  const dispatch = useDispatch();
  const GovArr = useSelector((state) => state.Rendering.gov);
  const govId = useSelector((state) => state.Rendering.govId);
  const [value, setValue] = useState(0);
  const destination = { lat: 36.19993, lng: 37.16212 };
  useEffect(() => {
      // Set initial govId
    dispatch(renderAction.setGovId("66b24abdd7d0f8839577855a"))
  }, []);

  useEffect(() => {
    if (GovArr.length > 0 && govId !== GovArr[value]._id) {
      dispatch(renderAction.setGovId(GovArr[value]._id))

    }
    console.log(value)
    console.log(govId)
  }, [value, GovArr]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (GovArr.length > 0) {
      dispatch(renderAction.setGovId(GovArr[newValue]._id))
      dispatch(renderAction.setIndex(0));

    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          overflowY: "scroll",
          borderRight: 1,
          borderColor: 'divider',
          height: '100%', // Make Tabs take 100% height
          flexShrink: 0, // Prevent Tabs from shrinking
        }}
      >
        {GovArr.map((gov, index) => (
          <Tab key={index} label={gov.GovName} sx={{ height: "100px" }} />
        ))}
      </Tabs>
      <Box sx={{ width: "100%", display: { sm: "block", md: 'flex', lg: 'flex' } }}>
        <Box sx={{ width: { sm: '100%', md: '65%', lg: '70%' }, padding: '10px 0px 0px 10px' }}>
          {/* <HistoricalCard govId={govId} /> */}
        </Box>
        <Box sx={{ width: { sm: "100%", md: '35%', lg: '30%' }, paddingTop: '10px' }}>
          <CommentsTable
          />
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
            <RatingStars />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeContainer;
