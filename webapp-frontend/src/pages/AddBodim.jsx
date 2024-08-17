import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedbackIcon from '@mui/icons-material/Feedback';
import axios from "axios";
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
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
  Typography,
  Paper,
  IconButton
} from '@mui/material';
import { React, useEffect, useState } from 'react';
import ReviewCardComponent from '../component/ReviewCardComponent';

const sectionContainerStyle={
    borderRadius:'8px',
    boxShadow: 4,
    backgroundColor:'#FFFFFF',
    paddingTop:'5px', 
    my: 2, 
    padding: '16px'
}
const sectionTtileStyle={
    color:'#4A90E2'
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
  const initialErrorState={
    bodimNameError:false,
    bodimTypeError:false,
    priceError:false,
    contactError:false,
    distanceToUniError:false
  }

  const [bodimTypes,setBodimTypes]=useState([])
  const [BodimDetails,setBodimDetails]=useState(initialState)
  let[BodimDetailsError,setBodimDetailsError]=useState(initialErrorState)

  useEffect(()=>
  {
    //loadbodimTypes();
  },[]);

  const loadbodimTypes=async()=>{
    const result=await axios.get("http://localhost:8080");
    setBodimTypes(...bodimTypes,result);
    console.log(result);
  }

  const handleChange=(e)=>{
    const {name ,value}=e.target
    if(name==="contact"){
        contactNumberValidation(value)
    }
    else{
      setBodimDetails({...BodimDetails,[name]:value})
    }
    
  }
  const contactNumberValidation=(value)=>{
    const phoneNumRegex=/^\d{10}$/;
    const isCurrentPhoneNumber=BodimDetails.contact.indexOf(value)
    setBodimDetailsError({...BodimDetailsError,contactError:true})
    if(isCurrentPhoneNumber!==-1 || !phoneNumRegex.test(value)){
        return 0;
    }
    if(value.length!==10){
        setBodimDetails({...BodimDetails, contact: []});
        return 0;
    }
    if(value.length===0){
        setBodimDetails({...BodimDetails, contact: []});
        return 0;
    }
    
    setBodimDetails({...BodimDetails, contact: [...BodimDetails.contact, value]});
    setBodimDetailsError({...BodimDetailsError,contactError:false})

    return 1;
  }

  let[contacNumShow,setcontacNumShow]=useState(false);

  const contactNumbersShow=(e)=>{
    setBodimDetailsError({...BodimDetailsError,contactError:false})
    document.getElementById("contact").value="";
    let result=false;
    if(BodimDetails.contact.length===0){
      result=false;
    }
    else{
      result=contacNumShow===false? true : contacNumShow;
    }
    setcontacNumShow(result);
  }
  const deleteContactNumber = (e) => {
    const index=BodimDetails.contact.indexOf(e.key)
    console.log(e.target)
    const updatedContact = [...BodimDetails.contact];
    updatedContact.splice(index, 1);
    setBodimDetails({ ...BodimDetails, contact: updatedContact });
  };
 
  return (
      <Container sx={sectionContainerStyle}>
        
          <Grid container spacing={2} >
              <Grid item md={6}>
                <Box sx={boxStyle}>
                  <FormLabel sx={labelWidthStyle} htmlFor="bodimName">Enter appartment name</FormLabel>
                  <TextField maxLength={10} error={BodimDetailsError.bodimNameError} required onChange={handleChange} value={BodimDetails.bodimName} sx={feildWidthStyle} name="bodimName" id="bodimName" label="bodim Name" variant="outlined" size='small'/>
                </Box>

              </Grid>
              <Grid item md>
                 
                  <Box sx={boxStyle}>
                    <FormLabel sx={labelWidthStyle}>Select boidm type</FormLabel>
                    <FormControl sx={{minWidth: "50%" }} size="small" minwidth="48rem">
                    <Select error={BodimDetailsError.bodimTypeError} required defaultValue={'none'}  name="bodimType" onChange={handleChange}>
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
                  <TextField error={BodimDetailsError.priceError} required onChange={handleChange} value={BodimDetails.price} sx={feildWidthStyle} name="price" id="price" label="Price" variant="outlined" size='small'/>
                </Box>
              </Grid>
              <Grid item md>
                  <Box sx={boxStyle}>
                      <FormLabel sx={labelWidthStyle} htmlFor='contact'>Contact details</FormLabel>
                      <TextField error={BodimDetailsError.contactError} onChange={handleChange} required 
                       sx={{width:'35%', marginRight:'2%'}} name="contact" id="contact" label="contact" variant="outlined" size='small'/>
                      <Button onClick={contactNumbersShow} size="small" variant="text" startIcon={<AddIcCallIcon />}>
                        Add another 
                      </Button>
                  </Box>
                  <Box sx={{textAlign:'right',marginRight:'5%'}}>
                    {
                        contacNumShow && BodimDetails.contact.map((item)=>
                        <Paper elevation={3} key={item}
                        sx={{
                            display: 'inline',
                            width:"25%",
                            backgroundColor:"#9EC9F7",
                            borderRadius:'18px',
                            color:"blue",
                            fontStyle:"bold",
                            padding:"0.3rem",
                            boxShadow:3,
                            margin:"0.3rem"
                        }}>
                        <Typography sx={{px:1}} variant="caption">{item}</Typography>
                        <IconButton onClick={deleteContactNumber} key={item} aria-label="delete" padding="0px"><DeleteIcon /></IconButton>
                        </Paper>
                        )
                    }
                    </Box>                
                 
              </Grid>
          </Grid>
          <Grid container spacing={2} >
              <Grid item md>
                  <Box sx={boxStyle}>
                      <FormLabel sx={labelWidthStyle} htmlFor='distance'>Distance to Uni</FormLabel>
                      <TextField error={BodimDetailsError.distanceToUniError} onChange={handleChange} sx={feildWidthStyle} name="distanceToUni" id="distance" label="Distance" variant="outlined" size='small' />
                  </Box>
              </Grid>
              <Grid item md>
                  <Box>
                    <FormControl fullWidth sx={{margin:'10px'}}>
                    <FormLabel id="location-group">Location Details:</FormLabel>
                    <RadioGroup defaultValue="city" name="location">
                      <Box sx={boxStyle}>
                        <FormControlLabel sx={labelWidthStyle}
                        style={{marginRight:'0'}}
                        value="city" 
                        control={<Radio />} 
                        label="Nearest City" 
                        onChange={handleChange}
                        />
                        <TextField name="cityName" id="city" label="City" variant="outlined" size='small'/>
                      </Box>
                      <Box sx={{margin:'10px'}} >
                        <FormControlLabel sx={labelWidthStyle}
                        style={{marginRight:'0'}}
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
  
    const [allFeatures] = useState([
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
        <Container sx={sectionContainerStyle}>
            <Grid container spacing={4} justifyContent="space-between">
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography className='roboto-medium' fontSize={'1.7rem'} gutterBottom sx={sectionTtileStyle}>Available Features</Typography>
                        {availableFeatures.map((feature, index) => (
                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                <Typography variant="body1">{feature.name}</Typography>
                                <TextField
                                    type="number"
                                    value={feature.count}
                                    onChange={(e) => updateFeatureCount(index, parseInt(e.target.value))}
                                    sx={{ ml: 1, mr: 1 }}
                                    size="small"
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
                        <Typography className='roboto-medium' fontSize={'1.7rem'} gutterBottom sx={sectionTtileStyle}>All Features</Typography>
                        {allFeatures.map((feature, index) => (
                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                <Typography variant="body1">{feature.name}</Typography>
                                <Button variant="contained" color="primary" onClick={() => addFeature(feature)} sx={{ ml: 1 }}>
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
const AddPhotos = () => {
    const [images, setImages] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <Container sx={sectionContainerStyle}>
            <Typography className='roboto-medium' fontSize={'1.7rem'} gutterBottom sx={sectionTtileStyle}>
                Upload photos
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Box
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            height: '200px',
                            width: '100%',
                            maxWidth: '300px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f9f9f9',
                            position: 'relative',
                            mx: 'auto',
                        }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <input
                            id="fileInput"
                            type="file"
                            multiple
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileSelect}
                        />
                        <Button
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            onClick={handleButtonClick}
                        >
                            Upload Image
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <Grid item key={index}>
                                    <Paper elevation={3}>
                                        <img
                                            src={image}
                                            alt={`Uploaded ${index}`}
                                            style={{
                                                width: '258px',
                                                height: '128px',
                                                objectFit: 'contain',
                                                borderRadius: '8px',
                                            }}
                                        />
                                    </Paper>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Paper elevation={3} sx={{ padding: '16px', textAlign: 'center' }}>
                                    {/* Remove the icon and text */}
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
//Add reviews component
const AddReview = () => {
    return (
        <Container sx={sectionContainerStyle}>
            <Grid container>
                <Grid item xs={11}>
                    <Typography className='roboto-medium' fontSize={'1.7rem'} sx={sectionTtileStyle}>Add first feedback by you</Typography>
                        
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" endIcon={<FeedbackIcon />}>
                       Add
                    </Button>
                </Grid>
                
                <Grid item>
                    <ReviewCardComponent/>
                </Grid>

            </Grid>
        </Container>
    )
}

//All the components combine here and export
const AddBodim = () => {
    return (
          <Box >
            <form autoComplete='off' onSubmit={()=>alert("submit")}>
              <AppartmentDetails/>
              <AvailabelFeatures/>
              <AddPhotos/>
              <AddReview/>
              <input type='submit'/>
            </form>
          </Box>
    )
}

export default AddBodim;
