import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, Box, IconButton } from '@mui/material';
import CardImages from "./imageList";
import { useSelector , useDispatch} from 'react-redux';
import GetHisByGovId from '../../API/GetHisByGovId';
import { useState, useEffect } from 'react';
import { renderAction } from '../../Redux/Slices/RenderingSlice';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MapRedirector from '../../components/googlemap';


const HistoricalCard = () => {
  const HisArr = useSelector((state) => state.Rendering.HisOfGov);
  const govId = useSelector((state) => state.Rendering.govId);
  const Rated = useSelector((state)=> state.Rendering.Rated)
  const maxLength = useSelector((state) => state.Rendering.maxLength);
  const index = useSelector((state) => state.Rendering.index);


  const [readMore, setReadMore] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [icon , setIcon] = useState(null);
  const [rc , setRc] = useState(0)
  const [tr , setTr] = useState(0);
  const dispatch = useDispatch()
  const destination = { lat: 36.19993, lng: 37.16212 };

  async function handleGetHisById() {
    try {
      console.log(`Fetching historical data for govId: ${govId}`);
      const hisData = await GetHisByGovId(govId); // Pass govId to your API call
      dispatch(renderAction.setHisOFGov(hisData));
      dispatch(renderAction.setMaxLength(hisData.length));
    
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  }
  useEffect(() => {
    if(HisArr){
      if (HisArr.length > 0 && HisArr[index].Rating) {
        const count = HisArr[index].Rating.length;
        const ratingsValue = HisArr[index].Rating.reduce((acc, rating) => acc + rating.Value, 0);
        const totalRate = count > 0 ? ratingsValue / count : 0
        setRc(count)
        setTr(totalRate)
        let iconComponent;

        if (totalRate > 0 && totalRate < 1) {
          iconComponent = <SentimentVeryDissatisfiedIcon color="error" sx={{ width: '33px', height: '33px' }} />;
        } else if (totalRate >= 1 && totalRate < 2) {
          iconComponent = <SentimentDissatisfiedIcon color="error" sx={{ width: '33px', height: '33px' }} />;
        } else if (totalRate >= 2 && totalRate < 3) {
          iconComponent = <SentimentSatisfiedIcon color="warning" sx={{ width: '33px', height: '33px' }} />;
        } else if (totalRate >= 3 && totalRate < 4) {
          iconComponent = <SentimentSatisfiedAltIcon color="success" sx={{ width: '33px', height: '33px' }} />;
        } else if (totalRate >= 4 && totalRate <= 5) {
          iconComponent = <SentimentVerySatisfiedIcon color="success" sx={{ width: '33px', height: '33px' }} />;
        } else {
          iconComponent = <SentimentVeryDissatisfiedIcon color="error" sx={{ width: '33px', height: '33px' }} />;
        }

    setIcon(iconComponent);
      }
    }
  }, [HisArr, index ,Rated]);
  useEffect(() => {
    if (govId) {
      handleGetHisById();
    }
  }, [govId , Rated]);

  return (
    <Card sx={{ maxWidth: "98%" }}>
      <CardHeader
      sx={{borderBottom:'1px solid #0000001F' }}
        title={
        <Box sx={{width:'100%' , display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
          <Typography variant='h5' color={"primary"}>{HisArr ? HisArr[index].Name : "Loading..."}</Typography>
          <Box sx={{display:'block'}}>
            <Box sx={{display:'flex',alignItems:'center' }}>
            <Typography variant='p'>Average Of Rates: <small style={{marginRight:'10px'}}> {tr && tr.toFixed(0)} / 5</small></Typography>
            {icon}
            </Box>
            <Typography sx={{fontSize:'15px' , display:'flex' , alignItems:'center  '}}>
             {rc} people rated this
            </Typography>
          </Box>
        </Box>
        }
      />
      <Box sx={{ width: '100%', height: '450px' , marginTop:"-12px"}}>
        {HisArr ? <CardImages images={HisArr[index].Images} /> : "Loading images..."}
      </Box>
      <CardContent sx={{ height: "150px", overflowY: 'scroll', mt: '2px', borderTop:'1px solid #0000001F', overflow:"auto" }}>
        <Typography gutterBottom component="div">
          {HisArr ? HisArr[index].Desc : "Loading description..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {readMore}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{display:'flex', alignItems:"center",  justifyContent:'space-between' , width:"100%"}}>
        {showMore === false ? (
          <Button size="small"
            onClick={() => {
              setReadMore(HisArr[0].ReadMore)
              setShowMore(true)
            }}
          >Read More</Button>
        ) : (
          <Button size="small"
            onClick={() => {
              setReadMore("")
              setShowMore(false)
            }}
          >Show Less</Button>
        )}
        <Box sx={{display:'flex' , alignItems:'center'}}>
          <MapRedirector destination={destination}/>
        </Box>
        <Box sx={{display:'flex' , alignItems:'center'}}>
          <IconButton color='primary'
          disabled={index === 0 ? true : false}
          onClick={()=>{
            index !== 0 && dispatch(renderAction.setIndex(index - 1));
          }}
          >
            <ArrowCircleLeftOutlinedIcon sx={{width:"30px" , height:'30px'}}/>
          </IconButton>
          <Typography sx={{}}>
            {index+1} / {maxLength}
          </Typography>
          <IconButton color='primary'
          disabled ={index === maxLength-1 ? true : false}
          onClick={()=>{
            index !== maxLength-1 && dispatch(renderAction.setIndex(index+1))
          }}
          >
            <ArrowCircleRightOutlinedIcon  sx={{width:"30px" , height:'30px'}}/>
          </IconButton>
        </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default HistoricalCard;
