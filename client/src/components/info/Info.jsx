import React from 'react'
import './Info.css'
import {Button} from '@mui/material/'
import {observer} from "mobx-react-lite";
import {apiStore} from "../../stores/AppStore";

const Info = () => {
    return (
        <div className={'info_panel'}>
            <div className={'info_panel_text'}>«Тестовое задание Frontend»</div>
            {apiStore.isAuth
                ?
                <div className={'info_panel_text'}>
                    <>
                        <p>Вы авторизованы : {apiStore.login}</p>
                        <Button variant='contained' color='primary' onClick={() => apiStore.logout()}>
                            Выйти
                        </Button>
                    </>
                </div>
                :
                <div className={'info_panel_text'}>
                    <Button variant='contained' color='primary' onClick={() => apiStore.setOpenModal(true,'login')}>
                        Вход
                    </Button>
                    <Button variant='contained' color='primary' onClick={() => apiStore.setOpenModal(true, 'register')}>
                        Регистрация
                    </Button>
                </div>
            }
        </div>
    )
}

export default observer(Info)
