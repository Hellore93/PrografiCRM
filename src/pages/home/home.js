import React, { useState, useEffect } from "react";
import { ProductService } from "../../services/queryService";
import { DataGrid } from '@mui/x-data-grid';

export const Home = () => {
    const [err, setErr] = useState(null);
    const [rows, setRows] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const products = await ProductService.getAllProducts();
            setRows(products);
        } catch (err) {
            setErr(err);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'Name', headerName: 'Name', width: 100 },
        { field: 'Quantity', headerName: 'Quantity', width: 0 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            {err == null &&
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            }
        </div>
    )
}