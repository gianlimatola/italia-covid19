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
        index,
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
                {Intl.NumberFormat("it", {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(percent)}
            </text>
        );
    };

    const tooltipContent = (tooltipProps) => {
        const { active } = tooltipProps;

        if (active) {
            const { payload } = tooltipProps;

            return (
                <div
                    className="recharts-default-tooltip"
                    style={{
                        margin: 0,
                        padding: 10,
                        backgroundColor: "rgb(255, 255, 255)",
                        border: "1px solid rgb(204, 204, 204)",
                        whiteSpace: "nowrap",
                    }}
                >
                    <p
                        className="recharts-tooltip-label"
                        style={{ margin: 0, color: payload[0].payload.fill }}
                    >
                        {`${payload[0].name} : ${Intl.NumberFormat("it").format(
                            payload[0].value
                        )}`}
                    </p>
                </div>
            );
        }

        return null;
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
                <Tooltip content={tooltipContent} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
