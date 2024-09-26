import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeFrigorficos } from "../../pages/home/interace/frigorifico.interface";
import FactoryIcon from '@mui/icons-material/Factory';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import imageFrio from './images/cold-storage-red.png'

type CardProps = {
    propsFrigorifico: TypeFrigorficos;
}

export const FrigorificoComponent: React.FC<CardProps> = ({propsFrigorifico}) => {
    let navigate = useNavigate();
    return (
        <Card 
            style={{
                backgroundColor: "lightgrey" ,
            }}>
             <CardHeader 
                titleTypographyProps={{align:"center"}}
                title= {`Frigorifico ${propsFrigorifico.name}`}
            />
            <CardMedia
                component="img"
                sx={{ display: "flex", marginLeft: "auto",  
                    marginRight: "auto", maxWidth: 100 }} 
                height="100"
                image= {imageFrio}
                alt="cold storage"
            />

            <CardActions>
                <Button 
                    fullWidth 
                    variant= "contained" 
                    size="large" 
                    onClick={()=> navigate("/camaras",{state: propsFrigorifico})}
                >
                    VER CAMARAS
                </Button>
            </CardActions>
        </Card>
    )
}