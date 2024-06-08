import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        total: 0.0,
        totalItems: 0,
        isLoading: false,
        hasError: false,
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload];
            state.total = (parseFloat(state.total) + formatPrice(action.payload.price)).toFixed(2);
            state.totalItems = state.totalItems + 1;
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((x) => x.id !== action.payload.id);
            state.total = (parseFloat(state.total) - formatPrice(action.payload.price)).toFixed(2);
            state.totalItems = state.totalItems - 1;
        },
        clearCart: (state) => {
            state.cart = [];
            state.total = 0.0;
            state.totalItems = 0;
        }
    },
});

const formatPrice = (price) => parseFloat(price.substring(1));

export const { addToCart, removeFromCart, clearCart } = cart.actions;

export default cart.reducer;
