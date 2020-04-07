import React from "react";

// import moment from "moment";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    title: {
        display: "flex",
        fontSize: "1.3rem",
        flexGrow: 1
    }
}));

function Header({ subTitle }) {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <div>
                    <Typography
                        component="h1"
                        variant="h1"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        ITALIA-COVID19
                    </Typography>
                    <Typography
                        component="h5"
                        variant="h5"
                        color="inherit"
                        noWrap
                        //className={classes.title}
                        style={{ fontSize: "0.8rem" }}
                    >
                        {/* Dato Nazioniale */}
                        {/* Regione Friuli Venezia Giulia */}
                        {subTitle}
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
