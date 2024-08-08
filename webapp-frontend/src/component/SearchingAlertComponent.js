import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, Container, Grid, Typography } from '@mui/material';
import SearchingImg from './images/Searching.svg';

//TODO work on responsivness of the layout
const SearchingAlertComponent=()=>{
    return(
            <Container maxWidth="xl" sx={{bgcolor: '#F4F4F4', margin:0, padding:'3vh 4vw 0 4vw'}} disableGutters>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md>
                        <Typography variant="h4" className='playfair-display-header home' sx={{fontSize:"4rem"}}>
                            Find Your Perfect Apartment In here
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={6} md sx={{paddingTop:'5vh'}}>
                        <Typography sx={{fontSize:'1.1em'}}>
                            Discover affordable apartments  for university students
                        </Typography>
                        <Grid container>
                                <Grid xs>
                                    <Button variant="contained" color='primary' startIcon={<SearchOutlinedIcon />} >
                                        Search
                                    </Button>
                                </Grid>
                                <Grid xs>
                                    <Button variant="outlined">
                                        Learn more
                                    </Button>
                                </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={12} md sx={{textAlign:'center'}}>
                        <img src={SearchingImg} alt='searching'/>
                    </Grid>
                </Grid>
            </Container>
    )
}

export default SearchingAlertComponent;