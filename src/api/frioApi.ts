// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { localUser } from '../utils/localUser';

const BASE_URL = "http://192.168.0.239:8000/api/";

// Define a service using a base URL and expected endpoints
export const frioApi = createApi({
  reducerPath: 'frioApi',
  baseQuery: retry (
    fetchBaseQuery({ 
        baseUrl: BASE_URL, 
        prepareHeaders: (headers) => {
            const token = localUser.accessToken();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
        },
    }),{
        maxRetries: 1, //Hace dos reintentos antes de largar el error
    },
  ),
  keepUnusedDataFor: 60, //Cantidad de tiempo que los datos quedan en cache (60 segundos)
  //refetchOnMountOrArgChange: true, //revalida la informacion cuando se monta el componente, pero la revalidacion la hace en background 
  //refetchOnMountOrArgChange: 10, //revalida la informacion cuando se monta el componente pero a los 10 segundos de la ultima vez que hizo un get satisfactorio, pero la revalidacion la hace en background 
  refetchOnFocus: true, //revalida la informacion cuando se pone el focus
  refetchOnReconnect: true, //revalida la informacion cuando se vuelve a conectar el servidor

  endpoints: (builder) => ({
    getFriosAll: builder.query({
      query: () => "/frigorificos",
      //extraOptions: {maxRetries: 3} Se pudee hacer en cada consulta en particular
    }),
    getFriosByUser: builder.query({
        query: (id: string) => "/userRel/" + id,
    }),
    getUsersFrios: builder.query({
        query: () => "/usersRel",
    }),
    getValorCamarasByFrioId:builder.query({
        query: (id: string) => ({
            url: "/valoresfrio",
            params: {
                frioId: id
            },
        })
    }),
    getValoresByCamaraId:builder.query({
        query: (args) => ({
            url: "/valorescamara",
            params: args,
        })
    }),
    getCamarasByFrioId:builder.query({
        query: (id: string) => ({
            url: "/camaras",
            params: {
                frioId: id
            },
        })
    }),
    getSensoresByCamaraId:builder.query({
        query: (id: string) => ({
            url: "/sensores",
            params: {
                camaraId: id
            },
        })
    }),




    agregarFrigorfico: builder.mutation({
        query: (nuevoFrigorifico) => ({
            url:"/createFrigorifico",
            method: "post",
            body: nuevoFrigorifico,
        })
    }),
    actualizarFrigorfico: builder.mutation({
        query: ({ id, ...rest }) => ({
            url:`updateFrigorifico/${id}`,
            method: "put",
            body: rest,
        })
    }),
    borrarFrigorfico: builder.mutation({
        query: (id) => ({
            url:`deleteFrigorifico/${id}`,
            method: "delete",
        })
    }),

    agregarCamara: builder.mutation({
        query: (nuevaCamara) => ({
            url:"/createCamara",
            method: "post",
            body: nuevaCamara,
        })
    }),
    actualizarCamara: builder.mutation({
        query: ({ id, ...rest }) => ({
            url:`updateCamara/${id}`,
            method: "put",
            body: rest,
        })
    }),
    borrarCamara: builder.mutation({
        query: (id) => ({
            url:`deleteCamara/${id}`,
            method: "delete",
        })
    }),

    agregarSensor: builder.mutation({
        query: (nuevoSensor) => ({
            url:"/createSensor",
            method: "post",
            body: nuevoSensor,
        })
    }),
    actualizarSensor: builder.mutation({
        query: ({ id, ...rest }) => ({
            url:`updateSensor/${id}`,
            method: "put",
            body: rest,
        })
    }),
    borrarSensor: builder.mutation({
        query: (id) => ({
            url:`deleteSensor/${id}`,
            method: "delete",
        })
    }),

    agregarUsuario: builder.mutation({
        query: (nuevoSensor) => ({
            url:"/createUser",
            method: "post",
            body: nuevoSensor,
        })
    }),
    actualizarUsuario: builder.mutation({
        query: ({ id, ...rest }) => ({
            url:`updateUser/${id}`,
            method: "put",
            body: rest,
        })
    }),
    borrarUsuario: builder.mutation({
        query: (id) => ({
            url:`deleteUser/${id}`,
            method: "delete",
        })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetFriosAllQuery, 
    useGetFriosByUserQuery, 
    useGetUsersFriosQuery,
    useGetValorCamarasByFrioIdQuery,
    useGetValoresByCamaraIdQuery,
    useLazyGetValoresByCamaraIdQuery,
    useGetCamarasByFrioIdQuery,
    useGetSensoresByCamaraIdQuery,
    useAgregarFrigorficoMutation,
    useActualizarFrigorficoMutation,
    useBorrarFrigorficoMutation,
    useAgregarCamaraMutation,
    useActualizarCamaraMutation,
    useBorrarCamaraMutation,
    useAgregarSensorMutation,
    useActualizarSensorMutation,
    useBorrarSensorMutation,
    useAgregarUsuarioMutation,
    useActualizarUsuarioMutation,
    useBorrarUsuarioMutation,
} = frioApi