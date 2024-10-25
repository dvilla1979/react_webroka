import { createAsyncThunk } from "@reduxjs/toolkit";
import { user } from "../../api/user";


export const authThunk = createAsyncThunk(
    'login',
    async (
        {username, password}: {username: string, password: string},
        {rejectWithValue},
    ) => {
        try {

            const AuthData = await user.login(username, password);

            //console.log("Ejecuta login de acceso")

            const resData = AuthData.data;           

            localStorage.setItem("userInfo", JSON.stringify(resData));

            //console.log("Se obtiene token de acceso:" + JSON.stringify(resData));

            if (AuthData.status === 200) {
                return resData // Retornamos los datos del usuario desde la respuesta
              }

         //   return resData;

        } catch (error: any) {
            
            if (error.response && error.response.status === 401) {
                // En caso de error 401, devolvemos un mensaje de error específico
                return rejectWithValue('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
              } else {
                // En caso de otros errores, devolvemos un mensaje de error genérico
                return rejectWithValue('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
              }
        }
    },
)