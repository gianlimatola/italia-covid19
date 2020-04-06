import React from "react";

import { Typography, Chip, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    gridContainer: {
        padding: theme.spacing(1)
    },
    horizontalPaper: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        textAlign: "center"
    }
}));

function Overview({ data }) {
    const classes = useStyles();

    const XS = 12
    const SM = 6
    const MD = 6
    const LG = 6

    const {
        totaleContagiati,
        nuoviContagiati,
        totalePositivi,
        nuoviPositivi,
        totaleGuariti,
        nuoviGuariti,
        totaleDeceduti,
        nuoviDeceduti
    } = data;

    return (
        <Grid container className={classes.gridContainer}>
            <Grid item xs={XS} sm={SM} md={MD} lg={LG}>
                <BoxOverview
                    label="Contagiati"
                    value={totaleContagiati}
                    variance={nuoviContagiati}
                    color="red"
                />
            </Grid>
            <Grid item xs={XS} sm={SM} md={MD} lg={LG}>
                <BoxOverview
                    label="Positivi"
                    value={totalePositivi}
                    variance={nuoviPositivi}
                    color="orange"
                />
            </Grid>
            <Grid item xs={XS} sm={SM} md={MD} lg={LG}>
                <BoxOverview
                    label="Guariti"
                    value={totaleGuariti}
                    variance={nuoviGuariti}
                    color="green"
                />
            </Grid>
            <Grid item xs={XS} sm={SM} md={MD} lg={LG}>
                <BoxOverview
                    label="Deceduti"
                    value={totaleDeceduti}
                    variance={nuoviDeceduti}
                    color="black"
                />
            </Grid>
        </Grid>
    );
}

export default Overview;

const BoxOverview = ({ label, value, variance, color }) => {
    const classes = useStyles();

    return (
        <div className={classes.horizontalPaper}>
            <Typography
                variant="h3"
                gutterBottom
                style={{ marginBottom: 0, color: color }}
            >
                {Intl.NumberFormat("it").format(value)}
            </Typography>
            <Typography
                className={classes.content}
                style={{ marginBottom: 0, color: color }}
                gutterBottom
            >
                (
                {Intl.NumberFormat("it", { signDisplay: "always" }).format(
                    variance
                )}
                )
            </Typography>
            <Chip
                color="secondary"
                style={{ backgroundColor: color }}
                label={label}
            />
        </div>
    );
};
