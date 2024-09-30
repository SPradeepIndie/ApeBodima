import React, { useState, useEffect } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';


const BodimeCarousel = ({ image }) => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  console.log(image)
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        
        setPhotos(image);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, [image]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [photos]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      paddingTop: '56.25%', 
      overflow: 'hidden'
    }}>
      <Box
        component="img"
        src={photos[currentIndex].photo}
        alt={`Photo ${currentIndex + 1}`}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: isMobile ? 4 : 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
          padding: isMobile ? 1 : 2,
        }}
      >
        <ChevronLeft fontSize={isMobile ? 'small' : 'medium'} />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: isMobile ? 4 : 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
          padding: isMobile ? 1 : 2,
        }}
      >
        <ChevronRight fontSize={isMobile ? 'small' : 'medium'} />
      </IconButton>
    </Box>
  );
 
};

export default BodimeCarousel;