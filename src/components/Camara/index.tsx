import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeCamaras } from "../../pages/camaras/interface/camara.interface";
import { SensorComponent } from "../Sensor";
import { TypeFrigorficos } from "../../pages/home/interace/frigorifico.interface";


type CardProps = {
    propsCamara: TypeCamaras;
    propsFrio: TypeFrigorficos;
}

export const CamaraComponent: React.FC<CardProps> = ({propsFrio ,propsCamara}) => {
    let navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1}}
            style={{
                backgroundColor: "lightgrey" ,
            }}>
                <Grid container spacing={2}  alignItems="center">
                    <Grid xs={1} >
                        <Typography variant = "h6" sx = {{mb: 1.0}} align="center">
                            {propsCamara.name}
                        </Typography>
                    </Grid>
                    <Grid container xs={8} alignItems="center">
                        {
                            propsCamara.sensores?.length !== 0 ? (
                            <>
                            {
                                propsCamara.sensores!.map((sensores) => (
                                    <Grid >
                                        <SensorComponent propsSensor={sensores}/>
                                    </Grid>
                                ))
                            }
                            </>
                            ) : "No hay sensores"
                        }
                    </Grid>
                    <Grid xs={2} alignItems="center">
                        <Button 
                            fullWidth 
                            variant= "contained" 
                            size="small" 
                            onClick={()=> navigate("/graficos",{state: {propsFrio, propsCamara}})}>
                                Ver Grafico
                            </Button>
                    </Grid>
            </Grid>
        </Box>
    )
}

/* <Card 
            style={{
                backgroundColor: "lightgrey" ,
            }}>
            <CardContent >
                <Typography variant = "h4" sx = {{mb: 1.0}} align="center">
                    {propsCamara.name}
                </Typography>
                <Divider />
                {
                    propsCamara.sensores?.length !== 0 ? (
                    <Grid sx={{my: 1}} container spacing={1} direction="column" >
                        {
                        propsCamara.sensores!.map((sensores) => (
                            <Grid item xs={1} key={sensores.id} >
                                <SensorComponent propsSensor={sensores}/>
                            </Grid>
                        ))
                        }
                    </Grid>
                    ) : "No hay sensores"
                }
            </CardContent>
            <CardActions>
                <Button fullWidth variant= "contained" size="small" onClick={()=> navigate("/graficos",{state: {propsFrio, propsCamara}})}>Graficos</Button>
            </CardActions>
        </Card>*/