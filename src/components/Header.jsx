import React from "react";

import { useHistory } from "react-router-dom";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

// import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        display: "flex",
        fontSize: "1.3rem",
        flexGrow: 1,
    },
}));

function Header({ subTitle, showCloseButton }) {
    const classes = useStyles();

    const history = useHistory();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <div style={{ flexGrow: 1 }}>
                        <Typography
                            component="h1"
                            variant="h1"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            ITALIA-COVID19
                        </Typography>
                        {/* <Typography
                            component="h5"
                            variant="h5"
                            color="inherit"
                            noWrap
                            style={{ fontSize: "0.8rem" }}
                        >
                            {subTitle}
                        </Typography> */}
                    </div>
                    {showCloseButton && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => history.push(`/`)}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
