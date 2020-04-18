import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Typography, Card } from "@material-ui/core";

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
    PlaceLogo,
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

    const { stats } = useSelector(statsSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(changeHeaderSubTitle("Dato Nazionale"));

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
            <PlaceLogo imageName="italia" text="Dato Nazionale" />

            <Overview dailyStatistics={items} />

            <DailyTrendLineChart data={items} />

            <NewCasesLineChart data={items} />

            <DetailTable
                data={detailTableData}
                title="Dettaglio per regione"
                descriptionLabel="Regione"
            />

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
