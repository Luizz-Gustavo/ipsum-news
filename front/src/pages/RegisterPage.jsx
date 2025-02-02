import NavBar from "../components/Navbar";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import { useAuth } from "../context/AuthContext";
import { registerUserService } from "../api/services/registerUserService";
import { Alert } from "flowbite-react";

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePasswords = (pass, confirmPass) => {
        if (pass !== confirmPass) {
            setPasswordError("the passwords do not match");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const validateNickname = (value) => {
        const nicknameRegex = /^[a-zA-Z0-9._]+$/;

        if (value.length < 6) {
            setNicknameError("nickname must be at least 6 characters long");
            return false;
        }
        if (value.length > 30) {
            setNicknameError("nickname must be less than 30 characters long");
            return false;
        }
        if (!nicknameRegex.test(value)) {
            setNicknameError("nickname can only contain letters, numbers, dots and underscores");
            return false;
        }
        setNicknameError("");
        return true;
    };

    const validatePassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        
        if (!hasLetter || !hasNumber) {
            setError("Password must contain at least one letter and one number");
            return false;
        }

        setError("");
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validatePasswords(password, confirmPassword)) {
            return;
        }

        if (!validateNickname(nickname)) {
            return;
        }

        if (!validatePassword(password)) {
            return;
        }

        try {
            await registerUserService(firstName, lastName, nickname, email, password);
            setSuccess("registration successful");
            await login(email, password);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <NavBar />

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-6">Hello, welcome!</h1>

                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    placeholder="First Name"
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    placeholder="Last Name"
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                                Nickname <span className="text-red-500">*</span>
                            </label>
                            <input
                                placeholder="you can't change it later!"
                                type="text"
                                id="nickname"
                                value={nickname}
                                onChange={(e) => {
                                    setNickname(e.target.value);
                                    validateNickname(e.target.value);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {nicknameError && (
                                <Alert color="red" className="mt-3">
                                    {nicknameError}
                                </Alert>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                placeholder="example@email.com"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validatePasswords(e.target.value, confirmPassword);
                                        validatePassword(e.target.value);
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1"
                                >
                                    {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    placeholder="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        validatePasswords(password, e.target.value);
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1"
                                >
                                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                            {passwordError && (
                                <Alert className="mt-3" color="red">
                                    {passwordError}
                                </Alert>
                            )}
                        </div>

                        {error && (
                            <Alert className="mt-3" color="red">
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert className="mt-3" color="green">
                                {success}
                            </Alert>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#FFFF00] text-black rounded-md py-2 px-4 transition-all duration-200 hover:bg-[#E3A008] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;