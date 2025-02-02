import { motion, useScroll, useTransform } from "framer-motion";
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { fetchCategories } from "../api/services/fetchCategories";
import "../assets/css/categories-desktop.css";
import { Spinner } from "flowbite-react";

function Categories() {
    const { data, error } = useSWR('/categories', fetchCategories);
    const isLoading = !data && !error;

    const { scrollY } = useScroll();

    const headerY = useTransform(scrollY,
        [0, 100],
        [0, 0]
    );

    const opacity = useTransform(scrollY,
        [0, 50],
        [1, 0.97]
    );

    return (
        <motion.div
            className="categories-box"
            style={{
                top: headerY,
                opacity
            }}
        >
            <div className="flex items-center justify-start">
                <p className="categories-title font-semibold">Categories</p>
            </div>

            <div className="mt-4">
                {error ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-lg text-red-600">
                            An error occurred, try again later!
                        </p>
                    </div>
                ) : isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Spinner className="text-blue-500 text-xl"/>
                    </div>
                ) : data?.length === 0 ? (
                    <div className="flex justify-center items-center h-[50vh]">
                        <p className="text-xl text-gray-600">
                            No categories available!
                        </p>
                    </div>
                ) : (
                    <ul className="flex flex-col">
                        {data?.map((category) => (
                            <motion.div
                                key={category.id}
                                className="category-item-container"
                            >
                                <Link
                                    to={`/categories/${category.slug}`}
                                    className="block"
                                >
                                    <div className="category-item-box pl-5">
                                        <li className="category-item text-black transition-colors duration-300">
                                            <span className="flex items-center text-lg font-medium transition-colors duration-300">
                                                {category.name}
                                            </span>
                                        </li>
                                    </div>
                                    </Link>
                                </motion.div>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
}

export default Categories;