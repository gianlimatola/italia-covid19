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

    const XS = 12;
    const SM = 6;
    const MD = 6;
    const LG = 6;

    const { stats } = useSelector(statsSelector);

    if (stats === null) return null;

    const {
        italy: { overview }
    } = stats;

    const pieChartData = [
        {
            name: "Attuali positivi",
            value: overview.totalePositivi,
            color: "orange"
        },
        {
            name: "Guariti",
            value: overview.totaleGuariti,
            color: "green"
        },
        {
            name: "Deceduti",
            value: overview.totaleDeceduti,
            color: "black"
        }
    ];

    return (
        <>
            <Typography variant="h4" gutterBottom align="center">
                Andamento Nazionale
            </Typography>

            <Grid container className={classes.gridContainer}>
                <Grid item xs={XS} md={8} lg={8}>
                    <Overview data={overview} />
                </Grid>

                <Grid item xs={XS} md={4} lg={4}>
                    <PieChart data={pieChartData} />
                </Grid>
            </Grid>
        </>
    );
}

export default ItalyContainer;
