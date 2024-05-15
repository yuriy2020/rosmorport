import React from 'react';
import {Box} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {apiStore} from "../../stores/AppStore";
import {observer} from "mobx-react-lite";
import {columns} from "../../consts";

function Grid() {
    return (
        <div className={'main_panel'}>
            <Box sx={{ width: '100%'}}>
                <DataGrid
                    slots={apiStore.hasFilters ? {toolbar: GridToolbar} : {}}
                    rows={apiStore.text}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>

        </div>
    );
}

export default observer(Grid);