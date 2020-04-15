import React from "react";

import moment from "moment";

import { Typography, Grid, Link } from "@material-ui/core";

import { PieChart } from "..";
import CustomCard from "../CustomCard";

const Overview = ({ dailyStatistics }) => {
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
                style={{ fontSize: "0.8rem" }}
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
                <Grid item xs={12}>
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
    return (
        <CustomCard title="Casi totali">
            <Typography
                align="center"
                variant="h3"
                gutterBottom
                style={{ marginBottom: 0, color: "red" }}
            >
                {Intl.NumberFormat("it").format(
                    lastDayStatistics.totaleContagiati
                )}
            </Typography>
            <Typography
                align="center"
                style={{ marginBottom: 0, color: "red" }}
                gutterBottom
            >
                (
                {Intl.NumberFormat("it", {
                    signDisplay: "always"
                }).format(lastDayStatistics.nuoviContagiati)}
                )
            </Typography>
        </CustomCard>
    );
};

const BoxActiveCases = ({ lastDayStatistics, penultimateDayStatistics }) => {
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
        <CustomCard title="Casi attivi">
            <Typography
                align="center"
                component="h5"
                color="inherit"
                align="center"
                noWrap
                style={{ marginBottom: 0, color: "orange" }}
            >
                Pazienti attualmente infetti
            </Typography>

            <Typography
                align="center"
                variant="h3"
                gutterBottom
                style={{ marginBottom: 0, color: "orange" }}
            >
                {Intl.NumberFormat("it").format(
                    lastDayStatistics.totalePositivi
                )}
            </Typography>

            <Typography
                align="center"
                style={{ marginBottom: 0, color: "orange" }}
                gutterBottom
            >
                (
                {Intl.NumberFormat("it", {
                    signDisplay: "always"
                }).format(lastDayStatistics.nuoviPositivi)}
                )
            </Typography>

            <Grid container>
                <Grid item xs={12} sm={5}>
                    <PieChart data={pieChartData} />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Grid container className={"SpecificCasesContainer"}>
                        <Grid item xs={6} sm={4}>
                            <BoxSpecificCase
                                title="Ricov. con sintomi"
                                value={
                                    lastDayStatistics.totaleRicoveratiConSintomi
                                }
                                previousValue={
                                    penultimateDayStatistics.totaleRicoveratiConSintomi
                                }
                                variance={
                                    lastDayStatistics.nuoviRicoveratiConSintomi
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
                                variance={
                                    lastDayStatistics.nuoviTerapiaIntensiva
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
                                variance={
                                    lastDayStatistics.nuoviIsolamentoDomiciliare
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
        </CustomCard>
    );
};

const BoxClosedCases = ({ lastDayStatistics, penultimateDayStatistics }) => {
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

    const nuoviCasiChiusi =
        lastDayStatistics.nuoviGuariti + lastDayStatistics.nuoviDeceduti;

    return (
        <CustomCard title="Casi chiusi">
            <Typography
                align="center"
                component="h5"
                color="inherit"
                noWrap
                style={{ marginBottom: 0, color: "#aaa" }}
            >
                Casi che hanno avuto esito
            </Typography>

            <Typography
                align="center"
                variant="h3"
                gutterBottom
                style={{ marginBottom: 0, color: "#aaa" }}
            >
                {Intl.NumberFormat("it").format(totaleCasiChiusi)}
            </Typography>

            <Typography
                align="center"
                style={{ marginBottom: 0, color: "#aaa" }}
                gutterBottom
            >
                (
                {Intl.NumberFormat("it", {
                    signDisplay: "always"
                }).format(nuoviCasiChiusi)}
                )
            </Typography>

            <Grid container>
                <Grid item xs={12} sm={5}>
                    <PieChart data={pieChartData} />
                </Grid>

                <Grid item xs={12} sm={7}>
                    <Grid container className={"SpecificCasesContainer"}>
                        <Grid item xs={6}>
                            <BoxSpecificCase
                                title="Guariti"
                                value={lastDayStatistics.totaleGuariti}
                                previousValue={
                                    penultimateDayStatistics.totaleGuariti
                                }
                                variance={lastDayStatistics.nuoviGuariti}
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
                                variance={lastDayStatistics.nuoviDeceduti}
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
        </CustomCard>
    );
};

const BoxSpecificCase = ({
    title,
    value,
    previousValue,
    variance,
    percentage,
    color
}) => {
    const percentageComparedPreviousDay =
        (value - previousValue) / previousValue;

    return (
        <div className={"SpecificCaseContainer"}>
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
                    marginBottom: 0,
                    fontSize: "0.95rem",
                    color: color
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
                        signDisplay: "always"
                    }).format(variance)}
                </b>{" "}
                <b>
                    (
                    {Intl.NumberFormat("it", {
                        signDisplay: "always",
                        style: "percent",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(percentageComparedPreviousDay)}
                    )
                </b>{" "}
                rispetto al giorno precedente che erano{" "}
                <b>{Intl.NumberFormat("it").format(previousValue)}</b>
            </Typography>
        </div>
    );
};
