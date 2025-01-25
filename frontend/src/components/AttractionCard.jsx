import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';
import { fetchImage } from "../API/axios";

const AttractionCard = ({ attraction, description }) => {

      const [image, setImage] = useState(null);

      useEffect(() => {
        fetchImage(attraction).then(setImage);
      }, [attraction]);
      
    return (
        <Card sx={{ maxWidth: 275, margin: "10px" }}>
      <CardMedia
        component="img"
        sx={{
          height: 140,
          width: "100%",
          objectFit: "cover",
        }}
        image={image}
        alt={attraction}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {attraction}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AttractionCard;