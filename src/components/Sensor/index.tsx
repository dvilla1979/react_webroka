import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { TypeSensor } from "../../pages/camaras/interface/camara.interface";
import { NumericFormat } from 'react-number-format';
import moment from "moment";
import { usePageVisibility } from "../../pages/camaras/usePageVisibility";
import Tooltip from '@mui/material/Tooltip';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

type CardProps = {
    propsSensor: TypeSensor;
}

export const SensorComponent: React.FC<CardProps> = ({propsSensor}) => {

    const isPageVisible = usePageVisibility();
    const timerIdRef = React.useRef<NodeJS.Timer | null>(null); 

    const [estado, setEstado] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (moment().diff(propsSensor.valores[0].fecha_hora_value, 'minute') > 5) //Controla que se actualizen los valores
            setEstado(false);
        else
            setEstado(true);


        const controllingCallback = () => {
            if (moment().diff(propsSensor.valores[0].fecha_hora_value, 'minute') > 5) //Controla que se actualizen los valores
                setEstado(false);
            else
                setEstado(true);
        };

        const startPolling = () => {
            timerIdRef.current = setInterval(controllingCallback, 60000); //Cada 1 minuto
        };

        const stopPolling = () => {
            clearInterval(timerIdRef.current!);
        };

        if (isPageVisible) {
            startPolling();
        } else {
            stopPolling();
        }

        return () => {
            stopPolling();
        };

    }, [propsSensor,  isPageVisible]);

    return (
        <Card >
            {
            propsSensor.valores?.length !== 0 ? (
                <Tooltip 
                    title={`Ultima muestra: ${moment(propsSensor.valores[0].fecha_hora_value).format("DD/MM/YYYY HH:mm")}
                            Descirpcion: ${propsSensor.descripcion} `} 
                >
                <CardContent
                 style={{
                    backgroundColor: "#29a9f0" ,
                    borderColor: 'blue', 
                    color: 'white',
                }}
                >
                    <Typography 
                        variant = "subtitle2" 
                        align="center"
                    >
                    <DeviceThermostatIcon  sx={{verticalAlign:"middle"}} /> {propsSensor.name_front}
                    </Typography>
                    <Typography 
                        variant = "h6" 
                        align="center"
                    >
                        <Box  
                            sx={{ display: "flex", 
                                justifyContent: "center", 
                                flexDirection: 'column'}} 
                        >
                            <div>
                            {
                                estado  ? (
                                        <NumericFormat 
                                            value={propsSensor.valores[0].value} 
                                            displayType={'text'} 
                                            allowNegative 
                                            suffix={'°C'} 
                                            decimalScale={1}
                                            decimalSeparator=","
                                            fixedDecimalScale
                                        />
                                ):
                                <div>
                                    <Typography
                                        variant = "subtitle2" 
                                        align="center"
                                        color="error"> 
                                        --,-°C
                                    </Typography>
                                </div>
                            }
                            </div>
                        </Box>
                    </Typography>
                </CardContent>
            </Tooltip>
            ) : "No hay sensores"
        }
        </Card>
    )
}

