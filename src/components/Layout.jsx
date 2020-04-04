import React, { useState, useEffect } from "react";

import {
    Switch,
    Route,
    Redirect,
    useParams,
    useHistory
} from "react-router-dom";

// import { AppBar } from "./AppBar";

function Layout() {
    return (
        <>
            <Switch>
                <Route exact path="/:regionName">
                    <Region />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default Layout;

function Home() {
    return <h2>Home</h2>;
}

function Region() {
    let { regionName } = useParams();
    const history = useHistory();

    const [region, setRegion] = useState();

    useEffect(() => {
        if (regionName === "lombardia") {
            history.push(`/`);
        }

        setRegion(regionName);
    }, []);

    return <h2>{region}</h2>;
}
