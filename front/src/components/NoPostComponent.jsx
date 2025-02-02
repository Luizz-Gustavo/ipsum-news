import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Categories from "./Categories";
import TrendingNews from "./TrendingNews";
import useSWR from "swr";
import { fetchCategories } from "../api/services/fetchCategories";
import ErrorComponent from "./ErrorComponent";
import CoinSection from "./CoinSection";

function NoPostComponent({ currentCategory }) {
    const { data: categories, isLoading, error } = useSWR('/categories', fetchCategories);

    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <header>
                    <NavBar />
                </header>
                
                <main className="flex-grow flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold mb-4 text-red-600">
                        Occured an error while loading the categories.
                    </h1>
                    <ErrorComponent error={error} />
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                </main>

                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <NavBar />
                <CoinSection />
            </header>

            <main className="flex-grow">
                <div className="flex flex-row">
                    <aside className="w-1/3 hidden lg:block">
                        <Categories />
                    </aside>

                    <div className="w-full lg:w-2/3">
                        <div className="flex flex-col justify-center items-center h-[100vh]">
                            <h2 className="text-2xl text-center font-bold mb-4">No posts found!</h2>

                            <p className="text-gray-600 text-center">
                                At the moment there are no posts available for the category <span className="italic">{currentCategory.name}</span>.
                            </p>

                            <p className="text-gray-600 text-center mt-5">
                                Please, explore other categories in the menu on side.
                            </p>
                        </div>
                    </div>

                    <aside className="w-1/3 hidden md:block">
                        <TrendingNews />
                    </aside>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default NoPostComponent;