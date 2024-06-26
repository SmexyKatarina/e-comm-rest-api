import React, { createElement } from 'react';
import { useSelector } from 'react-redux';

import ItemCard from './ItemCard.js';

import '../../css/itemContainer.css';

const ItemContainer = (props) => {

    const { rowAmount, colAmount, userInfo } = props;

    const { items, isLoading, hasError } = useSelector((state) => state.categories);

    const containerBuilder = () => {
        let count = 0;
        let rows = [];
        const length = Object.keys(items).length;
        for (let x = 0; x < rowAmount; x++) {
            if (count >= length) break;
            let cells = [];
            for (let y = 0; y < colAmount; y++) {
                if (count >= length) break;
                cells.push(<ItemCard item={items[count]} key={count} listId={count} userInfo={userInfo}/>);
                count++;
            }
            rows.push(createElement('div', { className: 'row-container' }, ...cells));
        }
        return createElement('div', { className: "items" }, ...rows);
    }

    let x = 1; // Testing purposes

    let amt = rowAmount * colAmount;
    let len = Object.keys(items).length;

    if (hasError) {
        return (
            <div className="item-container">
                <div className="row-container">
                    <div className="loading-card error">
                        <p>Error loading items.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="item-container">
                <div className="row-container">
                    <div className="loading-card">
                        <p>
                            Loading items...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (len === 0) {
        return (
            <div className="item-container">
                <div className="row-container">
                    <div className="loading-card">
                        <p>No items found in this category</p>
                    </div>
                </div>
            </div>
        )
    }

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