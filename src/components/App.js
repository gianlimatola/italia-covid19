import React, { useEffect } from "react";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchStats, statsSelector } from "../slices/stats";
import { appSelector } from "../slices/app";

import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

import Header from "./Header";
import Footer from "./Footer";
import Progress from "./Progress";

import Italy from "../pages/italy/ItalyContainer";
import Region from "../pages/region/RegionContainer";

import theme from "./theme";

import { CssBaseline } from "@material-ui/core";
import { RouteManager } from "./RouteManager";

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    container: {
        marginBottom: 20,
        paddingTop: 8,
        [theme.breakpoints.up("sm")]: {
            padding: 8,
        },
        minHeight: "calc(100vh - 148px)",
    },
}));

function App() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { loading } = useSelector(statsSelector);
    
    const { headerSubTitle, closeButton } = useSelector(appSelector);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <RouteManager />
                <Header
                    subTitle={headerSubTitle}
                    showCloseButton={closeButton}
                />
                <div className={classes.offset} />
                <div className={classes.container}>
                    {loading && <Progress />}
                    {!loading && (
                        <Switch>
                            <Route
                                exact
                                strict
                                path="/:region"
                                component={Region}
                            />
                            <Route exact strict path="/" component={Italy} />
                            <Redirect to="/" />
                        </Switch>
                    )}
                </div>
                {!loading && <Footer />}
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
