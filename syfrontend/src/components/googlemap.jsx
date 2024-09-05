import React from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MapRedirector = ({ destination }) => {
  const handleRedirect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        const destinationLatitude = destination.lat;
        const destinationLongitude = destination.lng;

        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&travelmode=driving`;

        window.location.href = googleMapsUrl;
      }, error => {
        console.error('Error getting user location: ' + error.message);
      });
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  };
  return (
    <div>
      <Button 
      onClick={handleRedirect} 
      color="primary"
      startIcon={<LocationOnIcon />}
      >
        <Typography variant="button" style={{ marginLeft: 8 }}>
          Show Location
        </Typography>
      </Button>
    </div>
  );
};

export default MapRedirector;
