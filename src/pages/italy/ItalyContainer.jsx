import React, { useEffect } from "react";

import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import {
    Typography,
    Grid,
    Card,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Link
} from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { makeStyles } from "@material-ui/core/styles";

import { statsSelector } from "../../slices/stats";

import { changeHeaderSubTitle } from "../../slices/app";

import { Overview, LineChart, BarChart } from "../../components";

import { regionsDictionary } from "../../data";

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
        marginTop: 8
    }
}));

function ItalyContainer() {
    const classes = useStyles();

    const isUpSm = useMediaQuery("(min-width:600px)"); // useMediaQuery(theme.breakpoints.up("xs"));

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

    const barChartDistribuzionePerRegione = getBarChartDistribuzionePerRegione(
        stats.regions.latest
    );

    return (
        <>
            <Overview dailyStatistics={items} />

            <Card className={classes.card}>
                <Title text="Andamento giornaliero" />

                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12}>
                        <LineChart data={lineChartDataAndamentoGiornaliero} />
                    </Grid>
                </Grid>
            </Card>

            <Card className={classes.card}>
                <Title text="Nuovi casi" />

                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12}>
                        <LineChart data={lineChartDataNuoviCasi} />
                    </Grid>
                </Grid>
            </Card>

            <Card className={classes.card}>
                <Title text="Dettaglio per regione" />

                <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Regione</TableCell>
                            <TableCell align="right">Contagiati</TableCell>
                            <TableCell align="right">
                                % contagiati/ popolazione
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stats.regions.latest.map(row => (
                            <TableRow key={row.codice}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ minWidth: 150 }}
                                >
                                    {isUpSm
                                        ? regionsDictionary.get(row.codice)
                                              .descrizione
                                        : regionsDictionary.get(row.codice)
                                              .descrizioneBreve}
                                </TableCell>
                                <TableCell align="right">
                                    {Intl.NumberFormat("it").format(
                                        row.totaleContagiati
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {Intl.NumberFormat("it", {
                                        style: "percent",
                                        minimumFractionDigits: 3,
                                        maximumFractionDigits: 3
                                    }).format(
                                        row.totaleContagiati /
                                            regionsDictionary.get(row.codice)
                                                .popolazione
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Card className={classes.card}>
                <Title text="Distribuzione per regione" />

                <BarChart data={barChartDistribuzionePerRegione} />
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

const getBarChartDistribuzionePerRegione = items => {
    return {
        data: items
            .reduce((accumulator, currentValue) => {
                accumulator.push({
                    nome: regionsDictionary.get(currentValue.codice)
                        .descrizioneBreve,
                    totaleContagiati: currentValue.totaleContagiati,
                    totalePositivi: currentValue.totalePositivi,
                    totaleGuariti: currentValue.totaleGuariti,
                    totaleDeceduti: currentValue.totaleDeceduti
                });

                return accumulator;
            }, [])
            .sort((a, b) => {
                if (a.totaleContagiati > b.totaleContagiati) {
                    return -1;
                }

                return 1;
            }),
        options: {
            height: 600,
            bars: [
                // {
                //     label: "Contagiati",
                //     dataKey: "totaleContagiati",
                //     color: "red"
                // },
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
