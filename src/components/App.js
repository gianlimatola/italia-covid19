import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchStats, statsSelector } from "../slices/stats";

import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

import Header from "./Header";
import Footer from "./Footer";

import Italy from "../pages/italy/ItalyContainer";
import theme from "./theme";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    container: {
        marginBottom: 64,
        [theme.breakpoints.up("sm")]: {
            padding: 16
        }
    }
}));

function App() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { stats, loading, hasErrors } = useSelector(statsSelector);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Header updateDateTime={loading ? null : stats.updateDateTime} />
            <div className={classes.offset} />
            <div className={classes.container}>
                <Router>
                    <Switch>
                        <Route path="/" component={Italy} />
                    </Switch>
                </Router>
            </div>
            <Footer />
        </MuiThemeProvider>
    );
}

export default App;
