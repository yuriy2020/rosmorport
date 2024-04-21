import React from "react";
import './Menu.css'

const MenuItem = ({ children, onClick }) => {
    return <p className={'menu_item'} onClick={onClick}>{children}</p>;
};

export default MenuItem