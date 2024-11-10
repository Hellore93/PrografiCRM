import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal, Grid2 } from '@mui/material';
import { TextField } from '@mui/material';
import { QueryService } from "../services/queryService";
import { AutocompleteCust } from "./autocomplete";

export const ModalCust = ({ isOpen, closeEvent, fields }) => {
    const [open, setOpen] = useState(isOpen);
    const [object, setObject] = useState({});
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOpen(isOpen);
        getCompany();
    }, [isOpen]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleClose = () => {
        setOpen(false);
        closeEvent();
    }

    const handleAddRecord = async () => {
        await QueryService.insertProduct(object);
    }

    const getCompany = async () => {
        const response = await QueryService.getAllProducts('Company Name');
        const normalizeResponse = response.map(item => { return { item, label: item.Name } });
        normalizeResponse.push({ label: 'Add new' });
        setOptions(normalizeResponse);
    }

    const handleInputChange = (e) => {
        const obj = object;
        obj[e.id] = e.value;
        setObject(obj);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New record
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Grid2 container spacing={2}>
                            <Grid2 size={12}>
                                <AutocompleteCust
                                    label="Test"
                                    initialOptions={options}
                                    allowAddNew={true}
                                    width={200}
                                /></Grid2>
                            <Grid2 size={6}>
                                <TextField id="Name" type="text" onChange={(e) => handleInputChange(e.target)} label="Name" />
                            </Grid2>
                            <Grid2 size={6}>
                                <TextField id="Quantity" type="text" onChange={(e) => handleInputChange(e.target)} label="Quantity" />
                            </Grid2>
                            <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" onClick={handleAddRecord}>Add Record</Button>
                            </Grid2>
                        </Grid2>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}