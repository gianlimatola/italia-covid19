import React from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-45)"
            >
                {payload.value}
            </text>
        </g>
    );
};

const tickFormatterYAxis = value => value  > 9999 ? `${value / 1000}K` : value;

function getLines(options) {
    return options.lines.map((line, index) => {
        return (
            <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                activeDot={{ r: 8 }}
            />
        );
    });
}

const CustomLineChart = ({ data }) => {
    const lines = getLines(data.options);

    const renderLegend = (value, entry) => {
        const { color } = entry;

        let selectedItem = data.options.lines.find(_ => _.dataKey === value);

        return <span style={{ color }}>{selectedItem.label}</span>;
    };

    const valueFormatterTooltip = (value, name, props) => {
        let selectedItem = data.options.lines.find(_ => _.dataKey === name);

        return [Intl.NumberFormat("it").format(value), selectedItem.label];
    };

    return (
        <ResponsiveContainer height={336} width="100%">
            <LineChart
                data={data.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis
                    dataKey="data"
                    height={90}
                    tick={<CustomizedAxisTick />}
                />
                <YAxis width={30} tickFormatter={tickFormatterYAxis} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={valueFormatterTooltip} />
                <Legend formatter={renderLegend} />
                {lines}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
