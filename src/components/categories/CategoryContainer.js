import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { emptyItems, getCategoriesFromAPI, getItemsFromCategory } from '../../store/categoriesSlice';

import '../../css/categoryContainer.css';

const CategoryContainer = () => {

    const [active, setActive] = useState("all");

    const dispatch = useDispatch();

    const { categories, isLoading, hasError, items } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategoriesFromAPI());
    }, [dispatch]);

    useEffect(() => {
        const index = categories.map(x => x.category_name).indexOf(active);
        if (index !== -1 && categories[index].num_of_items !== 0) {
            dispatch(getItemsFromCategory(active === "all" ? "all" : index));
        } else {
            dispatch(emptyItems());
        }
        document.title = active === "all" ? "Home ― Rest-y" : `${active} ― Rest-y`;
    }, [dispatch, categories, active]);

    if (hasError) {
        return (
            <div className="categories">
                <div className="loading-tile error">Error loading categories.</div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="categories">
                <div className="loading-tile">Loading...</div>
            </div>
        );
    }

    return (
        <>
            <div className="categories">
                {categories.map((x, i) => {
                    return <div className={`category-tile ${x.category_name === active ? 'category-active' : ''}`} key={i} onClick={() => {
                        setActive((prev) => prev !== x.category_name ? x.category_name : "all");
                    }}>{x.category_name} ({x.num_of_items})</div>
                })}
            </div>
        </>
    );
}

export default CategoryContainer;