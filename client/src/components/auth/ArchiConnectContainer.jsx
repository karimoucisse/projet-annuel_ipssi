import React from "react";
import { Box, Typography } from "@mui/material";

const ArchiConnectContainer = () => {
  return (
    <Box
      flex={0.9}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        gap: 3,
        backgroundColor: "#1c2930",
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
