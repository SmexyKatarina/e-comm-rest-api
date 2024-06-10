import React from "react";
import { useSelector } from "react-redux";

import '../css/cart.css';

const Cart = () => {

    const { cart, total, totalItems } = useSelector((state) => state.cart);

    const toggleShowCart = (show) => {
        const overlay = document.querySelector(".overlay");
        const cart = document.querySelector(".cart-container");
        overlay.style.display = show ? "block" : "none";
        cart.style.display = show ? "flex" : "none";
    }

    return (
        <>
            <div className="cart">
                <h1 className="cart-close-button" onClick={() => { toggleShowCart(false); }}>✘</h1>
                <h1 className="cart-header">Cart</h1>
                <div className="cart-items">
                    {cart.map((cartItem, index) => {
                        return (
                            <div className="cart-item" key={index}>
                                <p className="item-name">{cartItem.item_name}</p>
                                <p className="amount">Amount: x{cartItem.amount}</p>
                                <p className="base-cost">Per-item cost: {cartItem.price}</p>
                                <p className="total-cost">Total: ${(parseFloat(cartItem.amount) * parseFloat(cartItem.price.substring(1))).toFixed(2)}</p>
                            </div>
                        )
                    })}
                </div>
                <h3>{`Total Price (${totalItems} items): `}<span style={{color: "rgb(20, 160, 20)"}}>{`$${total}`}</span></h3>
                <div className="cart-checkout" onClick={() => {}}>Checkout</div>
            </div>  
        </>
    );
}

export default Cart;