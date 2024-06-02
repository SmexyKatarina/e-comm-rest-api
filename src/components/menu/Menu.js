import React, { useEffect } from 'react';

import '../../css/menu.css';

const Menu = (props) => {
    
    const { values } = props;
    
    useEffect(() => {
        let menu = document.querySelector('.menu-dark');
        let dropDown = document.querySelector('.drop-down');
        let items = document.querySelector('.select-items');
        let options = items.querySelectorAll('.menu-item-dark');

        let id = -1;

        const dropMenu = () => {
            items.style.display = items.style.display === 'inline' ? 'none' : 'inline';
            dropDown.textContent = dropDown.textContent === '||' ? '=' : '||';
        }

        const optionFunction = (e) => {
            dropDown.textContent = "=";
            items.style.display = 'none';
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

        options.forEach((option) => {
            option.addEventListener('click', optionFunction);
        })

        window.addEventListener('click', windowFunction);

        return () => {
            items.removeEventListener('mouseout', mouseOutMenu);
            items.removeEventListener('mouseover', mouseOverMenu);
            dropDown.removeEventListener('click', dropMenu);
            options.forEach((x) => x.removeEventListener('click', optionFunction));
            window.removeEventListener('click', windowFunction);
        }
    }, []);

    return (
        <>
            <div className="menu-dark">
                <div className="drop-down">=</div>
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