import React from 'react';
import './Main.css'
import {observer} from 'mobx-react-lite';

import Grid from "../grid/Grid";
import {apiStore} from "../../stores/AppStore";

const Main = () => {

    return (
        apiStore.isAuth && apiStore.text.length > 0 ? <Grid /> : <div>{apiStore.message}</div>
    )
}

export default observer(Main);