import React, { useEffect } from "react";

import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import { Typography, Grid, Card } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { statsSelector } from "../../slices/stats";

import { changeHeaderSubTitle } from "../../slices/app";

import { Overview, PieChart, LineChart } from "../../components";

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
    }
}));

function ItalyContainer() {
    const classes = useStyles();

    const { stats } = useSelector(statsSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeHeaderSubTitle("Dato Nazioniale"));
    }, [dispatch]);

    if (stats === null) return null;

    const {
        updateDateTime,
        italy: { items }
    } = stats;

    const overview = items[items.length - 1];

    const pieChartData = [
        {
            name: "Positivi",
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

    const lineChartDataAndamentoGiornaliero = getLineChartDataAndamentoGiornaliero(
        items
    );

    const lineChartDataNuoviCasi = getLineChartDataNuoviCasi(items);

    return (
        <>
            <Card>
                <Title text="Panoramica" />
                <Typography
                    component="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.lastSync}
                >
                    Dati aggiornati a{" "}
                    {moment(updateDateTime).format("dddd D MMMM YYYY")}
                </Typography>

                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} md={8} lg={8}>
                        <Overview data={overview} />
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <PieChart data={pieChartData} />
                    </Grid>
                </Grid>
            </Card>

            <Card style={{ marginTop: 20 }}>
                <Title text="Andamento giornaliero" />

                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12}>
                        <LineChart data={lineChartDataAndamentoGiornaliero} />
                    </Grid>
                </Grid>
            </Card>

            <Card style={{ marginTop: 20 }}>
                <Title text="Nuovi casi" />

                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12}>
                        <LineChart data={lineChartDataNuoviCasi} />
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default ItalyContainer;

const getLineChartDataAndamentoGiornaliero = items => {
    return {
        data: items.reduce((accumulator, currentValue) => {
            accumulator.push({
                data: moment(currentValue.data).format("L"),
                totaleContagiati: currentValue.totaleContagiati,
                totalePositivi: currentValue.totalePositivi,
                totaleGuariti: currentValue.totaleGuariti,
                totaleDeceduti: currentValue.totaleDeceduti
            });

            return accumulator;
        }, []),
        options: {
            lines: [
                {
                    label: "Contagiati",
                    dataKey: "totaleContagiati",
                    color: "red"
                },
                {
                    label: "Positivi",
                    dataKey: "totalePositivi",
                    color: "orange"
                },
                {
                    label: "Guariti",
                    dataKey: "totaleGuariti",
                    color: "green"
                },
                {
                    label: "Deceduti",
                    dataKey: "totaleDeceduti",
                    color: "black"
                }
            ]
        }
    };
};

const getLineChartDataNuoviCasi = items => {
    return {
        data: items.reduce((accumulator, currentValue) => {
            accumulator.push({
                data: moment(currentValue.data).format("L"),
                nuoviContagiati: currentValue.nuoviContagiati,
                nuoviPositivi: currentValue.nuoviPositivi,
                nuoviGuariti: currentValue.nuoviGuariti,
                nuoviDeceduti: currentValue.nuoviDeceduti
            });

            return accumulator;
        }, []),
        options: {
            lines: [
                {
                    label: "Contagiati",
                    dataKey: "nuoviContagiati",
                    color: "red"
                },
                {
                    label: "Positivi",
                    dataKey: "nuoviPositivi",
                    color: "orange"
                },
                {
                    label: "Guariti",
                    dataKey: "nuoviGuariti",
                    color: "green"
                },
                {
                    label: "Deceduti",
                    dataKey: "nuoviDeceduti",
                    color: "black"
                }
            ]
        }
    };
};

const Title = ({ text }) => {
    const classes = useStyles();

    return (
        <Typography
            variant="h5"
            color="primary"
            gutterBottom
            align="center"
            className={classes.title}
        >
            {text}
        </Typography>
    );
};
