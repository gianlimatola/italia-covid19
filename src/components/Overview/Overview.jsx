import React from "react";

import moment from "moment";

import { Typography, Grid, Card, Link, Chip } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    gridContainer: {
        padding: theme.spacing(1)
    },
    title: {
        margin: 0,
        padding: "16px 16px 0 16px"
    },
    lastSync: {
        fontSize: "0.8rem"
    },
    card: {
        marginTop: 20
    },
    horizontalPaper: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        textAlign: "center"
    }
}));

const Overview = ({ dailyStatistics }) => {
    const classes = useStyles();

    const lastDayStatistics = dailyStatistics[dailyStatistics.length - 1];
    const penultimateDayStatistics =
        dailyStatistics[dailyStatistics.length - 2];

    return (
        <Card>
            <Typography
                variant="h5"
                color="primary"
                gutterBottom
                align="center"
                className={classes.title}
            >
                Panoramica
            </Typography>

            <Typography
                component="h5"
                color="inherit"
                align="center"
                noWrap
                className={classes.lastSync}
            >
                Dati aggiornati a{" "}
                {moment(lastDayStatistics.data).format("dddd D MMMM YYYY")}
                <br />
                Fonte:{" "}
                <Link
                    target="_blank"
                    rel="noopener"
                    href="http://www.protezionecivile.gov.it/"
                >
                    Protezione Civile
                </Link>
            </Typography>

            <Grid container className={classes.gridContainer}>
                {getStatisticsBoxList(
                    lastDayStatistics,
                    penultimateDayStatistics
                ).map(statisticsBox => {
                    const { ...rest } = statisticsBox;

                    return (
                        <Grid key={statisticsBox.label} item xs={12} sm={6}>
                            <BoxOverview {...rest} />
                        </Grid>
                    );
                })}
            </Grid>
        </Card>
    );
};

export default Overview;

function getStatisticsBoxList(lastDayStatistics, penultimateDayStatistics) {
    return [
        {
            label: "Contagiati",
            value: lastDayStatistics.totaleContagiati,
            variance: lastDayStatistics.nuoviContagiati,
            color: "red"
        },
        {
            label: "Positivi",
            value: lastDayStatistics.totalePositivi,
            variance: lastDayStatistics.nuoviPositivi,
            color: "orange"
        },
        {
            label: "Guariti",
            value: lastDayStatistics.totaleGuariti,
            variance: lastDayStatistics.nuoviGuariti,
            color: "green"
        },
        {
            label: "Deceduti",
            value: lastDayStatistics.totaleDeceduti,
            variance: lastDayStatistics.nuoviDeceduti,
            color: "black"
        }
    ];
}

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
