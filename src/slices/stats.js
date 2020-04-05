import { createSlice } from "@reduxjs/toolkit";

import { appSettings } from "../app.settings";

export const initialState = {
    loading: true,
    hasErrors: false,
    stats: null
};

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        getStats: state => {
            state.loading = true;
        },
        getStatsSuccess: (state, { payload }) => {
            state.stats = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getStatsFailure: state => {
            state.loading = false;
            state.hasErrors = true;
        }
    }
});

export const {
    getStats,
    getStatsSuccess,
    getStatsFailure
} = statsSlice.actions;

export const statsSelector = state => state.stats;

export default statsSlice.reducer;

function fetchItalyStats() {
    return fetch(appSettings.italyStatsUrl)
        .then(value => value.json())
        .then(json => {
            let items = json.reduce(
                (accumulator, currentValue, currentIndex) => {
                    accumulator.push({
                        data: currentValue.data,
                        totaleContagiati: currentValue.totale_casi,
                        nuoviContagiati: currentValue.nuovi_positivi,
                        totalePositivi: currentValue.totale_positivi,
                        nuoviPositivi: currentValue.variazione_totale_positivi,
                        totaleGuariti: currentValue.dimessi_guariti,
                        nuoviGuariti:
                            currentIndex === 0
                                ? currentValue.dimessi_guariti
                                : currentValue.dimessi_guariti -
                                  accumulator[currentIndex - 1].totaleGuariti,
                        totaleDeceduti: currentValue.deceduti,
                        nuoviDeceduti:
                            currentIndex === 0
                                ? currentValue.deceduti
                                : currentValue.deceduti -
                                  accumulator[currentIndex - 1].totaleDeceduti
                    });

                    return accumulator;
                },
                []
            );

            const last = items[items.length - 1];

            return {
                updateDateTime: last.data,
                overview: {
                    totaleContagiati: last.totaleContagiati,
                    nuoviContagiati: last.nuoviContagiati,
                    totalePositivi: last.totalePositivi,
                    nuoviPositivi: last.nuoviPositivi,
                    totaleGuariti: last.totaleGuariti,
                    nuoviGuariti: last.nuoviGuariti,
                    totaleDeceduti: last.totaleDeceduti,
                    nuoviDeceduti: last.nuoviDeceduti
                }
            };
        });
}

export function fetchStats() {
    return async dispatch => {
        dispatch(getStats());

        Promise.all([
            fetchItalyStats(),
            fetch(appSettings.regionsStatsUrl).then(value => value.json()),
            fetch(appSettings.provincesStatsUrl).then(value => value.json())
        ])
            .then(value => {
                dispatch(
                    getStatsSuccess({
                        updateDateTime: value[0].updateDateTime,
                        italy: { overview: value[0].overview },
                        regions: value[1],
                        provinces: value[2]
                    })
                );
            })
            .catch(err => {
                dispatch(getStatsFailure());
            });
    };
}
