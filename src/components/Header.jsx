import React from "react";

import moment from "moment";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    title: {
        display: "flex",
        fontSize: "1.3rem",
        flexGrow: 1
    },
    toolbar: {
        justifyContent: "space-between"
    },
    lastSync: {
        display: "flex",
        fontSize: "0.8rem"
    }
}));

function Header({ updateDateTime }) {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h1"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    COVID-19
                </Typography>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.lastSync}
                >
                    {updateDateTime && (
                        <>
                            Dati aggiornati a:
                            <br />
                            {moment(updateDateTime).format("llll")}
                        </>
                    )}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
