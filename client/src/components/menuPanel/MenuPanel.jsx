import React from 'react'
import './MenuPanel.css'
import Menu from '../menu/Menu'
import MenuItem from '../menu/MenuItem'
import {observer} from "mobx-react-lite";
import {apiStore} from "../../stores/AppStore";

const MenuPanel = () => {

    return (
        <div className={'menu_panel'}>
            <Menu title={'Ввод данных'}>
                {apiStore.isAuth ?
                    <MenuItem onClick={() => apiStore.setOpenFormModal(true)}>Форма</MenuItem>
                    : <MenuItem>Необходима авторизация</MenuItem>}
            </Menu>
            <Menu title={'Отчёты'}>
                {apiStore.isAuth ? (
                    <>
                        <MenuItem onClick={() => apiStore.loadData(true)}>Отчёт 1</MenuItem>
                        <MenuItem onClick={() => apiStore.loadData(false)}>Отчёт 2</MenuItem>
                    </>
                ) : (
                    <MenuItem>Необходима авторизация</MenuItem>
                )}
            </Menu>
            <Menu title={'Информация'}>
                {apiStore.isAuth ? (
                    <>
                        <MenuItem onClick={()=>apiStore.loadAbout(true)}>О приложении</MenuItem>
                    </>
                ) : (
                    <MenuItem>Необходима авторизация</MenuItem>
                )}
            </Menu>

        </div>
    )
}

export default observer(MenuPanel)
