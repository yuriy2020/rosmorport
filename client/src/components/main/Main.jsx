import React from 'react';
import './Main.css'
import {observer} from 'mobx-react-lite';

import Grid from "../grid/Grid";
import {apiStore} from "../../stores/AppStore";

const Main = () => {
    if (apiStore.isAuth && apiStore.text.length > 0) {
        return <Grid/>
    }
    return <div>{apiStore.message}</div>
}

export default observer(Main);