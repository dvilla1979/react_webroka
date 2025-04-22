import { Box, Button, CircularProgress, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeFrigorficos } from '../home/interace/frigorifico.interface';
import { TypeCamaras } from "./interface/camara.interface";
import { HeaderComponent, CamaraComponent } from "../../components";
import { useGetValorCamarasByFrioIdQuery } from "../../api/frioApi";
import UpdateIcon from '@mui/icons-material/Update';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


export const CamarasPage: React.FC = () => {

  const navigate = useNavigate();
  const frioData = useLocation();
  const frio: TypeFrigorficos = frioData.state;
  const {
    data, 
    isLoading, 
    error,
    isFetching
  } = useGetValorCamarasByFrioIdQuery(frio!.id, {
    // refetchOnMountOrArgChange: true, //revalida la informacion cuando se monta el componente, pero la revalidacion la hace en background 
     //refetchOnMountOrArgChange: 10, //revalida la informacion cuando se monta el componente pero a los 10 segundos de la ultima vez que hizo un get satisfactorio, pero la revalidacion la hace en background 
   //  refetchOnFocus: true, //revalida la informacion cuando se pone el focus
   //  refetchOnReconnect: true, //revalida la informacion cuando se vuelve a conectar el servidor
    pollingInterval: 60000, //Hace un polling cada 60 seg para revalidar la informacion con el servidor
   });
 
  /*const isPageVisible = usePageVisibility();
  const timerIdRef = React.useRef<NodeJS.Timer | null>(null);
  const [isPollingEnabled, setIsPollingEnabled] = React.useState(true);

  const frio: TypeFrigorficos = frioData.state;
    

  const [allCamSenValor, setAllCamSenValor] = React.useState<TypeCamaras[] | null>([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true); 
    camaras
    .getbyFrioId(frio.id)
    .then((r) => {
        //console.log(r.data.data.camaras);
        setAllCamSenValor(r.data.data.camaras);
        setTimeout(() => setLoading(false), 300); //Una vez que la data cargo a los 300mseg se renderizan los datos 
      })
      .catch((err) => {
        console.error(err);
      });

      const pollingCallback = () => {
        // Your polling logic here
        console.log('Lee datos de api...');
        camaras
        .getbyFrioId(frio.id)
        .then((r) => {
            //console.log(r.data.data.camaras);
            setAllCamSenValor(r.data.data.camaras);
          })
          .catch((err) => {
            console.error(err);
          });
  
        // Simulating an API failure in the polling callback
        const shouldFail = false; //Math.random() < 0.2; // Simulate 20% chance of API failure
  
        if (shouldFail) {
          setIsPollingEnabled(false);
          console.log('Polling failed. Stopped polling.');
        }
      };

      const startPolling = () => {
        // pollingCallback(); // To immediately start fetching data
        // Polling every 120 seconds
        timerIdRef.current = setInterval(pollingCallback, 120000);
      };

      const stopPolling = () => {
        clearInterval(timerIdRef.current!);
      };

      if (isPageVisible && isPollingEnabled) {
        startPolling();
      } else {
        stopPolling();
      }

      return () => {
        stopPolling();
      };


  }, [frio.id, isPageVisible, isPollingEnabled]);*/

  /*if(!isLoading) 
    {
      console.log(data!.data.camaras);
    }
*/
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
      <div>
        <Container maxWidth="xl">
        <Stack sx={{my: 2}} spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            startIcon={<NavigateBeforeIcon />} 
          >
            FRIGORIFICOS
          </Button>
        </Stack>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center"}}>
              <CircularProgress />
            </Box>
          ) : (            
            <Box sx={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: 2 }}>
            {/* Título de la Lista */}
            <Typography variant="h4" textAlign="center" sx={{ marginBottom: 4 }}>
              {`Frigorifico ${frio.name}`}
            </Typography>
            {/* Renderizar Filas */}
            {
              data.data.camaras?.length > 0 ? (
                data.data.camaras!.map((camara: TypeCamaras, index: any) => (
                  <React.Fragment key={index}>
                    <CamaraComponent
                      propsFrio={frio}
                      propsCamara={camara}
                    />
                    {/* Separador */}
                    {index < data.data.camaras!.length - 1 && <Divider sx={{ marginBottom: 2 }} />}
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body1" textAlign="center" sx={{ marginTop: 4 }}>
                  No hay cámaras para mostrar.
                </Typography>
              )}
          </Box>
          )
          }
        </Container>
       </div>
    );
}

/*
<div>
        <Container maxWidth="xl">
          <HeaderComponent
            title= {`Frigorifico ${frio.name}`}
            description = ""
            element={<Button fullWidth variant="contained" onClick ={()=> navigate("/")} >Ir a Lista de Frigorificos</Button>}
          />
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center"}}>
              <CircularProgress />
            </Box>
          ) :
            <>
              <div>
                {
                  data.data.camaras?.length !== 0 ? (
                    <Grid sx={{my: 2}} container spacing={2} direction="row">
                      {
                        data.data.camaras!.map((camara: TypeCamaras) => (
                          <Grid sx={{my: 1}} item xs={12} key={camara.id} >
                            <CamaraComponent propsFrio={frio} propsCamara={camara} />
                          </Grid>
                        ))
                      }
                    </Grid>
                  ) : "No hay datos"
                }
              </div>
              <div>
                  {isFetching ? (
                    <Box sx={{ display: "flex", justifyContent: "center"}}>
                      <UpdateIcon />  
                      <Typography>
                          Actualiza Valores
                      </Typography>
                    </Box>
                  ) : 
                    <>
                    </> 
                  }   
                </div>
            </>
          }
        </Container>
       </div>
       */