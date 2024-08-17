import { Alert, AlertColor, Snackbar, Typography } from "@mui/material";
import React from "react";

type NotificationPops = {
    open: boolean,
    msg: string,
    severity: AlertColor | undefined,
    handleClose: () => void, 
}

export const Notification: React.FC<NotificationPops> = ({
    open,
    msg,
    severity,
    handleClose
}) => {
    return (
        <Snackbar 
            anchorOrigin={{vertical: "top", horizontal:"center"}}
            autoHideDuration={4000} //Va a estar estatico durante 4 segundos
            open = {open}
            onClose = {handleClose}
        >
            <Alert onClose = {handleClose} severity={severity}> 
                <Typography>{msg}</Typography>
            </Alert>
        </Snackbar>
    )
}