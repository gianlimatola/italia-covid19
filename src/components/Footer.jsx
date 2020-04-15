import React from "react";

import { Typography, IconButton, Toolbar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles(theme => ({
    appBar: {
        top: "auto",
        bottom: 0,
        textAlign: "center"
    },
    toolbar: {
        justifyContent: "space-between"
    },
    footer: {
        backgroundColor: theme.palette.primary.main,
        color: "white"
    }
}));

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="body2" color="inherit" align="center">
                    Sviluppato da Gianluca Limatola
                </Typography>

                <IconButton
                    color="inherit"
                    href="https://github.com/gianlimatola/italia-covid19"
                    target="_blank"
                    rel="noopener"
                >
                    <GitHubIcon />
                </IconButton>
            </Toolbar>
        </div>
        // <AppBar  color="primary" className={classes.appBar}>
        //     <Toolbar className={classes.toolbar}>
        //         <Typography variant="body2" color="inherit" align="center">
        //             Sviluppato da Gianluca Limatola
        //         </Typography>

        //         <IconButton
        //             color="inherit"
        //             href="https://github.com/gianlimatola/italia-covid19"
        //             target="_blank"
        //             rel="noopener"
        //         >
        //             <GitHubIcon />
        //         </IconButton>
        //     </Toolbar>
        // </AppBar>
    );
}

export default Footer;
