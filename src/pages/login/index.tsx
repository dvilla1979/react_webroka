import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React from "react";
import { LoginValidate } from '../../utils/validateForm';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Navigate, useNavigate } from 'react-router-dom';
import { authThunk } from '../../redux/thunks/auth.thunks';
import { useNotification } from '../../context/notification.context';


type LoginType = {
  username: string;
  password: string;
}


export const LoginPage: React.FC<{}> = () =>{

  //const {getSuccess} = useNotification();
  const {isAuth, userData, error} = useAppSelector((state) => (state.authReducer))
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  
  //const error = useAppSelector((state) => state.authReducer.error);

  const {getError} = useNotification();

  const formik = useFormik<LoginType>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidate,  
    onSubmit: async (values: LoginType) => {
      await dispatch(authThunk(values))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch(e => {
          getError(e);
        }
      );      
    },
  });


//
  return (
      <Container 
        maxWidth = "sm"
      >
        <Grid 
          container 
          direction="column" 
          alignItems="center" 
          justifyContent="center"
          sx= {{minHeight: "100vh"}}
        >
          <Grid item>
            <Paper 
              sx={{padding: "1.2em", 
              borderRadius: "0.5em"}}
            >
              <Typography
                  sx= {{mt: 1, mb:1}}
                  variant="h4"
                >
                  Acceso a WebRoka
              </Typography>
              <Typography
                  sx= {{mt: 1, mb:1}}
                  variant="h6"
                >
                  Ingresar usuario y contraseña
              </Typography>              
              <Box component="form" onSubmit={formik.handleSubmit}>
                  <TextField 
                    name= "username" 
                    margin= "normal"
                    type= "text"
                    fullWidth 
                    label="Username"
                    sx= {{mt: 2, mb:1.5}}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
          
                    />
                  <TextField 
                    name= "password"
                    margin= "normal"
                    type = "password"
                    fullWidth 
                    label="Password"
                    sx= {{mt: 1.5, mb:1.5}}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
          
                  />
                  <Button 
                    fullWidth 
                    type= "submit"
                    variant= "contained" 
                    sx= {{mt: 1.5, mb:3}}
                  >
                    Iniciar sesión
                  </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>


      <Button fullWidth variant = "outlined">
        Estamos en Login
      </Button>
    </Container>
  )
    
}