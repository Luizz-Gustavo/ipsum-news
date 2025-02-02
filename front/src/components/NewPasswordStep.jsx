import { Spinner } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function NewPasswordStep({ 
    newPassword, 
    setNewPassword, 
    confirmPassword, 
    setConfirmPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoadingResetPassword,
    onSubmit 
}) {
    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <div className="relative">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? (
                            <FaEyeSlash className="text-gray-400" />
                        ) : (
                            <FaEye className="text-gray-400" />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <FaEyeSlash className="text-gray-400" />
                        ) : (
                            <FaEye className="text-gray-400" />
                        )}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoadingResetPassword}
                className="w-full bg-[#FFFF00] text-black rounded-md py-2 px-4 transition-all duration-200 hover:bg-[#E3A008] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            >
                {isLoadingResetPassword ? (
                    <Spinner size="md" className="mr-2 text-white" />
                ) : (
                    'Reset Password'
                )}
            </button>
        </form>
    );
}

export default NewPasswordStep; 