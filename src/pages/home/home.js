import React, { useState, useEffect } from "react";
import { ProductService } from "../../services/queryService";
import { DataGrid } from '@mui/x-data-grid';

export const Home = () => {
    const [rows, setRows] = useState(null);

    useEffect(() => {
        const products = ProductService.getAllProducts();
        console.log('Products >> ', products);
        setRows(products);
      }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Name', width: 70 },
        { field: 'Quantity', headerName: 'Quantity', width: 70 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </div>
    )
}