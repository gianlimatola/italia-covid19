import React from "react";

import moment from "moment";

import { Typography, Grid, Card, Link } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { PieChart } from "..";

const useStyles = makeStyles(theme => ({
    gridContainer: {
        //padding: theme.spacing(1)
    },
    title: {
        margin: 0,
        padding: "16px 16px 0 16px"
    },
    lastSync: {
        fontSize: "0.8rem"
        //paddingTop:16
    },
    card: {
        marginTop: theme.spacing(1)
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
        <>
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

            <Grid container>
                <Grid item xs={12} style={{ marginTop: 8 }}>
                    <BoxTotalCases lastDayStatistics={lastDayStatistics} />
                </Grid>

                <Grid item xs={12} style={{ marginTop: 8 }}>
                    <BoxActiveCases
                        lastDayStatistics={lastDayStatistics}
                        penultimateDayStatistics={penultimateDayStatistics}
                    />
                </Grid>

                <Grid item xs={12} style={{ marginTop: 8 }}>
                    <BoxClosedCases
                        lastDayStatistics={lastDayStatistics}
                        penultimateDayStatistics={penultimateDayStatistics}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Overview;

const BoxTotalCases = ({ lastDayStatistics }) => {
    const classes = useStyles();

    return (
        <Card style={{ marginTop: 8 }}>
            <BoxTitle title="Casi totali" />

            <div className={classes.horizontalPaper}>
                <Typography
                    variant="h3"
                    gutterBottom
                    style={{ marginBottom: 0, color: "red" }}
                >
                    {Intl.NumberFormat("it").format(
                        lastDayStatistics.totaleContagiati
                    )}
                </Typography>
                <Typography
                    className={classes.content}
                    style={{ marginBottom: 0, color: "red" }}
                    gutterBottom
                >
                    (
                    {Intl.NumberFormat("it", {
                        signDisplay: "always"
                    }).format(lastDayStatistics.nuoviContagiati)}
                    )
                </Typography>
            </div>
        </Card>
    );
};

const BoxActiveCases = ({ lastDayStatistics, penultimateDayStatistics }) => {
    const classes = useStyles();

    const pieChartData = [
        {
            name: "Ricov. con sintomi",
            value: lastDayStatistics.totaleRicoveratiConSintomi,
            color: "#ed723c"
        },
        {
            name: "In terapia intensiva",
            value: lastDayStatistics.totaleTerapiaIntensiva,
            color: "#7a0000"
        },
        {
            name: "Isolamento dom.",
            value: lastDayStatistics.totaleIsolamentoDomiciliare,
            color: "#ffb244"
        }
    ];

    return (
        <Card>
            <BoxTitle title="Casi attivi" />

            <div className={classes.horizontalPaper}>
                <Typography
                    component="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    style={{ marginBottom: 0, color: "orange" }}
                >
                    Pazienti attualmente infetti
                </Typography>

                <Typography
                    variant="h3"
                    gutterBottom
                    style={{ marginBottom: 0, color: "orange" }}
                >
                    {Intl.NumberFormat("it").format(
                        lastDayStatistics.totalePositivi
                    )}
                </Typography>
            </div>

            <Grid container>
                <Grid item xs={12} sm={5}>
                    <PieChart data={pieChartData} />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Grid container>
                        <Grid item xs={6} sm={4}>
                            <BoxSpecificCase
                                title="Ricov. con sintomi"
                                value={
                                    lastDayStatistics.totaleRicoveratiConSintomi
                                }
                                previousValue={
                                    penultimateDayStatistics.totaleRicoveratiConSintomi
                                }
                                percentage={Intl.NumberFormat("it", {
                                    style: "percent",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }).format(
                                    lastDayStatistics.totaleRicoveratiConSintomi /
                                        lastDayStatistics.totalePositivi
                                )}
                                color="#ed723c"
                            />
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <BoxSpecificCase
                                title="In terapia intensiva"
                                value={lastDayStatistics.totaleTerapiaIntensiva}
                                previousValue={
                                    penultimateDayStatistics.totaleTerapiaIntensiva
                                }
                                percentage={Intl.NumberFormat("it", {
                                    style: "percent",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }).format(
                                    lastDayStatistics.totaleTerapiaIntensiva /
                                        lastDayStatistics.totalePositivi
                                )}
                                color="#7a0000"
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <BoxSpecificCase
                                title="Isolamento dom."
                                value={
                                    lastDayStatistics.totaleIsolamentoDomiciliare
                                }
                                previousValue={
                                    penultimateDayStatistics.totaleIsolamentoDomiciliare
                                }
                                percentage={Intl.NumberFormat("it", {
                                    style: "percent",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }).format(
                                    lastDayStatistics.totaleIsolamentoDomiciliare /
                                        lastDayStatistics.totalePositivi
                                )}
                                color="#ffb244"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

const BoxClosedCases = ({ lastDayStatistics, penultimateDayStatistics }) => {
    const classes = useStyles();

    const pieChartData = [
        {
            name: "Guariti",
            value: lastDayStatistics.totaleGuariti,
            color: "green"
        },
        {
            name: "Deceduti",
            value: lastDayStatistics.totaleDeceduti,
            color: "black"
        }
    ];

    const totaleCasiChiusi =
        lastDayStatistics.totaleGuariti + lastDayStatistics.totaleDeceduti;

    return (
        <Card>
            <BoxTitle title="Casi chiusi" />

            <div className={classes.horizontalPaper}>
                <Typography
                    component="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    style={{ marginBottom: 0, color: "#aaa" }}
                >
                    Casi che hanno avuto esito
                </Typography>

                <Typography
                    variant="h3"
                    gutterBottom
                    style={{ marginBottom: 0, color: "#aaa" }}
                >
                    {Intl.NumberFormat("it").format(totaleCasiChiusi)}
                </Typography>
            </div>

            <Grid container>
                <Grid item xs={12} sm={5}>
                    <PieChart data={pieChartData} />
                </Grid>

                <Grid item xs={12} sm={7}>
                    <Grid container>
                        <Grid item xs={6}>
                            <BoxSpecificCase
                                title="Guariti"
                                value={lastDayStatistics.totaleGuariti}
                                previousValue={
                                    penultimateDayStatistics.totaleGuariti
                                }
                                percentage={Intl.NumberFormat("it", {
                                    style: "percent",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }).format(
                                    lastDayStatistics.totaleGuariti /
                                        totaleCasiChiusi
                                )}
                                color="green"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <BoxSpecificCase
                                title="Deceduti"
                                value={lastDayStatistics.totaleDeceduti}
                                previousValue={
                                    penultimateDayStatistics.totaleDeceduti
                                }
                                percentage={Intl.NumberFormat("it", {
                                    style: "percent",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }).format(
                                    lastDayStatistics.totaleDeceduti /
                                        totaleCasiChiusi
                                )}
                                color="black"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

const BoxTitle = ({ title }) => {
    const classes = useStyles();

    return (
        <Typography
            variant="h4"
            color="primary"
            gutterBottom
            align="center"
            className={classes.title}
        >
            {title}
        </Typography>
    );
};

const BoxSpecificCase = ({
    title,
    value,
    previousValue,
    percentage,
    color
}) => {
    const classes = useStyles();

    const percentageComparedPreviousDay =
        (value - previousValue) / previousValue;

    return (
        <div
            className={classes.horizontalPaper}
            style={{ maxWidth: 180, margin: "auto" }}
        >
            <Typography
                component="h5"
                color="inherit"
                align="center"
                noWrap
                style={{
                    marginBottom: 0,
                    color: color
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="h4"
                gutterBottom
                style={{
                    marginBottom: 0,
                    color: color
                }}
            >
                {Intl.NumberFormat("it").format(value)}
            </Typography>

            <Typography
                variant="h5"
                gutterBottom
                style={{
                    marginBottom: 0, fontSize: "0.95rem", color: color
                }}
            >
                ({percentage})
            </Typography>

            <Typography
                component="h5"
                color="inherit"
                align="center"
                style={{
                    fontSize: "0.8rem"
                }}
            >
                <b>
                    {Intl.NumberFormat("it", {
                        style: "percent",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(percentageComparedPreviousDay)}
                </b>{" "}
                rispetto al giorno precedente che erano{" "}
                <b>{Intl.NumberFormat("it").format(previousValue)}</b>
            </Typography>
        </div>
    );
};
