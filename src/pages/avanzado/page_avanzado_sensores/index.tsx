import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Button, Container } from "@mui/material";
import { HeaderComponent } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { AvanzadoSensorComponent } from "../../../components/Avanzados/AvanzadoSensores";
import { ItemCamara, ItemFrigorifico } from "../../../components/Avanzados/interfaces/avanzado.interface";

export const AvanzadoSensoresPage: React.FC = () => {
    const navigate = useNavigate();

    const CamaraData = useLocation();
    const camara: ItemCamara = CamaraData.state.camara;
    const frio: ItemFrigorifico = CamaraData.state.frio;

    const {userData } = useAppSelector((state) => state.authReducer)


    //Si no es administrador no permite ingresar
    React.useEffect(() => {
        if(userData?.role !== "ADMIN")
            {
                navigate('/');
            }
    },[userData, navigate])

    return (
        <Container maxWidth="xl"> 
          {/*  <HeaderComponent 
                title="Control Avanzado"
                description= ""
         //       element={<Button fullWidth variant="contained" onClick ={()=> navigate("/avanzado/camaras",{state: {frio}})} >Ir a Lista de Camaras Registaradas</Button>}
            />*/}
            <AvanzadoSensorComponent propsFrio={frio} propsCamara={camara}/>

        </Container>
    )

}