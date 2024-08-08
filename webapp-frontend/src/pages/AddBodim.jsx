import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import FeedbackIcon from '@mui/icons-material/Feedback';
import {
  Box,
  Button,
  Container,
  Divider, FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio, RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { React, useState } from 'react';
import ReviewCardComponent from '../component/ReviewCardComponent';

const sectionStyle={
  backgroundColor:'#FFFFFF',
  marginTop:'20px',
  paddingTop:'5px', 
}
const sectionTopicStyle={
  fontSize:'1.8em',
  color:'#4A90E2',
  margin:'1px',
  padding:'2px'
}

//Appartment details component
const AppartmentDetails=()=>{
  //Form styling
  const boxStyle={
    display: "flex",
    alignItems:"center",
    margin:"10px"
  };
  const labelWidthStyle={
      width:"40%",
  };
  const feildWidthStyle={
      width:"50%",
  };

  //Form details object
  const initialState={
    bodimName:"",
    bodimType:"",
    price:"",
    contact:[],
    distanceToUni:""
  }
  const [BodimDetails,setBodimDetails]=useState(initialState)

  const handleChange=(e)=>{
    const {name ,value}=e.target
    console.log(BodimDetails)
    setBodimDetails({...BodimDetails,[name]:value})
  }
  
  let[contacNumShow,setcontacNumShow]=useState(false);

  const contactNumbersShow=(e)=>{
    let result=false;
    if(BodimDetails.contact.values===""){
      result=false;
    }
    else{
      result=contacNumShow===false? true : contacNumShow;
    }
    setcontacNumShow(result);
    
  }
 
  return (
      <Container sx={sectionStyle}>
        
          <Grid container spacing={2} >
              <Grid item md={6}>
                <Box sx={boxStyle}>
                  <FormLabel sx={labelWidthStyle} htmlFor="bodimName">Enter appartment name</FormLabel>
                  <TextField onChange={handleChange} value={BodimDetails.bodimName} sx={feildWidthStyle} name="bodimName" id="bodimName" label="bodim Name" variant="outlined" size='small'/>
                </Box>

              </Grid>
              <Grid item md>
                 
                  <Box sx={boxStyle}>
                    <FormLabel sx={labelWidthStyle}>Select boidm type</FormLabel>
                    <FormControl sx={{minWidth: "50%" }} size="small" minwidth="48rem">
                    <Select defaultValue={'none'}  name="bodimType" onChange={handleChange}>
                      <MenuItem value={'none'}><em>None</em></MenuItem>
                      <MenuItem value={'type1'}>Type1</MenuItem>
                      <MenuItem value={'type2'}>Type2</MenuItem>
                      <MenuItem value={'type3'}>Type3</MenuItem>
                    </Select>
                    </FormControl>
                  </Box>
                  
              </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2} >
              <Grid item md>
                <Box sx={boxStyle}>
                  <FormLabel sx={labelWidthStyle} htmlFor="price">Price</FormLabel>
                  <TextField onChange={handleChange} value={BodimDetails.price} sx={feildWidthStyle} name="price" id="price" label="Price" variant="outlined" size='small'/>
                </Box>
              </Grid>
              <Grid item md>
                  <Box sx={boxStyle}>
                      <FormLabel sx={labelWidthStyle} htmlFor='contact'>Contact details</FormLabel>
                      <TextField onChange={handleChange} sx={{width:'35%', marginRight:'2%'}} name="contact" id="contact" label="contact" variant="outlined" size='small'/>
                      <Button onClick={contactNumbersShow} size="small" variant="text" startIcon={<AddIcCallIcon />}>
                        Add another 
                      </Button>
                  </Box>
                  {
                    contacNumShow && <Typography variant="caption">{BodimDetails.contact}</Typography>
                  }
                 
              </Grid>
          </Grid>
          <Grid container spacing={2} >
              <Grid item md>
                  <Box sx={boxStyle}>
                      <FormLabel sx={labelWidthStyle} htmlFor='distance'>Distance to Uni</FormLabel>
                      <TextField onChange={handleChange} sx={feildWidthStyle} name="distanceToUni" id="distance" label="Distance" variant="outlined" size='small' />
                  </Box>
              </Grid>
              <Grid item md>
                  <Box>
                    <FormControl fullWidth sx={{margin:'10px'}}>
                    <FormLabel id="location-group">Location Details:</FormLabel>
                    <RadioGroup defaultValue="city" name="location">
                      <Box sx={boxStyle}>
                        <FormControlLabel sx={labelWidthStyle}
                        value="city" 
                        control={<Radio />} 
                        label="Nearest City" 
                        onChange={handleChange}
                        />
                        <TextField name="cityName" id="city" label="City" variant="outlined" size='small'/>
                      </Box>
                      <Box sx={{margin:'10px'}} >
                        <FormControlLabel sx={labelWidthStyle}
                        value="address" 
                        control={<Radio />} 
                        label="Address" 
                        onChange={handleChange}
                        />
                      <TextField name="address" id="address" multiline rows={4} 
                          defaultValue="No,Street name,City"
                        />
                      </Box>
                    </RadioGroup>
                    </FormControl>
                  </Box>
              </Grid>
          </Grid>
          <pre>
              {JSON.stringify(BodimDetails)}
          </pre>
      </Container>
  )
};
//Availabel features component
const AvailabelFeatures=()=>{
  
    const [allFeatures, setAllFeatures] = useState([
      { name: 'Beds', count: 0},
      { name: 'Chairs', count: 0 },
      { name: 'Tables', count: 0 },
      { name: 'Nets', count: 0},
    ]);
  
    const [availableFeatures, setAvailableFeatures] = useState([]);
  
    const addFeature = (feature) => {
      setAvailableFeatures([...availableFeatures, feature]);
    };
  
    const removeFeature = (index) => {
      const newFeatures = [...availableFeatures];
      newFeatures.splice(index, 1);
      setAvailableFeatures(newFeatures);
    };
  
    const updateFeatureCount = (index, count) => {
      const newFeatures = [...availableFeatures];
      newFeatures[index].count = count;
      setAvailableFeatures(newFeatures);
    };
  
    return (
      <Container sx={sectionStyle}>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography className='roboto-regular' sx={sectionTopicStyle} gutterBottom>Available Features</Typography>
              {availableFeatures.map((feature, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1">{feature.name}</Typography>
                  <TextField
                    type="number"
                    value={feature.count}
                    onChange={(e) => updateFeatureCount(index, parseInt(e.target.value))}
                    style={{ marginLeft: 10, marginRight: 10 }}
                  />
                  <Button variant="contained" color="secondary" onClick={() => removeFeature(index)}>
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography className='roboto-regular' sx={sectionTopicStyle} gutterBottom>All Features</Typography>
              {allFeatures.map((feature, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1">{feature.name}</Typography>
                  <Button variant="contained" color="primary" onClick={() => addFeature(feature)} style={{ marginLeft: 10 }}>
                    Add
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
};
//Add photos component
const AddPhotos=()=>{
    return(
        <Container sx={sectionStyle}>
           <Typography className='roboto-regular' sx={sectionTopicStyle}>Upload photos</Typography>
        </Container>
    )
};
//Add reviews component
const AddReview=()=>{
    let [reviewAdd,setReviewAdd]=useState(false);
    const toggleBtn=()=>{
      let result = reviewAdd===false ? true : false ;
      setReviewAdd(result);
    }

    return(
        <Container sx={sectionStyle} >
            <Box display={'flex'} alignItems={"center"} sx={{justifyContent: "space-between"}}>
              <Typography className='roboto-regular' sx={sectionTopicStyle}>Give first feedback to this place</Typography>
              <Button 
              sx={{maxHeight: '32px'}}
              onClick={toggleBtn} variant="outlined" size='small' startIcon={<FeedbackIcon />}>Add review</Button>
            </Box>
            <Box>
              {
                reviewAdd && <ReviewCardComponent/>
              }
            </Box>
         
        </Container>
    )
};  

//All the components combine here and export
const AddBodim=()=>{
    return (
      <form autoComplete='off' onSubmit={()=>alert("submit")}>
        
          <Box sx={{backgroundColor:'#F0EFEB'}}>
              <AppartmentDetails/>
              <AvailabelFeatures/>
              <AddPhotos/>
              <AddReview/>
          </Box>
          <Box>
         
          </Box>
          
      </form>


    )
    
}

export default AddBodim;

