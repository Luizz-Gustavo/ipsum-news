import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { fetchCategories } from '../api/services/fetchCategories';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import useSWR from 'swr';
import AuthorizedComponent from './AuthorizedComponent';

function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);
    const { category: selectedCategorySlug } = useParams();
    const { data: categories = [] } = useSWR('/categories', fetchCategories);
    const location = useLocation();

    // smooth transition animation for the sidebar menu
    const sidebarVariants = {
        hidden: { x: '-100%', opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    return (
        <>
            {/* Sidebar button on mobile devices */}
            <div className="fixed top-7 left-3 z-50">
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="text-white"
                >
                    {expanded ? <BsLayoutSidebarInsetReverse size={30} /> : <BsLayoutSidebarInset size={30} />}
                </button>
            </div>

            <motion.div
                className="fixed top-0 left-0 h-full w-full sm:w-64 bg-[#121212] text-white shadow-lg z-40 overflow-y-auto"
                initial="hidden"
                animate={expanded ? "visible" : "hidden"}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="mt-16">
                    <div className="flex flex-col">
                        <Link
                            to="/explore"
                            onClick={() => setExpanded(false)}
                            className={`relative block text-white transition duration-200 p-4 hover:bg-[#1a1a1a]
                                ${location.pathname === '/explore' ? 'bg-[#1a1a1a]' : ''}`}
                        >
                            Explore
                        </Link>

                        <Link
                            to="/latest-posts"
                            onClick={() => setExpanded(false)}
                            className={`relative block text-white transition duration-200 p-4 hover:bg-[#1a1a1a]
                                ${location.pathname === '/latest-posts' ? 'bg-[#1a1a1a]' : ''}`}
                        >
                            Latest Posts
                        </Link>

                        <AuthorizedComponent allowedRoles={['writer', 'administrator']}>
                            <Link
                                to="/create-post"
                                onClick={() => setExpanded(false)}
                                className={`relative block text-white transition duration-200 p-4 hover:bg-[#1a1a1a]
                                    ${location.pathname === '/create-post' ? 'bg-[#1a1a1a]' : ''}`}
                            >
                                Create Post
                            </Link>
                        </AuthorizedComponent>

                        <AuthorizedComponent allowedRoles={['administrator']}>
                            <button
                                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                                className="relative text-white transition duration-200 p-4 hover:bg-[#1a1a1a] text-left flex items-center justify-between"
                            >
                                Administrator
                                <motion.svg
                                    animate={{ rotate: adminMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2 4L6 8L10 4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </motion.svg>
                            </button>
                            
                            <AnimatePresence>
                                {adminMenuOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-[#1a1a1a]"
                                    >
                                        <Link
                                            to="/manage-users"
                                            onClick={() => setExpanded(false)}
                                            className="block px-4 py-3 text-white hover:bg-[#242424]"
                                        >
                                            Manage Users
                                        </Link>
                                        <Link
                                            to="/post-list"
                                            onClick={() => setExpanded(false)}
                                            className="block px-4 py-3 text-white hover:bg-[#242424]"
                                        >
                                            Manage Posts
                                        </Link>
                                        <Link
                                            to="/manage-categories"
                                            onClick={() => setExpanded(false)}
                                            className="block px-4 py-3 text-white hover:bg-[#242424]"
                                        >
                                            Manage Categories
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </AuthorizedComponent>

                        <div className="categories-list-mobile py-4">
                            <div className="flex flex-col">
                                {categories.map(category => (
                                    <Link
                                        key={category.id}
                                        to={`/categories/${category.slug}`}
                                        onClick={() => setExpanded(false)}
                                        className={`relative block text-white transition duration-200 p-4 hover:bg-[#1a1a1a]
                                            ${category.slug === selectedCategorySlug ? 'bg-[#1a1a1a] text-[#007bff]' : ''}`}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Sidebar;