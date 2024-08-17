import React  from 'react';
import { NavBar } from './NavBar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export const RouterLayout: React.FC<{}> = () => {
    const {isAuth} = useAppSelector((state) => state.authReducer)

   // console.log("Hola desde Router Layout=", userData)

    return isAuth? (
        <>
            <NavBar />
            <Outlet />
        </>
    ): (
        <Navigate to= '/login' />
    )
}  