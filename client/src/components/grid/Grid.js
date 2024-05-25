import React from 'react';
import {Box, Typography} from "@mui/material";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import Divider from '@mui/material/Divider';
import {apiStore} from "../../stores/AppStore";
import {observer} from "mobx-react-lite";
import {columns} from "../../consts";
import {ruRU} from '@mui/x-data-grid/locales';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
        </GridToolbarContainer>
    );
}

const tableStyle = {
    height: '70vh',
    width: '100%',
    overflowY: 'auto',
}


function Grid() {
    return (
        <div style={{marginTop: '10px'}}>
            <Box
                sx={{
                    '& .columns-header': {
                        backgroundColor: '#e6f3ff',
                    },
                }}
            >
                <DataGrid
                    showColumnVerticalBorder={true}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    slots={apiStore.hasFilters ? {toolbar: CustomToolbar} : {}}
                    rows={apiStore.data}
                    columns={columns}
                    disableRowSelectionOnClick
                    hideFooter
                    columnHeaderHeight={30}
                    sx={tableStyle}
                />
            </Box>
            <Box sx={{mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'left'}}>
                <Box sx={{flex: 1}}>
                    <Divider orientation="horizontal" flexItem/>
                    <Typography gutterBottom>
                        Количество записей в отчёте : {apiStore.data.length}
                    </Typography>
                    <Typography gutterBottom>
                        Время выполнения запроса к базе данных : {apiStore.time || '--'}
                    </Typography>
                    <Divider orientation="horizontal" flexItem/>
                </Box>
            </Box>
        </div>
    );
}

export default observer(Grid);