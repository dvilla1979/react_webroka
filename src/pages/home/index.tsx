import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { FrigorificoComponent, HeaderComponent } from "../../components";
import { TypeFrigorficos } from "./interace/frigorifico.interface";
//import { frigorificos } from '../../api/frigorificos';
import { useAppSelector } from "../../redux/hooks";
import { useGetFriosByUserQuery } from "../../api/frioApi";

export const HomePage: React.FC = () => {

  const {userData } = useAppSelector((state) => state.authReducer)

  const {
    data,
    isLoading, 
    error,
    isFetching,  //se pone en true cuando hace una actualizacion en backgorund
  } = useGetFriosByUserQuery(userData!.id, {
   // refetchOnMountOrArgChange: true, //revalida la informacion cuando se monta el componente, pero la revalidacion la hace en background 
    //refetchOnMountOrArgChange: 10, //revalida la informacion cuando se monta el componente pero a los 10 segundos de la ultima vez que hizo un get satisfactorio, pero la revalidacion la hace en background 
  //  refetchOnFocus: true, //revalida la informacion cuando se pone el focus
  //  refetchOnReconnect: true, //revalida la informacion cuando se vuelve a conectar el servidor
  });

  //console.log("Estoy usando rtk-query: ", data);


  /*const [allFrigorificos, setAllFrigorificos] = React.useState<TypeFrigorficos[] | null>([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true); 
    frigorificos
      .getByUser(userData!.id)
      .then((r) => {
        setAllFrigorificos(r.data.data.frigorifico);
        setTimeout(() => setLoading(false), 300); //Una vez que la data cargo al segundo se renderizan los datos 
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userData])*/

  /*if(!isLoading) 
  {
    console.log(data!.data.frigorifico[0]);
  }*/

  if (error) {
    if (typeof error === 'object' && error !== null) {
      if('data' in error)
      {
        return (
          <section className="alert alert-danger">
          Falla de conexion con el servidor <div>{JSON.stringify(error.data)}</div>
          </section>
        );
      }
      return (
        <section className="alert alert-danger">
          Falla de conexion con el servidor <div>{JSON.stringify(error)}</div>
        </section>
      );
    }
  }

  return (
    <Container maxWidth="xl"> 
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) :
        <>
          <div>
            {/* Título de la Lista */}
            <Typography variant="h4" textAlign="center" sx={{ marginTop: 2, marginBottom: 2 }}>
              {"Frigorificos"}
            </Typography>
            {
              (data && data.data.frigorifico?.length !== 0) ? (
                <Grid sx={{my: 2}} container spacing={2} direction="row">
                  {
                    data.data.frigorifico!.map((frigorifico: TypeFrigorficos) => (
                      <Grid item xs={3} key={frigorifico.id} >
                        <FrigorificoComponent propsFrigorifico={frigorifico} />
                      </Grid>
                    ))
                  }
                </Grid>
              ) : 
              ("No hay frigorificos para mostrar")
            }
          </div>
        </>
      }
    </Container>
  )
}