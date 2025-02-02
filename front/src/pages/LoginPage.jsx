import NavBar from "../components/Navbar";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import { useAuth } from "../context/AuthContext";
import { Alert } from "flowbite-react";

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [attempts, setAttempts] = useState(5);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!identifier || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await login(identifier, password);
            navigate("/home");
            return;
        } catch (err) {
            if (err.response?.status === 429) {
                const retryAfter = err.response.headers['retry-after'];
                const minutes = Math.ceil(retryAfter / 60);
                setError(`Too many login attempts. Please try again in ${minutes} minutes.`);
                setAttempts(0);
                return;
            }
            
            if (err.shouldCountAttempt) {
                const remainingAttempts = attempts - 1;
                setAttempts(remainingAttempts);
                setError(`Invalid password: ${remainingAttempts} attempts remaining`);
                return;
            }
            
            setError(err.message);
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                                Email or Nickname
                            </label>
                            <input
                                type="text"
                                id="identifier"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                                placeholder="Enter your email or nickname"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                                    required
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

                        {error && (
                            <Alert color="red">
                                {error}
                            </Alert>
                        )}

                        <button
                            type="submit"
                            className="login-button w-full text-black rounded-md py-2 px-4 hover:transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            disabled={attempts === 0}
                        >
                            Login
                        </button>
                    </form>

                    <div className="flex justify-between mt-4">
                        <Link to="/new-password" className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                            Forgot your password?
                        </Link>
                        <Link to="/register" className="text-sm text-blue-600 hover:text-blue-800">
                            New here?
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;