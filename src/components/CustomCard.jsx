import React from "react";

import { Typography, Card } from "@material-ui/core";

const CustomCard = ({ title, children }) => {
    return (
        <Card className={"MuiCustomCard"}>
            {title && <CustomCardTitle text={title} />}
            <div className={"MuiCustomCardContainer"}>{children}</div>
        </Card>
    );
};

const CustomCardTitle = ({ text }) => {
    return (
        <Typography
            variant="h4"
            color="primary"
            gutterBottom
            align="center"
            className={"MuiCustomCardTitle"}
        >
            {text}
        </Typography>
    );
};

export default CustomCard;
