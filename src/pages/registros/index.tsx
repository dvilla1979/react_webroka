import React from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RegistroUserComponent } from "../../components/Registro";

export const RegisterUserPage: React.FC = () => {
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

            <RegistroUserComponent />

        </Container>
    )

}