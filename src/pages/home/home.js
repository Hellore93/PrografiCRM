import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './home.css';

export const Home = ({ onLogout }) => {
    const navigate = useNavigate();
    
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
            </Box>
        </div>
    );
};