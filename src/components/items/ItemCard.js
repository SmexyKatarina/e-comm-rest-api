import React from 'react';

import '../../css/itemCard.css';
import { useSelector } from 'react-redux';

const ItemCard = (props) => {

    const { item_name, description, price, category_id } = props.item;

    const { categories } = useSelector((state) => state.categories);

    return (
        <>
            <div className="item-card">
                <p className="item-name">{item_name} <span className="item-category">({categories[category_id].category_name})</span></p>
                
                <p className="item-description">{description}</p>
                <p className="item-price">{price}</p>
                
            </div>
        </>
    );
}

export default ItemCard;