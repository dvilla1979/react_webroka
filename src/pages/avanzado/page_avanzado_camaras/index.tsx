import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Button, Container } from "@mui/material";
import { HeaderComponent } from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { AvanzadoCamaraComponent } from "../../../components/Avanzados/AvanzadoCamaras";
import { ItemFrigorifico } from "../../../components/Avanzados/interfaces/avanzado.interface";

export const AvanzadoCamarasPage: React.FC = () => {
    const navigate = useNavigate();

    const CamaraData = useLocation();

   // const frioId: string = CamaraData.state.frioId;
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
            {/*<HeaderComponent 
                title="Control Avanzado"
                description= ""
                //element={<Button fullWidth variant="contained" onClick ={()=> navigate("/avanzado")} >Ir a Lista de Frigorificos Registarados</Button>}
            />*/}
            <AvanzadoCamaraComponent propsFrio={frio}/>

        </Container>
    )

}