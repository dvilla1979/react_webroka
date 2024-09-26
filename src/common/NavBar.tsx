import { AppBar, Box, Button, Container, Grid, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/auth.slice";
import { localUser } from "../utils/localUser";
import IconButton from '@mui/material/IconButton';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from "react-redux";
import { frioApi } from "../api/frioApi";
import AcUnitIcon from '@mui/icons-material/AcUnit';


export const NavBar: React.FC<{}> = () => {
    const {userData, isAuth } = useAppSelector((state) => state.authReducer)
    const navigate = useNavigate();

    const dispatch = useAppDispatch();  
    const handleLogout = () => {
        dispatch(logout());
        localUser.borrar();
        navigate('/login');
    }

    const {data} = useSelector(frioApi.endpoints.getFriosByUser.select(userData!.id)) //Accede a la cache de la consultas realizadas en los otros componentes
    //console.log("Datos Frigorifico desde NavBar", data);

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={()=> navigate("/")}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <AcUnitIcon  sx={{verticalAlign:"middle"}} /> Sistema WebRoka
                    </Typography>
                    <Stack direction= "row" spacing={2}>
                        {userData?.role === "ADMIN" ? (
                         <>
                            <Button 
                                variant= "contained" 
                                onClick={()=> navigate("/avanzado")} 
                                startIcon={<SettingsApplicationsIcon />}
                                size="large"
                                color="secondary"
                            >
                                Avanzado
                            </Button>
                            <Button 
                                variant= "contained" 
                                onClick={()=> navigate("/registrar")} 
                                startIcon={<ManageAccountsIcon />}
                                size="large"
                                color="secondary"
                            >
                                Registrar
                            </Button>
                        </>
                        ):
                        <></>
                        }   
                        <Button 
                            variant= "contained" 
                            onClick={()=> handleLogout()} 
                            startIcon={<LogoutIcon />}
                            size="large"
                            color="secondary"
                        >
                            Logout
                        </Button>
                        <Stack alignItems="center" direction="row" gap={2}>
                            <PersonIcon />
                            <Typography variant="h6">{`${userData?.name}`}</Typography>
                        </Stack>    
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

/*
            <AppBar position="sticky">
                <Toolbar>
                    <Container maxWidth = "xl">
                        <Grid 
                            container
                            direction = "row" 
                            justifyContent="space-between" 
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography>Roka</Typography>
                            </Grid>
                            <Grid item>
                                {
                                    isAuth ? 
                                        <Stack direction= "column" spacing={1}>
                                            {userData !== undefined ? 
                                            (<>
                                                <Typography>{`Usuario: ${userData?.name}`}</Typography>
                                                {userData?.role === "ADMIN" ? (
                                                    <Button variant= "contained">Register</Button>
                                                ):
                                                <></>
                                                }   
                                            </>
                                            )
                                            :
                                                <></>
                                            }
                                            <Button variant= "contained" onClick={()=> handleLogout()}>Logout</Button>                                            
                                        </Stack>
                                    :
                                        <Stack direction= "row" spacing={2}>
                                            <Button variant= "contained" onClick ={()=> navigate("login")}>Login</Button>
                                            <Button variant= "outlined">Register</Button>
                                        </Stack>
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>

*/