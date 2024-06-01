import React from 'react';

const ItemCard = (props) => {

    const { item_name, description, price, category_id } = props.item;

    return (
        <>
            <div className="item-card">
                <h1>{item_name}</h1>
                <h4>{description}</h4>
                <h2>{price}</h2>
                <h4>{category_id}</h4>
            </div>
        </>
    );
}

export default ItemCard;