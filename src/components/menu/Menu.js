import React, { useEffect } from 'react';

import '../../css/menu.css';

const Menu = (props) => {
    
    const { setLogin, setRegister, setUser, userInfo } = props;
    
    useEffect(() => {
        let menu = document.querySelector('.menu-dark');
        let dropDown = document.querySelector('.drop-down');
        let items = document.querySelector('.select-items');

        let id = -1;

        const dropMenu = () => {
            items.style.display = items.style.display === 'flex' ? 'none' : 'flex';
            dropDown.textContent = dropDown.textContent === '||' ? '=' : '||';
        }

        const windowFunction = (e) => {
            if (!menu.contains(e.target)) {
                dropDown.textContent = "="; 
                items.style.display = 'none';
            }
        }

        const mouseOverMenu = () => {
            clearTimeout(id);
            id = -1;
        }

        const mouseOutMenu = () => {
            id = setTimeout(() => {
                items.style.display = 'none';
                dropDown.textContent = "=";
            }, 1000);
        }

        items.addEventListener('mouseover', mouseOverMenu);
        items.addEventListener('mouseout', mouseOutMenu);

        dropDown.addEventListener('click', dropMenu);

        window.addEventListener('click', windowFunction);

        return () => {
            items.removeEventListener('mouseout', mouseOutMenu);
            items.removeEventListener('mouseover', mouseOverMenu);
            dropDown.removeEventListener('click', dropMenu);
            window.removeEventListener('click', windowFunction);
        }
    }, []);

    if (userInfo.authenticated) {
        return (
            <>
                <div className="menu-dark">
                    <div className="drop-down">=</div>
                    <div className="select-items" style={{ display: "none" }}>
                        <div className="menu-item-dark" onClick={() => { setLogin(false); setRegister(false); }}>Home</div>
                        <div className="menu-item-dark" onClick={async () => { await fetch("/logout", {
                            method: 'POST'
                        }); setUser({authenticated: false, display_name: null}); setLogin(false); setRegister(false); }}>Logout</div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="menu-dark">
                <div className="drop-down">=</div>
                <div className="select-items" style={{ display: "none" }}>
                    <div className="menu-item-dark" onClick={() => { setLogin(false); setRegister(false); }}>Home</div>
                    <div className="menu-item-dark" onClick={() => { setLogin(true); setRegister(false); }}>Login</div>
                </div>
            </div>
        </>
    );
}

export default Menu;