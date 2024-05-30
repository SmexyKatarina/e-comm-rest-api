import React from 'react';

import Menu from './Menu.js';

import '../css/header.css';

const Header = () => {

    return (
        <>
            <div className="header">
                <div className="logo">Rest-y</div>
                <Menu values={["hello", "world"]}/>
            </div>
        </>
    );
}

export default Header;