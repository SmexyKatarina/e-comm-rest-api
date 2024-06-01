import React, { createElement } from 'react';
import { useSelector } from 'react-redux';

import ItemCard from './ItemCard.js';

const ItemContainer = (props) => {

    const { rowAmount, colAmount } = props;

    const { items } = useSelector((state) => state.categories);

    const containerBuilder = () => {
        let count = 0;
        let rows = [];
        const length = Object.keys(items).length;
        for (let x = 0; x < rowAmount; x++) {
            if (count >= length) break;
            let cells = [];
            for (let y = 0; y < colAmount; y++) {
                if (count >= length) break;
                console.log(count);
                cells.push(<ItemCard item={items[count]} key={count}/>);
                count++;
            }
            rows.push(createElement('div', { className: 'row-container' }, ...cells));
        }
        return createElement('div', { className: "items" }, ...rows);
    }

    return (
        <>
            <div className="item-container">
                {containerBuilder()}
                <div className="item-amount">
                    <p>Showing </p>
                </div>
            </div>
        </>
    );
}

export default ItemContainer;