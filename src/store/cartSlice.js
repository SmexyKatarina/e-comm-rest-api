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
            const selected = state.cart.filter(x => x.id === action.payload.id);
            if (selected.length === 0) {
                const obj = { ...action.payload, amount: 1 };
                state.cart = [ ...state.cart, obj ];
                state.total = state.cart.map(x => formatPrice(x.price) * x.amount).reduce((prev, next) => {return prev + next;}).toFixed(2);
                state.totalItems = state.cart.map(x => x.amount).reduce((prev, next) => {return prev + next;});
            } else {
                const obj = selected[0];
                const newCart = state.cart.filter(x => x.id !== action.payload.id);
                obj.amount++;
                state.cart = [...newCart, obj];
                state.total = state.cart.map(x => formatPrice(x.price) * x.amount).reduce((prev, next) => {return prev + next;}).toFixed(2);
                state.totalItems = state.cart.map(x => x.amount).reduce((prev, next) => {return prev + next;});
            }
            
        },
        removeFromCart: (state, action) => {
            const selected = state.cart.filter(x => x.id === action.payload.id);
            if (selected[0].amount - 1 === 0) {
                state.cart = state.cart.filter((x) => x.id !== action.payload.id);
                state.total = state.cart.length === 0 ? 0.0 : state.cart.map(x => formatPrice(x.price) * x.amount).reduce((prev, next) => {return prev + next;}).toFixed(2);
                state.totalItems = state.cart.length === 0 ? 0 : state.cart.map(x => x.amount).reduce((prev, next) => {return prev + next;});
            } else {
                const newCart = state.cart.filter(x => x.id !== action.payload.id);
                const obj = selected[0];
                obj.amount--; 
                state.cart = [...newCart, obj];
                state.total = state.cart.map(x => formatPrice(x.price) * x.amount).reduce((prev, next) => {return prev + next;}).toFixed(2);
                state.totalItems = state.cart.map(x => x.amount).reduce((prev, next) => {return prev + next;});
            }
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
