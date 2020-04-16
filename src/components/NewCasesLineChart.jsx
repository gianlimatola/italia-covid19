import React from "react";

import moment from "moment";

import CustomCard from "./CustomCard";

import { LineChart } from ".";

const NewCasesLineChart = ({ data }) => {
    const newCasesLineChartData = getNewCasesLineChartData(data);

    return (
        <CustomCard title="Nuovi casi">
            <LineChart data={newCasesLineChartData} />
        </CustomCard>
    );
};

export default NewCasesLineChart;

const getNewCasesLineChartData = (newCases) => {
    return {
        data: newCases.reduce((accumulator, currentValue) => {
            accumulator.push({
                data: moment(currentValue.data).format("L"),
                nuoviContagiati: currentValue.nuoviContagiati,
                nuoviPositivi: currentValue.nuoviPositivi,
                nuoviGuariti: currentValue.nuoviGuariti,
                nuoviDeceduti: currentValue.nuoviDeceduti,
            });

            return accumulator;
        }, []),
        options: {
            lines: [
                {
                    label: "Contagiati",
                    dataKey: "nuoviContagiati",
                    color: "red",
                },
                {
                    label: "Positivi",
                    dataKey: "nuoviPositivi",
                    color: "orange",
                },
                {
                    label: "Guariti",
                    dataKey: "nuoviGuariti",
                    color: "green",
                },
                {
                    label: "Deceduti",
                    dataKey: "nuoviDeceduti",
                    color: "black",
                },
            ],
        },
    };
};
