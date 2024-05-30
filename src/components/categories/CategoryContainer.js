import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesFromAPI } from '../../store/categoriesSlice';

import '../../css/categoryContainer.css';

const CategoryContainer = () => {

    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(getCategoriesFromAPI());
    }, [dispatch]);

    return (
        <>
            <div className="categories">
                {categories.map((x, i) => {
                    return <div className="category-tile" key={i}>{x.category_name} ({x.num_of_items})</div>
                })}
            </div>
        </>
    );
}

export default CategoryContainer;