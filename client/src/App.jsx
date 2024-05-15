import React from 'react'
import './App.css'
import Info from './components/info/Info'
import MenuPanel from './components/menuPanel/MenuPanel'
import Main from './components/main/Main'
import Dialogs from "./components/modals/Dialogs";

const App = () => {
    return (
        <div className='App'>
            <Info/>
            <MenuPanel/>
            <Main/>
            <Dialogs/>
        </div>
    )
}

export default App
