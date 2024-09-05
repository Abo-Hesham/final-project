import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {baseUrlApi} from "../../API/config"
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const CardImages = ({ images }) => {
  const imgArr = images || [];

  return (
    <ImageList
      sx={{
        width: '100%',
        height: '100%',
        transform: 'translateZ(0)',
      }}
      rowHeight={223}
      gap={1}
    >
      {imgArr.map((image, index) => {
        const cols = 1;
        const rows = 2;
        // Assume images are stored in a public folder or a specific path
        const imageUrl = `${baseUrlApi}/${image}`;

        return (
          <ImageListItem key={index} cols={cols} rows={rows}>
            <img
              {...srcset(imageUrl, 350, 300, rows, cols)}
              alt={`Image ${index + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              position="top"
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default CardImages;
