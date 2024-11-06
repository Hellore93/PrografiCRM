import React, { useState, useEffect } from "react";
import { ProductService } from "../../services/queryService";
import { AutocompleteCust } from "../../elements/autocomplete";
import { Datatable } from "../../elements/datatable";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './home.css';

export const Home = ({onLogout}) => {
    const [err, setErr] = useState(null);
    const [rows, setRows] = useState(null);
    const navigate = useNavigate();

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
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'Name', headerName: 'Name', width: 100 },
        { field: 'Quantity', headerName: 'Quantity', width: 0 },
    ];

    const options = ['test 1', 'test 2'];

    const paginationModel = { page: 0, pageSize: 5 };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <div>
            <AppBar position="static" className="App-bar">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Prografi CRM
                    </Typography>
                    <Button color="inherit" component={Link} to="/PrografiCRM">Home</Button>
                    <Button color="inherit" component={Link} to="/PrografiCRM/products">Products</Button>
                    <Button color="inherit" onClick={handleLogout}>Lagout</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 3 }}>
                <Outlet />
                {err == null && (
                    <Datatable
                        rows={rows}
                        columns={columns}
                        checkboxSelection={true}
                        paginationModel={paginationModel}
                        pageSizeOptions={[5, 10]}
                    />
                )}
                <AutocompleteCust
                    label="Test"
                    initialOptions={options}
                    allowAddNew={true}
                    width={200}
                />
            </Box>
        </div>
    );
};