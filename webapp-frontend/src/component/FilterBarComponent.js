import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '2rem',
      color: '#2C3E50',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  palette: {
    primary: {
      main: '#3498DB',
    },
    secondary: {
      main: '#E74C3C',
    },
    background: {
      default: '#ECF0F1',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: '#FFFFFF',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
  },
  '& .MuiInputLabel-root': {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
}));

const StyledSearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
  },
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearch}>
      <StyledSearchBar
        fullWidth
        variant="outlined"
        placeholder="Search by location name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <StyledButton type="submit" variant="contained" color="primary">
                Search
              </StyledButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

const FilterBar = ({ onFilterChange, currentFilters }) => {
  const [price, setPrice] = useState('');
  const [distance, setDistance] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    onFilterChange({ price, distance, capacity });
  }, [price, distance, capacity, onFilterChange]);

  const renderFilterTag = (value, onRemove) => {
    if (!value) return null;
    return (
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: '16px',
          px: 1,
          py: 0.5,
          mr: 1,
          mt: 1,
          fontSize: '0.875rem',
        }}
      >
        {value}
        <Button
          size="small"
          onClick={onRemove}
          sx={{ ml: 1, minWidth: 'auto', p: 0, color: 'white' }}
        >
          ×
        </Button>
      </Box>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <StyledFormControl fullWidth variant="outlined">
          <InputLabel>Price</InputLabel>
          <Select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            startAdornment={
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="5000 - ">Below Rs.5000</MenuItem>
            <MenuItem value="5000-10000">Rs.5000 - Rs.10000</MenuItem>
            <MenuItem value="10000-20000">Rs.10000 - Rs.20000</MenuItem>
            <MenuItem value="20000-30000">Rs.20000 - Rs.30000</MenuItem>
            <MenuItem value="30000 + ">Above Rs.30000</MenuItem>
          </Select>
        </StyledFormControl>
        {renderFilterTag(currentFilters.price, () => setPrice(''))}
      </Grid>
      <Grid item xs={12} sm={4}>
        <StyledFormControl fullWidth variant="outlined">
          <InputLabel>Distance to University</InputLabel>
          <Select
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            label="Distance to University"
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="0-1">Below 1km</MenuItem>
            <MenuItem value="1-3">1 km - 3 km</MenuItem>
            <MenuItem value="3-5">3 km - 5 km</MenuItem>
            <MenuItem value="5+">Above 5 km</MenuItem>
          </Select>
        </StyledFormControl>
        {renderFilterTag(currentFilters.distance, () => setDistance(''))}
      </Grid>
      <Grid item xs={12} sm={4}>
        <StyledFormControl fullWidth variant="outlined">
          <InputLabel>Bodim Capacity</InputLabel>
          <Select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            label="Bodim Capacity"
            startAdornment={
              <InputAdornment position="start">
                <PeopleIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="any">All</MenuItem>
            <MenuItem value="1">Single</MenuItem>
            <MenuItem value="2">Double</MenuItem>
            <MenuItem value="3+">3+ People</MenuItem>
          </Select>
        </StyledFormControl>
        {renderFilterTag(currentFilters.capacity, () => setCapacity(''))}
      </Grid>
    </Grid>
  );
};

const PlacesList = ({ places }) => {
  return (
    <Grid container spacing={3}>
      {places.map((place) => (
        <Grid item xs={12} sm={6} md={4} key={place.id}>
          <Card
            elevation={3}
            sx={{
              borderRadius: theme.shape.borderRadius,
              height: '100%',
              backgroundColor: '#fdfdfd',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={place.image}
              alt={place.name}
              sx={{
                borderTopLeftRadius: theme.shape.borderRadius,
                borderTopRightRadius: theme.shape.borderRadius,
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {place.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: Rs. {place.price}/month
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Distance: {place.distance} km from university
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capacity: {place.capacity} {place.capacity === 1 ? 'person' : 'people'}
              </Typography>
              <Button size="small" color="primary" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const BoardingPlacesFinder = () => {
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async (searchQuery = '', filters = {}) => {
    const response = await fetch(`/api/places?search=${searchQuery}&${new URLSearchParams(filters)}`);
    const data = await response.json();
    setPlaces(data);
  };

  const handleSearch = (searchQuery) => {
    fetchPlaces(searchQuery, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchPlaces('', newFilters);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Discover The Perfect Apartment For You
        </Typography>
        <StyledPaper>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <SearchBar onSearch={handleSearch} />
            </Grid>
            <Grid item xs={12}>
              <FilterBar onFilterChange={handleFilterChange} currentFilters={filters} />
            </Grid>
          </Grid>
        </StyledPaper>
        <PlacesList places={places} />
      </StyledContainer>
    </ThemeProvider>
  );
};

export default BoardingPlacesFinder;