import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector  , useDispatch} from 'react-redux';
import { renderAction } from '../Redux/Slices/RenderingSlice';
const BottomNav = () => {

    const value = useSelector((state)=>state.Rendering.bottomNav)
    const user = useSelector((state) => state.Rendering.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
      dispatch(renderAction.setBottomNav(newValue))
      if (newValue === 0) {
        navigate('/');
      } else if (newValue === 1 && user) {
        navigate('/search');
      } else if (newValue === 2 && user) {
        navigate('/profile');
      }
    };

    return (
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        style={{ position: 'fixed', bottom: 0, width: '100%', borderTop: '1px solid #ccc' }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} disabled={!user} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} disabled={!user} />
      </BottomNavigation>
    );
};

export default BottomNav;
