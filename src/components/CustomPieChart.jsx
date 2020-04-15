import React from "react";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const RADIAN = Math.PI / 180;

const CustomPieChart = ({ data }) => {
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index
    }) => {
        // const RADIAN = Math.PI / 180;
        // eslint-disable-next-line
        const radius = 5 + innerRadius + (outerRadius - innerRadius);
        // eslint-disable-next-line
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        // eslint-disable-next-line
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill={data[index].color}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer height={300} width="100%">
            <PieChart>
                <Pie
                    data={data}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={115}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
