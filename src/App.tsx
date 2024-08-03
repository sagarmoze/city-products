import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ProductTable from "./components/productTable";
import Header from "./components/header";

function App() {
  const [city, setCity] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  return (
    <>
      <Header />
      <Box sx={{ m: 5 }}>
        <Box width={150} height={90} sx={{ position: 'relative' }}>
          <FormControl fullWidth sx={{ zIndex: 1 }}>
            <InputLabel id="demo-simple-select-label">Select City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              label="Select City"
              onChange={handleChange}
              sx={{ zIndex: 1 }}
            >
              <MenuItem value="Mumbai" sx={{ fontSize: 14 }}>Mumbai</MenuItem>
              <MenuItem value="Bengaluru" sx={{ fontSize: 14 }}>Bengaluru</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ProductTable city={city} />
      </Box>
    </>
  );
}

export default App;
