import { createSlice } from "@reduxjs/toolkit";

const categories = createSlice({
    name: "categories",
    initialState: {
        categories: [],
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
        }
    },
});

export const { fetchCategories, successFetchCategories, failedFetchCategories } = categories.actions;

export const getCategoriesFromAPI = () => async (dispatch) => {
    dispatch(fetchCategories());
    const req = await fetch("/api/categories");
    const res = await req.json();
    dispatch(res.result ? successFetchCategories(res.result) : failedFetchCategories());
}

export default categories.reducer;