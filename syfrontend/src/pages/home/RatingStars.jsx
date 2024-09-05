import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Button from '@mui/material/Button';  // Import Button from Material-UI
import { useDispatch, useSelector } from 'react-redux';
import { Rate } from '../../API/rate';
import { toast } from 'react-toastify';
import { renderAction } from '../../Redux/Slices/RenderingSlice';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" sx={{ width: '33px', height: '33px' }} />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" sx={{ width: '33px', height: '33px' }} />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" sx={{ width: '33px', height: '33px' }} />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" sx={{ width: '33px', height: '33px' }} />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" sx={{ width: '33px', height: '33px' }} />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function RadioGroupRating() {
  const [value, setValue] = React.useState(null);  // State to track the selected value
  const user = useSelector((state)=> state.Rendering.user);
  const HisSite = useSelector((state)=> state.Rendering.HisOfGov);
  const Rated = useSelector((state)=>state.Rendering.Rated);
  const index = useSelector((state)=> state.Rendering.index)
  const dispatch = useDispatch()
  async function handleRate(id){
    const HisId = HisSite && index !== null ? HisSite[index]._id : null;
    const userId = user ? user._id : null;
    const data = {userId , HisId , value}
    try {
      const response = await Rate(data);
      if(response.status !==201){
        toast.error(response.result.message);
      }
      else{
        toast.success(response.result.message);
        dispatch(renderAction.setRated(!Rated));
      }
    } catch (error) {
      toast.error('An error occurred while adding the comment');
    }

  }



{/*  async function getUserRate(id){
    const ratee = await Rate(id)
  }
  React.useEffect(()=>{
    if(HisSite && HisSite[index]){
      getUserRate()
    }
  },[])*/}
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <StyledRating
        name="highlight-selected-only"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        IconContainerComponent={IconContainer}
        getLabelText={(value) => customIcons[value].label}
        highlightSelectedOnly
      />
      {value !== null && (
        <span style={{ marginLeft: '16px' }}>
          {customIcons[value].label}
        </span>
      )}
      <Button
        onClick={handleRate}
        variant="contained"
        sx={{ ml: 2 }}
        disabled={value === null || !user}  // Disable button if no value is selected
      >
        Fetch Value
      </Button>
    </div>
  );
}
