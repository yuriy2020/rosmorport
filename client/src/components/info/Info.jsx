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
                        <Button variant='contained' color='primary' onClick={() => apiStore.logout(true)}>
                            Выйти
                        </Button>
                    </>
                </div>
                :
                <Button variant='contained' color='primary' onClick={() => apiStore.setOpenModal(true)}>
                    Вход
                </Button>}
        </div>
    )
}

export default observer(Info)
