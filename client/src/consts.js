const BASE_API = `http://localhost:5000/`

const COUNTRIES = [
    {code: 'RU', label: 'Россия', phone: '7'},
    {code: 'BY', label: 'Belarus', phone: '375'},
    {code: 'AF', label: 'Afghanistan', phone: '93'}
]

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
export {BASE_API,COUNTRIES, columns}