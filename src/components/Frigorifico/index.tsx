import { Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeFrigorficos } from "../../pages/home/interace/frigorifico.interface";

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
            <CardContent>
                <Typography variant = "h4" sx = {{mb: 1.5}}>
                    {propsFrigorifico.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button fullWidth variant= "contained" size="small" onClick={()=> navigate("/camaras",{state: propsFrigorifico})}>Ver Camaras</Button>
            </CardActions>
        </Card>
    )
}