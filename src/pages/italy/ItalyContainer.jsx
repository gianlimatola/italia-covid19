import React from "react";

import { useSelector } from "react-redux";

import { Typography, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { statsSelector } from "../../slices/stats";

import { Overview, PieChart } from "../../components";

const useStyles = makeStyles(theme => ({
    gridContainer: {
        padding: theme.spacing(1)
    }
}));

function ItalyContainer() {
    const classes = useStyles();

    const { stats } = useSelector(statsSelector);

    if (stats === null) return null;

    const {
        italy: { overview }
    } = stats;

    return (
        <>
            <Typography variant="h4" gutterBottom align="center">
                Andamento Nazionale
            </Typography>

            <Grid container className={classes.gridContainer}>
                <Grid item xs={12}>
                    <Overview data={overview} />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <PieChart />
                </Grid> */}
            </Grid>
        </>
    );
}

export default ItalyContainer;
