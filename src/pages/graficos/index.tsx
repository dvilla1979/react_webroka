import { Button, Container } from "@mui/material";
import React from "react";
import { HeaderComponent } from "../../components";
import { localUser } from "../../utils/localUser";
import { TypeCamaras, TypeFrioCamSenValor } from "../camaras/interface/camara.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { GraficoComponent } from "../../components/Grafico";
import { TypeFrigorficos } from "../home/interace/frigorifico.interface";

export const GraficosPage: React.FC = () => {

  const navigate = useNavigate();

  const graficoData = useLocation();
  const camara: TypeCamaras = graficoData.state.propsCamara;
  const frio: TypeFrigorficos = graficoData.state.propsFrio;


//title= {`Grafico de ${camara.name}`}

  return (
    <Container maxWidth="xl">
      <HeaderComponent
        title= {`Frigorifico ${frio.name}`}
        description = ""
        element={<Button fullWidth variant="contained" onClick ={()=> navigate("/camaras",{state: frio})} >Ir a Lista de Camaras</Button>}
      />     
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