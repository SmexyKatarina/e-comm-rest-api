import { createSlice } from "@reduxjs/toolkit";

const categories = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        selectedCategory: "all",
        items: {},
        hasError: false,
        isLoading: false,
    },
    reducers: {
        fetchCategories: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        successFetchCategories: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.categories = action.payload;
        },
        failedFetchCategories: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
        changeCategory: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        successChangeCategory: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.selectedCategory = action.payload.category;
            state.items = action.payload.items;
        },
        failedChangeCategory: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
        emptyItems: (state) => {
            state.items = {};
        }
    },
});

export const { fetchCategories, successFetchCategories, failedFetchCategories, changeCategory, successChangeCategory, failedChangeCategory, emptyItems } = categories.actions;

export const getCategoriesFromAPI = () => async (dispatch) => {
    dispatch(fetchCategories());
    const req = await fetch("/api/categories");
    const res = await req.json();
    dispatch(res.result ? successFetchCategories(res.result) : failedFetchCategories());
}

export const getItemsFromCategory = (category) => async (dispatch) => {
    dispatch(changeCategory());
    //const categories = useSelector((state) => state.categories.categories);
    const req = await fetch(category === "all" ? `/api/items` : `/api/category/${category}`);
    const res = await req.json();
    dispatch(res.result ? successChangeCategory({ items: { ...res.result }, category: category }) : failedChangeCategory());
}

export default categories.reducer;