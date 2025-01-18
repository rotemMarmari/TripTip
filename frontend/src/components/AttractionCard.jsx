import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";

const AttractionCard = ({ attraction, description }) => {
    return (
        <Card sx={{ maxWidth: 275, margin: "10px" }}>
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