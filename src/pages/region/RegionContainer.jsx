import React from "react";

import { useParams, NavLink } from "react-router-dom";

const RegionContainer = () => {
    let { region } = useParams();

    return (
        <div>
            <div>{region}</div>
            <div>
                <a href="/">home</a>
            </div>
            <div>
                <NavLink to="/">home 2</NavLink>
            </div>
        </div>
    );
};

export default RegionContainer;
