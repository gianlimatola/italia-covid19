import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchStats, statsSelector } from "../slices/stats";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

import Header from "./Header";
import Footer from "./Footer";

import Italy from "../pages/italy/ItalyContainer";
import theme from "./theme";

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    container: {
        marginBottom: 64
    }
}));

function App() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { stats, loading, hasErrors } = useSelector(statsSelector);

    useEffect(() => {
        dispatch(fetchStats());
    }, [dispatch]);

    console.log(stats, loading, hasErrors);

    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
}

export default App;
