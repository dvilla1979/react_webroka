import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";

type HeaderProps = {
    title: string,
    description: string,
    element?: React.ReactNode | null

}

export const HeaderComponent: React.FC<HeaderProps> = ({
    title,
    description,
    element
}) => {
    return (
        <div>
            <Box sx = {{width: "100%", height: "150px"}}>
                <Grid 
                    container
                    direction = "row"
                    justifyContent="center"
                    alignItems="center"
                    sx = {{height: "100%"}}
                >
                    <Grid item xs = {10}>
                        <Grid 
                            container
                            direction = "column"
                            justifyContent="center"
                            alignItems="center"
                            sx = {{height: "100%"}}
                        >
                        <Grid item>
                            <Typography variant = "h3">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid sx={{mt: 1}} item>
                            <Typography>
                                {description}
                            </Typography>
                        </Grid>
                        <Grid item></Grid>
                        {element !== undefined && (
                            <Grid sx= {{mt: 1, width: "50%"}} item>
                                {element}
                            </Grid>
                        )}
                    </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Divider/>
        </div>
        )
}