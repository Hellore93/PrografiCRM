import React, { useState, useEffect } from "react";
import { QueryService } from "../../services/queryService";
import { Datatable } from "../../elements/datatable";
import { Button } from '@mui/material';
import { ModalCust } from "../../elements/modal";
import { Spinner } from "../../elements/spinner";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import { Fields } from "../../forms/fields";

export const Products = () => {
    const [err, setErr] = useState(null);
    const [rows, setRows] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState();
    const [primaryObject, setPrimaryObject] = useState({});

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

    const getForm = async (isNew) => {
        const fields = await Fields.insertProduct(isNew);
        setForm(fields);
    }

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
                <div>
                    <IconButton onClick={() => handleEdit(params.row)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
            sortable: false,
            filterable: false,
        },
    ]

    const paginationModel = { page: 0, pageSize: 10 };

    const handleAddProduct = () => {
        getForm(true);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setPrimaryObject({});
    }

    const handleDelete = async (row) => {
        await QueryService.deleteProduct(row, 'Product');
        getProducts();
    }

    const handleEdit = (row) => {
        getForm(false);
        setPrimaryObject(row);
        setOpenModal(true)
    }

    const handleAddObject = async (obj) => {
        const result = obj[form?.formId].id === undefined ?
            await QueryService.insertRecord(obj[form?.formId], form.objectName) :
            await QueryService.updateRecord(obj[form?.formId], form.objectName);
        if (result.data !== null) {
            setOpenModal(false);
            getProducts();
        }
    }

    const handleGetObject = async (object) => {
        if (object['Company Id'] === 0) {
            // const obj = {};
            // obj[form.formId] = object;
            // setPrimaryObject(obj);
            setForm(await Fields.insertNewProductCompany());
            delete object['Company Id'];
        } else {
            setPrimaryObject(object);
        }
    }

    return (
        <div>
            {loading && <Spinner />}
            <div>
                <Button variant="contained" onClick={handleAddProduct} sx={{ margin: 2 }}>Add Product</Button>
            </div>
            {err == null && rows && (
                <Datatable
                    rows={rows}
                    columns={columnsWithDelete}
                    checkboxSelection={false}
                    paginationModel={paginationModel}
                    pageSizeOptions={[5, 10, 15]}
                />
            )}

            <ModalCust
                formId={form?.formId}
                isOpen={openModal}
                closeEvent={handleCloseModal}
                form={form}
                sendRecord={(obj) => handleGetObject(obj)}
                handleSave={(obj) => handleAddObject(obj)}
                initialRecord={primaryObject}
            />
        </div>
    );
};