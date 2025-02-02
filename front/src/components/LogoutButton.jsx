import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "../assets/css/logout-button.css";
import LogoutConfirm from "./LogoutConfirm";

function LogoutButton() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <>
            <div className="logout-dropdown-menu">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-black px-4 py-2 rounded-md focus:outline-none flex items-center gap-2"
                >
                    {user?.name}
                    <svg 
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                        >
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate(`/profile/${user?.nickname}`);
                                }}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                My Profile
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setShowLogoutConfirm(true);
                                }}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <LogoutConfirm 
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={() => {
                    setShowLogoutConfirm(false);
                    handleLogout();
                }}
            />
        </>
    );
}

export default LogoutButton;