import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from '@mui/x-data-grid';

export const Datatable = ({ rows, columns, checkboxSelection, paginationModel, pageSizeOptions }) => {

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={pageSizeOptions}
            checkboxSelection={checkboxSelection}
            sx={{ border: 0 }}
        />
    )
}

Datatable.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    checkboxSelection: PropTypes.bool,
    paginationModel: PropTypes.shape({
        pageSize: PropTypes.number,
        page: PropTypes.number,
    }),
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
};