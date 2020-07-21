import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const RMWCTheme = {
    primary: '#2196F3',
    secondary: '#0069B5'
}

export const Theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {
                fontFamily: '\'Montserrat\', sans-serif',
                height: '56px',
                padding: '4px 16px',
                fontWeight: 500,
                borderBottom: "none"
            },
            stickyHeader: {
                backgroundColor: "white",
                borderBottom: "1px solid #e0e0e0",
                fontWeight: 600,
            }
        },
    },
});
