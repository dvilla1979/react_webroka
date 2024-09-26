import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RouterLayout } from "./common/RouterLayout";
import { CamarasPage } from "./pages/camaras";
import { GraficosPage } from "./pages/graficos";
import { AvanzadoFrigorificoPage } from "./pages/avanzado/page_avanzado_frigorificos";
import { AvanzadoCamarasPage } from "./pages/avanzado/page_avanzado_camaras";
import { AvanzadoSensoresPage } from "./pages/avanzado/page_avanzado_sensores";
import { RegisterUserPage } from "./pages/registros";

export const AppRouter: React.FC<{}> = () => {

    return (
        <Routes>
            <Route path="/" element = {<RouterLayout/>}> 
                <Route path="/" element = {<HomePage/>} />
                <Route path="/camaras" element = {<CamarasPage/>} />
                <Route path="/graficos" element = {<GraficosPage/>} />
                <Route path="/avanzado" element = {<AvanzadoFrigorificoPage/>} />
                <Route path="/avanzado/camaras" element = {<AvanzadoCamarasPage/>} />
                <Route path="/avanzado/sensores" element = {<AvanzadoSensoresPage/>} />
                <Route path="/registrar" element = {<RegisterUserPage/>} />
            </Route>
            <Route path="/login" element = {<LoginPage/>} />
        </Routes>
    )
}