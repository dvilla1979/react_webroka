import { Box, Button, Divider, Typography, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeCamaras } from "../../pages/camaras/interface/camara.interface";
import { SensorComponent } from "../Sensor";
import { TypeFrigorficos } from "../../pages/home/interace/frigorifico.interface";
import TimelineIcon from '@mui/icons-material/Timeline';

type CardProps = {
    propsCamara: TypeCamaras;
    propsFrio: TypeFrigorficos;
}

export const CamaraComponent: React.FC<CardProps> = ({propsFrio ,propsCamara}) => {
    let navigate = useNavigate();
    return (
        <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ddd', // Línea separadora
                padding: 1,
                marginBottom: 2,
                width: '100%'
            }}
        >
            {/* Espacio del Nombre - Ocupa un ancho fijo */}
            <Box sx={{ flex: '0 0 10%', display: 'flex', justifyContent: 'center', marginRight: 1 }}>
                <Typography variant="h6" textAlign="center">
                    {propsCamara.name}
                </Typography>
            </Box>
            {/* Espacio de los Valores - Ocupa el espacio restante dividido en 7 partes */}
            <Box sx={{ flex: '1 1 auto', display: 'flex', gap: 1, justifyContent: 'left' }}>
                { propsCamara.sensores?.length > 0 ? (
                    propsCamara.sensores!.map((sensores, index) => (
                    <Box key={index} sx={{ flex: '1 1 auto', maxWidth: 150 }}>
                        <SensorComponent key={index} propsSensor={sensores} />
                    </Box>
                ))
                ) : (
                    <Box sx={{ flex: '1 1 auto', maxWidth: 100 }}>
                        <Typography variant="body2" /*textAlign="center"*/ color="textSecondary">
                            No hay sensores para mostrar.
                        </Typography>
                    </Box>
                )}
            </Box>
            {/* Espacio del Botón - Ocupa un ancho fijo */}
            <Box sx={{ flex: '0 0 10%', display: 'flex', justifyContent: 'center' , marginLeft: 1}}>
                { propsCamara.sensores?.length > 0 ? (
                    <Button 
                    sx={{ width: '100%' }} 
                    variant= "contained" 
                    size="large"    
                    startIcon={<TimelineIcon />}
                    onClick={()=> navigate("/graficos",{state: {propsFrio, propsCamara}})}
                    >
                        Gráfico
                    </Button>
                ) : (
                    <></>
                )}
            </Box>
        </Box>
        </>
    )
}
/*
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
                            startIcon={<TimelineIcon />}
                            onClick={()=> navigate("/graficos",{state: {propsFrio, propsCamara}})}>
                                Ver Grafico
                            </Button>
                    </Grid>
            </Grid>
        </Box>
        */


        /*         <Grid container spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
         <Grid item xs={12} sm={3} md={2}>
         <Typography variant="body1" textAlign="center">
             {propsCamara.name}
         </Typography>
     </Grid>

 { propsCamara.sensores?.length > 0 ? (
    propsCamara.sensores!.map((sensores, index) => (
     <Grid item xs={6} sm={1} md={1} key={index}>
         <SensorComponent key={index} propsSensor={sensores} />
     </Grid>
   ))
 ) : (
   <Grid item xs={6}>
     <Typography variant="body2" textAlign="center" color="textSecondary">
         No hay sensores disponibles.
     </Typography>
   </Grid>
 )}

 <Grid item xs={12} sm={3} md={2}>
     <Button 
         fullWidth 
         variant= "contained" 
         size="small" 
         startIcon={<TimelineIcon />}
         onClick={()=> navigate("/graficos",{state: {propsFrio, propsCamara}})}>
             Ver Grafico
     </Button>
 </Grid>
</Grid>

{showDivider && <Divider sx={{ marginBottom: 2 }} />}
*/