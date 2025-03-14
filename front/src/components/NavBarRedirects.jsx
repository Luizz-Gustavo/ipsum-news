import { Link, useLocation } from 'react-router-dom';
import AuthorizedComponent from './AuthorizedComponent';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function NavBarRedirects() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Link
                to="/explore"
                className={`relative text-white transition duration-200 flex items-center p-4 
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-[width] after:duration-300 after:ease-in-out hover:after:w-full ${location.pathname === '/explorar' ? 'after:w-full' : 'after:w-0'}
                before:content-[''] before:absolute before:top-0 before:right-0 before:h-[2px] before:bg-white before:transition-[width] before:duration-300 before:ease-in-out hover:before:w-full ${location.pathname === '/explorar' ? '' : 'before:w-0'}`}
            >
                Explore
            </Link>

            <Link
                to="/latest-posts" 
                className={`relative text-white transition duration-200 flex items-center p-4 
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-[width] after:duration-300 after:ease-in-out hover:after:w-full ${location.pathname === '/ultimas-publicacoes' ? 'after:w-full' : 'after:w-0'}
                before:content-[''] before:absolute before:top-0 before:right-0 before:h-[2px] before:bg-white before:transition-[width] before:duration-300 before:ease-in-out hover:before:w-full ${location.pathname === '/ultimas-publicacoes' ? '' : 'before:w-0'}`}
            >
                Latest Posts
            </Link>

            <AuthorizedComponent allowedRoles={['writer', 'administrator']}>
                <Link 
                    to="/create-post"
                    className={`relative text-white transition duration-200 flex items-center p-4 
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-[width] after:duration-300 after:ease-in-out hover:after:w-full ${location.pathname === '/criar-publicacao' ? 'after:w-full' : 'after:w-0'}
                    before:content-[''] before:absolute before:top-0 before:right-0 before:h-[2px] before:bg-white before:transition-[width] before:duration-300 before:ease-in-out hover:before:w-full ${location.pathname === '/criar-publicacao' ? '' : 'before:w-0'}`}
                >
                    Create Post
                </Link>
            </AuthorizedComponent>

            <AuthorizedComponent allowedRoles={['administrator']}>
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative text-white transition duration-200 flex items-center p-4 gap-2"
                    >
                        Administrator
                        <motion.svg
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transform"
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
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                            >
                                <Link
                                    to="/manage-users"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Manage Users
                                </Link>
                                <Link
                                    to="/post-list"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Manage Posts
                                </Link>
                                <Link
                                    to="/manage-categories"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Manage Categories
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </AuthorizedComponent>
        </>
    );
}

export default NavBarRedirects;