import { useEffect } from "react";

import ReactGa from "react-ga";

import { useLocation } from "react-router-dom";

export const RouteManager = () => {
    const location = useLocation();

    const { pathname, search } = location;

    useEffect(() => {
        if (process.env.NODE_ENV !== "development") {
            ReactGa.initialize("UA-163255882-1");

            ReactGa.pageview(pathname);
        }

        window.scrollTo(0, 0);
    }, [pathname, search]);

    return null;
};
