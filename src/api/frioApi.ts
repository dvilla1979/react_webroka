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
        maxRetries: 2, //Hace dos reintentos antes de largar el error
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

   /* {
        camaraId: args.id as string,
        fechaInicio: args.fechaInicio as Date,
        fechaFin: args.fechaFin as Date,
    }*/
  
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetFriosAllQuery, 
    useGetFriosByUserQuery, 
    useGetValorCamarasByFrioIdQuery,
    useGetValoresByCamaraIdQuery,
    useLazyGetValoresByCamaraIdQuery
} = frioApi