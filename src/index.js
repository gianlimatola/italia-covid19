import React from "react";
import ReactDOM from "react-dom";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import moment from "moment";
import "moment/locale/it";

import rootReducer from "./slices";

import App from "./components/App";

import * as serviceWorker from "./serviceWorker";

const store = configureStore({ reducer: rootReducer });

moment.locale("it");

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
