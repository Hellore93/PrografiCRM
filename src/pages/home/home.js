/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import './home.css';
import { ProductService } from "../../services/queryService";

import { AutocompleteCust } from "../../elements/autocomplete";
import { Datatable } from "../../elements/datatable";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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

    const options = ['test 1', 'test 2'];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            {/* {err == null &&
                <Datatable
                    rows={rows}
                    columns={columns}
                    checkboxSelection={true}
                    paginationModel={paginationModel}
                    pageSizeOptions={[5, 10]} />
            }
            <AutocompleteCust
                label="Test"
                initialOptions={options}
                allowAddNew={true}
                width={200} /> */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        MyApp
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/PrografiCRM/about">About</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}