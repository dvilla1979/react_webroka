import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RouterLayout } from "./common/RouterLayout";
import { CamarasPage } from "./pages/camaras";
import { GraficosPage } from "./pages/graficos";

export const AppRouter: React.FC<{}> = () => {

    return (
        <Routes>
            <Route path="/" element = {<RouterLayout/>}> 
                <Route path="/" element = {<HomePage/>} />
                <Route path="/camaras" element = {<CamarasPage/>} />
                <Route path="/graficos" element = {<GraficosPage/>} />
            </Route>
            <Route path="/login" element = {<LoginPage/>} />
        </Routes>
    )
}