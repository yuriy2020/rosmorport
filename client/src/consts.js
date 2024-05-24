const BASE_API = `http://localhost:5000/`

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
        valueGetter: (params) => {
            if(params === 'female') return 'Женский'
            if(params === 'male') return 'Мужской'
        }
    },
    {
        field: 'country',
        headerName: 'Страна',
        width: 150,
        valueGetter: (params) => {
            return params?.label || ''
        }
    },
    {
        field: 'age',
        headerName: 'Возраст',
        width: 150,
    },
    {
        field: 'traditional',
        headerName: 'Питание',
        width: 400,
        valueGetter:(value, row) => {
            let result = ''
            if (row?.dietician) result += 'Диетиеская\n'
            if (row?.vegan) result += 'Веганская\n'
            if (row?.traditional) result += 'Традиционная'
            return result
        }
    },
]

const aboutText = 'Необходимо реализовать интерфейс веб-приложения (сайта), который состоит из 3 областей:\n' +
    '- Информационная область. \n' +
    'Представлена в виде полосы в верхней части экрана,  должна быть фиксированная 75 пикс. В этой области слева располагается название веб-приложения («Тестовое задание Frontend»),  вертикальное выравнивание по центру, горизонтальное по левому краю. Слева кнопка «Вход», выравнивание аналогичное названию но по правому краю. При нажатии на неё появляется всплывающее окно с формой ввода логина и пароля (обязательные поля) и кнопкой «Войти». При попытке войти должен производиться запрос к серверу, на сервере происходит авторизация средствами Django (или иного Python-фреймворка, пользователь должен существовать в БД фреймворка). В случае успешной авторизации страница приложения перезагружается, иначе появляется сообщение что авторизоваться не удалось с пояснением причины (пользователя не существует, пароль не верный, ошибка подключения, иная ошибка). \n' +
    'В случае если пользователь авторизован кнопка «Войти» заменяется на «Выйти», рядом отображается имя пользователя (слева от кнопки), при её нажатии будет отправлен запрос на сервер завершающий сессию пользователя, страница должна быть перезагружена.\n' +
    '- Область меню.\n' +
    'Представлена  в виде полосы шириной 75 пикс., цвет отличается от информационной области. Выравнивание объектов внутри горизонтально по левому краю, вертикально по центру, внутри расположены пункты меню: «Ввод данных», «Отчёты», «Информация». При наведении курсора на пункт меню вертикально вниз выпадают соответствующие подпункты: «Ввод данных» - «Форма ввода»; «Отчёты» - «Отчёт 1», «Отчёт 2»; «Информация» - «О приложении». Если пользователь не авторизован, то в первых двух пунктах меню вместо подпунктов будет отображено «Необходима авторизация».\n' +
    '- Рабочая область.\n' +
    'Остальное свободное место на странице. Информационная область и область меню должны оставаться видимыми на странице даже если содержимое рабочей области больше отведённого под неё места.\n' +
    ' \n' +
    'При нажатии на подпункты меню должен отправляться запрос на сервер, а сервер возвращать содержимое (вёрстку) в зависимости от выбранного пункта, этим содержимым будет заменено содержимое рабочей области.\n' +
    'При нажатии на подпункт «Форма ввода» в рабочей области должна появиться форма ввода документа на усмотрение тестируемого, но которая должна содержать как минимум 7 полей, среди них поля с «галочками» (checkbox) и выпадающие списки. Должна существовать возможность сохранить все введённые данные в базу данных. Должны присутствовать обязательные и необязательные поля, в интерфейсе их необходимо пометить соответствующим образом.\n' +
    '                При нажатии на подпункт «Отчёт 1» необходимо вывести таблицу, в которой будет представлены все внесённые в базу записи через интерфейс «Форма ввода». У таблицы должна присутствовать «шапка», которая должна отображаться всегда вне зависимости от объёма данных в отчёте (оставаться на виду при прокрутке отчёта вниз). Под таблицей необходимо предусмотреть строку справочной информации, в которой будет отображено количество записей в отчёте и время выполнения запроса к базе данных и обработки данных (не от клиента к серверу и обратно).\n' +
    '                При нажатии на подпункт «Отчёт 2» будет отображён аналогичный «Отчёту 1» отчёт, но с возможностью фильтрации по полям (1+) на выбор тестируемого. Техническая реализация фильтра – на усмотрение тестируемого (обработка на клиенте, запрос к серверу с параметрами, или иное).\n' +
    '                При нажатии на подпункт «О приложении» будет отображено всплывающее окно с содержимым на выбор тестируемого.'

export {BASE_API, columns, aboutText}