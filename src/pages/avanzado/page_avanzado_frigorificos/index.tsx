import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Button, Container } from "@mui/material";
import { HeaderComponent } from "../../../components";
import { useNavigate } from "react-router-dom";
import { AvanzadoFrigorificoComponent } from "../../../components/Avanzados/AvanzadoFrigorificos";

export const AvanzadoFrigorificoPage: React.FC = () => {
    const navigate = useNavigate();

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
         {/*   <HeaderComponent 
                title="Control Avanzado"
                description= ""
                //element={<Button fullWidth variant="contained" onClick ={()=> navigate("/")} >Ir a Lista de Frigorificos</Button>}
            />*/}
            <AvanzadoFrigorificoComponent />

        </Container>
    )

}