import React, { useState, useEffect } from "react";

import { useParams, useHistory, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { statsSelector } from "../../slices/stats";

import {
    changeHeaderSubTitle,
    changeCloseButtonVisibility,
} from "../../slices/app";

import { regionsDictionary, provincesDictionary } from "../../data";

import {
    Overview,
    DailyTrendLineChart,
    NewCasesLineChart,
    DetailTable,
    PlaceLogo,
} from "../../components";

const RegionContainer = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    let { region } = useParams();

    const dispatch = useDispatch();

    const history = useHistory();

    const { stats } = useSelector(statsSelector);

    const { pathname, search } = useLocation();

    useEffect(() => {
        let findRegionResult = Array.from(regionsDictionary.values()).find(
            (_) => _.slug === region.toLowerCase()
        );

        if (!findRegionResult) {
            history.push(`/`);
        } else {
            setSelectedRegion(findRegionResult);

            dispatch(changeCloseButtonVisibility(true));
        }
    }, [dispatch, pathname, search]);

    if (selectedRegion === null) return null;

    const {
        regions: { items },
        provinces,
    } = stats;

    let datiRegione = items.find((_) => _.codice === selectedRegion.codice)
        .dati;

    const detailTableData = provinces.items
        .find((_) => _.codiceRegione === selectedRegion.codice)
        .province.map((province) => {
            const provincia = provincesDictionary.get(province.codice);

            return {
                codice: province.codice,
                descrizione: provincia ? provincia.descrizione : "",
                totaleContagiati: province.totaleContagiati,
                popolazione: provincia ? provincia.popolazione : 0,
            };
        })
        .sort((a, b) => {
            if (a.totaleContagiati > b.totaleContagiati) {
                return -1;
            }

            return 1;
        });

    return (
        <div>
            <PlaceLogo
                imageName={region.toLowerCase()}
                text={`Regione ${selectedRegion.descrizione}`}
            />

            <Overview dailyStatistics={datiRegione} />

            <DailyTrendLineChart data={datiRegione} />

            <NewCasesLineChart data={datiRegione} />

            {/* <DetailTable
                data={detailTableData}
                title="Dettaglio per provincia"
                descriptionLabel="Provincia"
            /> */}
        </div>
    );
};

export default RegionContainer;
