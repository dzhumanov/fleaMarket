import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
  },
  // typography: {
  //   fontFamily: ["SpaceGrotesk", "SpaceGroteskBold"].join(","),
  // },
});

export default theme;
