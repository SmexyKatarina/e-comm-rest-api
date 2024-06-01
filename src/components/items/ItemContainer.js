import React, { createElement } from 'react';
import { useSelector } from 'react-redux';

import ItemCard from './ItemCard.js';

import '../../css/itemContainer.css';

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
                cells.push(<ItemCard item={items[count]} key={count}/>);
                count++;
            }
            rows.push(createElement('div', { className: 'row-container' }, ...cells));
        }
        return createElement('div', { className: "items" }, ...rows);
    }

    let x = 1; // Testing purposes

    let amt = rowAmount * colAmount;
    let len = Object.keys(items).length;

    return (
        <>
            <div className="item-container">
                {containerBuilder()}
                <div className="item-amount">
                    <p><span className="prev-page">←</span> {(amt * x) - amt + 1 > len ? len : (amt * x) - amt + 1} - {amt * x > len ? len : amt * x} of {len} <span className="next-page">→</span></p>
                </div>
            </div>
        </>
    );
}

export default ItemContainer;