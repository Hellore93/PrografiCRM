import React, { useState, useEffect } from "react";
import { QueryService } from "../../services/queryService";
import { Datatable } from "../../elements/datatable";
import { Button } from '@mui/material';
import { ModalCust } from "../../elements/modal";
import { Spinner } from "../../elements/spinner";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export const Products = () => {
    const [err, setErr] = useState(null);
    const [rows, setRows] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setLoading(true);
            const products = await QueryService.getAllProducts('Product');
            setRows(products);
        } catch (err) {
            setErr(err);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'Name', headerName: 'Name', width: 100 },
        { field: 'Quantity', headerName: 'Quantity', width: 0 },
    ];

    const columnsWithDelete = [
        ...columns,
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row)} color="error">
                    <DeleteIcon />
                </IconButton>
            ),
            sortable: false,
            filterable: false,
        },
    ]

    const paginationModel = { page: 0, pageSize: 5 };

    const handleAddProduct = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleDelete = (row) => {
        console.log(row);
        QueryService.deleteProduct(row);
        getProducts();
    }

    return (
        <div>
            {loading && <Spinner />}
            <div>
                <Button variant="contained" onClick={handleAddProduct}>Add Product</Button>
            </div>
            {err == null && rows && (
                <Datatable
                    rows={rows}
                    columns={columnsWithDelete}
                    checkboxSelection={true}
                    paginationModel={paginationModel}
                    pageSizeOptions={[5, 10]}
                />
            )}

            <ModalCust isOpen={openModal} closeEvent={handleCloseModal} />
        </div>
    );
};