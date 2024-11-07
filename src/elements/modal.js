import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { ProductService } from "../services/queryService";

export const ModalCust = ({ isOpen, closeEvent, fields }) => {
    const [open, setOpen] = useState(isOpen);
    const [object, setObject] = useState({});

    useEffect(() => {
        setOpen(isOpen);
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
        await ProductService.insertProduct(object);
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
                        <TextField id="Name" type="text" onChange={(e) => handleInputChange(e.target)} label="Name" />
                        <TextField id="Quantity" type="text" onChange={(e) => handleInputChange(e.target)} label="Quantity" />
                    </Typography>
                    <Button variant="contained" onClick={handleAddRecord}>Add Record</Button>
                </Box>
            </Modal>
        </div>
    )
}