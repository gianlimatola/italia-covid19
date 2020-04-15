import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function getBars(options) {
    return options.bars.map((bar, index) => {
        return (
            <Bar
                key={index}
                dataKey={bar.dataKey}
                fill={bar.color}
                stackId="a"
            />
        );
    });
}

const CustomBarChart = ({ data }) => {
    const bars = getBars(data.options);

    const renderLegend = (value, entry) => {
        const { color } = entry;

        let selectedItem = data.options.bars.find(_ => _.dataKey === value);

        return <span style={{ color }}>{selectedItem.label}</span>;
    };

    const valueFormatterTooltip = (value, name, props) => {
        let selectedItem = data.options.bars.find(_ => _.dataKey === name);

        return [Intl.NumberFormat("it").format(value), selectedItem.label];
    };

    const labelFormatterTooltip = value => {
        let selectedItem = data.data.find(_ => _.nome === value);

        return (
            <>
                <span style={{ marginBottom: 10, display: "block" }}>
                    {value}
                </span>
                <span style={{ marginBottom: 5, display: "block", color: "red" }}>
                    Contagiati : {Intl.NumberFormat("it").format(selectedItem.totaleContagiati)}
                </span>
            </>
        );
    };

    return (
        <ResponsiveContainer height={data.options.height || 700} width="100%">
            <BarChart
                data={data.data}
                layout="vertical"
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis width={85} type="category" dataKey="nome" />
                <Tooltip
                    formatter={valueFormatterTooltip}
                    labelFormatter={labelFormatterTooltip}
                />
                <Legend formatter={renderLegend} />
                {bars}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomBarChart;
