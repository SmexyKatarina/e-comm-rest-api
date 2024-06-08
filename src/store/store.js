import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categoriesSlice.js';
import cartReducer from './cartSlice.js';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        cart: cartReducer,
    },
});

export default store;