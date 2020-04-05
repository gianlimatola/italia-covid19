import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    // overrides: {
    //     body: {
    //         fontFamily: ["Roboto", '"Helvetica"', "Arial", "sans-serif"].join(
    //             ","
    //         )
    //         // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    //         // fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    //         // "fontSize": 14,
    //         // "fontWeightLight": 300,
    //         // "fontWeightRegular": 400,
    //         // "fontWeightMedium": 500
    //     }
    // },

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
            contrastText: "#fff"
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
    }
});

export default theme;
