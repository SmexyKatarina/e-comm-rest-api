import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesFromAPI, getItemsFromCategory } from '../../store/categoriesSlice';

import '../../css/categoryContainer.css';

const CategoryContainer = () => {

    const [active, setActive] = useState("all");

    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategoriesFromAPI());
    }, [dispatch]);

    useEffect(() => {
        const index = categories.map(x => x.category_name).indexOf(active);
        dispatch(getItemsFromCategory(active === "all" ? "all" : index));
    }, [dispatch, categories, active]);

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