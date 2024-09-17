import { Button, Grid, IconButton, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import GradeIcon from "@mui/icons-material/Grade";
const BoardimCard = ({ image,
  name,
  price,
  description,
  rating,
  chairs,
  fans,
  tables,
  nets,
  address,
  distance}) => {

  const navigate = useNavigate();
  const [faviorite, setFaviorite] = useState(false);
    const checkfaviorite=()=>{
        if (faviorite === true) {
            setFaviorite(false);
          } else {
            setFaviorite(true);
          }
    }
    const handleMoreDetailsClick = () => {
       navigate("/more-details",{
        state:{
          
          name,
          price,
          description,
          rating,
          chairs,
          fans,
          tables,
          nets,
          address,
          distance
       
        }
       });	
    }
  return (
    <Grid
      sx={{
        width: "404px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding:"16px"
      }}
    >
      <Grid
        item
        sx={{
          alignSelf: "center",
        }}
      >
        <img
          src={image}
          alt="boardimImage"
          style={{
            width: "300px",
            height: "250px",
          }}
        />
      </Grid>
      <Grid
        item
        sx={{
          marginLeft: "40px",
          textAlign: "center"
        }}
      >
        <Rating readOnly>
          
        </Rating>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            marginLeft: "10px",
            fontSize: "14px"
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            marginRight: "10px",
            fontSize: "14px"
          }}
        >
          {price}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          position: "left",
          
        }}
      >
        <Typography
          sx={{
            marginLeft: "20px",
          }}
        >
          {description}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          
        }}
      >
        <IconButton
          onClick={() => 
          checkfaviorite()
          }
          sx={{
            
          }}
        >
          {faviorite ? <GradeIcon /> : <StarOutlineIcon />}<Typography>add faviorite</Typography> 
        </IconButton>

        <div>
          <Button
            onClick={handleMoreDetailsClick}
            sx={{
              background: "white",
              textDecoration: "none",
            }}
          >
            <FindInPageIcon />
            More Details
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default BoardimCard;
