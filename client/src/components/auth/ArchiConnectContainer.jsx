import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const ArchiConnectContainer = () => {
  const theme = useTheme();
  return (
    <Box
      flex={0.9}
      backgroundColor={theme.palette.primary.main}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        gap: 3,
        color: "white",
      }}
    >
      <Typography variant="h2" textAlign="center" width="100%">
        ArchiConnect
      </Typography>
      <Typography variant="subtitle1">
        Conservez vos fichiers en toute sécurité, prêts à <br /> être consultés
        et partagés à tout moment.
      </Typography>
    </Box>
  );
};

export default ArchiConnectContainer;
