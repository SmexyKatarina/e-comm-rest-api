import React from 'react';

import '../../css/itemCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';

const ItemCard = (props) => {

    const dispatch = useDispatch();

    const { listId } = props;

    const { authenticated } = props.userInfo;

    const { item_name, description, price, category_id } = props.item;

    const { categories } = useSelector((state) => state.categories);
    
    const { cart } = useSelector((state) => state.cart);

    const diffItemAction = () => {
        let results = []; 
        if (cart.length > 0) {
            cart.forEach(e => {
                results.push(e.id);
            });
        }
        console.log(results);
        if (cart.length > 0 && results.includes(listId)) {
            const cartItem = cart.filter(x => x.id === listId)[0];
            return (
                <div className="item-actions">
                    <div className="cart-remove" onClick={() => { dispatch(removeFromCart(props.item))}}>-</div>
                    <div className="cart-total">{cartItem.amount}</div>
                    <div className="cart-add" onClick={() => { dispatch(addToCart(props.item)); }}>+</div>
                </div>
            )
        } else {
            return (
                <div className="item-actions">
                    <div className="cart-add" onClick={() => { dispatch(addToCart(props.item)); }}>Add to Cart</div>
                </div>
            );
        }
    }

    if (authenticated) {
        return (
            <>
            <div className="item-card">
                <p className="item-name">{item_name} <span className="item-category">({categories[category_id].category_name})</span></p>
                <p className="item-description">{description}</p>
                <p className="item-price">{price}</p>
                {diffItemAction()}
            </div>
        </>
        );
    }

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