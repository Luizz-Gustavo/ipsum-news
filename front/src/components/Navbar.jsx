import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import NavBarRedirects from "./NavBarRedirects";
import "../assets/css/navbar.css";
import Sidebar from './Sidebar';
import newspaperLogo from '../assets/img/newspaper.png';

function NavBar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <nav className="bg-nav shadow-sm h-[85px] lg:relative fixed w-full z-30">
                <div className="mx-auto flex justify-between items-center px-4 relative h-full">

                    <div className="flex items-center">
                        <div className="lg:hidden">
                            <Sidebar />
                        </div>
                        <Link to="/home" className="hidden lg:block">
                            <img src={newspaperLogo} alt="logo" id="main_logo" className="h-16" />
                        </Link>
                    </div>

                    <div className="lg:hidden md:hidden flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                        <Link to="/home">
                            <img src={newspaperLogo} alt="logo central" id="main_logo" className="h-16" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <div className="hidden md:flex items-center">
                            <NavBarRedirects />
                        </div>
                        <div className="flex items-center">
                            {user ? (
                                <>
                                    <LogoutButton />
                                </>
                            ) : (
                                <LoginButton />
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="lg:hidden h-[85px]"></div>
        </>
    );
}

export default NavBar;