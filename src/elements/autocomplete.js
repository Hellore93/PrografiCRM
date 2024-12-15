import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export const AutocompleteCust = ({ id, label, initialOptions, width, onChange, enteredValue }) => {
    const [options, setOptions] = useState(initialOptions);

    useEffect(() => {
        setOptions(initialOptions);
    }, [initialOptions]);


    const findValue = () => {
        if (enteredValue !== undefined && enteredValue !== null) {
            return initialOptions.find(option => option.id === enteredValue).label;
        } else { return null }
    }

    return (
        <Autocomplete
            id={id}
            disablePortal
            options={options}
            sx={{ width: width }}
            value={findValue()}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={(event, value) => onChange({ id: id, value: value.id })}
        />
    );
};