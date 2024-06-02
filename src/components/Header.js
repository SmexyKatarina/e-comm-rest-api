import React, { useEffect } from 'react';

import Menu from './menu/Menu.js';

import '../css/header.css';

const Header = (props) => {

    const { setLogin, loginVisible } = props;

    useEffect(() => {
        if (loginVisible) {
            document.title = "Login ― Rest-y";
        } else {
            document.title = "Home ― Rest-y";
        }
    }, [loginVisible]);

    return (
        <>
            <div className="header">
                <div className="logo" onClick={() => { setLogin(false); }}>Rest-y</div>
                <Menu setLogin={setLogin}/> 
            </div>
        </>
    );
}

export default Header;