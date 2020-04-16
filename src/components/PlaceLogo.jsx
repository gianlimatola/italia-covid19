import React from "react";

import { Typography } from "@material-ui/core";

const PlaceLogo = ({ text, imageName }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <img src={`/images/${imageName}.png`} alt="" />

            <Typography
                align="center"
                variant="h5"
                color="inherit"
                noWrap
                style={{ marginBottom: 0 }}
            >
                {text}
            </Typography>
        </div>
    );
};

export default PlaceLogo;
