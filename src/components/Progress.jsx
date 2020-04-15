import React from "react";

import { CircularProgress } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    progressContainer: {
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

const Progress = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.progressContainer}>
            <CircularProgress size={80} />
        </div>
    );
};

export default Progress;
