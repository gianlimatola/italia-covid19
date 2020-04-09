import { createSlice } from "@reduxjs/toolkit";

import moment from "moment";

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
            const items = json.reduce(
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
                updateDateTime: last.data.substring(0, 10),
                items: items
            };
        });
}

function fetchRegionsStats() {
    return fetch(appSettings.regionsStatsUrl) //("/dpc-covid19-ita-regioni-latest.json") //appSettings.regionsStatsUrl)
        .then(value => value.json())
        .then(json => {
            const regionsMap = json.reduce(
                (accumulator, currentValue, currentIndex) => {
                    const {
                        codice_regione,
                        totale_casi,
                        nuovi_positivi,
                        totale_positivi,
                        dimessi_guariti,
                        deceduti
                    } = currentValue;

                    if (!accumulator.get(codice_regione)) {
                        accumulator.set(codice_regione, new Map());
                    }

                    let regionItem = accumulator.get(codice_regione);

                    const data = currentValue.data.substring(0, 10);

                    if (!regionItem.get(data)) {
                        regionItem.set(data, {
                            data: data,
                            codice: codice_regione,
                            totaleContagiati: 0,
                            nuoviContagiati: 0,
                            totalePositivi: 0,
                            totaleGuariti: 0,
                            nuoviGuariti: 0,
                            totaleDeceduti: 0,
                            nuoviDeceduti: 0
                        });
                    }

                    let dataItem = regionItem.get(data);

                    dataItem.totaleContagiati += totale_casi;
                    dataItem.nuoviContagiati += nuovi_positivi;
                    dataItem.totalePositivi += totale_positivi;

                    dataItem.totaleGuariti += dimessi_guariti;
                    dataItem.totaleDeceduti += deceduti;

                    return accumulator;
                },
                new Map()
            );

            let items = [];
            let latest = [];

            regionsMap.forEach((region, regionKey) => {
                let datesArray = Array.from(region.values()).reduce(
                    (accumulator, currentValue, currentIndex) => {
                        if (currentIndex !== 0) {
                            currentValue.nuoviGuariti =
                                currentValue.totaleGuariti -
                                accumulator[currentIndex - 1].totaleGuariti;

                            currentValue.nuoviDeceduti =
                                currentValue.totaleDeceduti -
                                accumulator[currentIndex - 1].totaleDeceduti;
                        }

                        accumulator.push(currentValue);

                        return accumulator;
                    },
                    []
                );

                latest.push(datesArray[datesArray.length - 1]);

                items.push({ codice: regionKey, dati: datesArray });
            });

            return {
                items: items,
                latest: latest.sort((a, b) => {
                    if (a.totaleContagiati > b.totaleContagiati) {
                        return -1;
                    }

                    return 1;
                })
            };
        });
}

export function fetchStats() {
    return async dispatch => {
        dispatch(getStats());

        Promise.all([
            fetchItalyStats(),
            fetchRegionsStats()
            //fetch(appSettings.provincesStatsUrl).then(value => value.json())
        ])
            .then(value => {
                dispatch(
                    getStatsSuccess({
                        updateDateTime: value[0].updateDateTime,
                        italy: {
                            items: value[0].items
                        },
                        regions: {
                            items: value[1].items,
                            latest: value[1].latest
                        }
                        // regions: value[1],
                        // provinces: value[2]
                    })
                );
            })
            .catch(err => {
                dispatch(getStatsFailure());
            });
    };
}
