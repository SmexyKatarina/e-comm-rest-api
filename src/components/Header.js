import React, { useEffect } from 'react';

import Menu from './menu/Menu.js';

import '../css/header.css';

const Header = (props) => {

    const { setLogin, loginVisible, setRegister, registerVisible, setUser, userInfo } = props;

    useEffect(() => {
        if (loginVisible) {
            document.title = "Login ― Rest-y";
        } else {
            document.title = "Home ― Rest-y";
        }
    }, [loginVisible]);

    if (loginVisible || registerVisible) {
        return (
            <>
                <div className="header">
                    <div className="logo" onClick={() => { setLogin(false); setRegister(false); }}>Rest-y</div>
                    <Menu setLogin={setLogin} setRegister={setRegister} setUser={setUser} userInfo={userInfo}/> 
                </div>
            </>
        );
    }

    return (
        <>
            <div className="header">
                <div className="logo" onClick={() => { setLogin(false); setRegister(false); }}>Rest-y</div>
                {userInfo.authenticated ? <div className="user-display-name">Hello, {userInfo.display_name}</div> : <div className="user-display-name">Login in to buy</div>}
                <Menu setLogin={setLogin} setRegister={setRegister} setUser={setUser} userInfo={userInfo}/> 
            </div>
        </>
    );
}

export default Header;