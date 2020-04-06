import React from "react";

import moment from "moment";

import { useSelector } from "react-redux";

import { Typography, Grid, Card } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { statsSelector } from "../../slices/stats";

import { Overview, PieChart, LineChart } from "../../components";

const useStyles = makeStyles(theme => ({
    gridContainer: {
        padding: theme.spacing(1)
    },
    title: {
        margin: 0,
        padding: 16
    }
}));

function ItalyContainer() {
    const classes = useStyles();

    const { stats } = useSelector(statsSelector);

    if (stats === null) return null;

    const {
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

    const lineChartDataNuoviCasi = getLineChartDataNuoviCasi(
        items
    );

    return (
        <>
            <Card>
                <Title text="Andamento Nazionale" />

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
