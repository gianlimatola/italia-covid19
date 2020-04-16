import React from "react";

import { NavLink } from "react-router-dom";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Link,
} from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import CustomCard from "./CustomCard";

const DetailTable = ({ data, title, descriptionLabel }) => {
    const isUpSm = useMediaQuery("(min-width:600px)");

    return (
        <CustomCard title={title}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>{descriptionLabel}</TableCell>
                        <TableCell align="right" style={{ maxWidth: 80 }}>Contagiati</TableCell>
                        <TableCell align="right" style={{ maxWidth: 120 }}>
                            % contagiati/ popolazione
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.codice}>
                            <TableCell>
                                {row.link ? (
                                    <Link component={NavLink} to={`/${row.link}`}>
                                        {isUpSm
                                            ? row.descrizione
                                            : row.descrizioneBreve}
                                    </Link>
                                ) : isUpSm ? (
                                    row.descrizione
                                ) : (
                                    row.descrizioneBreve
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {Intl.NumberFormat("it").format(
                                    row.totaleContagiati
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {Intl.NumberFormat("it", {
                                    style: "percent",
                                    minimumFractionDigits: 3,
                                    maximumFractionDigits: 3,
                                }).format(
                                    row.totaleContagiati / row.popolazione
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CustomCard>
    );
};

export default DetailTable;
