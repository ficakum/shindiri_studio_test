import { Box, CircularProgress } from "@mui/material";

const Loader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="200px">
    <CircularProgress color="primary" />
  </Box>
);

export default Loader;
