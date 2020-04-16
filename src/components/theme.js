import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        // common: {
        //     black: "#000",
        //     white: "#fff"
        // },
        // background: {
        //     paper: "#fff",
        //     default: "#fafafa"
        // },
        primary: {
            light: "#5cbdfc",
            main: "#008dc9",
            dark: "#006098",
            contrastText: "#fff",
        },
        // secondary: {
        //     light: "#ff5e62",
        //     main: "#d82138",
        //     dark: "#9f0012",
        //     contrastText: "#fff"
        // },
        // error: {
        //     main: "#f44336"
        // },
        // text: {
        //     primary: "#000",
        //     secondary: "rgba(0, 0, 0, 0.68)",
        //     disabled: "rgba(0, 0, 0, 0.38)",
        //     hint: "rgba(0, 0, 0, 0.38)"
        // }
    },
    overrides: {
        MuiCard: {
            root: {
                "&.MuiCustomCard": {
                    marginTop: 8,
                },
                "& div.MuiCustomCardContainer": {
                    padding: 8,
                },
            },
        },
        MuiTypography: {
            root: {
                "&.MuiCustomCardTitle": {
                    margin: 0,
                    padding: "16px 16px 0 16px",
                },
            },
        },
        MuiGrid: {
            root: {
                "&.SpecificCasesContainer": {
                    "& div.SpecificCaseContainer": {
                        maxWidth: 180,
                        margin: "auto",
                        textAlign: "center",
                        padding: 8,
                    },
                },
            },
        },
        MuiTableCell: {
            sizeSmall: {
                padding: 6,
                "&:last-child": { paddingRight: 6 },
            },
        },
    },
});

export default theme;
