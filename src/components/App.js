import React, { useEffect } from "react";

import ReactGa from "react-ga";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchStats, statsSelector } from "../slices/stats";
import { appSelector } from "../slices/app";

import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

import Header from "./Header";
import Footer from "./Footer";
import Progress from "./Progress";

import Italy from "../pages/italy/ItalyContainer";
// import Region from "../pages/region/RegionContainer";

import theme from "./theme";

import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    container: {
        marginBottom: 20,
        [theme.breakpoints.up("sm")]: {
            padding: 16
        },
        minHeight: "calc(100vh - 148px)"
    }
}));

function App() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { stats, loading, hasErrors } = useSelector(statsSelector);
    const { headerSubTitle } = useSelector(appSelector);

    useEffect(() => {
        if (process.env.NODE_ENV !== "development") {
            ReactGa.initialize("UA-163255882-1");

            ReactGa.pageview("/");
        }

        dispatch(fetchStats());
    }, [dispatch]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Header subTitle={headerSubTitle} />
            <div className={classes.offset} />
            <div className={classes.container}>
                {loading && <Progress />}
                {!loading && (
                    <Router>
                        <Switch>
                            {/* <Route
                                exact
                                strict
                                path="/:region"
                                component={Region}
                            /> */}
                            <Route exact strict path="/" component={Italy} />
                            <Redirect to="/" />
                        </Switch>
                    </Router>
                )}
            </div>
            {!loading && <Footer />}
        </MuiThemeProvider>
    );
}

export default App;
