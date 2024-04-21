import React from 'react';
import {Box} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {apiStore} from "../../stores/AppStore";
import {observer} from "mobx-react-lite";

function Grid() {
    const columns = [
        {field: 'family', headerName: 'Фамилия', width: 90},
        {
            field: 'name',
            headerName: 'Имя',
            width: 150,
        },
        {
            field: 'surname',
            headerName: 'Отчество',
            width: 150,
        },
        {
            field: 'sex',
            headerName: 'Пол',
            width: 150,
        },
        {
            field: 'country',
            headerName: 'Страна',
            width: 150,
            valueGetter: (params) => {
                return params.label;
            }
        },
        {
            field: 'age',
            headerName: 'Возраст',
            width: 150,
        },
        {
            field: 'food',
            headerName: 'Питание',
            width: 400,
            valueGetter: (params) => {
                let result = ''
                if (params?.dietician) result += 'Диетиеская\n'
                if (params?.vegan) result += 'Веганская\n'
                if (params?.traditional) result += 'Традиционная\n'
                return result
            }
        },
    ]

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