import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element

}

export enum ThemePallete {
    //BG = "#12181b", //Color del backgorund 
    //BG = "#dfeaf", //Color del backgorund
    BG = "#ffff", //Color del backgorund
    //LIME = "#C8FA5F",
    NAVYBLUE = "#0069d9",
    AIRFORCEBLUE = "#3387E1",
    FONT_GLOBAL = "'JetBrains Mono', monospace",
    //Alert styles
    ERROR_MAIN= "#f44336",
    BG_ERROR_MAIN = "rgba(244,67,54,0.1)",
    SUCCESS_MAIN= "#66bb6a",
    BG_SUCCESS_MAIN = "rgba(102,187,106,0.1)",
}

const theme = createTheme ({
    palette:{
        mode: "light",
        background: {
            default: ThemePallete.BG,
        },
        primary: {
            main:   ThemePallete.NAVYBLUE,
        },
        secondary: {
            main:   ThemePallete.AIRFORCEBLUE,
        }
    },
    typography: {
        fontFamily: ThemePallete.FONT_GLOBAL,
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform : "none",
                    boxShadow: "none",
                    borderRadius: "0.5em",
                }
            }
        },
        MuiAlert:{
            defaultProps: {
                style: {
                    borderRadius: "0.8em",
                    fontSize: "1em",
                }
            },
            styleOverrides:{
                standardError: {
                    border: `1px solid ${ThemePallete.ERROR_MAIN}`,
                    backgroundColor: ThemePallete.BG_ERROR_MAIN,
                },
                standardSuccess: {
                    border: `1px solid ${ThemePallete.SUCCESS_MAIN}`,
                    backgroundColor: ThemePallete.BG_SUCCESS_MAIN,
                }
            },
            
        },
    }
})

//este componente se comporta como un provider para toda la aplicacion
export const ThemeConfig: React.FC<ThemeProp> = ({children}) => {
    return (
        <ThemeProvider theme = {theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )

}