import React from "react";

import moment from "moment";

import { Grid } from "@material-ui/core";

import CustomCard from "./CustomCard";

import { LineChart } from ".";

const DailyTrendLineChart = ({ data }) => {
    const dailyTrendLineChartData = getDailyTrendLineChartData(data);

    return (
        <CustomCard title="Andamento giornaliero">
            <Grid container className={"MuiCustomCardContainer"}>
                <Grid item xs={12}>
                    <LineChart data={dailyTrendLineChartData} />
                </Grid>
            </Grid>
        </CustomCard>
    );
};

export default DailyTrendLineChart;

const getDailyTrendLineChartData = dailyTrend => {
    return {
        data: dailyTrend.reduce((accumulator, currentValue) => {
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
