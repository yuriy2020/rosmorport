import React, {useState} from 'react';
import './Menu.css'

const Menu = ({title, children}) => {
    return (
        <div className="dropdown">
            <button className="dropbtn">{title}</button>
            <div className="dropdown-content">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child);
                    }
                    return child;
                })}
            </div>
        </div>
    );
};
export default Menu;