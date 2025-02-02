import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "../assets/css/categories-list.css";

function CategoriesList({ categories }) {
    const { category: selectedCategorySlug } = useParams();

    return (
        <>
            <div className="category-section py-4">

                <div className="categories-list flex flex-wrap justify-center gap-6">
                    {categories.map(category => (
                        <Link
                            key={category.id}
                            to={`/categorias/${category.slug}`}
                            className={`text-sm md:text-base font-medium category-link ${category.slug === selectedCategorySlug ? 'text-blue-300 active' : 'text-black'
                                } hover:text-blue-600 transition-colors`}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoriesList;