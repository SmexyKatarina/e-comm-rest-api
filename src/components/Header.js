import React from 'react';

import Menu from './menu/Menu.js';

import '../css/header.css';

const Header = () => {

    return (
        <>
            <div className="header">
                <div className="logo">Rest-y</div>
                <Menu values={["Login"]}/>
            </div>
        </>
    );
}

export default Header;