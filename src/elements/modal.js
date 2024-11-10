import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal, Grid2 } from '@mui/material';
import { TextField } from '@mui/material';
import { AutocompleteCust } from "./autocomplete";

export const ModalCust = ({ formId, isOpen, closeEvent, form, sendRecord, handleSave, initialRecord }) => {
  const [open, setOpen] = useState(isOpen);
  const [object, setObject] = useState(initialRecord);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const initialRec = {};
    form?.fields.forEach(field => {
      return initialRec[field.id] = initialRecord[field.id];
    });
    setObject(initialRec);
  }, [initialRecord])

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
    const obj = {};
    obj[formId] = object;
    handleSave(obj);
  }

  const handleInputChange = (e) => {
    object[e.id] = e.value;
    sendRecord(object);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            {form?.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid2 container spacing={2}>
              {form && form.fields.map((field, index) => (
                <Grid2 key={index} size={field.size}>
                  {field.type === 'autocomplete' ? (
                    <AutocompleteCust
                      id={field.id}
                      label={field.label}
                      initialOptions={field.options}
                      allowAddNew={field.allowAddNew}
                      width={field.width}
                      value={object[field.id]}
                      onChange={(e) => handleInputChange(e)}
                    />
                  ) : (
                    <TextField
                      id={field.id}
                      type={field.type}
                      onChange={(e) => handleInputChange(e.target)}
                      label={field.label}
                      value={object[field.id]}
                    />
                  )}
                </Grid2>
              ))}
              <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" onClick={handleAddRecord}>{form?.submitButtonLabel}</Button>
              </Grid2>
            </Grid2>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}