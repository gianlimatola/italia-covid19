import React from "react";

import * as d3 from "d3";
import { Box } from "@material-ui/core";

const data = [1, 2, 3, 4];

const PieChart = () => {
    const height = 336;
    const width = 336;

    let pie = d3.pie()(data);

    return (
        <Box style={{textAlign: 'center'}}>
            <svg height={height} width={width}>
                <g transform={`translate(${width / 2},${height / 2})`}>
                    <Slice pie={pie} />
                </g>
            </svg>
        </Box>
    );
};

export default PieChart;

const Slice = props => {
    let { pie } = props;

    let arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(100);

    let interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

    return pie.map((slice, index) => {
        let sliceColor = interpolate(index / (pie.length - 1));

        return <path d={arc(slice)} fill={sliceColor} />;
    });
};
