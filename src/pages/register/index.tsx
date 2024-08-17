import React from "react";
import { useAppSelector } from "../../redux/hooks";

export const RegisterPage: React.FC = () => {

  const {userData } = useAppSelector((state) => state.authReducer)

  return (<></>)

}