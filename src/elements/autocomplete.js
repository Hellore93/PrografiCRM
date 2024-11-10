import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


export const AutocompleteCust = ({ id, label, initialOptions, width, onChange, value }) => {
    const [options, setOptions] = useState(initialOptions);

    useEffect(() => {
        setOptions(initialOptions);
    }, [initialOptions]);

    const findValue = () => {
        if (value != undefined) {
            const option =  options.find(option => option.id === value);
            return option.label;
        }
        return null;
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

AutocompleteCust.propTypes = {
    label: PropTypes.string.isRequired,
    initialOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    allowAddNew: PropTypes.bool,
};