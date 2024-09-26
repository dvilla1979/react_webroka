import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { HeaderComponent } from "../../components";
import { localUser } from "../../utils/localUser";
import { TypeCamaras, TypeFrioCamSenValor } from "../camaras/interface/camara.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { GraficoComponent } from "../../components/Grafico";
import { TypeFrigorficos } from "../home/interace/frigorifico.interface";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export const GraficosPage: React.FC = () => {

  const navigate = useNavigate();

  const graficoData = useLocation();
  const camara: TypeCamaras = graficoData.state.propsCamara;
  const frio: TypeFrigorficos = graficoData.state.propsFrio;


//title= {`Grafico de ${camara.name}`}

  return (
    <Container maxWidth="xl">
        <Stack sx={{my: 2}} spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            startIcon={<KeyboardDoubleArrowLeftIcon />} 
          >
            FRIGORIFICOS
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/camaras",{state: frio})}
            startIcon={<NavigateBeforeIcon />} 
          >
            CAMARAS
          </Button>
        </Stack>  
      <>
        <div>
          {
            <GraficoComponent propsCamara={camara} />
          }
        </div>
      </>
    </Container>
  )
}