import React from "react";
import { Typography, Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" width="100%" height={120} sx={{backgroundColor: "#dcdcdc"}}>
      <Typography variant="h6" sx={{ flexGrow: 1, color: '#962161', ml:4, fontSize: 60, mt:5}}>
        LO! Foods
      </Typography>
    </Box>
  );
};

export default Header;
