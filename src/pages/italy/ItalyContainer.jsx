import React, { useEffect } from "react";

import ReactGa from "react-ga";

import { useDispatch, useSelector } from "react-redux";

import { Typography, Card } from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { makeStyles } from "@material-ui/core/styles";

import { statsSelector } from "../../slices/stats";

import {
    changeHeaderSubTitle,
    changeCloseButtonVisibility,
} from "../../slices/app";

import {
    Overview,
    BarChart,
    DailyTrendLineChart,
    NewCasesLineChart,
    DetailTable,
} from "../../components";

import { regionsDictionary } from "../../data";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        padding: theme.spacing(1),
    },
    title: {
        margin: 0,
        padding: "16px 16px 0 16px",
    },
    lastSync: {
        fontSize: "0.8rem",
    },
    card: {
        marginTop: 8,
    },
}));

function ItalyContainer() {
    const classes = useStyles();

    const isUpSm = useMediaQuery("(min-width:600px)"); // useMediaQuery(theme.breakpoints.up("xs"));

    const { stats } = useSelector(statsSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (process.env.NODE_ENV !== "development") {
            ReactGa.initialize("UA-163255882-1");

            ReactGa.pageview("/");
        }

        dispatch(changeHeaderSubTitle("Dato Nazioniale"));

        dispatch(changeCloseButtonVisibility(false));
    }, [dispatch]);

    if (stats === null) return null;

    const {
        italy: { items },
        regions,
    } = stats;

    const barChartDistribuzionePerRegione = getBarChartDistribuzionePerRegione(
        stats.regions.latest
    );

    const detailTableData = regions.latest
        .map((region) => {
            const regione = regionsDictionary.get(region.codice);

            return {
                codice: region.codice,
                descrizione: regione ? regione.descrizione : "",
                descrizioneBreve: regione ? regione.descrizioneBreve : "",
                totaleContagiati: region.totaleContagiati,
                popolazione: regione ? regione.popolazione : 0,
                link: regione ? regione.slug : null,
            };
        })
        .sort((a, b) => {
            if (a.totaleContagiati > b.totaleContagiati) {
                return -1;
            }

            return 1;
        });

    return (
        <>
            <Overview dailyStatistics={items} />

            <DailyTrendLineChart data={items} />

            <NewCasesLineChart data={items} />

            <DetailTable
                data={detailTableData}
                title="Dettaglio per regione"
                descriptionLabel="Regione"
            />

            {/* <Card className={classes.card}>
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
            </Card> */}

            <Card className={classes.card}>
                <Title text="Distribuzione per regione" />

                <BarChart data={barChartDistribuzionePerRegione} />
            </Card>
        </>
    );
}

export default ItalyContainer;

const getBarChartDistribuzionePerRegione = (items) => {
    return {
        data: items
            .reduce((accumulator, currentValue) => {
                accumulator.push({
                    nome: regionsDictionary.get(currentValue.codice)
                        .descrizioneBreve,
                    totaleContagiati: currentValue.totaleContagiati,
                    totalePositivi: currentValue.totalePositivi,
                    totaleGuariti: currentValue.totaleGuariti,
                    totaleDeceduti: currentValue.totaleDeceduti,
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
                    color: "orange",
                },
                {
                    label: "Guariti",
                    dataKey: "totaleGuariti",
                    color: "green",
                },
                {
                    label: "Deceduti",
                    dataKey: "totaleDeceduti",
                    color: "black",
                },
            ],
        },
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
