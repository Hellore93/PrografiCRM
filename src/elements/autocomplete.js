import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const AutocompleteCust = ({ label, initialOptions, width }) => {
    const [options, setOptions] = useState(initialOptions);
    useEffect(() => {
        // allowAddNew && options.put('New');
        // setOptions(initialOptions.push("Add"));
        setOptions(initialOptions);
        console.log(options);
    }, []);

    return (
        <Autocomplete
            disablePortal
            options={options}
            sx={{ width: width }}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    )
}

AutocompleteCust.propTypes = {
    label: PropTypes.string.isRequired,
    initialOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    allowAddNew: PropTypes.bool,
};

AutocompleteCust.defaultProps = {
    width: 300,
    allowAddNew: false,
};