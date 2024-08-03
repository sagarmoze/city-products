import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

interface Product {
  pincode: string;
  product: string;
  results: {
    productName: string;
    price: string;
    originalPrice: string;
    weight: string;
    stockStatus: string;
  }[];
  status: string;
  location: string;
}

interface ProductTableProps {
  city: string;
}

const ProductTable: React.FC<ProductTableProps> = ({ city }) => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        if (city) {
          setFilteredData(data.filter((product: Product) => product.location.includes(city)));
        } else {
          setFilteredData(data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (city) {
      setFilteredData(data.filter((product: Product) => product.location.includes(city)));
    } else {
      setFilteredData(data);
    }
  }, [city, data]);

  const columns: GridColDef[] = [
    { 
      field: 'pincode', 
      headerName: 'Pincode', 
      width: 150
    },
    {
      field: 'productInfo',
      headerName: 'Product Name',
      width: 400,
      renderCell: (params: GridRenderCellParams<Product>) => (
        <Box sx={{ mb: 1, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          {params.row.results.length > 0 ? (
            params.row.results.map((result, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="body2" color="gray" fontSize={13} sx={{ whiteSpace: 'pre-wrap' }}>
                  {result.productName}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="gray" fontSize={13}>
              No products available
            </Typography>
          )}
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params: GridRenderCellParams<Product>) => {
        const stockStatus = params.row.results.length > 0
          ? params.row.results[0].stockStatus
          : 'No products available';
          
        return (
          <Typography variant="body2" color="gray" fontSize={13}>
            {stockStatus}
          </Typography>
        );
      }
    },
  ];

  return (
    <Box sx={{ width: '100%', mt: 8 }}>
      <DataGrid
        autoHeight
        columns={columns}
        rows={filteredData}
        getRowId={(row) => row.pincode}
        disableColumnFilter 
        disableColumnMenu  
        hideFooter 
        sx={{
          '& .MuiDataGrid-columnHeader': {
            color: 'black'
          },
          '& .MuiDataGrid-cell:hover': {
            color: 'black',
            fontSize: 16
          },
          boxShadow: 2,
          '& .MuiDataGrid-cell': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }
        }}
      />
    </Box>
  );
};

export default ProductTable;
