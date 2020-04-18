import React, { useState } from "react";

import { useHistory, NavLink } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";

import { regionsDictionary } from "../data";

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
    const [openDrawer, setOpenDrawer] = useState(false);

    const classes = useStyles();

    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
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
            <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
                <List className="DrawerList">
                    <ListItem
                        button
                        component={NavLink}
                        onClick={() => setOpenDrawer(false)}
                        to={`/`}
                    >
                        <ListItemIcon>
                            <img
                                height={24}
                                src={`/images/italia.png`}
                                alt=""
                            />
                        </ListItemIcon>
                        <ListItemText primary="Dato Nazionale" />
                    </ListItem>
                    <Divider />
                    {Array.from(regionsDictionary.values())
                        .sort((a, b) => {
                            if (a.descrizione > b.descrizione) {
                                return 1;
                            }

                            return -1;
                        })
                        .map((region, index) => (
                            <ListItem
                                button
                                key={index}
                                component={NavLink}
                                onClick={() => setOpenDrawer(false)}
                                to={`/${region.slug}`}
                            >
                                <ListItemIcon>
                                    <img
                                        height={24}
                                        src={`/images/${region.slug}.png`}
                                        alt=""
                                    />
                                </ListItemIcon>
                                <ListItemText primary={region.descrizione} />
                            </ListItem>
                        ))}
                </List>
            </Drawer>
        </>
    );
}

export default Header;
