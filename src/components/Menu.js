import React, { useEffect } from 'react';

import '../css/menu.css';

const Menu = (props) => {
    
    const { values } = props;
    
    useEffect(() => {
        let menu = document.querySelector('.menu-dark');
        let selected = document.querySelector('.selected');
        let items = document.querySelector('.select-items');
        let options = items.querySelectorAll('.menu-item-dark');

        const selectedFunction = () => {
            const visible = items.style.display === 'inline' ? 'none' : 'inline';
            const text = selected.textContent === '||' ? '=' : '||';
            items.style.display = visible;
            selected.textContent = text;
        }

        const optionFunction = (e) => {
            selected.textContent = "=";
            console.log(e.target.textContent);
            items.style.display = 'none';
        }

        const windowFunction = (e) => {
            if (!menu.contains(e.target)) {
                selected.textContent = "="; 
                items.style.display = 'none';
            }
            
        }

        selected.addEventListener('click', selectedFunction);

        options.forEach((option) => {
            option.addEventListener('click', optionFunction);
        })

        window.addEventListener('click', windowFunction);

        return () => {
            selected.removeEventListener('click', selectedFunction);
            options.forEach((x) => x.removeEventListener('click', optionFunction));
            window.removeEventListener('click', windowFunction);
        }
    }, []);

    return (
        <>
            <div className="menu-dark">
                <div className="selected">=</div>
                <div className="select-items" style={{ display: "none" }}>
                    {values.map((x, index) => {
                        return (
                                <div className="menu-item-dark" key={index}>{x}</div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Menu;