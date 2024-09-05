import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { renderAction } from '../Redux/Slices/RenderingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

export default function Filtering() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.Rendering.openFilter);
  const his = useSelector((state) => state.Rendering.HisOfGov);
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    dispatch(renderAction.setOpenFilter(false));
  };

  const handleOpen = () => {
    dispatch(renderAction.setOpenFilter(true));
  };

  React.useEffect(() => {
    if (value === 1 || value === 2) {
      filter();
    }
  }, [value]);

  function filter() {
    if (value === 1) {
      dispatch(renderAction.setHisOFGov(his));
    } else if (value === 2) {
      console.log("Original his before sorting:", his);
      const sortedHis = [...his].sort((a, b) => b.totalRates - a.totalRates);
      dispatch(renderAction.setHisOFGov(sortedHis));
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 , backgroundColor: 'divider' , ml:'30px'}}>
        <InputLabel id="demo-controlled-open-select-label" sx={{ color: 'black'}}>Sort</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={handleChange}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={1}>None</MenuItem>
          <MenuItem value={2}>Most Rated</MenuItem>
          <MenuItem value={3}>Most Visted</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
